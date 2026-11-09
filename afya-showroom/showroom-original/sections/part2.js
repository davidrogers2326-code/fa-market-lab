/* part2: Part 2 — The solution (2.1 concept · 2.2 brand · 2.3 how it all works) */
(function(){
'use strict';
/* ---- photo kit (editorial real-photo layouts) · prefix p2k ---- */
const p2kCSS=`
.p2k-band{position:relative;margin:24px 0 0;border-radius:26px;overflow:hidden;border:1px solid var(--edge2);min-height:460px;display:flex;align-items:flex-end;isolation:isolate;box-shadow:0 50px 110px -60px rgba(95,191,143,.45)}
.p2k-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:-2;transform:scale(1.01)}
.p2k-band::before{content:"";position:absolute;inset:0;z-index:-1;background:linear-gradient(90deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p2k-band.r{justify-content:flex-end}
.p2k-band.r::before{background:linear-gradient(270deg,rgba(2,6,8,.94) 0%,rgba(2,6,8,.72) 36%,rgba(2,6,8,.12) 70%,rgba(2,6,8,0)),linear-gradient(0deg,rgba(2,6,8,.8),rgba(2,6,8,0) 45%)}
.p2k-band .tx{position:relative;padding:48px 52px;max-width:600px}
.p2k-k{display:inline-block;font:500 .64rem/1.4 var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p2k-band h3,.p2k-split h3{font:800 clamp(1.5rem,2.9vw,2.4rem)/1.08 var(--f-display);letter-spacing:-.02em;margin:12px 0 0;color:var(--ink)}
.p2k-band h3 em,.p2k-split h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p2k-band p,.p2k-split p{color:var(--ink2);margin:14px 0 0;font-size:1rem;line-height:1.65}
.p2k-band p b,.p2k-split p b,.p2k-split li b{color:var(--ink)}
.p2k-stats{display:flex;flex-wrap:wrap;gap:12px 28px;margin-top:22px;padding-top:18px;border-top:1px solid rgba(242,201,107,.22)}
.p2k-stats div{min-width:0}
.p2k-stats b{display:block;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p2k-stats span{display:block;font-size:.78rem;line-height:1.45;color:var(--ink2);max-width:20ch}
.p2k-cap{position:absolute;right:16px;top:16px;z-index:3;font:500 .56rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:rgba(239,250,245,.82);background:rgba(2,6,8,.6);padding:5px 10px;border-radius:99px;border:1px solid rgba(255,255,255,.14);backdrop-filter:blur(6px)}
.p2k-split{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);border-radius:26px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(160deg,var(--panel2),rgba(2,6,8,.85));margin-top:22px}
.p2k-split.rev>figure{order:2}
.p2k-split>figure{position:relative;margin:0;min-height:420px;overflow:hidden}
.p2k-split>figure img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p2k-split>figure::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.55),transparent 40%)}
.p2k-split>figure figcaption{position:absolute;left:20px;right:20px;bottom:16px;z-index:2;font-size:.84rem;line-height:1.45;color:var(--ink)}
.p2k-split .tx{padding:44px 46px;display:flex;flex-direction:column;justify-content:center;min-width:0}
.p2k-split ul{margin:16px 0 0;padding:0;list-style:none;display:grid;gap:10px}
.p2k-split li{position:relative;padding-left:22px;font-size:.93rem;line-height:1.55;color:var(--ink2)}
.p2k-split li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p2k-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:22px}
.p2k-card{border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8));min-width:0;display:flex;flex-direction:column;margin:0}
.p2k-card>.ph{position:relative;aspect-ratio:4/3;overflow:hidden}
.p2k-card>.ph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p2k-card:hover>.ph img{transform:scale(1.05)}
.p2k-card>.ph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.5),transparent 45%)}
.p2k-card .tx{padding:18px 20px 22px;min-width:0}
.p2k-card h4{font:700 1.05rem/1.28 var(--f-display);margin:8px 0 0;color:var(--ink)}
.p2k-card p{font-size:.9rem;line-height:1.6;color:var(--ink2);margin:8px 0 0}
.p2k-card p b{color:var(--ink)}
.p2k-card .n{display:block;margin-top:12px;padding-top:12px;border-top:1px solid var(--edge);font:500 .66rem/1.5 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--gold2)}
.p2k-mos{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);grid-template-rows:repeat(2,minmax(0,1fr));gap:14px;margin-top:22px;height:560px}
.p2k-mos>figure{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge);min-height:0}
.p2k-mos>figure:first-child{grid-row:1/3}
.p2k-mos img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p2k-mos figcaption{position:absolute;left:0;right:0;bottom:0;padding:56px 20px 16px;background:linear-gradient(0deg,rgba(2,6,8,.92),transparent);font-size:.88rem;line-height:1.5;color:var(--ink2)}
.p2k-mos figcaption b{display:block;color:var(--ink);font:700 1rem/1.3 var(--f-display);margin-bottom:3px}
@media (max-width:980px){.p2k-split{grid-template-columns:1fr}.p2k-split.rev>figure{order:0}.p2k-split>figure{min-height:0;aspect-ratio:16/10}.p2k-split .tx{padding:28px 26px 30px}.p2k-mos{height:auto;grid-template-columns:1fr 1fr;grid-template-rows:auto}.p2k-mos>figure{aspect-ratio:4/3}.p2k-mos>figure:first-child{grid-row:auto;grid-column:1/3;aspect-ratio:16/10}}
@media (max-width:640px){.p2k-band{display:block;min-height:0!important;border-radius:20px;background:#04100c}.p2k-band>img{position:relative;display:block;height:auto;aspect-ratio:4/3;transform:none}.p2k-band::before,.p2k-band.r::before{display:none}.p2k-band .tx{max-width:none;margin-top:-80px;padding:84px 20px 24px;background:linear-gradient(180deg,rgba(4,16,12,0),#04100c 78px)}.p2k-split{border-radius:20px}.p2k-split .tx{padding:24px 20px 26px}.p2k-mos{grid-template-columns:1fr}.p2k-mos>figure,.p2k-mos>figure:first-child{grid-column:auto;aspect-ratio:auto;background:linear-gradient(175deg,var(--panel2),rgba(2,6,8,.8))}.p2k-mos img{position:relative;display:block;aspect-ratio:4/3;height:auto}.p2k-mos figcaption{position:relative;padding:14px 18px 18px;background:none}.p2k-cards{grid-template-columns:1fr}.p2k-stats b{font-size:1.25rem}}
`;
const p2kon=()=>{if(typeof addCSS==='function')addCSS('p2k',p2kCSS)};
const p2kimg=(f,alt,pos)=>`<img src="img/${f}.webp" alt="${alt}" loading="lazy" decoding="async" width="1680" height="944"${pos?` style="object-position:${pos}"`:''}>`;
const p2kcap='<span class="p2k-cap">Concept image</span>';
/* band(file, alt, kicker, title, text, {pos, r, h, stats:[[b,span]]}) */
const p2kband=(f,alt,k,h,p,o={})=>{p2kon();return `<figure class="p2k-band${o.r?' r':''}"${o.h?` style="min-height:${o.h}"`:''}>${p2kimg(f,alt,o.pos)}${p2kcap}<figcaption class="tx">${k?`<span class="p2k-k">${k}</span>`:''}<h3>${h}</h3>${p?`<p>${p}</p>`:''}${o.stats?`<div class="p2k-stats">${o.stats.map(s=>`<div><b>${s[0]}</b><span>${s[1]}</span></div>`).join('')}</div>`:''}${o.extra||''}</figcaption></figure>`};
/* split(file, alt, innerHTML, {rev, pos, cap}) */
const p2ksplit=(f,alt,html,o={})=>{p2kon();return `<div class="p2k-split${o.rev?' rev':''}"><figure>${p2kimg(f,alt,o.pos)}${p2kcap}${o.cap?`<figcaption>${o.cap}</figcaption>`:''}</figure><div class="tx">${html}</div></div>`};
/* cards([[file, alt, kicker, title, text, note, pos]]) */
const p2kcards=(arr,o={})=>{p2kon();return `<div class="p2k-cards"${o.min?` style="grid-template-columns:repeat(auto-fit,minmax(${o.min},1fr))"`:''}>${arr.map(a=>`<article class="p2k-card"><div class="ph">${p2kimg(a[0],a[1],a[6])}${p2kcap}</div><div class="tx">${a[2]?`<span class="p2k-k">${a[2]}</span>`:''}<h4>${a[3]}</h4>${a[4]?`<p>${a[4]}</p>`:''}${a[5]?`<span class="n">${a[5]}</span>`:''}</div></article>`).join('')}</div>`};
/* mosaic([[file, alt, title, text, pos]]) first is large */
const p2kmos=arr=>{p2kon();return `<div class="p2k-mos">${arr.map(a=>`<figure>${p2kimg(a[0],a[1],a[4])}${p2kcap}<figcaption><b>${a[2]}</b>${a[3]||''}</figcaption></figure>`).join('')}</div>`};
/* ---- end photo kit ---- */

/* ================= CSS ================= */
(function(id,css){if(typeof addCSS==='function')return addCSS(id,css);if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;(document.head||document.documentElement).appendChild(st)})('part2',`
.p2 .s11lead{max-width:74ch}
.p2-h3{font:700 clamp(1.15rem,2vw,1.45rem)/1.2 var(--f-display);letter-spacing:-.01em;margin:0 0 10px}
.p2-sub{color:var(--ink2);font-size:.95rem;margin:0 0 18px;max-width:72ch}
.p2-grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p2-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p2-card{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.65));min-width:0}
.p2-card h4{margin:0;font:700 1rem var(--f-display);color:var(--ink)}
.p2-card p{margin:8px 0 0;color:var(--ink2);font-size:.9rem;line-height:1.55}
.p2 p.note{font-size:.66rem;line-height:1.6;color:var(--ink3)}
.p2-fitcard span .tagi,.p2-ph .tagi{font-size:.58rem}
.p2-k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:8px}
.p2-k.g{color:var(--gold)}
.p2-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}
.p2-tabs button{display:inline-flex;align-items:center;gap:8px;padding:9px 15px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .84rem var(--f-body);cursor:pointer;transition:all .2s}
.p2-tabs button:hover{color:var(--ink);border-color:var(--edge2)}
.p2-tabs button.on{color:#1a1204;background:linear-gradient(135deg,var(--gold2),var(--gold));border-color:transparent}
.p2-tabs button i{width:8px;height:8px;border-radius:50%;background:var(--c,var(--neon))}
.p2-tabs button.on i{background:#1a1204}
.p2-swap{animation:rise .45s cubic-bezier(.2,.8,.2,1) both}

/* ---- 2.1 promise ---- */
.p2-prom{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.p2-pr{position:relative;padding:24px 22px;border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0;overflow:hidden}
.p2-pr::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
.p2-prph{position:relative;margin:-24px -22px 16px;aspect-ratio:16/10;overflow:hidden}
.p2-prph img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p2-pr:hover .p2-prph img{transform:scale(1.05)}
.p2-prph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,20,15,.95),rgba(6,20,15,0) 55%)}
.p2-prph .p2k-cap{top:12px;right:12px}
.p2-wdph{margin:-20px -20px 16px;aspect-ratio:16/10;overflow:hidden;position:relative}
.p2-wdph img{display:block;width:100%;height:100%;object-fit:cover}
.p2-wdph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,20,15,.6),transparent 50%)}
.p2-segph{display:block;margin:-6px -6px 10px;aspect-ratio:16/9;border-radius:11px;background-size:cover;background-position:center;border:1px solid rgba(255,255,255,.1)}
.p2-apply{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:290px;gap:14px;margin-top:16px}
.p2-ap{position:relative;margin:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge);min-width:0}
.p2-ap.big{grid-column:span 2;grid-row:span 2}
.p2-ap img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
.p2-ap:hover img{transform:scale(1.04)}
.p2-ap::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.92),rgba(2,6,8,.35) 32%,rgba(2,6,8,0) 50%)}
.p2-ap .chip{position:absolute;left:14px;top:14px;z-index:2;display:inline-flex;align-items:center;gap:8px;padding:5px 12px 5px 6px;border-radius:99px;background:rgba(250,247,240,.94);color:#0B2219;font:700 .74rem var(--f-display)}
.p2-ap figcaption{position:absolute;z-index:2;left:16px;right:16px;bottom:14px;font-size:.84rem;line-height:1.5;color:#dcebe4}
.p2-ap.big figcaption{font-size:.95rem;max-width:46ch}
.zph{display:block;width:44px;height:44px;border-radius:12px;background-size:cover;background-position:center;border:2px solid rgba(255,255,255,.75);box-shadow:0 6px 14px -6px rgba(0,0,0,.6)}
.m-ph{position:relative;margin:0;width:100%;max-width:560px;aspect-ratio:16/10;border-radius:18px;overflow:hidden;border:1px solid var(--edge2);box-shadow:0 30px 60px -30px rgba(0,0,0,.8)}
.m-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.m-ph .t1{position:absolute;left:14px;bottom:14px;display:inline-flex;align-items:center;gap:8px;padding:6px 12px 6px 6px;border-radius:99px;background:rgba(250,247,240,.95);color:#0B2219;font:600 .7rem var(--f-hud);letter-spacing:.04em}
.m-ph .t2{position:absolute;right:14px;bottom:16px;font:italic 600 .9rem var(--f-display);color:var(--gold2);text-shadow:0 2px 10px rgba(0,0,0,.8)}
@media (max-width:980px){.p2-apply{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:240px}}
@media (max-width:640px){.p2-apply{grid-template-columns:1fr;grid-auto-rows:auto}.p2-ap,.p2-ap.big{grid-column:auto;grid-row:auto;aspect-ratio:auto;background:#04100c}.p2-ap img{position:relative;display:block;aspect-ratio:4/3;height:auto}.p2-ap::after{display:none}.p2-ap figcaption,.p2-ap.big figcaption{position:relative;left:0;right:0;bottom:0;padding:14px 16px 16px;font-size:.88rem}.m-ph .t2{display:none}}
.p2-fdph{position:relative;margin:-24px -24px 18px;aspect-ratio:16/9;overflow:hidden}
.p2-fdph img{display:block;width:100%;height:100%;object-fit:cover}
.p2-fdph::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(6,20,15,.9),rgba(6,20,15,0) 55%)}
.p2-pr .n{font:900 2.2rem/1 var(--f-display);color:transparent;-webkit-text-stroke:1px rgba(242,201,107,.55)}
.p2-pr h4{margin:14px 0 0;font:700 1.08rem var(--f-display)}
.p2-pr p{margin:8px 0 0;font-size:.88rem;line-height:1.55;color:var(--ink2)}
.p2-pr .m{margin-top:14px;padding-top:12px;border-top:1px solid var(--edge);font:600 .84rem var(--f-body);color:var(--neon2)}
.p2-pr .m small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:3px}

/* positioning table */
.p2-pos{border-radius:24px;overflow:hidden;border:1px solid var(--edge2);background:rgba(2,8,6,.55)}
.p2-pos-h{display:grid;grid-template-columns:minmax(0,1fr) 64px minmax(0,1fr)}
.p2-pos-h div{padding:18px 24px;font:700 1.05rem var(--f-display)}
.p2-pos-h .we{background:linear-gradient(120deg,rgba(15,122,82,.55),rgba(15,122,82,.15));color:#fff}
.p2-pos-h .not{background:rgba(255,155,135,.06);color:#ffb3a3;text-align:right}
.p2-pos-h .mid{padding:0;background:linear-gradient(90deg,rgba(15,122,82,.15),rgba(255,155,135,.06))}
.p2-pos-r{display:grid;grid-template-columns:minmax(0,1fr) 64px minmax(0,1fr);border-top:1px solid var(--edge);transition:background .25s}
.p2-pos-r:hover{background:rgba(242,201,107,.05)}
.p2-pos-r .we{padding:16px 24px;display:flex;gap:12px;align-items:flex-start;color:var(--ink);font-weight:600}
.p2-pos-r .we svg{flex:0 0 18px;width:18px;height:18px;color:var(--neon);margin-top:3px}
.p2-pos-r .we small{display:block;font-weight:400;color:var(--ink2);font-size:.84rem;margin-top:3px;line-height:1.45}
.p2-pos-r .mid{display:grid;place-items:center;font:500 .6rem var(--f-hud);letter-spacing:.14em;color:var(--gold)}
.p2-pos-r .not{padding:16px 24px;text-align:right;color:var(--ink3);text-decoration:line-through;text-decoration-color:rgba(255,155,135,.55);text-decoration-thickness:1px}

/* concept diagram */
.p2-cx{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:22px;align-items:start}
.p2-cxsvg{position:relative;border-radius:26px;border:1px solid var(--edge2);background:radial-gradient(520px 340px at 50% 48%,rgba(95,191,143,.12),transparent 70%),repeating-linear-gradient(0deg,rgba(95,191,143,.035) 0 1px,transparent 1px 36px),repeating-linear-gradient(90deg,rgba(95,191,143,.035) 0 1px,transparent 1px 36px),rgba(2,8,6,.6);padding:10px;overflow:hidden}
.p2-cxsvg svg{display:block;width:100%;height:auto}
.p2-cxsvg .vm{display:none}
.p2-cn{cursor:pointer;outline:none}
.p2-cn .ring{fill:rgba(4,20,15,.92);stroke:var(--c);stroke-width:1.5;transition:all .3s}
.p2-cn .halo{fill:none;stroke:var(--c);stroke-width:1;opacity:0;transition:opacity .3s}
.p2-cn:hover .ring,.p2-cn:focus .ring,.p2-cn.on .ring{fill:color-mix(in srgb,var(--c) 22%,#04140f);stroke-width:2.5}
.p2-cn.on .halo,.p2-cn:focus .halo{opacity:.6}
.p2-cn text{font-family:var(--f-display);font-weight:700;fill:var(--ink)}
.p2-cn .lt{font-size:19px}
.p2-cn .ls{font:500 12px var(--f-hud);letter-spacing:.12em;fill:var(--ink3);text-transform:uppercase}
.p2-cn .ic{color:var(--c)}
.p2-core text{fill:var(--ink)}
.p2-arc{fill:none;stroke:url(#p2gArc);stroke-width:1.4;opacity:.7}
.p2-spk{fill:none;stroke-width:1.6;opacity:.55}
.p2-arcl{font:500 12px var(--f-hud);letter-spacing:.1em;fill:var(--gold2);text-transform:uppercase}
.p2-cxp{padding:24px;border-radius:24px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6));min-height:100%}
.p2-cxp h3{font:800 1.35rem/1.15 var(--f-display);letter-spacing:-.01em;margin:6px 0 0}
.p2-cxp p{color:var(--ink2);font-size:.92rem;margin:10px 0 0;line-height:1.6}
.p2-cxp dl{margin:16px 0 0;display:grid;gap:10px}
.p2-cxp dt{font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon)}
.p2-cxp dd{margin:2px 0 0;color:var(--ink);font-size:.9rem;line-height:1.5}
.p2-cxbtn{display:flex;flex-wrap:wrap;gap:6px;margin-top:14px}
.p2-cxbtn button{padding:7px 12px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .76rem var(--f-body);cursor:pointer}
.p2-cxbtn button.on{border-color:var(--gold);color:var(--gold2);background:rgba(242,201,107,.1)}

/* week story */
.p2-week{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge)}
.p2-wd{padding:20px;background:var(--panel);border-left:1px solid var(--edge);min-width:0}
.p2-wd:first-child{border-left:0}
.p2-wd .d{font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p2-wd .ch{display:inline-block;margin-top:10px;padding:3px 9px;border-radius:999px;font:500 .6rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--c);color:var(--c)}
.p2-wd b{display:block;margin-top:10px;font:700 .98rem var(--f-display)}
.p2-wd p{margin:6px 0 0;font-size:.86rem;line-height:1.5;color:var(--ink2)}

/* find your way in */
.p2-seg{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-bottom:16px}
.p2-seg button{text-align:left;padding:14px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);cursor:pointer;transition:all .2s;min-width:0}
.p2-seg button svg{width:22px;height:22px;color:var(--neon2);display:block;margin-bottom:8px}
.p2-seg button b{display:block;font:700 .86rem/1.25 var(--f-display);color:var(--ink)}
.p2-seg button span{display:block;margin-top:4px;font-size:.74rem;line-height:1.35}
.p2-seg button.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#3a2a08}
.p2-seg button.on b,.p2-seg button.on svg{color:#1a1204}
.p2-fit{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px}
.p2-mix{display:grid;gap:12px}
.p2-mix div{display:grid;grid-template-columns:120px minmax(0,1fr) 44px;align-items:center;gap:12px;font-size:.86rem;color:var(--ink2)}
.p2-mix i{height:10px;border-radius:10px;background:rgba(95,191,143,.1);overflow:hidden;display:block}
.p2-mix i em{display:block;height:100%;border-radius:10px;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 60%,#fff));transition:width .6s cubic-bezier(.2,.8,.2,1)}
.p2-mix b{font:500 .8rem var(--f-hud);color:var(--ink);text-align:right}
.p2-fitcard{display:flex;gap:14px;align-items:center;margin-top:16px;padding:14px;border-radius:16px;border:1px solid var(--edge2);background:rgba(242,201,107,.06)}
.p2-fitcard .cd{flex:0 0 74px;height:46px;border-radius:8px;background:var(--cc);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2);position:relative}
.p2-fitcard .cd::after{content:"";position:absolute;left:8px;bottom:8px;width:18px;height:12px;border-radius:3px;background:linear-gradient(135deg,#ffe7a8,#c9a24a)}
.p2-fitcard b{display:block;font:700 .95rem var(--f-display)}
.p2-fitcard span{font-size:.82rem;color:var(--ink2)}

/* charts */
.p2-chart{padding:22px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p2-chart svg{display:block;width:100%;height:auto}
.p2-chart text{font:500 11px var(--f-hud);fill:var(--ink3)}
.p2-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:12px;font-size:.82rem;color:var(--ink2)}
.p2-legend span{display:inline-flex;align-items:center;gap:7px}
.p2-legend i{width:10px;height:10px;border-radius:3px;background:var(--c)}

/* ambition */
.p2-amb{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:16px;align-items:stretch}

/* ---- 2.2 brand ---- */
.p2-logohero{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px}
.p2-lh{position:relative;border-radius:26px;padding:34px;display:grid;place-items:center;min-height:340px;overflow:hidden}
.p2-lh.light{background:#FAF7F0;color:#0B2219}
.p2-lh.grid{background:#FAF7F0;background-image:linear-gradient(rgba(15,122,82,.10) 1px,transparent 1px),linear-gradient(90deg,rgba(15,122,82,.10) 1px,transparent 1px);background-size:20px 20px}
.p2-lh .cap{position:absolute;left:18px;bottom:14px;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:#5B6F66}
.p2-lock{display:flex;align-items:center;gap:16px}
.p2-lock svg{flex:0 0 auto}
.p2-wm{display:flex;flex-direction:column;line-height:1}
.p2-wm b{font:800 2.3rem/1 var(--f-display);letter-spacing:-.02em;color:currentColor}
.p2-wm span{margin-top:6px;font:500 .78rem var(--f-display);letter-spacing:.62em;color:currentColor;opacity:.85}
.p2-wm em{font:italic 400 .82rem var(--f-body);letter-spacing:0;margin-top:8px;opacity:.75}
.p2-anat{display:grid;gap:10px;margin-top:0}
.p2-anat li{list-style:none;display:grid;grid-template-columns:30px minmax(0,1fr);gap:12px;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);font-size:.88rem;color:var(--ink2);line-height:1.5}
.p2-anat li span{width:30px;height:30px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--edge2);font:700 .74rem var(--f-hud);color:var(--gold2)}
.p2-anat li b{color:var(--ink)}
.p2-anat{padding:0;margin:0}
.p2-var{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px}
.p2-v{border-radius:22px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p2-vi{position:relative;height:200px;display:grid;place-items:center;overflow:hidden}
.p2-vc{padding:14px 18px 16px}
.p2-vc b{display:block;font:700 .95rem var(--f-display)}
.p2-vc p{margin:4px 0 0;font-size:.82rem;color:var(--ink2);line-height:1.45}
.p2-sign{width:88%;padding:18px 20px;border-radius:6px;background:linear-gradient(180deg,#0d1512,#050908);border:1px solid #2b3530;box-shadow:0 18px 40px -10px rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;gap:12px;color:#fff}
.p2-sign .p2-wm b{font-size:1.5rem;text-shadow:0 0 14px rgba(255,255,255,.65),0 0 30px rgba(95,191,143,.45)}
.p2-sign .p2-wm span{font-size:.55rem}
.p2-sign svg{filter:drop-shadow(0 0 10px rgba(95,191,143,.6))}
.p2-appbg{background:linear-gradient(160deg,#1f3a31,#0b1a15)}
.p2-apps{display:grid;grid-template-columns:repeat(4,52px);gap:14px}
.p2-apps i{width:52px;height:52px;border-radius:13px;background:rgba(255,255,255,.12);display:block}
.p2-apps .me{background:none;display:grid;justify-items:center;gap:4px}
.p2-apps .me small{font:600 .55rem var(--f-body);color:#fff;font-style:normal}
.p2-pack{position:relative;width:86%;height:120px;border-radius:6px;background:#FAF7F0;box-shadow:0 18px 30px -12px rgba(0,0,0,.6);overflow:hidden}
.p2-pack .band{position:absolute;left:0;right:0;bottom:0;height:34px;background:var(--zc,#0F7A52);display:flex;align-items:center;justify-content:space-between;padding:0 12px;color:#fff;font:600 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase}
.p2-pack .tp{position:absolute;left:14px;top:14px;color:#0B2219}
.p2-pack .tp .p2-wm b{font-size:1.05rem}
.p2-pack .tp .p2-wm span{font-size:.45rem;margin-top:3px}
.p2-pack .seal{position:absolute;right:14px;top:14px;font:500 .5rem var(--f-hud);letter-spacing:.14em;color:#5B6F66;text-transform:uppercase;text-align:right}
.p2-tab{width:86%;border-radius:10px 10px 0 0;background:#dfe5e2;padding:10px 10px 0;box-shadow:0 18px 30px -12px rgba(0,0,0,.6)}
.p2-tab .t{display:flex;align-items:center;gap:8px;width:70%;padding:8px 10px;border-radius:8px 8px 0 0;background:#fff;color:#0B2219;font:600 .72rem var(--f-body)}
.p2-tab .bar{height:30px;background:#fff;border-top:1px solid #e4e9e6;display:flex;align-items:center;padding:0 10px;font:500 .62rem var(--f-hud);color:#5B6F66}
.p2-fav{display:flex;gap:16px;align-items:flex-end;margin-top:14px}
.p2-fav span{display:grid;justify-items:center;gap:4px;font:500 .55rem var(--f-hud);color:#5B6F66}
.p2-dl{display:grid;grid-template-columns:1fr 1fr;width:100%;height:100%}
.p2-dl div{display:grid;place-items:center}
.p2-dl .p2-wm b{font-size:1.15rem}
.p2-dl .p2-wm span{font-size:.45rem;margin-top:4px}
.p2-rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:16px}
.p2-rule{border-radius:18px;border:1px solid rgba(255,155,135,.25);background:rgba(255,123,107,.04);overflow:hidden;min-width:0}
.p2-rule .ri{height:120px;display:grid;place-items:center;background:#FAF7F0;position:relative;overflow:hidden}
.p2-rule .ri::after{content:"";position:absolute;width:140%;height:2px;background:#e0533d;transform:rotate(-24deg);opacity:.85}
.p2-rule p{margin:0;padding:12px 14px;font-size:.82rem;color:var(--ink2);line-height:1.45}
.p2-rule p b{color:#ffb3a3}

/* palette */
.p2-pal{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p2-sw{display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0;cursor:pointer;text-align:left;padding:0;color:inherit;font:inherit}
.p2-sw .chip{height:110px;background:var(--c);position:relative;padding:14px;display:flex;flex-direction:column;justify-content:space-between}
.p2-sw .chip b{font:700 1.05rem var(--f-display);color:var(--t)}
.p2-sw .chip code{font:500 .78rem var(--f-hud);color:var(--t);opacity:.9}
.p2-sw .info{padding:12px 14px 14px}
.p2-sw .info p{margin:0;font-size:.8rem;color:var(--ink2);line-height:1.45}
.p2-sw .info small{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px;font:500 .62rem var(--f-hud);letter-spacing:.06em;color:var(--ink3)}
.p2-sw .info small em{font-style:normal;padding:2px 7px;border-radius:999px;border:1px solid var(--edge)}
.p2-sw .info small em.ok{color:var(--neon);border-color:rgba(95,191,143,.4)}
.p2-sw .info small em.lg{color:var(--gold2);border-color:var(--edge2)}
.p2-sw .info small em.no{color:#ffb3a3;border-color:rgba(255,155,135,.35)}
.p2-sw.copied .chip::after{content:"Copied";position:absolute;right:12px;top:12px;font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;padding:3px 8px;border-radius:999px;background:rgba(0,0,0,.35);color:#fff}
.p2-prop{display:flex;height:46px;border-radius:14px;overflow:hidden;border:1px solid var(--edge);margin:16px 0 6px}
.p2-prop div{display:flex;align-items:center;justify-content:center;font:500 .66rem var(--f-hud);letter-spacing:.08em;min-width:0;white-space:nowrap;overflow:hidden}
.p2-zones{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px}
.p2-z{border-radius:18px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p2-z .zt{height:104px;background:var(--c);padding:12px;display:flex;flex-direction:column;justify-content:space-between;color:var(--t)}
.p2-z .zt svg{width:22px;height:22px}
.p2-z .zt code{font:500 .72rem var(--f-hud)}
.p2-z .zl{height:16px;background:var(--l)}
.p2-z .zb{padding:10px 12px 12px}
.p2-z .zb b{display:block;font:700 .82rem/1.25 var(--f-display)}
.p2-z .zb span{display:block;margin-top:4px;font-size:.74rem;color:var(--ink2);line-height:1.35}

/* type */
.p2-type{display:grid;gap:12px}
.p2-tctl{display:grid;grid-template-columns:minmax(0,1fr) 220px;gap:14px;align-items:center;padding:16px 18px;border-radius:18px;border:1px solid var(--edge2);background:rgba(242,201,107,.05)}
.p2-tctl input[type=text]{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,8,6,.7);color:var(--ink);font:500 1rem var(--f-body)}
.p2-tctl label{display:grid;gap:6px;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p2-tctl input[type=range]{width:100%;accent-color:var(--gold)}
.p2-trow{display:grid;grid-template-columns:200px minmax(0,1fr);gap:20px;align-items:center;padding:20px 22px;border-radius:18px;background:#FAF7F0;color:#0B2219;min-width:0}
.p2-trow .meta b{display:block;font:700 .9rem var(--f-display)}
.p2-trow .meta span{display:block;margin-top:4px;font:500 .62rem var(--f-hud);letter-spacing:.08em;color:#5B6F66;line-height:1.5}
.p2-trow .sm{min-width:0;overflow-wrap:anywhere;line-height:1.15}
.p2-trow .sm.d{font-family:var(--f-display);font-weight:800;letter-spacing:-.02em;color:#0F7A52}
.p2-trow .sm.b{font-family:var(--f-body);font-weight:500;line-height:1.5}
.p2-trow .sm.n{font-family:var(--f-hud);font-variant-numeric:tabular-nums}
.p2-tnum{display:grid;grid-template-columns:auto auto;justify-content:start;gap:2px 26px;font:500 .95rem var(--f-hud);font-variant-numeric:tabular-nums}
.p2-tnum span:nth-child(odd){font-family:var(--f-body);color:#5B6F66}
.p2-tnum span:nth-child(even){text-align:right;color:#0B2219}

/* photography */
.p2-photo{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p2-ph{margin:0;border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p2-ph .pi{position:relative;aspect-ratio:4/3;overflow:hidden}
.p2-ph img{width:100%;height:100%;object-fit:cover;display:block}
.p2-ph .badge{position:absolute;left:10px;top:10px;padding:4px 10px;border-radius:999px;font:600 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase}
.p2-ph.do .badge{background:rgba(15,122,82,.9);color:#fff}
.p2-ph.dont{border-color:rgba(255,155,135,.3)}
.p2-ph.dont .badge{background:rgba(120,30,20,.85);color:#ffd4ca}
.p2-ph.dont img{filter:grayscale(.35) contrast(.95)}
.p2-ph figcaption{padding:12px 14px 14px;font-size:.84rem;color:var(--ink2);line-height:1.45}
.p2-ph figcaption b{color:var(--ink);font-family:var(--f-display);font-size:.88rem}
.p2-prules{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:14px}
.p2-prules div{padding:14px 16px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);font-size:.85rem;color:var(--ink2);line-height:1.5}
.p2-prules b{display:block;color:var(--ink);font-family:var(--f-display);font-size:.88rem;margin-bottom:3px}

/* voice */
.p2-voice{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:18px}
.p2-vo{padding:18px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p2-vo b{display:block;font:700 1rem var(--f-display);color:var(--gold2)}
.p2-vo p{margin:6px 0 0;font-size:.84rem;color:var(--ink2);line-height:1.5}
.p2-vo .say{margin-top:10px;font-size:.82rem;line-height:1.45}
.p2-vo .say span{display:block;padding:6px 9px;border-radius:9px;margin-top:5px}
.p2-vo .say .y{background:rgba(95,191,143,.08);color:var(--ink)}
.p2-vo .say .n{background:rgba(255,123,107,.06);color:#ffb3a3;text-decoration:line-through;text-decoration-color:rgba(255,155,135,.5)}
.p2-lang{display:inline-flex;padding:4px;border-radius:999px;border:1px solid var(--edge2);background:rgba(2,8,6,.6);margin-bottom:14px}
.p2-lang button{padding:8px 16px;border-radius:999px;border:0;background:none;color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer}
.p2-lang button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p2-ex{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p2-exc{border-radius:18px;padding:16px;background:#FAF7F0;color:#0B2219;min-width:0;display:flex;flex-direction:column}
.p2-exc small{font:600 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:#0F7A52}
.p2-exc p{margin:8px 0 0;font-size:.88rem;line-height:1.55;flex:1}
.p2-exc .why{margin-top:10px;padding-top:10px;border-top:1px solid #e4e9e6;font-size:.74rem;color:#5B6F66;line-height:1.4}

/* brand in use */
.p2-use{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:18px;align-items:stretch}
.p2-stage{position:relative;border-radius:26px;min-height:440px;display:grid;place-items:center;padding:30px 18px;overflow:hidden;background:radial-gradient(500px 300px at 50% 40%,rgba(242,201,107,.14),transparent 70%),linear-gradient(160deg,#0c2a20,#030b08);border:1px solid var(--edge2)}
.p2-notes{padding:22px;border-radius:24px;border:1px solid var(--edge);background:var(--panel)}
.p2-notes h3{font:800 1.2rem var(--f-display);margin:0}
.p2-notes p{margin:8px 0 0;color:var(--ink2);font-size:.9rem;line-height:1.55}
.p2-notes ol{margin:14px 0 0;padding:0;list-style:none;display:grid;gap:8px;counter-reset:nt}
.p2-notes li{position:relative;padding-left:34px;font-size:.86rem;color:var(--ink2);line-height:1.5;counter-increment:nt}
.p2-notes li::before{content:counter(nt);position:absolute;left:0;top:0;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:var(--gold);color:#1a1204;font:700 .7rem var(--f-hud)}
.p2-notes li b{color:var(--ink)}
/* mock: shelf label */
.m-esl{width:min(380px,100%);border-radius:10px;background:#fff;color:#0B2219;display:grid;grid-template-columns:12px minmax(0,1fr);box-shadow:0 30px 60px -20px rgba(0,0,0,.8);overflow:hidden;font-family:var(--f-body)}
.m-esl .zb{background:#C9473A}
.m-esl .in{padding:14px 16px 12px}
.m-esl .top{display:flex;justify-content:space-between;align-items:center;font:600 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:#C9473A}
.m-esl h5{margin:8px 0 0;font:700 1.08rem/1.2 var(--f-display);letter-spacing:-.01em}
.m-esl .sw{margin-top:2px;font-size:.78rem;color:#5B6F66;font-style:italic}
.m-esl .best{margin-top:10px;padding:8px 10px;border-radius:8px;background:#E6F4ED;font-size:.78rem;line-height:1.4}
.m-esl .best b{color:#0F7A52}
.m-esl .row{display:flex;justify-content:space-between;align-items:flex-end;margin-top:12px;gap:10px}
.m-esl .pr{font:700 1.7rem/1 var(--f-hud);font-variant-numeric:tabular-nums}
.m-esl .pr small{font-size:.7rem;font-weight:500;margin-right:3px}
.m-esl .qr{width:52px;height:52px;flex:0 0 52px;background:conic-gradient(#0B2219 25%,#fff 0 50%,#0B2219 0 75%,#fff 0) 0 0/13px 13px;border:3px solid #fff;outline:1px solid #0B2219}
.m-esl .ft{display:flex;justify-content:space-between;gap:8px;margin-top:10px;padding-top:8px;border-top:1px solid #e4e9e6;font:500 .56rem var(--f-hud);letter-spacing:.06em;color:#5B6F66}
/* mock: sms */
.m-ph{width:250px;border-radius:34px;padding:9px;background:linear-gradient(160deg,#2a332f,#0b0f0d);box-shadow:0 30px 60px -20px rgba(0,0,0,.85),inset 0 0 0 1px rgba(255,255,255,.08)}
.m-ph .sc{border-radius:26px;background:#f3f5f4;min-height:400px;padding:16px 12px;color:#0B2219;font-family:var(--f-body);display:flex;flex-direction:column;gap:8px}
.m-ph .hd{display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:1px solid #e1e6e3}
.m-ph .hd b{font:700 .78rem var(--f-display)}
.m-ph .hd small{display:block;font-size:.58rem;color:#5B6F66}
.m-ph .bub{max-width:88%;padding:9px 11px;border-radius:14px 14px 14px 4px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08);font-size:.72rem;line-height:1.45}
.m-ph .bub.me{align-self:flex-end;border-radius:14px 14px 4px 14px;background:#0F7A52;color:#fff}
.m-ph .bub b{color:#0F7A52}
.m-ph .t{font:500 .52rem var(--f-hud);color:#8a9a93;text-align:center}
.m-ph .qk{display:flex;gap:5px;flex-wrap:wrap;margin-top:auto}
.m-ph .qk span{padding:5px 9px;border-radius:999px;border:1px solid #0F7A52;color:#0F7A52;font-size:.62rem;font-weight:700}
/* mock: receipt */
.m-rc{width:270px;background:#fff;color:#111;padding:18px 18px 26px;font:500 .68rem/1.5 var(--f-hud);box-shadow:0 30px 60px -20px rgba(0,0,0,.85);position:relative;-webkit-mask:radial-gradient(circle at 6px 100%,transparent 5px,#000 5.5px) 0 0/12px 100% repeat-x;mask:radial-gradient(circle at 6px 100%,transparent 5px,#000 5.5px) 0 0/12px 100% repeat-x}
.m-rc .c{text-align:center}
.m-rc hr{border:0;border-top:1px dashed #9aa;margin:8px 0}
.m-rc .l{display:flex;justify-content:space-between;gap:10px;font-variant-numeric:tabular-nums}
.m-rc .tot{font-weight:700;font-size:.82rem}
.m-rc .fq{display:flex;gap:10px;align-items:center;margin-top:8px}
.m-rc .fq i{width:46px;height:46px;flex:0 0 46px;background:conic-gradient(#111 25%,#fff 0 50%,#111 0 75%,#fff 0) 0 0/9px 9px}
.m-rc .mot{margin-top:10px;text-align:center;font:italic 500 .74rem var(--f-body);color:#0F7A52}
/* mock: card */
.m-cards{display:grid;gap:14px;justify-items:center;width:100%}
.m-cd{position:relative;width:min(340px,100%);aspect-ratio:1.586;border-radius:18px;padding:18px 20px;color:#fff;background:var(--cbg);box-shadow:0 30px 60px -20px rgba(0,0,0,.85),inset 0 0 0 1px rgba(255,255,255,.14);overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;font-family:var(--f-body)}
.m-cd::before{content:"";position:absolute;right:-60px;top:-60px;width:220px;height:220px;border-radius:50%;border:1px solid rgba(255,255,255,.14)}
.m-cd::after{content:"";position:absolute;right:-20px;top:-20px;width:140px;height:140px;border-radius:50%;border:1px solid rgba(242,201,107,.3)}
.m-cd .tp{display:flex;justify-content:space-between;align-items:flex-start;position:relative;z-index:1}
.m-cd .tp .p2-wm b{font-size:1rem}
.m-cd .tp .p2-wm span{font-size:.42rem;margin-top:3px}
.m-cd .tier{font:600 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:#ffe7a8}
.m-cd .nm{position:relative;z-index:1;font:700 1.1rem var(--f-display);letter-spacing:.01em}
.m-cd .bt{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-end;font:500 .62rem var(--f-hud);letter-spacing:.08em;opacity:.9}
.m-cd .chipc{width:34px;height:26px;border-radius:5px;background:linear-gradient(135deg,#ffe7a8,#c9a24a)}
.m-cpick{display:flex;flex-wrap:wrap;justify-content:center;gap:6px}
.m-cpick button{padding:6px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.25);color:#e9f3ee;font:600 .72rem var(--f-body);cursor:pointer}
.m-cpick button.on{background:#f2c96b;color:#1a1204;border-color:transparent}
/* mock: bag */
.m-bag{position:relative;width:250px;height:290px;margin-top:40px}
.m-bag .hdl{position:absolute;left:50%;top:-40px;width:120px;height:62px;transform:translateX(-50%);border:10px solid #0A5A3C;border-bottom:0;border-radius:60px 60px 0 0}
.m-bag .bd{position:absolute;inset:0;border-radius:16px 16px 22px 22px;background:linear-gradient(100deg,#0c6b48,#0F7A52 40%,#0d7049);box-shadow:0 34px 60px -22px rgba(0,0,0,.9),inset 0 -14px 0 rgba(0,0,0,.12);overflow:hidden}
.m-bag .zip{position:absolute;left:14px;right:14px;top:16px;height:6px;border-radius:6px;background:repeating-linear-gradient(90deg,#0A5A3C 0 4px,#127f56 4px 7px)}
.m-bag .lg{position:absolute;left:0;right:0;top:64px;display:grid;justify-items:center;gap:10px;color:#fff}
.m-bag .lg .p2-wm{align-items:center}
.m-bag .lg .p2-wm b{font-size:1.25rem}
.m-bag .lg .p2-wm span{font-size:.5rem}
.m-bag .bnd{position:absolute;left:0;right:0;bottom:58px;height:26px;background:#D9607A;display:flex;align-items:center;justify-content:center;font:600 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:#fff}
.m-bag .mt{position:absolute;left:0;right:0;bottom:16px;text-align:center;font:italic 500 .74rem var(--f-body);color:#ffe7a8}
.m-bag .sealtag{position:absolute;right:-16px;top:6px;padding:6px 8px;border-radius:6px;background:#fff;color:#0B2219;font:600 .5rem/1.3 var(--f-hud);letter-spacing:.08em;text-transform:uppercase;transform:rotate(8deg);box-shadow:0 6px 14px rgba(0,0,0,.4)}

/* charter */
.p2-charter{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;counter-reset:ch}
.p2-ch{display:grid;grid-template-columns:52px minmax(0,1fr);gap:16px;padding:18px 20px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));counter-increment:ch;min-width:0}
.p2-ch::before{content:counter(ch,decimal-leading-zero);font:900 1.6rem/1 var(--f-display);color:transparent;-webkit-text-stroke:1px rgba(242,201,107,.6)}
.p2-ch b{display:block;font:700 1rem var(--f-display)}
.p2-ch .sw{display:block;font-style:italic;color:var(--gold2);font-size:.82rem;margin-top:2px}
.p2-ch p{margin:6px 0 0;font-size:.86rem;color:var(--ink2);line-height:1.5}
.p2-ch small{display:block;margin-top:8px;font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--neon)}

/* ---- 2.3 flow ---- */
.p2-flow{position:relative;border-radius:28px;border:1px solid var(--edge2);background:radial-gradient(600px 300px at 50% 50%,rgba(217,181,110,.07),transparent 70%),repeating-linear-gradient(0deg,rgba(95,191,143,.03) 0 1px,transparent 1px 40px),repeating-linear-gradient(90deg,rgba(95,191,143,.03) 0 1px,transparent 1px 40px),rgba(2,8,6,.65);padding:14px;overflow:hidden}
.p2-flow svg{display:block;width:100%;height:auto}
.p2-flow .vm{display:none}
.p2-fctl{display:flex;flex-wrap:wrap;align-items:center;gap:10px;justify-content:space-between;margin-bottom:12px}
.p2-fctl .l{display:flex;flex-wrap:wrap;gap:6px}
.p2-fctl button{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.p2-fctl button i{width:9px;height:9px;border-radius:50%;background:var(--c)}
.p2-fctl button.on{color:var(--ink);border-color:var(--c,var(--gold));background:color-mix(in srgb,var(--c,#f2c96b) 14%,transparent)}
.p2-fctl .pp{width:42px;height:42px;padding:0;justify-content:center;border-radius:50%;border-color:var(--edge2);color:var(--gold2)}
.p2-fctl .pp svg{width:16px;height:16px}
.p2-fctl .st{font:500 .66rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p2-main{fill:none;stroke:url(#p2gMainD);stroke-width:3;stroke-linecap:round}
.p2-mainm{fill:none;stroke:url(#p2gMainM);stroke-width:3;stroke-linecap:round}
.p2-mainbg{fill:none;stroke:rgba(95,191,143,.10);stroke-width:14;stroke-linecap:round}
.p2-spoke{fill:none;stroke:rgba(217,181,110,.35);stroke-width:1.3}
.p2-hub rect{fill:rgba(6,24,30,.92);stroke:rgba(217,181,110,.55);stroke-width:1.3}
.p2-hub text{fill:#bff4ff}
.p2-fn{cursor:pointer;outline:none}
.p2-fn .o{fill:rgba(4,18,14,.95);stroke:rgba(95,191,143,.5);stroke-width:1.5;transition:all .35s}
.p2-fn .gl{fill:none;stroke:var(--gold);stroke-width:2;opacity:0;transition:opacity .35s}
.p2-fn .ic{color:var(--neon2);transition:color .35s}
.p2-fn .bd circle{fill:#0b2219;stroke:var(--gold);stroke-width:1}
.p2-fn .bd text{font:600 11px var(--f-hud);fill:var(--gold2)}
.p2-fn .t1{font:700 16px var(--f-display);fill:var(--ink)}
.p2-fn .t2{font:500 11.5px var(--f-hud);letter-spacing:.06em;fill:var(--ink3)}
.p2-fn:hover .o,.p2-fn:focus .o{stroke:var(--gold2)}
.p2-fn.on .o{fill:rgba(242,201,107,.16);stroke:var(--gold2);stroke-width:2.5}
.p2-fn.on .gl{opacity:.75;animation:p2pulse 1.8s ease-in-out infinite}
.p2-fn.on .ic{color:var(--gold2)}
.p2-fn.dim{opacity:.35}.p2-fn.on.dim{opacity:1}
@keyframes p2pulse{50%{opacity:.15}}
.p2-pg circle{filter:drop-shadow(0 0 5px currentColor)}
.p2-pg.goods{color:#5fbf8f}.p2-pg.goods circle{fill:#b5dfc6}
.p2-pg.money{color:#f2c96b}.p2-pg.money circle{fill:#ffe7a8}
.p2-pg.data{color:#d9b56e}.p2-pg.data circle{fill:#bff4ff}
.p2-flow[data-l="goods"] .p2-pg.money,.p2-flow[data-l="goods"] .p2-pg.data{display:none}
.p2-flow[data-l="money"] .p2-pg.goods,.p2-flow[data-l="money"] .p2-pg.data{display:none}
.p2-flow[data-l="data"] .p2-pg.goods,.p2-flow[data-l="data"] .p2-pg.money{display:none}
.p2-flow[data-l="goods"] .p2-spoke,.p2-flow[data-l="money"] .p2-spoke{opacity:.35}
.p2-flow[data-l="data"] .p2-spoke{stroke:rgba(217,181,110,.8);stroke-width:1.8}
.p2-flow[data-l="money"] .p2-main,.p2-flow[data-l="money"] .p2-mainm{stroke:url(#p2gGold)}
.p2-fdet{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1.6fr);gap:16px;margin-top:16px}
.p2-fdl{padding:24px;border-radius:24px;overflow:hidden;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p2-fdl .n{font:500 .64rem var(--f-hud);letter-spacing:.2em;color:var(--gold);text-transform:uppercase}
.p2-fdl h3{margin:8px 0 0;font:800 1.4rem/1.15 var(--f-display)}
.p2-fdl p{margin:10px 0 0;color:var(--ink2);font-size:.92rem;line-height:1.6}
.p2-fdg{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.p2-fdg div{padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p2-fdg small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:5px}
.p2-fdg div:nth-child(4) small{color:var(--gold)}
.p2-fdg p{margin:0;font-size:.88rem;line-height:1.5;color:var(--ink)}
.p2-stg{display:flex;gap:6px;flex-wrap:wrap;margin-top:12px}
.p2-stg button{padding:6px 11px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink2);font:600 .74rem var(--f-body);cursor:pointer}
.p2-stg button.on{border-color:var(--gold);background:rgba(242,201,107,.12);color:var(--gold2)}
/* three flows */
.p2-3f{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p2-3f>div{padding:22px;border-radius:22px;border:1px solid color-mix(in srgb,var(--c) 40%,transparent);background:linear-gradient(170deg,color-mix(in srgb,var(--c) 10%,transparent),rgba(2,6,8,.6));min-width:0}
.p2-3f h4{margin:0;display:flex;align-items:center;gap:10px;font:700 1.05rem var(--f-display);color:var(--c)}
.p2-3f h4 i{width:10px;height:10px;border-radius:50%;background:var(--c);box-shadow:0 0 12px var(--c)}
.p2-3f ol{margin:12px 0 0;padding:0 0 0 18px;display:grid;gap:7px;color:var(--ink2);font-size:.86rem;line-height:1.5}
.p2-3f ol b{color:var(--ink)}
.p2-once{margin-top:16px;padding:22px;border-radius:22px;border:1px solid var(--edge2);background:rgba(2,8,6,.55)}
.p2-once ul{list-style:none;margin:14px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.p2-once li{display:grid;grid-template-columns:62px minmax(0,1fr);gap:10px;padding:12px 14px;border-radius:14px;background:var(--panel);border:1px solid var(--edge);font-size:.84rem;color:var(--ink2);line-height:1.45;opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}
.p2-once.go li{opacity:1;transform:none}
.p2-once li span{font:500 .72rem var(--f-hud);color:var(--cyan,#d9b56e)}
.p2-once li b{color:var(--ink)}
/* order sim */
.p2-sim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.25fr);gap:16px}
.p2-simin{padding:22px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p2-simin label{display:grid;gap:8px;margin-top:16px;font:500 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p2-simin input[type=range]{width:100%;accent-color:var(--gold)}
.p2-simin output{font:500 1.6rem var(--f-hud);color:var(--gold2);letter-spacing:0;text-transform:none}
.p2-simout{padding:22px;border-radius:22px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.1),rgba(2,6,8,.6))}
.p2-tl{list-style:none;margin:14px 0 0;padding:0;position:relative}
.p2-tl::before{content:"";position:absolute;left:63px;top:6px;bottom:6px;width:1px;background:linear-gradient(var(--neon),var(--gold))}
.p2-tl li{display:grid;grid-template-columns:48px 22px minmax(0,1fr);gap:10px;align-items:start;padding:7px 0}
.p2-tl li time{font:500 .78rem var(--f-hud);color:var(--gold2);text-align:right;padding-top:1px}
.p2-tl li i{width:11px;height:11px;margin:4px 0 0 5px;border-radius:50%;background:var(--neon);box-shadow:0 0 10px var(--neon)}
.p2-tl li div{font-size:.88rem;color:var(--ink2);line-height:1.45}
.p2-tl li b{color:var(--ink)}
.p2-verdict{margin-top:12px;padding:12px 14px;border-radius:14px;background:rgba(95,191,143,.08);border:1px solid rgba(95,191,143,.3);font-size:.9rem;color:var(--ink)}
.p2-verdict.w{background:rgba(242,201,107,.08);border-color:var(--edge2)}
.p2-cost{width:100%;border-collapse:separate;border-spacing:0;border:1px solid var(--edge);border-radius:18px;overflow:hidden;font-size:.88rem}
.p2-cost th{text-align:left;padding:12px 14px;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold);background:rgba(242,201,107,.06)}
.p2-cost td{padding:12px 14px;border-top:1px solid var(--edge);color:var(--ink2);vertical-align:top}
.p2-cost td:first-child{color:var(--ink);font-weight:600}
.p2-cost td.n{font:500 .84rem var(--f-hud);color:var(--neon2);white-space:nowrap}

@media (max-width:1150px){
 .p2-prom{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-cx,.p2-fit,.p2-amb,.p2-use,.p2-sim,.p2-fdet{grid-template-columns:1fr}
 .p2-seg{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p2-zones{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p2-photo,.p2-voice,.p2-ex{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-rules{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-week{grid-template-columns:repeat(2,minmax(0,1fr))}.p2-wd:nth-child(3){border-left:0}.p2-wd:nth-child(n+3){border-top:1px solid var(--edge)}
 .p2-once ul{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-logohero{grid-template-columns:1fr}
}
@media (max-width:820px){
 .p2-pal{grid-template-columns:1fr 1fr;gap:8px}.p2-sw .chip{height:84px;padding:10px}.p2-sw .chip b{font-size:.86rem}.p2-sw .info{padding:10px}.p2-sw .info p{font-size:.74rem}
 .p2-grid2,.p2-grid3,.p2-prom,.p2-var,.p2-charter,.p2-3f,.p2-prules,.p2-fdg,.p2-once ul{grid-template-columns:1fr}
 .p2-seg{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-zones{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p2-photo,.p2-voice,.p2-ex,.p2-rules{grid-template-columns:1fr}
 .p2-week{grid-template-columns:1fr}.p2-wd{border-left:0!important;border-top:1px solid var(--edge)}.p2-wd:first-child{border-top:0}
 .p2-pos-h,.p2-pos-r{grid-template-columns:1fr}
 .p2-pos-h .mid,.p2-pos-h .not,.p2-pos-r .mid{display:none}
 .p2-pos-h .we::after{content:" · and what we are not";font-weight:500;color:#ffb3a3;font-size:.8rem}
 .p2-pos-r .we{padding:14px 16px 4px}
 .p2-pos-r .not{text-align:left;padding:0 16px 14px 46px;font-size:.84rem}
 .p2-pos-r .not::before{content:"Not: ";color:#ffb3a3;display:inline-block;margin-right:4px;text-decoration:none}
 .p2-cxsvg .vd,.p2-flow .vd{display:none}.p2-cxsvg .vm,.p2-flow .vm{display:block}
 .p2-trow{grid-template-columns:1fr;gap:10px}
 .p2-tctl{grid-template-columns:1fr}
 .p2-mix div{grid-template-columns:96px minmax(0,1fr) 40px}
 .p2-lh{min-height:260px;padding:22px}
 .p2-wm b{font-size:1.7rem}
 .p2-cost th:nth-child(3),.p2-cost td:nth-child(3){display:none}
 .p2-cost{table-layout:fixed;font-size:.82rem}.p2-cost td,.p2-cost th{padding:10px 10px;overflow-wrap:anywhere}.p2-cost td.n{white-space:normal}
 .p2-stage{min-height:400px}
 .p2-prop div{font-size:.5rem}
}
`);

/* ================= shared helpers ================= */
const F=MODEL.fmt, IN=MODEL.inputs;
const S={
 act:['Tanzania Medicines and Medical Devices Act, consolidated text (ss. 5, 22, 56, 73): TMDA functions, registration, import permits','https://www.tanzanialaws.com/?p=1215'],
 dn:['Daily News, 10 September 2026: TMDA moves to destroy 300m/- unregistered medical products (seizures in Dar es Salaam; spot checks with TRA)','https://dailynews.co.tz/?p=160552'],
 log:['Logistics Cluster, Tanzania Logistics Capacity Assessment (August 2020): TMDA import permit presented at customs clearance','https://dlca.logcluster.org/node/2650'],
 tra:['Tanzania Revenue Authority: EFD/VFD suppliers page — fiscal receipts required from businesses with turnover of TZS 11M or more','https://tra.go.tz/page/efd-vfd-suppliers'],
 w3c:['W3C, Understanding WCAG 2.1 Success Criterion 1.4.3: Contrast (Minimum) — 4.5:1 normal text, 3:1 large text','https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html']};
const C=(k,n)=>cref(S[k][1],n,S[k][0]);
const svgI=(p,sw)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw||1.6}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const P={
 store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M4 9v11h16V9"/><path d="M3 9h18"/><path d="M10 20v-6h4v6"/>',
 box:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5L12 12l8-4.5M12 12v9"/>',
 phone:'<rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/><path d="M9 8h6M9 11h4"/>',
 ship:'<path d="M3 15l2 5h14l2-5z"/><path d="M5 15V9h14v6"/><path d="M9 9V5h6v4"/><path d="M12 2v3"/>',
 shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 shelf:'<path d="M4 3v18M20 3v18M4 8h16M4 14h16M4 20h16"/><path d="M7 5.5h3M12 11h4M7 17h5"/>',
 pack:'<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M7.5 5.5l9 5"/><path d="M12 13v8"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
 bike:'<circle cx="5.5" cy="17" r="3"/><circle cx="18.5" cy="17" r="3"/><path d="M5.5 17l4-7h5l4 7M9.5 10L8 7H5.5M14.5 10l1.5-3h2.5"/>',
 care:'<path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z"/><path d="M8 11h2l1-2 2 4 1-2h2"/>',
 baby:'<circle cx="12" cy="7" r="3.5"/><path d="M6 21c0-4 2.7-7 6-7s6 3 6 7"/><path d="M10.5 7h.01M13.5 7h.01"/>',
 heart:'<path d="M12 20s-7-4.3-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.7-7 10-7 10z"/>',
 walk:'<circle cx="13" cy="4.5" r="2"/><path d="M10 21l2-6 3 3v3M9 11l3-3 3 3 3 1M12 8v4l-3 3"/>',
 aid:'<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M9 6V4h6v2M12 10v6M9 13h6"/>',
 drop:'<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
 senior:'<circle cx="11" cy="4.5" r="2"/><path d="M9 21l1.5-7L8 11l2-4h2l2 4 2 1M16 12v9"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
 office:'<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 7h2M14 7h2M8 11h2M14 11h2M10 21v-4h4v4"/>',
 check:'<path d="M5 12l5 5L20 7"/>',
 play:'<path d="M7 4l13 8-13 8z" fill="currentColor" stroke="none"/>',
 pause:'<path d="M7 4h3.5v16H7zM13.5 4H17v16h-3.5z" fill="currentColor" stroke="none"/>'};
const PLAY=svgI(P.play),PAUSE=svgI(P.pause);
const icG=(k,x,y,s)=>`<g class="ic" transform="translate(${x-12*s} ${y-12*s}) scale(${s})" fill="none" stroke="currentColor" stroke-width="${1.6/s*1.15}" stroke-linecap="round" stroke-linejoin="round">${P[k]}</g>`;
function scen(id,cur){return `<div class="p2-tabs" role="group" aria-label="Scenario" id="${id}">${MODEL.scenarios.map(k=>`<button type="button" data-k="${k}" class="${k===cur?'on':''}">${esc(IN.scenarios[k].label)} case</button>`).join('')}</div>`}
function wireTabs(root,fn){if(!root)return;const bs=[...root.querySelectorAll('button')];bs.forEach(b=>b.onclick=()=>{bs.forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});fn(b.dataset.k,b)})}
const $=id=>document.getElementById(id);
const timers=[];function later(t){timers.push(t);return t}
addEventListener('afya:leave',()=>{timers.splice(0).forEach(t=>{clearInterval(t);clearTimeout(t)})});

/* ---------- the Afya mark ---------- */
function mark(o){o=o||{};const s=o.size||64,bg=o.bg===undefined?'#0F7A52':o.bg,cr=o.cross||'#FFFFFF',cut=o.cut||bg||'#0F7A52',gd=o.gold===undefined?'#F2C96B':o.gold,rx=o.rx===undefined?15:o.rx;
 return `<svg width="${s}" height="${s}" viewBox="0 0 64 64" role="img" aria-label="Afya Basics mark">${bg?`<rect width="64" height="64" rx="${rx}" fill="${bg}"/>`:''}
 <path d="M 13.6 29.6 L 32 14.4 L 50.4 29.6" fill="none" stroke="${cr}" stroke-width="4.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M 32 49.6 C 22.4 43.2 18.4 38.4 18.4 33.2 C 18.4 29.2 21.6 26.4 25.2 26.4 C 28 26.4 30.4 28 32 30.4 C 33.6 28 36 26.4 38.8 26.4 C 42.4 26.4 45.6 29.2 45.6 33.2 C 45.6 38.4 41.6 43.2 32 49.6 Z" fill="${cr}"/>
 <path d="M 20 37.6 L 26.4 37.6 L 28.8 33.6 L 32 42.4 L 34.8 36 L 44 36" fill="none" stroke="${gd||cut}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
const WM=(sub)=>`<span class="p2-wm"><b>AFYA</b><span>BASICS</span>${sub?`<em>${sub}</em>`:''}</span>`;
const lock=(o,sub)=>`<span class="p2-lock">${mark(o)}${WM(sub)}</span>`;

/* ---------- contrast ---------- */
function lum(h){const c=h.replace('#','');const v=[0,2,4].map(i=>parseInt(c.substr(i,2),16)/255).map(x=>x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4));return .2126*v[0]+.7152*v[1]+.0722*v[2]}
function cr(a,b){const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)}
const INK='#0B2219';
function bestText(h){return cr(h,'#FFFFFF')>=cr(h,INK)?'#FFFFFF':INK}
function aa(r){return r>=4.5?['ok','AA text']:r>=3?['lg','AA large only']:['no','Decorative only']}

/* ================= 2.1 THE CONCEPT ================= */
const CH=[
 {k:'store',t:'The store',s:'Walk in · check · choose',c:'#5fbf8f',ic:'store',
  h:'A street-front store organised by need',
  p:'One floor in Dar es Salaam, laid out in six colour-coded Care Zones that are visible from the door, with one price on every digital shelf label. At the entrance, a quick Afya Check takes blood pressure, pulse and oxygen in about 50 seconds; the full Afya Check, 15 measurements in about 4 minutes, is also free. The floor is staffed by health advisers, not cashiers.',
  d:[['What the customer does','Takes a free check, finds the right zone in under a minute, compares 4–5 registered brands side by side and pays in under 30 seconds.'],['What it gives the business','Trust and first contact. Most Afya Box members are expected to join here, from store customers and Afya Check users.'],['Speed target','Find and pay in under 3 minutes']]},
 {k:'box',t:'Afya Box',s:'Membership · monthly',c:'#f2c96b',ic:'box',
  h:'A monthly box that arrives before supplies run out',
  p:'Monthly boxes on 1, 6 or 12-month plans, covering mother and baby, personal hygiene, beauty and condition care such as diabetes, dialysis support, pregnancy and elderly care. Non-members can buy one-off kits. The box price is the products at shelf price less the member saving (3% monthly, 6% on 6 months, 9% on 12 months), plus the box at landed cost and TSh 3,500 delivery.',
  d:[['What the customer does','Nothing, unless they choose to. The box renews on its date. Up to 12 days before month end the member can keep it or swap brands (Afya Choice).'],['What it gives the business','Recurring revenue and a packing list known weeks ahead, so stock is bought against confirmed demand.'],['Speed target','Zero clicks to renew']]},
 {k:'digital',t:'App & WhatsApp',s:'Order · track · gift',c:'#d9b56e',ic:'phone',
  h:'Reorder in seconds, from anywhere',
  p:'The app and the WhatsApp line carry the same catalogue at the same price. “Order again” restores the last basket, and mobile money confirms payment on the phone. Orders paid before 15:00 are delivered the same day in Dar es Salaam; click and collect is ready within 2 hours. Relatives abroad can pay for a parent’s box.',
  d:[['What the customer does','Repeats an order in under 30 seconds, swaps brands, tracks the rider and receives the TRA receipt by SMS or WhatsApp.'],['What it gives the business','Reach beyond the store’s catchment, and a direct channel to every member for reminders and aftercare.'],['Speed target','Repeat order under 30 s · WhatsApp reply under 5 min']]},
 {k:'core',t:'One Afya',s:'',c:'#ffe7a8',ic:'shield',
  h:'One account, one price, one stock system',
  p:'The three channels run on one system. A customer has one account whether she walks in, opens the app or receives a box. Each item has one price in every channel, and each unit of stock is counted once, so the app cannot sell what the shelf does not hold.',
  d:[['One account','Purchases, Afya Check readings (with consent), card, points, box plan and address, keyed to the phone number.'],['One price','The same price in store, in the app and on WhatsApp. No negotiation and no hidden mark-ups.'],['One stock','Store shelf, packing hub and online orders draw from the same live stock, first-expiry-first-out.']]}];
function conceptSVG(v){const D=v==='d';
 const L=D?{w:900,h:640,core:[450,300,104],n:[[150,170],[750,170],[450,530]],r:58,lab:[[150,262],[750,262],[450,622]],arcs:['M150 170 Q450 -10 750 170','M750 170 Q790 470 450 530','M450 530 Q110 470 150 170'],al:[[450,64,'Join the box at the counter'],[742,430,'Swap brands in the app'],[158,430,'Click & collect']],fs:1}
  :{w:400,h:660,core:[200,330,80],n:[[82,108],[318,108],[200,560]],r:50,lab:[[82,186],[318,186],[200,638]],arcs:['M82 108 Q200 10 318 108','M318 108 Q380 440 200 560','M200 560 Q20 440 82 108'],al:[[200,44,'Join at the counter'],[350,300,''],[50,300,'']],fs:1.25};
 const [cx,cy,cr0]=L.core,id=v;
 const spokes=L.n.map((p,i)=>`<path id="p2sp${id}${i}" class="p2-spk" d="M${p[0]} ${p[1]} L${cx} ${cy}" stroke="${CH[i].c}"/>`).join('');
 const arcs=L.arcs.map((d,i)=>`<path id="p2ar${id}${i}" class="p2-arc" d="${d}"/>`).join('');
 const dots=L.n.map((p,i)=>`<circle r="${3.5}" fill="${CH[i].c}" style="filter:drop-shadow(0 0 5px ${CH[i].c})"><animateMotion dur="${2.6+i*.4}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#p2sp${id}${i}"/></animateMotion></circle><circle r="2.6" fill="#ffe7a8"><animateMotion dur="${3.2+i*.3}s" begin="-1.3s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#p2sp${id}${i}"/></animateMotion></circle>`).join('')
  +L.arcs.map((d,i)=>`<circle r="3" fill="#ffe7a8" style="filter:drop-shadow(0 0 6px #f2c96b)"><animateMotion dur="7s" begin="-${i*2.3}s" repeatCount="indefinite"><mpath href="#p2ar${id}${i}"/></animateMotion></circle>`).join('');
 const al=L.al.filter(a=>a[2]).map(a=>`<text class="p2-arcl" x="${a[0]}" y="${a[1]}" text-anchor="middle" style="font-size:${12*L.fs}px">${esc(a[2])}</text>`).join('');
 const nodes=L.n.map((p,i)=>{const c=CH[i];return `<g class="p2-cn" data-k="${c.k}" tabindex="0" role="button" aria-label="${esc(c.t)}: show details" style="--c:${c.c}">
  <circle class="halo" cx="${p[0]}" cy="${p[1]}" r="${L.r+12}"/><circle class="ring" cx="${p[0]}" cy="${p[1]}" r="${L.r}"/><clipPath id="p2cp${id}${i}"><circle cx="${p[0]}" cy="${p[1]}" r="${L.r-4}"/></clipPath><image href="img/${['exterior','boxdoor','rider'][i]}.webp" x="${p[0]-L.r*1.6}" y="${p[1]-L.r+4}" width="${L.r*3.2}" height="${(L.r-4)*2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#p2cp${id}${i})"/>
  <text class="lt" x="${L.lab[i][0]}" y="${L.lab[i][1]-(D?18:0)}" text-anchor="middle" style="font-size:${19*L.fs}px">${esc(c.t)}</text>${D?`<text class="ls" x="${L.lab[i][0]}" y="${L.lab[i][1]+4}" text-anchor="middle">${esc(c.s)}</text>`:''}</g>`}).join('');
 return `<svg class="v${v}" viewBox="0 0 ${L.w} ${L.h}" role="group" aria-label="Concept diagram: the store, the Afya Box membership and the app and WhatsApp around one account, one price and one stock system">
 <defs><linearGradient id="p2gArc" x1="0" x2="1"><stop offset="0" stop-color="#5fbf8f"/><stop offset=".5" stop-color="#f2c96b"/><stop offset="1" stop-color="#d9b56e"/></linearGradient>
 <radialGradient id="p2gCore${id}"><stop offset="0" stop-color="rgba(15,122,82,.85)"/><stop offset=".7" stop-color="rgba(6,40,28,.95)"/><stop offset="1" stop-color="rgba(4,20,15,.95)"/></radialGradient></defs>
 ${arcs}${spokes}${al}
 <circle cx="${cx}" cy="${cy}" r="${cr0+34}" fill="none" stroke="rgba(242,201,107,.22)"/>
 <g><circle cx="${cx}" cy="${cy-cr0-34}" r="4" fill="#f2c96b"/><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="24s" repeatCount="indefinite"/></g>
 ${dots}
 <g class="p2-cn p2-core" data-k="core" tabindex="0" role="button" aria-label="One account, one price, one stock: show details" style="--c:#f2c96b">
  <circle class="halo" cx="${cx}" cy="${cy}" r="${cr0+12}"/><circle class="ring" cx="${cx}" cy="${cy}" r="${cr0}" style="fill:url(#p2gCore${id})"/>
  <g transform="translate(${cx-20} ${cy-cr0*.62})">${mark({size:40,bg:null,cut:'#0b5a3c',gold:'#F2C96B'}).replace(/^<svg width="40" height="40"/,'<svg width="40" height="40"')}</g>
  <text x="${cx}" y="${cy+(D?16:14)}" text-anchor="middle" style="font:800 ${D?24:20}px var(--f-display)">ONE AFYA</text>
  <text x="${cx}" y="${cy+(D?40:34)}" text-anchor="middle" style="font:500 ${D?11.5:10}px var(--f-hud);letter-spacing:.12em;fill:#ffe7a8">ONE ACCOUNT · ONE PRICE</text>
  <text x="${cx}" y="${cy+(D?57:49)}" text-anchor="middle" style="font:500 ${D?11.5:10}px var(--f-hud);letter-spacing:.12em;fill:#ffe7a8">ONE STOCK SYSTEM</text></g>
 ${nodes}</svg>`}

const SEG=[
 {k:'mama',t:'New & expecting mothers',s:'Mama na mtoto, mama mjamzito',ic:'baby',mix:[55,90,70],card:'family',zone:'Mother & Baby',box:'Mother & baby box or pregnancy box',ex:'An expectant mother takes the quick check at the door on her first visit and joins the pregnancy box at the counter. From the third trimester she orders everything else on WhatsApp for same-day delivery.'},
 {k:'eld',t:'Carers of elderly parents',s:'Bibi na mjukuu',ic:'senior',mix:[35,90,85],card:'senior',zone:'Seniors',box:'Elderly care box · equipment rental',ex:'A granddaughter who works in town manages her grandmother’s elderly care box from her phone, adds batteries for the blood-pressure monitor and rents a walking frame after a fall.'},
 {k:'chr',t:'Living with BP or diabetes',s:'Baba na kisukari',ic:'heart',mix:[70,85,65],card:'care',zone:'Heart & Diabetes',box:'Condition-care box (e.g. diabetes)',ex:'A father with diabetes saves his meter model in his account. Matching test strips arrive in his monthly box, and he takes a free check whenever he passes, building a record of his readings over time.'},
 {k:'rec',t:'Recovering from surgery or injury',s:'Short, intensive need',ic:'walk',mix:[75,35,80],card:'green',zone:'Mobility & Recovery',box:'One-off recovery kit · rental',ex:'After knee surgery, a patient’s brother buys dressings and a cold pack in store with an adviser, rents crutches and reorders dressings twice through the app during recovery.'},
 {k:'org',t:'Offices & schools',s:'First-aid supplies',ic:'office',mix:[30,70,75],card:'kazini',zone:'First Aid & Home',box:'Afya Kazini kit · first-aid restock',ex:'A school bursar sets up a term-time first-aid restock: plasters, gloves and antiseptic arrive at the start of each term, invoiced to the school with a TRA receipt.'},
 {k:'dia',t:'Diaspora families',s:'Mwana ughaibuni',ic:'globe',mix:[10,90,95],card:'senior',zone:'Seniors · any zone',box:'A parent’s box, paid from abroad',ex:'A son working abroad pays for his mother’s monthly box by international card in under 2 minutes. He receives the renewal reminder and a photo confirmation of each delivery.'}];

window.SECTIONS['s2-1']={
 render(s,p,pv,nx){
  const B=MODEL.get('base'),m12=B.months[11];
  const PROM=[['Right product, first time','A curated range organised by need, a free health check and advice on which item fits.','Free Afya Check · 4–5 brands per item'],
   ['Fast','Find and pay in under 3 minutes in store, reorder in under 30 seconds online, same-day delivery in Dar es Salaam.','< 3 min · < 30 s · same day before 15:00'],
   ['Trusted','Only registered, quality-checked products, one price in every channel, a written warranty and aftercare.','100% registered stock · one price'],
   ['Planned','Monthly Afya Boxes arrive before supplies run out, with 4–5 brand choices per item at the same price.','Zero clicks to renew · swap until day −12']];
  const POS=[['A brand-led health-essentials retailer with a membership engine','The Afya Box makes repeat care the heart of the business; the store is where trust starts.','A traditional pharmacy'],
   ['Curated: fewer, better products sorted by need','About '+IN.product_families+' product families in six Care Zones, each with a clear “best for” line.','A supermarket aisle of everything'],
   ['Fast, digital, self-service where possible','Scan-and-go, self-checkout or the adviser’s handheld till; receipts by SMS or WhatsApp.','A queue at a counter'],
   ['Advice-led staff (health advisers)','The store lead is preferably a physiotherapy graduate; advisers explain readings and refer to a clinic when needed.','Cashiers'],
   ['One honest price','The same printed price in store, app and WhatsApp, on digital shelf labels.','Haggling or hidden mark-ups'],
   ['Customer-funded: every cost is recovered in a price the customer pays','Packing and delivery are charged at cost inside the box price; the delivery fee covers the rider.','A business that relies on discounts or subsidies']];
  const WEEK=[['Monday','#5fbf8f','Store','A quick check, then a plan','Mama Neema takes the quick check at the door: blood pressure, pulse and oxygen in about 50 seconds. Her reading is normal. The adviser takes her to the Mother & Baby zone and the nappies in her baby’s size.'],
   ['Monday · 4 minutes later','#f2c96b','Afya Box','She joins the box','At the corner counter she sets up a monthly mother and baby box on a 6-month plan. One account is opened under her phone number.'],
   ['Thursday evening','#d9b56e','WhatsApp','A fever at night','Her baby has a temperature. She messages the WhatsApp line at 20:00 and receives a reply within minutes. The thermometer and syrup she orders go out in the first delivery wave the next morning.'],
   ['Day −12 of the month','#ffe7a8','App','One swap, no further action','A reminder arrives: keep the box or swap a brand. She swaps the wipes and does nothing more. The box arrives on its date.']];
  return secShell({s,p,pv,nx,cls:'p2',
   img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics street-front store at dusk with the illuminated AFYA BASICS sign',
   h1:'A store, a monthly box and an app,',em:'run on one system.',
   lede:'Afya Basics serves the same household through three channels: a street-front store organised by need, a monthly Afya Box that arrives before supplies run out, and an app and WhatsApp line for repeat orders. All three share one customer account, one price list and one stock count, so a small team can run them together.',
   mods:[
    ['The problem · advice, convenience and planning are separate',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Advice sits at the counter.</b> A pharmacy can advise a family, but keeps no record of last month’s purchases and sends no reminder before the test strips run out.</li>
      <li><b>Convenience sits online.</b> An online seller can deliver, but cannot take a blood-pressure reading, explain which monitor fits or show that a product is registered.</li>
      <li><b>Planning sits nowhere.</b> No one plans a household’s monthly health supplies. The family notices only when something has run out, often at night or on a public holiday.</li>
      <li><b>Trust is uneven.</b> Unregistered products still reach the market. In September 2026 TMDA and the police seized medicines and devices worth about TSh 300 million in Dar es Salaam, including a consignment from India that was not registered in Tanzania ${C('dn',1)}.</li></ol></div>
     ${p2kcards([['today3','Concept image: a crowded pharmacy counter with a long queue','Advice','Queues at a crowded counter','To ask which blood-pressure monitor fits, a father queues behind people paying. The pharmacist is helpful but rushed, and nothing is recorded for next month.','Today · 20 minutes for one question','50% 40%'],
      ['today2','Concept image: a mother with her baby walking between shops on a Dar es Salaam street','Convenience','Means walking from shop to shop','Nappies in one shop, wipes in another, iron tablets in a third. A mother carrying her baby spends a morning on what one delivery could cover.','Today · three shops for one baby','50% 35%'],
      ['today1','Concept image: a mother at a pharmacy counter hearing that the item is out of stock','Planning','Is left to chance','Test strips run out on a Sunday night; the right nappy size is out of stock. No one tracks what the household uses, so each month the search starts again.','Today · “imekwisha”: it has run out','50% 30%']])}
     <p class="oneline" style="margin-top:34px">Families do not need another shop. They need <b>advice, delivery and planning</b> joined in <b>one trusted relationship</b>.</p>`],
    ['Our answer · four measurable commitments',`
     <p class="s11lead"><b style="color:var(--gold2);font-family:var(--f-display)">Afya yako, nyumbani kwako</b>: your health, at your home. Four commitments turn the motto into standards a customer can check and an investor can measure.</p>
     <div class="p2-prom">${PROM.map((x,i)=>`<article class="p2-pr"><figure class="p2-prph"><img src="img/${['interior','rider','prod-heart','boxdoor'][i]}.webp" alt="Concept image for the promise: ${esc(x[0])}" loading="lazy" width="1680" height="944" style="object-position:${['55% 50%','55% 45%','50% 50%','50% 40%'][i]}"><span class="p2k-cap">Concept image</span></figure><span class="n">0${i+1}</span><h4>${x[0]}</h4><p>${x[1]}</p><div class="m"><small>Measured by</small>${x[2]}</div></article>`).join('')}</div>
     <h3 class="p2-h3" style="margin-top:44px">Positioning · what we are, and what we are not</h3>
     <p class="p2-sub">A position is useful only if it rules things out. Each line below is a decision already taken; the right-hand column is what the business will not become.</p>
     <div class="p2-pos" role="table" aria-label="Positioning: we are, we are not">
      <div class="p2-pos-h" role="row"><div class="we" role="columnheader">We are</div><div class="mid" aria-hidden="true"></div><div class="not" role="columnheader">We are not</div></div>
      ${POS.map(r=>`<div class="p2-pos-r" role="row"><div class="we" role="cell">${svgI(P.check,2)}<span>${r[0]}<small>${r[1]}</small></span></div><div class="mid" aria-hidden="true">NOT</div><div class="not" role="cell">${r[2]}</div></div>`).join('')}
     </div>`],
  ['Our answer · the package range',`
   <p class="s11lead">Each household need identified in the research has one monthly box, specified item by item, with one price per plan. The range has ${AFYA_PKG.count().all} packages in seven families: 17 Afya Boxes, of which ${AFYA_PKG.count().home} serve households and two (Afya Ofisi and Afya Hoteli) serve workplaces, plus 5 Afya Kazini kits for small businesses. Prices shown are for the 1-month plan; 6 and 12-month plans cost less. Each package shows the card that unlocks it (section 3.4) and its full contents (section 3.5).</p>
   <div style="margin-top:12px">${AFYA_PKG.html(null,'full')}</div>
   <p class="note">Planning estimates from the section 3.5 box engine: products at shelf price less the member saving (3% monthly, 6% on 6 months, 9% on 12 months), plus the box at landed cost (S TSh 3,500 · M 5,000 · L 6,500) and TSh 3,500 delivery · the Afya Kazini price is the average for a small business of about four staff</p>`],
    ['How it works · three channels, one core',`
     <p class="s11lead">Select any part of the diagram. The three channels surround one core system. The moving points are customers, orders and payments passing through it; the gold arcs show customers moving between channels.</p>
     <div class="p2-cx">
      <div class="p2-cxsvg">${conceptSVG('d')}${conceptSVG('m')}</div>
      <div class="p2-cxp" id="p2cxp" aria-live="polite"></div>
     </div>
     <div class="p2-cxbtn" id="p2cxb" role="group" aria-label="Choose a part">${CH.map(c=>`<button type="button" data-k="${c.k}">${esc(c.k==='core'?'One account · price · stock':c.t)}</button>`).join('')}</div>`],
    ['The experience · one household over one week',`
     <div class="duo" style="margin-bottom:18px">
      <figure class="shot"><img src="img/exterior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics street-front store at dusk"><figcaption>Concept image · the flagship at dusk</figcaption></figure>
      <figure class="shot"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the store interior: corner counter under digital menu screens, video wall, lit shelving, lounge and Afya Check kiosk"><figcaption>Concept image · counter, Care Zones, Afya Check kiosk</figcaption></figure>
     </div>
     <p class="s11lead">The concept is clearest in a single household. In one week Mama Neema uses all three channels without noticing the switch, because everything sits on one account. ${tagi('Illustrative')}</p>
     <div class="p2-week">${WEEK.map((w,i)=>`<div class="p2-wd"><figure class="p2-wdph"><img src="img/${['check','team','rider','boxdoor'][i]}.webp" alt="Concept image: ${esc(w[3])}" loading="lazy" width="1680" height="944" style="object-position:${['50% 35%','50% 30%','55% 45%','50% 40%'][i]}"></figure><span class="d">${w[0]}</span><br><span class="ch" style="--c:${w[1]}">${w[2]}</span><b>${w[3]}</b><p>${w[4]}</p></div>`).join('')}</div>`],
    ['Try it · first customer groups',`
     <p class="s11lead">The first market is urban households in Dar es Salaam managing a recurring health need. Select a group to see the weight of each channel, the card that fits and a typical first month. ${tagi('Illustrative')}</p>
     <div class="p2-seg" role="tablist" aria-label="Customer groups">${SEG.map((g,i)=>`<button type="button" role="tab" data-i="${i}" aria-selected="${!i}" class="${i?'':'on'}"><span class="p2-segph" style="background-image:url(img/${({mama:'prod-baby',eld:'prod-senior',chr:'prod-heart',rec:'prod-firstaid',org:'prod-kids',dia:'boxdoor'})[g.k]}.webp)" aria-hidden="true"></span><b>${esc(g.t)}</b><span>${esc(g.s)}</span></button>`).join('')}</div>
     <div class="p2-fit" id="p2fit"></div>`,'try-concept'],
    ['The numbers · revenue by channel, year one',`
     <p class="s11lead">Monthly revenue in year one by channel, net of VAT, from the master model (Flagship option). Switch the scenario to see how the mix changes. ${PE}</p>
     ${scen('p2sc1','base')}
     <div class="p2-chart"><div id="p2mix"></div>
      <div class="p2-legend"><span style="--c:#5fbf8f"><i></i>Store (walk-in)</span><span style="--c:#f2c96b"><i></i>Afya Box membership</span><span style="--c:#d9b56e"><i></i>App &amp; WhatsApp orders</span></div></div>
     <div class="nums" id="p2n1" style="margin-top:14px"></div>
     <p class="note">Planning estimates from model.js · box and online revenue start from zero, so month 12 is a better guide to the mature mix than month 1</p>`],
    ['The 12-year plan · store by store',`
     <div class="p2-amb">
      <div class="p2-chart"><div id="p2amb"></div><p class="note">Stores open at year end · base case · planning estimate</p></div>
      <div class="p2-card"><span class="p2-k g">The plan</span>
       <p style="margin-top:0">Store one opens with the Afya Box membership, funded either as Start Small (${F.m(MODEL.leanInputs().seed.amount)}, ${MODEL.leanInputs().store.area_m2} m²) or as the Flagship (${F.m(IN.seed.amount)}, ${IN.store.area_m2} m²), with the seed released in three tranches of ${IN.seed.tranches.map(t=>Math.round(t*100)+'%').join(', ').replace(/, ([^,]*)$/,' and $1')}. The first store must prove the model in Dar es Salaam: members renewing, monthly profit, and the system running on a small team. The chain then grows store by store, each a copy of the first, sharing a packing hub and one system: Arusha, Dodoma, Mwanza and Zanzibar, then Nairobi and Kampala pilots, to <b style="color:var(--gold2)">${IN.growth.stores_by_year[11]} stores in year 12</b>.</p>
       <p>Base-case revenue in year 12: <b style="color:var(--gold2)" id="p2y12"></b>. EBITDA is positive from year ${MODEL.get('base').years.findIndex(y=>y.ebitda>0)+1}. The founders keep at least <b style="color:var(--gold2)">${Math.round(IN.ownership.founders_floor*100)}%</b> of the company, protected in the shareholder agreement (legal review needed).</p>
       <a class="btn line" href="#s5-4" style="margin-top:14px">The 12-year plan in full ${AR}</a></div>
     </div>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">Three channels could overstretch a small team.</span><span class="ar">→</span><span class="a">They are not three operations. One system, one stock count and one account let the same ${IN.staff.reduce((a,x)=>a+x[1],0)} people serve all three, and the box and online channels build gradually through year one.</span></div>
      <div class="risk"><span class="q">Customers may see the store as another pharmacy.</span><span class="ar">→</span><span class="a">The free Afya Check, the Care Zones, one price in every channel and the box make the difference visible on the first visit. The brand (section 2.2) is designed to look unlike a crowded counter.</span></div>
      <div class="risk"><span class="q">Membership may grow more slowly than planned.</span><span class="ar">→</span><span class="a">The box is offered at the moment of advice, not pushed, and store and online sales do not depend on it. The store does not earn a profit from day one: in the downside scenario above it does not reach monthly profit in year one. Tranche 3 of the seed is therefore released only at ${esc(((IN.seed.milestones[2]||'').match(/(\d+) Afya Box members/)||[,'150'])[1])} members.</span></div>
      <div class="risk"><span class="q">Some products need regulatory approval before sale.</span><span class="ar">→</span><span class="a">Only registered products enter the range. The law prohibits selling regulated products that are not registered ${C('act',2)}, so “registered only” is both company policy and the legal minimum.</span></div>
     </div>`]
   ],
   takeaway:'Afya Basics is <b>one customer relationship served through three channels</b>: the store builds <b>trust</b>, the box builds <b>recurring revenue</b> and the app extends <b>reach</b>, all on one low-cost system.',
   doors:['s3-1','s3-5','s3-8','s6-1'],
   sources:[S.dn,S.act]});
 },
 init(){
  const pan=$('p2cxp');if(!pan)return;
  const show=k=>{const c=CH.find(x=>x.k===k);
   document.querySelectorAll('.p2-cn').forEach(n=>n.classList.toggle('on',n.dataset.k===k));
   document.querySelectorAll('#p2cxb button').forEach(b=>b.classList.toggle('on',b.dataset.k===k));
   pan.innerHTML=`<span class="p2-k" style="color:${c.c}">${esc(c.k==='core'?'The core':c.t)}</span><h3>${esc(c.h)}</h3><p>${c.p}</p><dl>${c.d.map(d=>`<dt>${d[0]}</dt><dd>${d[1]}</dd>`).join('')}</dl>`;
   pan.classList.remove('p2-swap');void pan.offsetWidth;pan.classList.add('p2-swap')};
  document.querySelectorAll('.p2-cn').forEach(n=>{n.onclick=()=>show(n.dataset.k);n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(n.dataset.k)}}});
  document.querySelectorAll('#p2cxb button').forEach(b=>b.onclick=()=>show(b.dataset.k));
  show('core');
  /* segments */
  const fit=$('p2fit'),sb=[...document.querySelectorAll('.p2-seg button')];
  const seg=i=>{const g=SEG[i],cd=IN.cards.find(c=>c.key===g.card);
   sb.forEach((b,k)=>{b.classList.toggle('on',k===i);b.setAttribute('aria-selected',k===i)});
   const cc={green:'#0F7A52',family:'linear-gradient(135deg,#D9607A,#0F7A52)',care:'linear-gradient(135deg,#C9473A,#0A5A3C)',senior:'linear-gradient(135deg,#11807A,#0A5A3C)',royal:'linear-gradient(135deg,#0B2219,#1d3b2f)',kazini:'linear-gradient(135deg,#8A6316,#0A5A3C)'}[cd.key];
   fit.innerHTML=`<div class="p2-card"><span class="p2-k">How much each channel matters</span>
    <div class="p2-mix">${[['The store','#5fbf8f'],['Afya Box','#f2c96b'],['App & WhatsApp','#d9b56e']].map((x,k)=>`<div><span>${x[0]}</span><i><em style="width:0;--c:${x[1]}" data-w="${g.mix[k]}"></em></i><b>${g.mix[k]}</b></div>`).join('')}</div>
    <p class="note" style="margin-top:12px">Relative importance, 0–100 · founders’ planning view, to be tested in research</p>
    <div class="p2-fitcard"><span class="cd" style="--cc:${cc}"></span><div><b>${esc(cd.name)} card</b><span>${esc(cd.who)} · ${cd.fee_year?F.tsh(cd.fee_year)+' a year':'free'} ${PE}</span></div></div></div>
    <div class="p2-card"><span class="p2-k g">A typical first month</span><p style="margin-top:0;color:var(--ink)">${esc(g.ex)}</p>
     <dl style="margin:14px 0 0;display:grid;gap:8px;font-size:.88rem"><div><dt class="p2-k" style="margin:0">Care Zone</dt><dd style="margin:2px 0 0;color:var(--ink2)">${esc(g.zone)}</dd></div><div><dt class="p2-k" style="margin:0">Box or kit</dt><dd style="margin:2px 0 0;color:var(--ink2)">${esc(g.box)}</dd></div></dl></div>`;
   requestAnimationFrame(()=>fit.querySelectorAll('em[data-w]').forEach(e=>e.style.width=e.dataset.w+'%'))};
  sb.forEach((b,i)=>b.onclick=()=>seg(i));seg(0);
  /* numbers */
  const draw=k=>{const B=MODEL.get(k),M=B.months,W=760,H=260,pl=58,pb=30,pt=14,mx=Math.max(...M.map(x=>x.revenue))*1.1,bw=(W-pl-10)/12;
   const y=v=>H-pb-(v/mx)*(H-pb-pt);let g='';
   for(let t=0;t<=4;t++){const v=mx/4*t;g+=`<line x1="${pl}" x2="${W-6}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(95,191,143,.08)"/><text x="${pl-8}" y="${y(v)+4}" text-anchor="end">${(v/1e6).toFixed(0)}M</text>`}
   M.forEach((m,i)=>{const x=pl+i*bw+bw*.18,w=bw*.64;let b=H-pb;[[m.walkin,'#5fbf8f'],[m.boxes,'#f2c96b'],[m.online,'#d9b56e']].forEach(s=>{const h=(s[0]/mx)*(H-pb-pt);g+=`<rect x="${x}" y="${b-h}" width="${w}" height="${Math.max(0,h)}" fill="${s[1]}" opacity=".85"><title>Month ${m.m}: ${F.auto(s[0])}</title></rect>`;b-=h});
    g+=`<text x="${x+w/2}" y="${H-10}" text-anchor="middle">M${m.m}</text>`});
   $('p2mix').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Stacked monthly revenue by channel in year one, ${B.label} case">${g}</svg>`;
   const L=M[11],tot=L.revenue;
   $('p2n1').innerHTML=[[F.auto(B.y1.revenue),'Year-one revenue, all channels',1],[F.pct(L.walkin/tot),'Store share of month-12 revenue'],[F.pct(L.boxes/tot),'Afya Box share of month-12 revenue'],[Math.round(L.members).toLocaleString('en-US'),'Afya Box members at month 12'],[B.breakeven_month?'Month '+B.breakeven_month:'After year 1','First month with operating profit']].map(x=>`<div class="num${x[2]?' g':''}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')};
  wireTabs($('p2sc1'),draw);draw('base');
  /* ambition */
  const G=IN.growth,Y=MODEL.get('base').years,W=640,H=280,pl=40,pb=34,pt=26,mx=50,bw=(W-pl-10)/12;
  const yy=v=>H-pb-(v/mx)*(H-pb-pt);let g='';
  [0,10,20,30,40,50].forEach(v=>g+=`<line x1="${pl}" x2="${W-6}" y1="${yy(v)}" y2="${yy(v)}" stroke="rgba(95,191,143,.07)"/><text x="${pl-8}" y="${yy(v)+4}" text-anchor="end">${v}</text>`);
  let d='';G.stores_by_year.forEach((s,i)=>{const x=pl+i*bw,x2=x+bw;d+=(i?`L${x} ${yy(s)}`:`M${x} ${yy(s)}`)+`L${x2} ${yy(s)}`;g+=`<text x="${x+bw/2}" y="${H-12}" text-anchor="middle">Y${i+1}</text>`});
  g+=`<path d="${d}L${W-10} ${H-pb}L${pl} ${H-pb}Z" fill="rgba(242,201,107,.10)"/><path d="${d}" fill="none" stroke="#f2c96b" stroke-width="2.2"/>`;
  G.regions.forEach(r=>{const i=G.stores_by_year.indexOf(r[0]);if(i<0)return;const x=pl+i*bw+bw/2,y0=yy(r[0]);g+=`<circle cx="${x}" cy="${y0}" r="4" fill="#ffe7a8"/>`});
  g+=`<text x="${pl+11*bw+bw/2}" y="${yy(47)-10}" text-anchor="middle" style="fill:#ffe7a8;font-size:12px">47 stores</text>`;
  $('p2amb').innerHTML=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Number of stores by year, 1 to 47 over 12 years">${g}</svg>`;
  $('p2y12').textContent=F.auto(Y[11].revenue);
 }};

/* ================= 2.2 THE BRAND ================= */
const PAL=[['Afya Green','#0F7A52','Primary. Store sign, buttons, the mark’s background, packaging.'],['Deep Green','#0A5A3C','Pressed states, box sides, bag handles, dark panels.'],['Forest Ink','#0B2219','All body text on light backgrounds. Softer than black.'],['Mint','#E6F4ED','Soft fills: “best for” boxes, info panels, card backs.'],['Warm White','#FAF7F0','Page, shelf-card and packaging background. Calmer than pure white.'],['Soft Grey','#E4E9E6','Dividers, shelf rails, disabled states, receipts.'],['Slate','#5B6F66','Secondary text, captions, small print.'],['Afya Gold','#F2C96B','The premium accent: heartbeat line, Afya Royal, highlights. Never body text on white.'],['Deep Gold','#8A6316','Gold for text on white, where Afya Gold would be too faint.']];
const ZONES=[['Mother & Baby','#D9607A','baby','Rose: warm and gentle, without looking childish.'],['Heart & Diabetes','#C9473A','heart','Coral red: the heart, softened so it does not alarm.'],['Mobility & Recovery','#2D78B8','walk','Recovery blue: steady and clinical.'],['First Aid & Home','#D98B1E','aid','Amber: visible and practical, for emergencies.'],['Personal Care','#7A5BB0','drop','Violet: personal care and grooming.'],['Seniors','#11807A','senior','Teal: respectful and understated.']];
const tint=(h,a)=>{const c=h.replace('#','');const v=[0,2,4].map(i=>parseInt(c.substr(i,2),16));return '#'+v.map(x=>Math.round(x+(255-x)*a).toString(16).padStart(2,'0')).join('')};
const VOICE=[['Warm','We speak like a trusted neighbour who knows health.','Karibu, Mama Neema. Your box is on its way.','Dear valued customer, your order has been dispatched.'],
 ['Clear','Short sentences, one idea each, the important thing first.','Swap a brand by 18 November. After that, the box is packed.','Modifications are subject to cut-off timelines as per policy.'],
 ['Respectful','Adults are spoken to as adults, in their language, without judgement.','Your reading is higher than usual. Shall we explain what it means?','Warning: your blood pressure is dangerous.'],
 ['Never alarming','Health is serious, so the tone stays calm. We refer to a clinic; we never diagnose.','It’s a good idea to see a clinic this week. We can suggest one nearby.','You may have hypertension. Buy this monitor now.']];
const EX=[
 {k:'Shelf card',en:'<b>Upper-arm blood pressure monitor.</b> Best for: daily checks at home for adults. Four brands, one price range. Not sure which? Ask an adviser for a free check.',sw:'<b>Kipimo cha shinikizo la damu (mkono wa juu).</b> Bora kwa: vipimo vya kila siku nyumbani kwa watu wazima. Chapa nne, bei moja. Huna uhakika? Uliza mshauri wetu kwa kipimo cha bure.',why:'Name first, then who it is for, then help. No technical specs on the front.'},
 {k:'SMS reminder',en:'Habari Amina. Your Mother &amp; Baby box arrives on Friday. Want to swap a brand? You have 12 days. Reply SWAP or open the app. — Afya Basics',sw:'Habari Amina. Boksi lako la Mama na Mtoto litafika Ijumaa. Unataka kubadilisha chapa? Una siku 12. Jibu BADILISHA au fungua programu. — Afya Basics',why:'Under 160 characters, one action, a reply word in the customer’s language.'},
 {k:'WhatsApp reply',en:'Karibu. Yes, we have test strips that fit your meter, at the same price as in store. Shall we deliver today? Orders before 15:00 arrive the same day in Dar.',sw:'Karibu. Ndiyo, tuna vipande vya kupimia sukari vinavyoendana na kipimo chako, kwa bei ileile ya dukani. Tukuletee leo? Oda kabla ya saa tisa alasiri zinafika siku hiyo hiyo Dar.',why:'Answer the question, confirm the honest price, offer the next step.'},
 {k:'Receipt footer',en:'Asante for shopping with us. Your TRA receipt is saved in your account. Next free Afya Check: any time you pass. Afya yako, nyumbani kwako.',sw:'Asante kwa kununua kwetu. Risiti yako ya TRA imehifadhiwa kwenye akaunti yako. Kipimo kijacho cha bure cha Afya Check: wakati wowote ukipita. Afya yako, nyumbani kwako.',why:'Thanks, proof, an invitation back, the motto. Never an upsell on a receipt.'}];
const CHARTER=[['Registered products only','Bidhaa zilizosajiliwa tu','Every regulated product on our shelves is registered with TMDA, and its registration number is on the pack as the law requires.','Measured: 100% of regulated lines checked at goods-in'],
 ['One honest price, everywhere','Bei moja ya haki, kila mahali','The price on the shelf label is the price in the app, on WhatsApp and in the box. No haggling, no special prices for some.','Measured: zero price differences between channels'],
 ['A free check, never pressure','Kipimo cha bure, bila shinikizo','The Afya Check is free whether you buy or not. Advisers explain your reading; if it needs a doctor, they tell you so.','Measured: check-to-purchase tracked, never targeted per adviser'],
 ['Advice in plain words','Ushauri kwa lugha rahisi','In Kiswahili or English, without jargon. If we do not know, we say so and find out.','Measured: adviser training sign-off'],
 ['Pay in seconds','Lipa kwa sekunde','Mobile money, card or cash in under 30 seconds, with the TRA receipt sent by SMS or WhatsApp.','Measured: average payment time per till'],
 ['Same day, or we tell you why','Siku hiyo hiyo, au tukueleze sababu','Orders before 15:00 in Dar es Salaam arrive the same day. If a delivery will be late, you hear it from us first.','Measured: on-time delivery rate'],
 ['Before you run out','Kabla hujaishiwa','Your Afya Box arrives on its date. You can keep it or swap brands up to 12 days before month end.','Measured: boxes delivered on the planned day'],
 ['Your data is yours','Taarifa zako ni zako','Readings and purchases are shared with no one without your consent, not even family abroad.','Measured: consent recorded for every shared reading'],
 ['Written warranty and aftercare','Dhamana ya maandishi na huduma baada ya mauzo','Every device comes with a written warranty and a named adviser to call if something goes wrong.','Measured: warranty claims closed on time'],
 ['A quick answer','Jibu la haraka','On WhatsApp we answer within 5 minutes during opening hours; every complaint gets a reply the same day.','Measured: median WhatsApp first-reply time']];
const USE=[
 {k:'label',t:'Shelf label',h:'Digital shelf label · Heart & Diabetes',p:'The label a customer reads in the Care Zone. It must work from one metre away, in two languages, and carry the proof of trust.',n:['<b>Zone band</b> in Coral red on the left, so the label belongs to its zone even when moved.','<b>Name, then “best for”</b> in a Mint box: who the product suits, in one line.','<b>One honest price</b> in tabular numerals, the largest element after the name.','<b>QR code</b> opens the product page, brand options and how-to video in the app.','<b>Registration reminder</b> and the free-check invitation in small Slate type.']},
 {k:'sms',t:'SMS & WhatsApp',h:'Renewal reminder · day −12',p:'The most frequent brand contact: every member receives it every month. It must be short, warm and actionable without opening anything.',n:['<b>Sender name</b> “Afya Basics” and the green mark as the WhatsApp profile image.','<b>Customer’s name first</b>, then the news, then one action.','<b>Reply words</b> in the customer’s chosen language (SWAP / BADILISHA).','<b>Quick-reply buttons</b> in Afya Green outline: keep, swap, call me.']},
 {k:'receipt',t:'Receipt',h:'Fiscal receipt by SMS or print',p:'Every sale issues a fiscal receipt through the TRA-approved system '+'(required for businesses above TZS 11M turnover)'+'. Ours adds the wordmark and the motto, nothing more.',n:['<b>Wordmark only</b> in black: receipts are thermal-printed, so no colour is relied on.','<b>Tabular numerals</b> line prices up perfectly.','<b>Payment method</b> shown in words (mobile money, card, cash).','<b>Verification code and QR</b> from the fiscal system, never hidden.','<b>The motto</b> closes every receipt.']},
 {k:'card',t:'Membership card',h:'Six cards, one family look',p:'Five household cards and one business account (Afya Kazini). Each is a digital card in the app, with a printed card on request. Each card has its own colour from the palette; all share the mark, the gold chip and the rings.',n:['<b>Card name and fee</b> come from the master model: '+IN.cards.map(c=>c.name.replace('Afya ','')+' '+(c.fee_year?F.tsh(c.fee_year)+' a year':'no fee')).join(', ')+'.','<b>Colour = card</b>: Green, Family (rose to green), Care (coral to green), Senior (teal to green), Royal (forest with gold), Kazini (deep gold to green).','<b>Member number</b> is the last digits of the phone number; the phone number is the account.','<b>Gold rings</b> repeat the gold heartbeat line used across the brand.']},
 {k:'bag',t:'At the door',h:'Delivery · the sealed box at the door',p:'What a neighbour sees at the door. The box arrives closed and sealed, so its exterior carries the brand. There is one green box design in three sizes (S 26×18×10, M 34×25×12, L 40×30×16 cm).',n:['<b>Afya Green box</b> with the white Nyumba Heart mark on the lid, readable from across the street.','<b>Colour band and QR code</b>: a band in the category colour, and a QR code on the lid.','<b>Rider in Afya green</b>: the livery acts as a moving sign in the neighbourhood.','<b>Tamper seal tag</b>: sealed at the hub, opened only by the customer.','<b>The motto</b> in gold italic: Afya yako, nyumbani kwako.']}];

function useMock(k,ci){
 if(k==='label')return `<div class="m-esl"><div class="zb"></div><div class="in"><div class="top"><span>Heart &amp; Diabetes · Shelf H2-04</span><span>${mark({size:20,rx:5})}</span></div>
  <h5>Upper-arm blood pressure monitor</h5><div class="sw">Kipimo cha shinikizo la damu</div>
  <div class="best"><b>Best for:</b> daily checks at home, adults with a normal or large arm.</div>
  <div class="row"><div><div style="font:500 .58rem var(--f-hud);letter-spacing:.1em;color:#5B6F66;margin-bottom:4px">4 BRANDS · ONE PRICE RANGE</div><div class="pr"><small>TSh</small>85,000</div></div><span class="qr" aria-hidden="true"></span></div>
  <div class="ft"><span>TMDA reg. no. on pack</span><span>Free Afya Check at the door</span></div></div></div>`;
 if(k==='sms')return `<div class="m-ph"><div class="sc"><div class="hd">${mark({size:28,rx:8})}<div><b>Afya Basics</b><small>Business account · replies in minutes</small></div></div>
  <div class="t">Today 09:12</div>
  <div class="bub">Habari Amina. Your <b>Mother &amp; Baby box</b> arrives on <b>Friday</b>. Want to swap a brand? You have <b>12 days</b>. Reply SWAP or open the app.</div>
  <div class="bub me">SWAP wipes please</div>
  <div class="bub">Done. Your box now has the fragrance-free wipes, at the <b>same price</b>. No further action is needed. Asante.</div>
  <div class="qk"><span>Keep my box</span><span>Swap a brand</span><span>Call me</span></div></div></div>`;
 if(k==='receipt')return `<div class="m-rc"><div class="c" style="font:800 1rem var(--f-display);letter-spacing:.02em">AFYA BASICS</div><div class="c">Simple Solution Ltd · Dar es Salaam</div><div class="c">TIN: 000-000-000 · VRN: on file</div><hr>
  <div class="l"><span>BP monitor, upper arm</span><span>85,000</span></div><div class="l"><span>Test strips ×50</span><span>38,000</span></div><div class="l"><span>Lancets ×100</span><span>9,500</span></div><hr>
  <div class="l tot"><span>TOTAL TSh</span><span>132,500</span></div><div class="l"><span>Paid: mobile money</span><span>14:06</span></div><div class="l"><span>Points earned</span><span>+132</span></div><hr>
  <div class="fq"><i aria-hidden="true"></i><div>FISCAL RECEIPT<br>Verification code<br>XXXX-XXXX</div></div>
  <div class="mot">Afya yako, nyumbani kwako.</div></div>`;
 if(k==='card'){const cards=IN.cards,c=cards[ci||0];const bg={green:'linear-gradient(135deg,#13905f,#0F7A52 50%,#0A5A3C)',family:'linear-gradient(135deg,#D9607A,#0F7A52 75%)',care:'linear-gradient(135deg,#C9473A,#0A5A3C 75%)',senior:'linear-gradient(135deg,#11807A,#0A5A3C 80%)',royal:'linear-gradient(135deg,#1d3b2f,#0B2219 60%)',kazini:'linear-gradient(135deg,#8A6316,#0A5A3C 75%)'}[c.key];
  return `<div class="m-cards"><div class="m-cd" style="--cbg:${bg}"><div class="tp">${lock({size:30,rx:8,bg:c.key==='royal'?'#0F7A52':'#ffffff',cross:c.key==='royal'?'#fff':'#0F7A52',cut:c.key==='royal'?'#0F7A52':'#ffffff'})}<span class="tier">${esc(c.name.replace('Afya ',''))}</span></div>
   <div class="chipc"></div><div class="nm">AMINA J. · MEMBER</div><div class="bt"><span>No. •••• 4821</span><span>${c.fee_year?F.tsh(c.fee_year)+' / yr':'Free'}</span></div></div>
   <div class="m-cpick" role="group" aria-label="Choose a card">${cards.map((x,i)=>`<button type="button" data-ci="${i}" class="${i===(ci||0)?'on':''}">${esc(x.name.replace('Afya ',''))}</button>`).join('')}</div></div>`}
 return `<figure class="m-ph"><img src="img/boxdoor.webp" alt="Concept image: an Afya rider handing a closed green box to a mother with her baby at her door" width="1680" height="944" style="object-position:50% 40%"><span class="p2k-cap">Concept image</span><span class="t1">${mark({size:20,rx:5})} Sealed at hub · Order 21-0480</span><span class="t2">Afya yako, nyumbani kwako</span></figure>`}

const B2=(en,sw)=>`<x-en class="p2l-en">${en}</x-en><x-sw class="p2l-sw">${sw}</x-sw>`;
const ICON=s=>`<svg viewBox="0 0 48 48" width="${s}" height="${s}" aria-hidden="true"><defs><linearGradient id="ic${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14996a"/><stop offset="1" stop-color="#0a5a3c"/></linearGradient></defs><rect width="48" height="48" rx="13" fill="url(#ic${s})"/><path d="M 11.12 22.32 L 24 11.68 L 36.88 22.32" fill="none" stroke="#fff" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"/><path d="M 24 36.32 C 17.28 31.84 14.48 28.48 14.48 24.84 C 14.48 22.04 16.72 20.08 19.24 20.08 C 21.2 20.08 22.88 21.2 24 22.88 C 25.12 21.2 26.8 20.08 28.76 20.08 C 31.28 20.08 33.52 22.04 33.52 24.84 C 33.52 28.48 30.72 31.84 24 36.32 Z" fill="#fff"/><path d="M 15.6 27.92 L 20.08 27.92 L 21.76 25.12 L 24 31.28 L 25.96 26.8 L 32.4 26.8" fill="none" stroke="#f2c96b" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const MCAT=[['all','All','Vyote'],['cl','Clothing','Mavazi'],['pr','Print','Machapisho'],['ev','Everyday','Vya kila siku'],['sd','Store & delivery','Duka na usafirishaji']];
(function(){if(document.getElementById('p2mg-fix'))return;const e=document.createElement('style');e.id='p2mg-fix';e.textContent='@media(min-width:900px){#p2mg{grid-template-columns:repeat(6,minmax(0,1fr))!important}}#p2mg .p2m-i img{aspect-ratio:1/1!important;height:auto!important}';document.head.appendChild(e)})();
const MERCH=[
 {k:'tee-black',c:'cl',t:['Founder T-shirt · black','Fulana ya mwanzilishi · nyeusi'],d:['Heavyweight cotton with the primary lockup screen-printed in Afya Green and the motto in gold. Worn by the founders at launch events, investor visits and on opening day.','Pamba nzito, nembo kuu imechapishwa kwa kijani cha Afya na kauli mbiu kwa dhahabu. Inavaliwa na waanzilishi kwenye uzinduzi, ziara za wawekezaji na siku ya ufunguzi.'],s:['240 gsm cotton','Screen print · 2 colours','Sizes S–XXL']},
 {k:'tee-white',c:'cl',t:['Founder T-shirt · white','Fulana ya mwanzilishi · nyeupe'],d:['The same lockup in Afya Green on white: the everyday version for the team and for community health days.','Nembo ileile kwa kijani cha Afya juu ya nyeupe: toleo la kila siku kwa timu na siku za afya za jamii.'],s:['240 gsm cotton','Screen print · 2 colours','Team and events']},
 {k:'polo',c:'cl',t:['Adviser polo','Polo ya mshauri'],d:['Royal-green piqué with the white Nyumba Heart embroidered on the chest. The store uniform: approachable and clean, never a white coat.','Polo ya kijani yenye nembo nyeupe iliyoshonwa kifuani. Sare ya dukani: rafiki na safi, si koti jeupe la hospitali.'],s:['Cotton piqué','Embroidered mark','Store uniform']},
 {k:'cap',c:'cl',t:['Cap','Kofia'],d:['Emerald twill with the embroidered mark, for riders off the bike, outdoor Afya Check days and events.','Kofia ya kijani yenye nembo iliyoshonwa, kwa wasafirishaji, siku za Afya Check za nje na matukio.'],s:['Cotton twill','Embroidered mark','One size']},
 {k:'hoodie',c:'cl',t:['Founder hoodie','Hoodie ya mwanzilishi'],d:['Black fleece with the primary lockup on the chest. A limited run for the founding team and the first partners.','Hoodie nyeusi yenye nembo kuu kifuani. Idadi ndogo kwa timu ya waanzilishi na washirika wa kwanza.'],s:['Brushed fleece','Screen print','Limited run']},
 {k:'brochure',c:'pr',t:['Gatefold brochure','Brosha ya kukunjwa'],d:['Three panels: the Afya Box on the cover, the promise inside, and four reasons to join on the flap. Handed out at the counter and at community health days.','Kurasa tatu: Afya Box mbele, ahadi ndani, na sababu nne za kujiunga pembeni. Zinatolewa dukani na kwenye siku za afya za jamii.'],s:['Gatefold · 3 panels','Emerald and cream stock','English and Kiswahili']},
 {k:'cards',c:'pr',t:['Business cards','Kadi za biashara'],d:['Gold-foil mark and wordmark on emerald board; the back carries name, role and contact on warm cream.','Nembo ya dhahabu juu ya kadi ya kijani; nyuma kuna jina, cheo na mawasiliano juu ya krimu.'],s:['Gold foil','Emerald board','Cream reverse']},
 {k:'letter',c:'pr',t:['Letterhead and envelope','Barua rasmi na bahasha'],d:['Horizontal lockup, address and a green-to-gold rule. Used for supplier, licence and investor letters.','Nembo ya mlalo, anwani na mstari wa kijani hadi dhahabu. Kwa barua za wasambazaji, leseni na wawekezaji.'],s:['A4 · cream','Horizontal lockup','Digital template too']},
 {k:'insert',c:'pr',t:['Afya Box welcome card','Kadi ya karibu ya Afya Box'],d:['The first thing a family reads when it opens its first box: what is inside, how to change it, and the motto.','Kitu cha kwanza familia inasoma inapofungua box yake ya kwanza: kilichomo, jinsi ya kubadilisha, na kauli mbiu.'],s:['Deckled cotton card','In every first box','Bilingual']},
 {k:'mug',c:'ev',t:['Mug','Kikombe'],d:['White ceramic with the horizontal lockup, for the team, partners and loyal members.','Kikombe cheupe chenye nembo ya mlalo, kwa timu, washirika na wanachama waaminifu.'],s:['Ceramic · 330 ml','Wrap print','Gift item']},
 {k:'bottle',c:'ev',t:['Water bottle','Chupa ya maji'],d:['Insulated steel bottle in Afya Green with the white mark and name, for advisers on long shifts and riders.','Chupa ya chuma ya kijani yenye nembo nyeupe, kwa washauri na wasafirishaji.'],s:['Insulated steel · 500 ml','Laser or print','Team kit']},
 {k:'tote',c:'ev',t:['Tote bag','Mkoba wa kitambaa'],d:['Natural canvas with the primary lockup: a reusable bag for store shopping and health days.','Mkoba wa turubai wenye nembo kuu: wa kutumia tena kwa manunuzi na siku za afya.'],s:['Natural canvas','Screen print','Reusable']},
 {k:'notebook',c:'ev',t:['Notebook','Daftari'],d:['Emerald linen cover with the gold-foil lockup, for founders, advisers and partner meetings.','Jalada la kijani lenye nembo ya dhahabu, kwa waanzilishi, washauri na mikutano ya washirika.'],s:['Linen hardcover','Gold foil','A5']},
 {k:'bag',c:'sd',t:['Shopping bag','Mfuko wa duka'],d:['Emerald paper bag with the gold-foil lockup and rope handles: every purchase leaves the store as a small advert.','Mfuko wa karatasi wa kijani wenye nembo ya dhahabu: kila manunuzi yanatoka dukani kama tangazo dogo.'],s:['Recyclable paper','Gold foil','Rope handles']},
 {k:'rider',c:'sd',t:['Rider jacket and delivery box','Jaketi la msafirishaji na sanduku'],d:['Green jacket with reflective strips and the stacked lockup on the back; insulated box with the horizontal lockup, readable in traffic.','Jaketi la kijani lenye vipande vya kuakisi na nembo mgongoni; sanduku lenye nembo ya mlalo inayosomeka barabarani.'],s:['Reflective strips','Insulated box','Readable at 20 m']},
 {k:'badge',c:'sd',t:['Staff ID badge','Kitambulisho cha mfanyakazi'],d:['Name, role and mark on a green lanyard, so every customer knows who is advising them.','Jina, cheo na nembo kwenye utepe wa kijani, ili kila mteja ajue nani anamshauri.'],s:['PVC card','Green lanyard','Every staff member']},
 {k:'door',c:'sd',t:['Door decal','Kibandiko cha mlango'],d:['White vinyl lockup with opening hours at eye level on the glass entrance.','Nembo nyeupe ya vinyl na saa za kufungua, usawa wa macho kwenye mlango wa kioo.'],s:['White vinyl','09:00–21:00, 7 days','Eye level']}];
(function(id,css){if(typeof addCSS==='function')return addCSS(id,css);if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;(document.head||document.documentElement).appendChild(st)})('p2brand',`
html:not(.p0-swon) .p2l-sw{display:none!important}html.p0-swon .p2l-en{display:none!important}
.p2n-hero{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
.p2n-hero figure,.p2n-row figure{margin:0;border-radius:22px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:44px 28px 20px;position:relative;overflow:hidden}
.p2n-hero .d{background:radial-gradient(120% 120% at 30% 15%,#0f3b2b,#04100b 70%);border:1px solid rgba(95,191,143,.22)}
.p2n-hero .l{background:#faf7f0;border:1px solid rgba(15,122,82,.18)}
.p2n-hero img{width:min(78%,420px);height:auto}
.p2n-hero figcaption,.p2n-row figcaption{font:600 .68rem var(--f-hud,monospace);letter-spacing:.2em;text-transform:uppercase;color:rgba(244,251,247,.6)}
.p2n-hero .l figcaption{color:#5b7a6d}
.p2n-row{display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-top:14px}
.p2n-row .g{background:linear-gradient(135deg,#0d5a3e,#073524);padding:34px 24px 18px}.p2n-row .g img{width:min(82%,460px);height:auto}
.p2n-row .ic{flex-direction:row;flex-wrap:wrap;gap:18px;background:#0b1712;border:1px solid rgba(255,255,255,.08);align-items:flex-end}
.p2n-row .ic figcaption{width:100%;text-align:center}
.p2n-why{margin-top:22px;padding:18px 20px;border-radius:16px;border:1px solid rgba(242,201,107,.3);background:rgba(242,201,107,.06)}
.p2n-why p{margin:6px 0 0;line-height:1.65}
.p2m-f{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 14px}
.p2m-f button{border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);color:inherit;border-radius:999px;padding:8px 14px;font:600 .82rem inherit;cursor:pointer}
.p2m-f button.on{background:#5fbf8f;color:#04150e;border-color:#5fbf8f}
.p2m-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(132px,1fr));gap:10px}
.p2m-i{display:flex;flex-direction:column;gap:6px;padding:6px;border-radius:14px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:inherit;cursor:pointer;text-align:left;transition:transform .2s,border-color .2s}
.p2m-i:hover,.p2m-i:focus-visible{transform:translateY(-3px);border-color:rgba(95,191,143,.6)}
.p2m-i img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;display:block}
.p2m-i span{font:600 .74rem/1.3 inherit;padding:0 4px 4px}
.p2m-i[hidden]{display:none}
html.p2m-open{overflow:hidden}
.p2m-lb{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;padding:18px}
.p2m-lb[hidden]{display:none}
.p2m-lb .bk{position:absolute;inset:0;background:rgba(2,8,6,.86);backdrop-filter:blur(6px)}
.p2m-lb .bx{position:relative;display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);max-width:1100px;width:100%;max-height:92vh;border-radius:22px;overflow:hidden;background:#0b1712;border:1px solid rgba(95,191,143,.25);color:#f4fbf7}
.p2m-lb figure{margin:0;background:#050b08;display:grid;place-items:center}.p2m-lb figure img{width:100%;height:100%;max-height:92vh;object-fit:contain;display:block}
.p2m-lb .tx{padding:28px 26px;display:flex;flex-direction:column;gap:10px;overflow:auto}
.p2m-lb small{font:600 .68rem monospace;letter-spacing:.2em;text-transform:uppercase;color:#f2c96b}
.p2m-lb h3{margin:0;font:700 1.5rem/1.15 var(--f-display,inherit)}.p2m-lb p{margin:0;line-height:1.6;color:rgba(244,251,247,.85)}
.p2m-lb ul{margin:4px 0 0;padding-left:18px;line-height:1.7;color:rgba(244,251,247,.75)}
.p2m-lb .nv{margin-top:auto;display:flex;align-items:center;gap:12px}.p2m-lb .nv span{font:600 .8rem monospace;opacity:.7}
.p2m-lb button.pv,.p2m-lb button.nx,.p2m-lb .x{width:42px;height:42px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#fff;font-size:18px;cursor:pointer}
.p2m-lb .x{position:absolute;right:12px;top:12px;z-index:2;background:rgba(0,0,0,.5)}
@media(max-width:820px){.p2n-hero,.p2n-row{grid-template-columns:1fr}.p2m-lb .bx{grid-template-columns:1fr;max-height:94vh;overflow:auto}.p2m-lb figure img{max-height:52vh}.p2m-g{grid-template-columns:repeat(3,1fr)}}
`);
window.SECTIONS['s2-2']={
 render(s,p,pv,nx){
  const A=IN.seed.use,launch=A.find(x=>/marketing/i.test(x[0])),om=IN.opex_month,opexM=Object.values(om).reduce((a,b)=>a+b,0);
  const misuse=[[mark({size:70}).replace('viewBox','preserveAspectRatio="none" style="width:110px;height:56px" viewBox'),'<b>Don’t stretch</b> or squash the mark.'],
   [mark({size:64,bg:'#7A5BB0'}),'<b>Don’t recolour</b> the mark; zone colours are for bands, not the logo.'],
   [`<span style="filter:drop-shadow(4px 6px 0 #c9473a) blur(.3px)">${mark({size:64})}</span>`,'<b>Don’t add effects</b>: shadows, glows or bevels.'],
   [`<span style="display:inline-flex;align-items:center;gap:8px;transform:rotate(-12deg)">${mark({size:44})}<b style="font:400 1.1rem Georgia,serif;color:#0B2219">Afya basics</b></span>`,'<b>Don’t rotate</b> or set the name in another typeface.']];
  return secShell({s,p,pv,nx,cls:'p2',
   img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior with lit shelving, digital screens and the corner counter',
   h1:'Calm, clear and consistent:',em:'a brand built for trust.',
   lede:'The Afya brand is calm and modern: Afya Green and warm white, a gold heartbeat line and one price in every channel. This section is the brand book: the mark, colour, type, photography, voice in English and Kiswahili, the customer charter and the brand applied to real touchpoints.',
   mods:[
    ['The problem · trust is not visible',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Health retail looks the same everywhere.</b> Crowded counters, handwritten prices and green crosses on every street. A customer cannot tell a careful shop from a careless one by appearance.</li>
      <li><b>Counterfeits exploit that sameness.</b> Unregistered products still reach Dar es Salaam: in September 2026 TMDA seized medicines and devices worth about TSh 300 million, noting that their quality, safety and efficacy had not been verified ${C('dn',1)}.</li>
      <li><b>The law already provides visible proof.</b> A registered medicine or device must carry its registered name and registration number when it is sold ${C('act',2)}. A brand can make that proof easy to see.</li>
      <li><b>A brand is a promise customers can check.</b> If every Afya touchpoint is calm, consistent and transparent, customers learn to trust the look itself, in the store, in the app and at the door.</li></ol></div>`],
    ['Our answer · the brand idea',`
     <p class="oneline"><b>Afya yako, nyumbani kwako.</b> Health that is calm, clear and close to home.</p>
     <div class="pillars" style="margin-top:26px">
      <div class="pill"><span class="k">Personality</span><b>Calm, not clinical</b><p>Warm white space, soft light and one strong green. The store should feel like a modern home, not a hospital corridor.</p></div>
      <div class="pill"><span class="k">Promise</span><b>Transparent by design</b><p>One printed price, visible registration numbers and plain-language advice. Nothing hidden in small print.</p></div>
      <div class="pill"><span class="k">Behaviour</span><b>Fast, with a person on hand</b><p>Every process is designed to take seconds, and an adviser is always available. Speed never replaces care.</p></div>
     </div>`],
    ['The mark · Nyumba Heart',`
     <p class="s11lead">${B2('The Afya mark is a roof over a heart, with a heartbeat line running through it. In one shape it states what the business does: health care, delivered to the home. It replaces the medical cross, which every pharmacy already uses and no one can own.','Nembo ya Afya ni paa juu ya moyo, na mstari wa mapigo ya moyo ukipita ndani yake. Kwa umbo moja inaeleza kazi ya biashara: huduma ya afya inayofikishwa nyumbani. Inachukua nafasi ya msalaba wa kitabibu, ambao kila duka la dawa tayari linautumia na hakuna anayeweza kuumiliki.')}</p>
     <div class="p2n-hero">
      <figure class="d"><img src="img/brand/l-stack-onDark.png" alt="Afya Basics primary logo on dark green: roof and heart mark with a heartbeat, the wordmark Afya Basics and the motto Afya yako, nyumbani kwako" loading="lazy"><figcaption>${B2('Primary lockup · on dark','Nembo kuu · juu ya rangi nzito')}</figcaption></figure>
      <figure class="l"><img src="img/brand/l-stack-onLight.png" alt="Afya Basics primary logo on warm white in Afya Green with the motto in gold" loading="lazy"><figcaption>${B2('Primary lockup · on warm white','Nembo kuu · juu ya nyeupe')}</figcaption></figure>
     </div>
     <div class="p2n-row">
      <figure class="g"><img src="img/brand/l-horiz-gold.png" alt="Horizontal Afya Basics logo in gold foil on emerald" loading="lazy"><figcaption>${B2('Horizontal · gold foil for packaging and print','Mlalo · dhahabu kwa vifungashio na uchapishaji')}</figcaption></figure>
      <figure class="ic"><span>${ICON(120)}</span><span>${ICON(64)}</span><span>${ICON(32)}</span><figcaption>${B2('App icon and favicon · 120, 64, 32 px','Aikoni ya programu · 120, 64, 32 px')}</figcaption></figure>
     </div>
     <ol class="p2-anat" style="margin-top:24px">
      <li><span>1</span><div><b>${B2('The roof · nyumba','Paa · nyumba')}</b> ${B2('The home is where Afya delivers: the box, the rider and the reminder. The roof is one open stroke with rounded ends.','Nyumbani ndiko Afya inakofikisha huduma: box, msafirishaji na ukumbusho. Paa ni mstari mmoja wazi wenye ncha za mviringo.')}</div></li>
      <li><span>2</span><div><b>${B2('The heart · moyo','Moyo')}</b> ${B2('Care and family: the reason a mother, or a son abroad, chooses a monthly box. It sits under the roof, inside the home.','Huduma na familia: sababu mama, au mwana aliye nje ya nchi, anachagua box ya kila mwezi. Uko chini ya paa, ndani ya nyumba.')}</div></li>
      <li><span>3</span><div><b>${B2('The heartbeat · mapigo','Mapigo ya moyo')}</b> ${B2('Health that is measured, not guessed: the free Afya Check at the door. It is cut out of the heart, or drawn in gold on white versions, never filled in.','Afya inayopimwa, si kukisiwa: Afya Check ya bure mlangoni. Imekatwa ndani ya moyo, au kuchorwa kwa dhahabu kwenye toleo jeupe, haijazwi kamwe.')}</div></li>
      <li><span>4</span><div><b>${B2('The wordmark','Jina')}</b> ${B2('“Afya Basics” in Unbounded Bold: Afya in white or Forest Ink, Basics in Afya Green. Minimum size: mark 16 px on screen, 8 mm in print.','“Afya Basics” kwa herufi za Unbounded Bold: Afya kwa nyeupe au kijani-nyeusi, Basics kwa kijani cha Afya. Ukubwa wa chini: nembo 16 px kwenye skrini, 8 mm kwenye karatasi.')}</div></li>
      <li><span>5</span><div><b>${B2('The motto below','Kauli mbiu chini')}</b> ${B2('“Afya yako, nyumbani kwako”: Kiswahili first, set in wide gold capitals under a thin gold rule. It travels with the full lockup and is dropped only on very small uses.','“Afya yako, nyumbani kwako”: Kiswahili kwanza, kwa herufi kubwa za dhahabu zilizotengana chini ya mstari mwembamba wa dhahabu. Inaambatana na nembo kamili na inaondolewa tu kwenye matumizi madogo sana.')}</div></li>
     </ol>
     <div class="p2n-why"><b>${B2('Why the mark is not a cross','Kwa nini nembo si msalaba')}</b><p>${B2('Green and red crosses hang over thousands of pharmacies, so a cross tells a customer nothing about who is careful. The red cross on white is also a protected emblem under the Geneva Conventions. A roof and a heart are ownable, can be registered as a trademark, and describe the home-delivery promise that makes Afya different.','Misalaba ya kijani na nyekundu iko juu ya maelfu ya maduka ya dawa, hivyo msalaba haumwambii mteja chochote kuhusu nani ni makini. Msalaba mwekundu juu ya nyeupe pia ni alama iliyolindwa na Mikataba ya Geneva. Paa na moyo vinaweza kumilikiwa, kusajiliwa kama alama ya biashara, na vinaeleza ahadi ya kufikisha nyumbani inayoitofautisha Afya.')}</p></div>
     <h3 class="p2-h3" style="margin-top:40px">${B2('The brand on real touchpoints','Chapa inavyoonekana kwa wateja')}</h3>
     <p class="p2-sub">${B2('A brand is judged where people meet it: the fascia at dusk, the store interior, a rider in traffic and a box at the door. Each uses the same mark, the same green and the same restraint.','Chapa inapimwa pale watu wanapokutana nayo: ubao wa duka jioni, ndani ya duka, msafirishaji barabarani na box mlangoni. Kila kimoja kinatumia nembo ileile, kijani kilekile na utulivu uleule.')}</p>
     <div class="p2-apply">${(p2kon(),'')}
      ${[['exterior','Store fascia','Concept image: the Afya Basics street-front store at dusk with the illuminated sign','White letters and the lit Nyumba Heart on the fascia, readable from across the road at night.','50% 40%','big'],
        ['k-store-family','Inside the store','Concept image: a young family walking into the calm Afya Basics store','Warm oak, white stone and one green accent: a calm interior that invites families in.','50% 45%',''],
        ['rider','Livery','Concept image: an Afya rider in green on a motorbike with a green insulated box','Green jacket, helmet and insulated box: a moving sign that Afya delivers on this street.','58% 45%',''],
        ['c-seal','Packaging','Concept image: an Afya packer sealing a green box with a gold seal','Closed emerald boxes with a gold seal, photographed and sealed at the hub.','50% 45%',''],
        ['k-delivery','At the door','Concept image: an Afya rider handing a green box to a mother with her baby at her door','The purpose of the whole system: a sealed box handed over, with a code as proof of delivery.','50% 40%','']].map(x=>`<figure class="p2-ap ${x[5]}"><img src="img/${x[0]}.webp" alt="${x[2]}" loading="lazy" width="1680" height="944" style="object-position:${x[4]}"><span class="p2k-cap">Concept image</span><span class="chip">${mark({size:22,rx:6})}<b>${x[1]}</b></span><figcaption>${x[3]}</figcaption></figure>`).join('')}
     </div>
     <h3 class="p2-h3" style="margin-top:30px">${B2('Misuse of the mark','Matumizi yasiyoruhusiwa ya nembo')}</h3>
     <div class="p2-rules">${misuse.map(m=>`<div class="p2-rule"><div class="ri">${m[0]}</div><p>${m[1]}</p></div>`).join('')}</div>`],
    ['Colour · green, warm white, six zone colours',`
     <p class="s11lead">Nine brand colours and six zone colours. Select a swatch to copy its hex code. Each swatch shows its measured contrast ratio against white and Forest Ink, tested against the international accessibility standard (4.5:1 for normal text, 3:1 for large text) ${C('w3c',3)}.</p>
     <div class="p2-pal" id="p2pal"></div>
     <h3 class="p2-h3" style="margin-top:28px">Proportion of use</h3>
     <div class="p2-prop" aria-label="Colour proportion: 55% warm white, 25% Afya Green, 12% soft grey and slate, 5% forest ink, 3% gold">
      <div style="flex:55;background:#FAF7F0;color:#0B2219">55% WARM WHITE</div><div style="flex:25;background:#0F7A52;color:#fff">25% GREEN</div><div style="flex:12;background:#E4E9E6;color:#0B2219">12% GREY</div><div style="flex:5;background:#0B2219;color:#fff">5%</div><div style="flex:3;background:#F2C96B"></div></div>
     <p class="note">White space sets the calm, green carries recognition, and gold is used sparingly as an accent</p>
     <h3 class="p2-h3" style="margin-top:30px">Care Zone colours · visible from the door</h3>
     <p class="p2-sub">Six colours, clearly distinct from each other and from Afya Green, at similar strength so that no zone dominates. They appear on zone signs, shelf-label bands, app categories and box colour bands, never on the logo. Each has a light tint for backgrounds.</p>
     <div class="p2-zones" id="p2zones"></div>`],
    ['Typography · display, body and numbers',`
     <p class="s11lead">Three typefaces with distinct roles: a rounded geometric display face for the name and headlines, a humanist sans for all reading text, and a monospace with tabular figures so that prices align. Type your own text to test them.</p>
     <div class="p2-type">
      <div class="p2-tctl"><input type="text" id="p2tin" value="Afya yako, nyumbani kwako" maxlength="60" aria-label="Sample text"><label>Size <input type="range" id="p2tsz" min="16" max="64" value="34" aria-label="Sample size"></label></div>
      <div class="p2-trow"><div class="meta"><b>Display · Unbounded</b><span>800 / 700 · headlines, wordmark, zone signs · tracking −2%</span></div><div class="sm d" data-t="d"></div></div>
      <div class="p2-trow"><div class="meta"><b>Body · Manrope</b><span>400 / 600 / 700 · labels, app, SMS, receipts, signage text</span></div><div class="sm b" data-t="b"></div></div>
      <div class="p2-trow"><div class="meta"><b>Numbers · JetBrains Mono</b><span>Tabular figures · prices, times, readings, codes</span></div><div class="sm n" data-t="n"></div></div>
      <div class="p2-trow"><div class="meta"><b>Why tabular figures</b><span>Every digit the same width, so columns of prices align on labels and receipts</span></div><div class="p2-tnum"><span>Test strips ×50</span><span>TSh 38,000</span><span>Lancets ×100</span><span>TSh 9,500</span><span>BP monitor</span><span>TSh 85,000</span><span>Reading</span><span>118 / 76</span></div></div>
     </div>
     <p class="note">All three are open-licence web fonts · prices shown are illustrative · framework rule: one family feeling, readable on shelves, screens and phones</p>`],
    ['Photography and tone of voice',`
     <h3 class="p2-h3">Photo style</h3>
     <p class="p2-sub">Tanzanian people in calm home and store settings, in natural light. Until real photography exists, concept images are used and always labelled as such. Images of the problem appear only in investor material, never in Afya advertising.</p>
     <div class="p2-photo">
      <figure class="p2-ph do"><div class="pi"><img src="img/k-store-family.webp" loading="lazy" alt="Concept image of a young family walking into the calm, bright store"><span class="badge">Do</span></div><figcaption><b>Calm and bright.</b> Natural light, clean lines, room to breathe, the green as an accent, not a wash.</figcaption></figure>
      <figure class="p2-ph do"><div class="pi"><img src="img/k-check.webp" loading="lazy" alt="Concept image of an adviser explaining a blood-pressure reading to a customer"><span class="badge">Do</span></div><figcaption><b>Care in action.</b> An adviser explaining a reading at eye level, unhurried: the service is the brand, not the shelf.</figcaption></figure>
      <figure class="p2-ph dont"><div class="pi"><img src="img/today3.webp" loading="lazy" alt="Concept image of a crowded pharmacy queue"><span class="badge">Don’t · brand</span></div><figcaption><b>Crowds and stress.</b> Only for telling the problem to investors, never in Afya advertising.</figcaption></figure>
      <figure class="p2-ph dont"><div class="pi"><img src="img/today1.webp" loading="lazy" alt="Concept image of a mother told an item is out of stock"><span class="badge">Don’t · brand</span></div><figcaption><b>Disappointment.</b> Afya channels show the solution, not the customer’s worst moment.</figcaption></figure>
     </div>
     <div class="p2-prules"><div><b>People, with consent</b>Real customers and staff only with written consent; children only with a parent’s consent.</div><div><b>No alarming medicine</b>No needles, blood or close-ups of illness. Show care and confidence, not fear.</div><div><b>No before/after claims</b>No promises about bodies or cures. Products are shown as they are, with their real packaging.</div></div>
     <h3 class="p2-h3" style="margin-top:36px">Tone of voice</h3>
     <div class="p2-voice">${VOICE.map(v=>`<div class="p2-vo"><b>${v[0]}</b><p>${v[1]}</p><div class="say"><span class="y">${esc(v[2])}</span><span class="n">${esc(v[3])}</span></div></div>`).join('')}</div>
     <div class="p2-lang" role="group" aria-label="Language" id="p2lang"><button type="button" class="on" data-k="en">English</button><button type="button" data-k="sw">Kiswahili</button></div>
     <div class="p2-ex" id="p2ex"></div>
     <p class="note">Kiswahili drafts · to be checked by a native speaker before launch (open question in the framework)</p>`],
    ['Try it · branded items',`
     <p class="s11lead">${B2('The brand applied to the items the founding team, advisers and riders will use. Select an item to open it; use the arrows to browse the collection.','Chapa ikitumika kwenye vitu ambavyo timu ya waanzilishi, washauri na wasafirishaji watatumia. Chagua kitu kukifungua; tumia mishale kupitia mkusanyiko.')} ${tagi('Concept mock-ups')}</p>
     <div class="p2m-f" role="group" aria-label="Filter the collection" id="p2mf">${MCAT.map((c,i)=>`<button type="button" data-c="${c[0]}" class="${i?'':'on'}">${B2(c[1],c[2])}</button>`).join('')}</div>
     <div class="p2m-g" id="p2mg">${MERCH.map((m,i)=>`<button type="button" class="p2m-i" data-i="${i}" data-c="${m.c}" aria-label="Open ${esc(m.t[0])}"><img src="img/brand/t-${m.k}.webp" alt="" loading="lazy" width="420" height="420"><span>${B2(m.t[0],m.t[1])}</span></button>`).join('')}</div>`,'try-brand'],
    ['The customer charter · ten promises',`
     <p class="s11lead">The charter is displayed at the door, in the app and in every member welcome message, in Kiswahili and English. Each promise has a measure, so staff, customers and investors can all check it.</p>
     <div class="p2-charter">${CHARTER.map(c=>`<div class="p2-ch"><div><b>${c[0]}</b><span class="sw">${c[1]}</span><p>${c[2]}</p><small>${c[3]}</small></div></div>`).join('')}</div>`],
    ['The numbers · what the brand costs',`
     <p class="s11lead">Most brand assets are items the business needs anyway: signs, labels, bags and receipts. Dedicated brand spending is small; the figures below come from the master model (Flagship option). ${PE}</p>
     <div class="nums">
      <div class="num g"><b>${F.m(launch?launch[1]:0)}</b><span>Launch marketing from the seed round</span></div>
      <div class="num"><b>${F.m(om.marketing)}</b><span>Marketing per month, store one</span></div>
      <div class="num"><b>${F.pct(om.marketing/opexM)}</b><span>Marketing share of monthly running costs</span></div>
      <div class="num"><b>${F.m(om.packaging_misc)}</b><span>Packaging &amp; misc. per month (bags, bands, labels)</span></div>
      <div class="num"><b>${F.m(A[0][1])}</b><span>Fit-out, lease deposit &amp; signage (seed line)</span></div>
     </div>
     <p class="note">Signage sits inside the fit-out line · the Canva brand kit and the final colour codes are set in Step 1 of the framework</p>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">Another health brand uses a similar roof-and-heart idea.</span><span class="ar">→</span><span class="a">The open roof stroke, the cut-out heartbeat, the Unbounded wordmark and the Kiswahili motto together make the mark distinctive. Before launch the company runs a trademark search and registers the mark and name (legal review needed).</span></div>
      <div class="risk"><span class="q">Brand consistency slips as the chain grows.</span><span class="ar">→</span><span class="a">All assets sit in one brand kit, and shelf labels and receipts are generated by the system, so they cannot drift. Each new store follows the same playbook.</span></div>
      <div class="risk"><span class="q">Kiswahili copy could read as a translation.</span><span class="ar">→</span><span class="a">All Kiswahili is checked by a native speaker before launch, and SMS and WhatsApp messages, where most customers will read the brand, are written in Kiswahili first.</span></div>
      <div class="risk"><span class="q">Some zone colours are too light for white text.</span><span class="ar">→</span><span class="a">The palette above measures every colour. Where contrast is too low (Amber, for example), signs switch to Forest Ink text.</span></div>
     </div>`]
   ],
   takeaway:'A <b>calm, consistent brand</b> makes “registered only” and “one honest price” <b>visible to customers</b>. That visible trust is what leads a family to give Afya its monthly health budget.',
   doors:['s2-1','s3-1','s3-4','s7-5'],
   sources:[S.dn,S.act,S.w3c,S.tra]});
 },
 init(){
  const pal=$('p2pal');if(!pal)return;
  pal.innerHTML=PAL.map(c=>{const t=bestText(c[1]),r=cr(c[1],t),a=aa(r),rw=cr(c[1],'#FFFFFF'),ri=cr(c[1],INK);
   return `<button type="button" class="p2-sw" data-hex="${c[1]}" style="--c:${c[1]};--t:${t}" aria-label="${esc(c[0])} ${c[1]}: copy hex code"><div class="chip"><b>${esc(c[0])}</b><code>${c[1]}</code></div><div class="info"><p>${esc(c[2])}</p><small><em class="${aa(rw)[0]}">White ${rw.toFixed(1)}:1</em><em class="${aa(ri)[0]}">Ink ${ri.toFixed(1)}:1</em></small></div></button>`}).join('');
  pal.querySelectorAll('.p2-sw').forEach(b=>b.onclick=()=>{const h=b.dataset.hex;try{navigator.clipboard&&navigator.clipboard.writeText(h).catch(()=>{})}catch(e){}b.classList.add('copied');setTimeout(()=>b.classList.remove('copied'),1200)});
  $('p2zones').innerHTML=ZONES.map(z=>{const t=bestText(z[1]),r=cr(z[1],t);return `<div class="p2-z" style="--c:${z[1]};--t:${t};--l:${tint(z[1],.82)}"><div class="zt"><span class="zph" style="background-image:url(img/${({'Mother & Baby':'prod-baby','Heart & Diabetes':'prod-heart','Mobility & Recovery':'prod-senior','First Aid & Home':'prod-firstaid','Personal Care':'prod-care','Seniors':'check'})[z[0]]}.webp)" aria-hidden="true"></span><code>${z[1]}</code></div><div class="zl"></div><div class="zb"><b>${esc(z[0])}</b><span>${esc(z[3])}</span><span style="font:500 .6rem var(--f-hud);color:var(--ink3);margin-top:6px">${t==='#FFFFFF'?'White':'Ink'} text · ${r.toFixed(1)}:1 · ${aa(r)[1]}</span></div></div>`}).join('');
  /* type tester */
  const tin=$('p2tin'),tsz=$('p2tsz'),rows=[...document.querySelectorAll('.p2-trow .sm')];
  const ty=()=>{const v=tin.value||'Afya yako, nyumbani kwako',z=+tsz.value;rows.forEach(r=>{const t=r.dataset.t;r.textContent=t==='n'?'TSh 85,000 · 09:00–21:00 · 118/76':v;r.style.fontSize=(t==='d'?z:t==='b'?Math.max(15,z*.55):Math.max(14,z*.5))+'px'})};
  tin.oninput=tsz.oninput=ty;ty();
  /* language */
  const ex=$('p2ex');const lang=k=>{ex.innerHTML=EX.map(e=>`<div class="p2-exc"><small>${e.k}</small><p>${e[k]}</p><div class="why">${e.why}</div></div>`).join('');ex.classList.remove('p2-swap');void ex.offsetWidth;ex.classList.add('p2-swap')};
  wireTabs($('p2lang'),lang);lang('en');
  /* founder's collection */
  const mg=$('p2mg');if(mg){let cur=0,list=MERCH.map((_,i)=>i);
   let lb=document.getElementById('p2mlb');if(!lb){lb=document.createElement('div');lb.id='p2mlb';lb.className='p2m-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.hidden=true;lb.innerHTML='<div class="bk" data-x></div><div class="bx"><button type="button" class="x" data-x aria-label="Close">✕</button><figure><img alt=""></figure><div class="tx"><small></small><h3></h3><p></p><ul></ul><div class="nv"><button type="button" class="pv" aria-label="Previous">←</button><span class="ct"></span><button type="button" class="nx" aria-label="Next">→</button></div></div></div>';document.body.appendChild(lb)}
   const sw=()=>document.documentElement.classList.contains('p0-swon')?1:0;
   const show=i=>{cur=i;const m=MERCH[list[i]];const l=sw();lb.querySelector('img').src='img/brand/m-'+m.k+'.webp';lb.querySelector('img').alt='Concept mock-up: '+m.t[0];lb.querySelector('small').textContent=MCAT.find(c=>c[0]===m.c)[1+l];lb.querySelector('h3').textContent=m.t[l];lb.querySelector('p').textContent=m.d[l];lb.querySelector('ul').innerHTML=m.s.map(x=>'<li>'+esc(x)+'</li>').join('');lb.querySelector('.ct').textContent=(i+1)+' / '+list.length};
   const open=i=>{show(i);lb.hidden=false;document.documentElement.classList.add('p2m-open');lb.querySelector('.x').focus()};
   const close=()=>{lb.hidden=true;document.documentElement.classList.remove('p2m-open')};
   lb.querySelectorAll('[data-x]').forEach(b=>b.onclick=close);lb.querySelector('.pv').onclick=()=>show((cur-1+list.length)%list.length);lb.querySelector('.nx').onclick=()=>show((cur+1)%list.length);
   const kd=e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show((cur+1)%list.length);if(e.key==='ArrowLeft')show((cur-1+list.length)%list.length)};document.addEventListener('keydown',kd);
   mg.querySelectorAll('.p2m-i').forEach(b=>b.onclick=()=>{const k=+b.dataset.i;open(Math.max(0,list.indexOf(k)))});
   const fb=[...document.querySelectorAll('#p2mf button')];fb.forEach(b=>b.onclick=()=>{fb.forEach(x=>x.classList.toggle('on',x===b));const c=b.dataset.c;list=MERCH.map((m,i)=>[m,i]).filter(([m])=>c==='all'||m.c===c).map(x=>x[1]);mg.querySelectorAll('.p2m-i').forEach(x=>x.hidden=!(c==='all'||x.dataset.c===c))});
   if(typeof onLeave==='function')onLeave(()=>{document.removeEventListener('keydown',kd);close()});}
 }};

/* ================= 2.3 HOW IT ALL WORKS ================= */
const STPH=[['prod-firstaid','50% 50%','Concept image: registered first-aid products from approved manufacturers'],['prod-heart','50% 50%','Concept image: registered blood-pressure and diabetes devices'],['interior','60% 50%','Concept image: lit display towers inside the store, stocked first-expiry-first-out'],['hub','50% 40%','Concept image: packing hub staff sealing closed green Afya boxes'],['check','50% 35%','Concept image: a customer at the Afya Check kiosk with an adviser'],['rider','55% 45%','Concept image: an Afya rider on an electric motorbike in Dar es Salaam'],['team','50% 30%','Concept image: Afya advisers at the counter, ready to help after the sale']];
const ST=[
 {t:'Supplier',s:'China & India',ic:'globe',
  p:'Most goods come from manufacturers in China and India, selected on quality first and price second. Afya buys only products registered with TMDA, or products the manufacturer will register before they are sold. Every new supplier provides certificates and samples before the first order.',
  who:'The buyer (a founder in year one, a head-office buyer later).',tool:'Stock & reorder module: the system drafts a purchase order when stock reaches its reorder point; a supplier scorecard tracks quality, price and on-time delivery.',time:'Purchase order approved within 24 hours of the reorder alert. Shipping lead time is built into each reorder point and confirmed with supplier quotations.',cost:'Product cost is recovered inside the one honest shelf price (planned retail gross margin '+F.pct(IN.store.retail_gm)+').'},
 {t:'Import & TMDA',s:'Permits · customs',ic:'shield',
  p:'No one may import medicines or medical devices into Mainland Tanzania without a licence or permit from TMDA, and regulated products may be sold only once registered. The TMDA import permit is presented with the shipping documents at customs. TMDA and TRA run joint spot checks at borders, airports and ports.',
  who:'A licensed clearing agent, with our compliance lead holding the TMDA and business licences.',tool:'TMDA import permit and TRA customs declaration; shipping documents (invoice, packing list, bill of lading or air waybill) stored against each batch in our system.',time:'Set by TMDA and TRA processing. We hold a buffer of stock so a slow clearance never empties a shelf.',cost:'Freight, duties, clearing and permit fees form the landed cost, recovered in the shelf price.'},
 {t:'Stock · FEFO',s:'First expiry, first out',ic:'shelf',
  p:'At goods-in every carton is scanned: product, batch number and expiry date. From then on the system always picks the unit that expires first (first-expiry-first-out), flags anything nearing expiry, and keeps one live stock count for shelf, hub and app.',
  who:'Store lead and picker.',tool:'Handheld scanner; batch and expiry captured once at goods-in; FEFO pick lists; expiry alerts on the dashboard.',time:'Goods received and on the shelf the same day they arrive.',cost:'A small allowance for shrink and expiry sits inside the retail margin; FEFO keeps it small.'},
 {t:'Store · hub',s:'Shelf, pick, pack',ic:'pack',
  p:'The same stock serves the store shelf and the packing area. Online orders appear on the picker’s handheld immediately. Afya Box orders are packed on a fixed day from locked packing lists, then photographed and sealed.',
  who:'Health advisers on the shop floor; a picker-packer for orders and boxes.',tool:'Picker handheld, locked box packing list from Afya Choice, photo of every sealed box, tamper seal.',time:'Click & collect ready in under 2 hours. Boxes packed on the fixed packing day.',cost:'Charged at cost inside the box price: the box at landed cost (S TSh 3,500 · M 5,000 · L 6,500) plus TSh 3,500 delivery, or '+F.tsh(IN.members.packing_delivery_in_price)+' for a medium box.'},
 {t:'Customer',s:'Walk-in · online · Afya Box',ic:'user',
  p:'Three ways to buy, one account. A walk-in shopper finds and pays in under 3 minutes, an online or WhatsApp customer repeats an order in under 30 seconds, and a member’s box renews without any action. Every sale issues a fiscal receipt, sent by SMS or WhatsApp.',
  who:'Advisers in store; the member adviser and WhatsApp inbox for online and box customers.',tool:'Till with scan-and-go and self-checkout; app and WhatsApp Business; mobile money first, then card and cash; TRA-approved fiscal receipt.',time:'Pay under 30 s · repeat order under 30 s · WhatsApp answer under 5 min.',cost:'The customer pays every element: shelf price, box price or delivery fee. Nothing is subsidised.'},
 {t:'Delivery · proof',s:'Riders · photo or code',ic:'bike',
  p:'Riders are assigned automatically by delivery zone: two salaried riders on electric motorbikes in the Flagship option, partner riders paid per delivery in the Start Small option. The customer tracks the rider live. At the door, delivery is confirmed with a photo or a one-time code, and the sealed box is handed over closed.',
  who:'Riders: two salaried at launch (Flagship) or partner riders (Start Small).',tool:'Rider app with zone assignment, live tracking, photo or code proof of delivery.',time:'Same-day delivery in Dar es Salaam for orders before 15:00.',cost:'Online orders: delivery fee '+F.tsh(IN.online.delivery_fee)+' against a rider cost of '+F.tsh(IN.online.rider_cost_per_order)+'. Boxes: inside the box price.'},
 {t:'Aftercare',s:'Warranty · follow-up',ic:'care',
  p:'The relationship continues after the sale: a reminder for the next check, help with a device, a warranty claim, a complaint answered the same day. Because every unit is linked to its batch, a supplier recall can be traced to the customers who bought it.',
  who:'Health advisers and the member adviser.',tool:'Members module, WhatsApp inbox, warranty register, batch trace for recalls.',time:'WhatsApp answer under 5 minutes in opening hours; complaints answered the same day.',cost:'Covered by margin and by card fees (from '+F.tsh(IN.cards.find(c=>c.fee_year>0).fee_year)+' a year).'}];
function flowSVG(v){const D=v==='d',id=v;
 let pos,main,spokes,hub='',lab;
 if(D){pos=[[130,150],[410,150],[690,150],[970,150],[970,410],[550,410],[130,410]];main='M130 150 H970 C1110 150 1110 410 970 410 H130';
  const hx=[330,770],hyT=250,hyB=310;
  spokes=pos.map((p,i)=>{const row1=p[1]<300,tx=Math.max(hx[0]+20,Math.min(hx[1]-20,p[0]));return row1?`M${p[0]} ${p[1]+36} C${p[0]} ${hyT-20} ${tx} ${hyT-30} ${tx} ${hyT}`:`M${p[0]} ${p[1]-36} C${p[0]} ${hyB+20} ${tx} ${hyB+30} ${tx} ${hyB}`});
  hub=`<g class="p2-hub"><rect x="${hx[0]}" y="${hyT}" width="${hx[1]-hx[0]}" height="${hyB-hyT}" rx="30"/>${mark({size:30,rx:8}).replace('<svg ',`<svg x="${hx[0]+18}" y="${hyT+15}" `)}<text x="${hx[0]+62}" y="${hyT+27}" style="font:800 15px var(--f-display);letter-spacing:.04em">AFYA ONE SYSTEM</text><text x="${hx[0]+62}" y="${hyT+45}" style="font:500 10.5px var(--f-hud);letter-spacing:.08em;fill:#7fd9ea">TILL · STOCK · MEMBERS · DELIVERY · MONEY · REPORTS</text></g>`;
  lab=pos.map((p,i)=>p[1]<300?[p[0],p[1]-62,'middle']:[p[0],p[1]+66,'middle']);
 }else{pos=ST.map((s,i)=>[78,60+i*150]);main='M78 60 V960';
  spokes=pos.map(p=>`M24 ${p[1]} H46`);
  hub=`<g class="p2-hub"><rect x="10" y="20" width="28" height="980" rx="14"/><text transform="translate(29 510) rotate(-90)" text-anchor="middle" style="font:800 13px var(--f-display);letter-spacing:.18em">AFYA ONE SYSTEM</text></g>`;
  lab=pos.map(p=>[124,p[1]-6,'start']);}
 const W=D?1200:400,H=D?560:1020;
 const goods=[0,1,2,3,4].map(k=>`<circle r="5"><animateMotion dur="12s" begin="-${k*2.4}s" repeatCount="indefinite" rotate="auto"><mpath href="#p2m${id}"/></animateMotion></circle>`).join('');
 const money=[0,1,2,3].map(k=>`<circle r="4.5"><animateMotion dur="10s" begin="-${k*2.5}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#p2m${id}"/></animateMotion></circle>`).join('');
 const sp=spokes.map((d,i)=>`<path id="p2s${id}${i}" class="p2-spoke" d="${d}"/>`).join('');
 const data=spokes.map((d,i)=>`<circle r="3.6"><animateMotion dur="2.2s" begin="-${(i*.31).toFixed(2)}s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear"><mpath href="#p2s${id}${i}"/></animateMotion></circle><circle r="2.6" opacity=".8"><animateMotion dur="2.6s" begin="-${(i*.47).toFixed(2)}s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear"><mpath href="#p2s${id}${i}"/></animateMotion></circle>`).join('')
  +(D?'':`<circle r="3.4"><animateMotion dur="5s" repeatCount="indefinite" path="M24 40 V990"/></circle>`);
 const nodes=pos.map((p,i)=>{const s=ST[i],l=lab[i],r=D?36:30;return `<g class="p2-fn" data-i="${i}" tabindex="0" role="button" aria-label="Stage ${i+1}: ${esc(s.t)}. Show details">
  <circle class="gl" cx="${p[0]}" cy="${p[1]}" r="${r+9}"/><circle class="o" cx="${p[0]}" cy="${p[1]}" r="${r}"/><clipPath id="p2fc${id}${i}"><circle cx="${p[0]}" cy="${p[1]}" r="${r-3}"/></clipPath><image href="img/${STPH[i][0]}.webp" x="${p[0]-r*1.75}" y="${p[1]-r+3}" width="${r*3.5}" height="${(r-3)*2}" preserveAspectRatio="xMidYMid slice" clip-path="url(#p2fc${id}${i})"/>
  <g class="bd"><circle cx="${p[0]+r*.72}" cy="${p[1]-r*.72}" r="10"/><text x="${p[0]+r*.72}" y="${p[1]-r*.72+4}" text-anchor="middle">${i+1}</text></g>
  <text class="t1" x="${l[0]}" y="${l[1]}" text-anchor="${l[2]}" ${D?'':'style="font-size:19px"'}>${esc(s.t)}</text><text class="t2" x="${l[0]}" y="${l[1]+(D?19:22)}" text-anchor="${l[2]}" ${D?'':'style="font-size:13.5px"'}>${esc(s.s)}</text></g>`}).join('');
 return `<svg class="v${v}" viewBox="0 0 ${W} ${H}" role="group" aria-label="Animated flow from supplier to aftercare, with goods, money and data moving through one system">
  <defs><linearGradient id="p2gMain${D?'D':'M'}" x1="0" x2="${D?1:0}" y1="0" y2="${D?0:1}"><stop offset="0" stop-color="#5fbf8f"/><stop offset=".6" stop-color="#d9b56e"/><stop offset="1" stop-color="#f2c96b"/></linearGradient>
  <linearGradient id="p2gGold"><stop offset="0" stop-color="#f2c96b"/><stop offset="1" stop-color="#ffe7a8"/></linearGradient></defs>
  ${sp}${hub}
  <path class="p2-mainbg" d="${main}"/><path id="p2m${id}" class="${D?'p2-main':'p2-mainm'}" d="${main}"/>
  ${D?`<text x="1110" y="286" text-anchor="middle" style="font:500 10px var(--f-hud);letter-spacing:.14em;fill:#6a8a7d" transform="rotate(90 1110 280)">GOODS → · ← MONEY</text>`:''}
  <g class="p2-pg goods">${goods}</g><g class="p2-pg money">${money}</g><g class="p2-pg data">${data}</g>
  ${nodes}</svg>`}

const ORD=[
 {k:'walk',t:'Walk-in',s:[2,4]},{k:'cc',t:'Click & collect',s:[2,3,4]},{k:'sd',t:'Same-day delivery',s:[2,3,4,5]},{k:'box',t:'Afya Box member',s:[2,3,4,5,6]},{k:'gift',t:'Diaspora gift',s:[3,4,5,6]}];
const hm=m=>{m=Math.round(m);const h=Math.floor(m/60),mm=m%60;return String(h).padStart(2,'0')+':'+String(mm).padStart(2,'0')};
const OPEN_M=9*60,CLOSE_M=21*60,CUT=15*60;
function sim(k,t){const L=[];let v='',w=false;
 if(k==='walk'){if(t<OPEN_M||t>=CLOSE_M){return {L:[[hm(t),'<b>Store closed.</b> Opening hours are 09:00–21:00, 7 days. Order on the app or WhatsApp instead.']],v:'Outside opening hours',w:true}}
  L.push([hm(t),'<b>Arrive.</b> Quick check at the door in about 50 seconds; Care Zones visible from the entrance.'],[hm(t+1),'<b>Found.</b> The right zone and shelf in under a minute, from the find-it screen or the app.'],[hm(t+2),'<b>Chosen.</b> 4–5 brands side by side, one price, a “best for” card.'],[hm(t+2.5),'<b>Paid.</b> Scan-and-go, self-checkout or the adviser’s handheld; receipt by SMS.']);v='About 2½ minutes door to door · target under 3 minutes'}
 else if(k==='cc'){L.push([hm(t),'<b>Ordered</b> in the app or on WhatsApp; paid by mobile money push.'],[hm(t+1),'<b>Picker alerted</b> instantly on the handheld; FEFO picks the right batch.']);
  let r=Math.max(t,OPEN_M)+120;if(t>=CLOSE_M-120||t<OPEN_M-120){L.push(['Next day','<b>Ready by 11:00</b> tomorrow: today’s collection window has closed.']);v='Ordered too late for today · ready by 11:00 tomorrow';w=true}
  else{L.push([hm(r),'<b>Ready to collect</b> at the corner counter; SMS with collection code.']);v='Ready within 2 hours · target met'}}
 else if(k==='sd'){L.push([hm(t),'<b>Ordered</b> and paid by mobile money push.']);
  if(t<CUT&&t>=6*60){const s=Math.max(t,OPEN_M);L.push([hm(s+20),'<b>Picked and sealed</b> at the hub; photo of the sealed bag.'],[hm(s+45),'<b>Rider assigned</b> automatically by zone; live tracking link sent.'],[hm(Math.min(s+180,CLOSE_M)),'<b>Delivered</b> with photo or code proof at the door.']);v='Ordered before 15:00 · delivered today'}
  else{L.push(['Tomorrow','<b>First wave from 10:00.</b> Orders after 15:00 go out next morning; the customer is told at checkout.']);v='After the 15:00 cut-off · next-day delivery';w=true}}
 else if(k==='box'){L.push(['Day −12','<b>Reminder</b> by SMS, WhatsApp, email or phone: keep the box or swap brands.'],['Day −12 → 0','<b>Afya Choice window.</b> Swaps are free and at the same price; after the window the list locks.'],['Packing day','<b>Packed from the locked list,</b> photographed, sealed; stock already reserved weeks before.'],['Box day','<b>Delivered</b> on the member’s fixed day; payment renews on the plan automatically.'],['Day +1','<b>Aftercare:</b> points and next check date appear in the app.']);v='Zero clicks for the member · time does not matter'}
 else{L.push([hm(t),'<b>Chosen and paid</b> abroad by international card; message added.'],[hm(t+2),'<b>Confirmed</b> in under 2 minutes; the family at home is told by SMS.']);
  if(t<CUT&&t>=6*60){L.push([hm(Math.min(Math.max(t,OPEN_M)+180,CLOSE_M)),'<b>Delivered today</b> in Dar es Salaam; photo confirmation sent to the sender.']);v='Paid in under 2 minutes · delivered today'}
  else{L.push(['Tomorrow','<b>Delivered next day</b> from the first wave; photo confirmation to the sender.']);v='Paid in under 2 minutes · delivered tomorrow';w=true}}
 return {L,v,w}}

const CH10=[
 {img:'c-factory',at:17,k:['Step 1 · Supplier','Hatua 1 · Msambazaji'],t:['Made by known makers','Imetengenezwa na watengenezaji wanaojulikana'],p:['We buy from established manufacturers and their licensed distributors, chosen for quality first and price second. Each supplier is scored on quality, on-time delivery and price.','Tunanunua kutoka kwa watengenezaji wanaojulikana na wasambazaji wao wenye leseni, ubora kwanza, bei baadaye. Kila msambazaji anapimwa kwa ubora, kuleta kwa wakati na bei.'],w:['The buyer (a founder in year one)','Mnunuzi (mwanzilishi mwaka wa kwanza)'],g:['Quality at the source','Ubora tangu chanzo']},
 {img:'c-docs',at:27,k:['Step 2 · Registration','Hatua 2 · Usajili'],t:['Registered, or not listed','Imesajiliwa, au haiorodheshwi'],p:['Before the first order, every supplier sends TMDA registration certificates and samples. A product that is not registered is never listed. Each item has four to five registered brands, so the shelf is never empty.','Kabla ya oda ya kwanza, kila msambazaji anatuma vyeti vya usajili wa TMDA na sampuli. Bidhaa isiyosajiliwa haiorodheshwi kamwe. Kila bidhaa ina chapa nne hadi tano zilizosajiliwa, ili rafu isiwe tupu.'],w:['Buyer and compliance lead','Mnunuzi na msimamizi wa sheria'],g:['Customers from counterfeits','Wateja dhidi ya bidhaa bandia']},
 {img:'c-dash',at:45,k:['Step 3 · Planning','Hatua 3 · Mipango'],t:['Planned, not guessed','Imepangwa, haikukisiwa'],p:['Members confirm or change their boxes twelve days before delivery, so part of next month’s demand is known in advance. The system turns it into draft purchase orders, with a buffer for each supplier’s lead time.','Wanachama wanathibitisha au kubadilisha box zao siku kumi na mbili kabla, hivyo sehemu ya mahitaji ya mwezi ujao inajulikana mapema. Mfumo unaigeuza kuwa oda za ununuzi, pamoja na akiba ya muda wa kila msambazaji.'],w:['The system drafts; the buyer approves in 24 h','Mfumo unaandaa; mnunuzi anaidhinisha ndani ya saa 24'],g:['Cash, and against empty shelves','Pesa, na dhidi ya rafu tupu']},
 {img:'c-inspect',at:67,k:['Step 4 · Import','Hatua 4 · Uingizaji'],t:['Permit and clearance','Kibali na forodha'],p:['Imports arrive through the port of Dar es Salaam. A licensed clearing agent presents the TMDA import permit with the invoice, packing list and bill of lading; any consignment can be inspected. Local suppliers deliver on fixed days each week.','Bidhaa za nje zinafika kupitia bandari ya Dar es Salaam. Wakala wa forodha mwenye leseni anawasilisha kibali cha TMDA pamoja na ankara, orodha ya mzigo na hati ya usafirishaji; mzigo wowote unaweza kukaguliwa. Wasambazaji wa ndani wanaleta siku maalum kila wiki.'],w:['Licensed clearing agent','Wakala wa forodha mwenye leseni'],g:['The licence and the timeline','Leseni na ratiba']},
 {img:'c-scan',at:87,k:['Step 5 · Goods-in','Hatua 5 · Kupokea mzigo'],t:['Scanned once','Inaskaniwa mara moja'],p:['At goods-in every carton is scanned: product, batch number and expiry date are captured once and never typed again. Damaged or short deliveries are rejected on the spot.','Mzigo unapopokelewa kila katoni inaskaniwa: bidhaa, namba ya batch na tarehe ya mwisho vinarekodiwa mara moja tu. Mzigo ulioharibika au pungufu unakataliwa papo hapo.'],w:['Store lead and picker','Msimamizi wa duka na mchukuaji'],g:['Traceability and recalls','Ufuatiliaji na urejeshaji']},
 {img:'c-stock',at:96,k:['Step 6 · FEFO stock','Hatua 6 · Stoo ya FEFO'],t:['First expiry, first out','Kinachoisha kwanza, kinatoka kwanza'],p:['The system always picks the unit that expires first and flags anything near its date weeks ahead, so nothing old hides at the back. Store, app and WhatsApp share one live stock count.','Mfumo unachagua kinachoisha muda kwanza na kuonya kuhusu kinachokaribia tarehe wiki kadhaa kabla, hivyo hakuna cha zamani kinachojificha. Duka, programu na WhatsApp vinatumia hesabu moja ya stoo.'],w:['Handheld scanner, enforced by the system','Skana ya mkononi, inasimamiwa na mfumo'],g:['Freshness and margin','Ubichi na faida']},
 {img:'c-pay',at:114,k:['Step 7 · Store','Hatua 7 · Duka'],t:['One scan, six updates','Skani moja, mabadiliko sita'],p:['Shelves are refilled every evening. At the till, one scan lowers stock by one, checks the reorder point, sends the fiscal receipt by SMS, adds member points, links the batch to the buyer and feeds the founders’ 21:00 report.','Rafu zinajazwa kila jioni. Kwenye kaunta, skani moja inapunguza stoo kwa kimoja, inakagua kiwango cha kuagiza upya, inatuma risiti ya kodi kwa SMS, inaongeza pointi za mwanachama, inaunganisha batch na mnunuzi na inaingia kwenye ripoti ya waanzilishi ya saa tatu usiku.'],w:['Advisers at the counter','Washauri kaunta']},
 {img:'c-seal',at:127,k:['Step 8 · Packing','Hatua 8 · Upakiaji'],t:['Packed to schedule, with proof','Inapakiwa kwa ratiba, kwa uthibitisho'],p:['Member boxes are packed to a planned schedule. Each item is scanned against the packing list, the open box is photographed, then sealed and scanned out.','Box za wanachama zinapakiwa kwa ratiba iliyopangwa. Kila bidhaa inaskaniwa dhidi ya orodha, box iliyo wazi inapigwa picha, kisha inafungwa na kuskaniwa kutoka.'],w:['Packing team at the hub','Timu ya upakiaji']},
 {img:'c-riders',at:138,k:['Step 9 · Delivery','Hatua 9 · Usafirishaji'],t:['Same day, confirmed at the door','Siku hiyohiyo, inathibitishwa mlangoni'],p:['Riders are assigned by zone. Orders paid before 15:00 arrive the same day. A one-time code or a photo closes each order and tells the payer, even one abroad, that it arrived.','Wasafirishaji wanapangwa kwa kanda. Oda zilizolipwa kabla ya saa tisa zinafika siku hiyohiyo. Namba ya mara moja au picha inafunga oda na kumjulisha aliyelipa, hata akiwa nje ya nchi.'],w:['Riders, assigned by the system','Wasafirishaji, wanapangwa na mfumo']},
 {img:'c-care',at:155,k:['Step 10 · Aftercare','Hatua 10 · Huduma baada ya mauzo'],t:['The next month starts here','Mwezi ujao unaanzia hapa'],p:['The care team answers questions on WhatsApp, handles returns and refunds to mobile money, and the next reminder is already scheduled. Every conversation feeds back into buying.','Timu ya huduma inajibu maswali kwenye WhatsApp, inashughulikia marejesho na kurudisha pesa kwa simu, na ukumbusho unaofuata tayari umepangwa. Kila mazungumzo yanarudi kwenye ununuzi.'],w:['Care team','Timu ya huduma']}];
CH10.forEach(x=>{if(!x.g)x.g=x.k[0].includes('Store')?['Speed, accuracy and the receipt','Kasi, usahihi na risiti']:x.k[0].includes('Packing')?['The box, before it leaves','Box, kabla haijaondoka']:x.k[0].includes('Delivery')?['The promise at the door','Ahadi mlangoni']:['The monthly habit','Mazoea ya kila mwezi']});
(function(id,css){if(typeof addCSS==='function')return addCSS(id,css);if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;(document.head||document.documentElement).appendChild(st)})('p23f',`
.p23v{margin-top:18px;border-radius:20px;overflow:hidden;border:1px solid rgba(95,191,143,.25);background:#000}.p23v video{display:block;width:100%;aspect-ratio:16/9;background:#000}
.p23s{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:18px}
.p23s article{display:grid;grid-template-columns:minmax(0,1fr);border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03)}
.p23s figure{margin:0;position:relative;aspect-ratio:16/8;overflow:hidden}.p23s figure img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.2s}.p23s article:hover img{transform:scale(1.05)}
.p23s .n{position:absolute;left:12px;top:10px;font:500 1.5rem var(--f-hud,monospace);color:#5fbf8f;text-shadow:0 2px 8px rgba(0,0,0,.6)}
.p23s .go{position:absolute;right:10px;bottom:10px;border:0;border-radius:999px;padding:7px 12px;background:rgba(2,8,6,.75);color:#fff;font:600 .74rem var(--f-hud,monospace);cursor:pointer;backdrop-filter:blur(6px)}
.p23s .tx{padding:16px 18px 18px}.p23s small{font:600 .64rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#f2c96b}
.p23s h4{margin:6px 0 8px;font:700 1.12rem/1.2 var(--f-display,inherit)}.p23s p{margin:0;line-height:1.6;font-size:.92rem;color:rgba(244,251,247,.82)}
.p23s dl{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0 0}.p23s dt{font:600 .6rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:rgba(244,251,247,.55)}.p23s dd{margin:2px 0 0;font-size:.84rem}
@media(max-width:820px){.p23s{grid-template-columns:1fr}}
`);
window.SECTIONS['s2-3']={
 render(s,p,pv,nx){
  return secShell({s,p,pv,nx,cls:'p2',
   img:'img/c-port.webp',imgAlt:'Concept image: a container ship docking at the port of Dar es Salaam at sunrise',
   h1:'From factory to front door,',em:'one chain, one system.',
   lede:'Every product follows the same chain: sourced from a known manufacturer, checked for TMDA registration, planned against member demand, cleared through the port, scanned once at goods-in, picked first-expiry-first-out, sold or packed, delivered with proof and followed up. Goods move forward, money moves back, and every step is recorded in one system. The film shows the chain in ten steps; the diagram below groups them into seven stages.',
   mods:[
    ['The problem · where health supply chains fail',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Unchecked products reach the shelf.</b> In September 2026 TMDA and the police seized two consignments in Dar es Salaam worth about TSh 300 million, including 20 boxes of medicines imported from India that were not registered in Tanzania ${C('dn',1)}.</li>
      <li><b>Expired stock goes unnoticed.</b> Without batch and expiry tracking, a shop sells the newest carton first and finds the old one when it is too late.</li>
      <li><b>Shelves run empty.</b> Reorders made from memory arrive after the last unit is sold, and the customer goes elsewhere.</li>
      <li><b>Recalls cannot be traced.</b> When a supplier recalls a batch, most shops cannot say who bought it. Afya Basics records every step once, so each unit can be traced.</li></ol></div>
     <p class="oneline" style="margin-top:30px">The rules are clear: imports need a <b>TMDA licence or permit</b>, and regulated products may be sold only when <b>registered</b> ${C('act',2)}. The Afya system makes compliance automatic.</p>
     ${p2ksplit('prod-heart','Concept image: diabetes and blood-pressure supplies laid out on white marble',`<span class="p2k-k">What “registered only” means in practice</span><h3>Every unit has a <em>name, a batch and a date.</em></h3>
      <p>Take one shelf in the Heart &amp; Diabetes zone: glucose meters, test strips, lancets and an upper-arm monitor. Before any of it reaches the shelf, four checks are made once and recorded permanently.</p>
      <ul><li><b>Supplier file.</b> The manufacturer in China or India sends registration certificates and samples before the first order; unregistered lines are not listed.</li><li><b>Import permit.</b> A licensed clearing agent prepares the TMDA permit and customs papers before goods land ${C('log',3)}.</li><li><b>Goods-in scan.</b> Batch and expiry are captured, so the shelf is picked first-expiry-first-out and nothing old hides at the back.</li><li><b>Traced to the buyer.</b> Each sale links the batch to the customer’s account, so a recall reaches the right families in minutes.</li></ul>`,{rev:1,pos:'50% 50%',cap:'Concept flat lay · example products, not final range'})}`],
    ['Watch it · the chain in ten steps',`
     <p class="s11lead">${B2('The film follows one Mother & Baby Box through all ten steps of the chain, narrated in English or Kiswahili. Below it, each step is set out in full: what happens, who is responsible and what it protects.','Filamu inafuata Box moja ya Mama na Mtoto kupitia hatua zote kumi za mnyororo, kwa masimulizi ya Kiswahili au Kiingereza. Chini yake kila hatua inaelezwa kikamilifu: nini kinafanyika, nani anahusika na inalinda nini.')}</p>
     <div class="p23v"><video id="p23vid" controls playsinline preload="metadata" poster="media/p-afya-chain.jpg"><source src="${window.AFYA_LANG==='sw'?'/_blob/435de6691a5e95c1c6a46fbaedfedbcc':'/_blob/5ae50546d50f352fa3ab8593261f02ce'}" type="video/mp4"></video></div>
     <div class="p23s">${CH10.map((x,i)=>`<article><figure><img src="img/${x.img}.webp" alt="Concept image: ${esc(x.t[0])}" loading="lazy" width="1680" height="945"><span class="n">${String(i+1).padStart(2,'0')}</span><button type="button" class="go" data-t="${x.at}" aria-label="Play this step in the film">▶ ${Math.floor(x.at/60)}:${String(x.at%60).padStart(2,'0')}</button></figure><div class="tx"><small>${B2(x.k[0],x.k[1])}</small><h4>${B2(x.t[0],x.t[1])}</h4><p>${B2(x.p[0],x.p[1])}</p><dl><div><dt>${B2('Who','Nani')}</dt><dd>${B2(x.w[0],x.w[1])}</dd></div><div><dt>${B2('Protects','Inalinda')}</dt><dd>${B2(x.g[0],x.g[1])}</dd></div></dl></div></article>`).join('')}</div>`,'p23film'],
    ['Our answer · three operating rules',`
     <div class="pillars">
      <div class="pill"><span class="k">Rule 1</span><b>Registered in, traced out</b><p>Nothing enters stock without its registration, batch and expiry captured at goods-in. From then on every unit is traceable to the customer who bought it.</p></div>
      <div class="pill"><span class="k">Rule 2</span><b>The system issues the reminders</b><p>Reorder points, expiry dates, box renewals and licence renewals all trigger alerts, so a small team does not rely on memory.</p></div>
      <div class="pill"><span class="k">Rule 3</span><b>Every cost has a payer</b><p>Each stage’s cost is recovered in a price the customer pays: shelf price, box price or delivery fee.</p></div>
     </div>`],
    ['How it works · the chain in seven stages',`
     <p class="s11lead">Press play to step through the seven stages, or select any stage. Switch layers to follow <b style="color:#b5dfc6">goods</b> moving forward, <b style="color:#ffe7a8">money</b> moving back from customer to supplier, and <b style="color:#bff4ff">data</b> flowing into the system at every step.</p>
     <div class="p2-fctl"><div class="l" id="p2lay" role="group" aria-label="Layer">
       <button type="button" class="on" data-k="goods" style="--c:#5fbf8f"><i></i>Goods</button><button type="button" data-k="money" style="--c:#f2c96b"><i></i>Money</button><button type="button" data-k="data" style="--c:#d9b56e"><i></i>Data</button><button type="button" data-k="all" style="--c:#ffffff"><i></i>All three</button></div>
      <div class="l" style="align-items:center"><span class="st" id="p2fst">Stage 1 of 7</span><button type="button" class="pp" id="p2pp" aria-label="Play">${PLAY}</button></div></div>
     <div class="p2-flow" id="p2flow" data-l="goods">${flowSVG('d')}${flowSVG('m')}</div>
     <div class="p2-stg" id="p2stg" role="group" aria-label="Stages">${ST.map((x,i)=>`<button type="button" data-i="${i}">${i+1} · ${esc(x.t)}</button>`).join('')}</div>
     <div class="p2-fdet" id="p2fdet" aria-live="polite"></div>`,'flow'],
    ['Goods, money and data · one system',`
     <div class="p2-3f">
      <div style="--c:#5fbf8f"><h4><i></i>Goods move forward</h4><ol><li><b>Factory</b> in China or India ships against our purchase order.</li><li><b>Port or airport:</b> TMDA permit and customs clearance ${C('log',3)}.</li><li><b>Goods-in:</b> scanned with batch and expiry.</li><li><b>Shelf or hub:</b> picked first-expiry-first-out.</li><li><b>Customer:</b> in store, collected, delivered or boxed.</li></ol></div>
      <div style="--c:#f2c96b"><h4><i></i>Money moves back</h4><ol><li><b>Customer pays</b> by mobile money, card or cash; members pay on their plan.</li><li><b>The till records it once</b> and issues the fiscal receipt ${C('tra',4)}.</li><li><b>20:30 cash-up</b> by two people, matched against the system.</li><li><b>Bank:</b> pays suppliers, duties, riders, staff and rent.</li><li><b>Margin</b> that remains funds growth and the next store.</li></ol></div>
      <div style="--c:#d9b56e"><h4><i></i>Data flows into one system</h4><ol><li><b>Every scan</b> updates stock, money and member points at once.</li><li><b>Reorder point reached:</b> a purchase order is drafted for approval.</li><li><b>Box window closes:</b> the locked packing list goes to the hub.</li><li><b>Order paid:</b> the rider is assigned by zone automatically.</li><li><b>21:00:</b> the founders receive the daily report on WhatsApp.</li></ol></div>
     </div>
     <div class="p2-once" id="p2once"><span class="p2-k">Record once · one sale, six updates</span><p class="p2-sub" style="margin:0">A father buys a box of test strips at 10:42. One scan at the till triggers each of these updates ${tagi('Illustrative')}</p>
      <ul><li><span>10:42:01</span><div><b>Stock −1</b> on the shelf count and in the app, so online never oversells.</div></li><li><span>10:42:01</span><div><b>Reorder check:</b> 11 boxes left, reorder point 12, so a purchase order is drafted.</div></li><li><span>10:42:01</span><div><b>Member points</b> added to his account by phone number.</div></li><li><span>10:42:02</span><div><b>Fiscal receipt</b> issued and sent by SMS.</div></li><li><span>10:42:02</span><div><b>Batch linked</b> to his purchase, ready for any recall.</div></li><li><span>21:00</span><div><b>Daily report:</b> the sale appears in the founders’ WhatsApp summary.</div></li></ul></div>`],
    ['The experience · follow one order',`
     <p class="s11lead">Choose an order type and a time of order. The timeline shows each step and whether the speed target is met; the stages involved are highlighted in the flow above. ${tagi('Planning rules')}</p>
     <div class="p2-sim">
      <div class="p2-simin"><span class="p2-k">The order</span>
       <div class="p2-tabs" id="p2ord" role="group" aria-label="Order type" style="margin:0">${ORD.map((o,i)=>`<button type="button" data-k="${o.k}" class="${i===2?'on':''}">${esc(o.t)}</button>`).join('')}</div>
       <label>Time of order <output id="p2tout">11:20</output><input type="range" id="p2time" min="420" max="1320" step="5" value="680" aria-label="Time of order"></label>
       <p class="note">Store hours ${esc(IN.store.hours)} · same-day cut-off 15:00 · click &amp; collect 2 hours</p></div>
      <div class="p2-simout"><span class="p2-k g">What happens</span><ol class="p2-tl" id="p2tl"></ol><div class="p2-verdict" id="p2ver"></div></div>
     </div>
     ${p2kmos([['hub','Concept image: packing hub staff sealing closed green Afya boxes','Packed and sealed at the hub','Every order is picked first-expiry-first-out, sealed, photographed and scanned out. The box window closes 12 days before month end, so member boxes are packed to a planned schedule.','50% 40%'],['rider','Concept image: an Afya rider on an electric motorbike in Dar es Salaam','Delivered the same day','Orders paid before 15:00 are assigned to a rider by zone. Rider cost is about '+F.tsh(IN.online.rider_cost_per_order)+' an order against a '+F.tsh(IN.online.delivery_fee)+' delivery fee (planning estimate).','55% 45%'],['boxdoor','Concept image: an Afya rider handing a closed green box to a mother with her baby at her door','Confirmed at the door','A photo or a one-time code closes the order and notifies the payer, including a relative abroad, that it has arrived.','50% 40%']])}`,'try-flow'],
    ['The numbers · each stage’s cost and its payer',`
     <p class="s11lead">The cost each stage creates and the price element that recovers it from the customer, with values from the master model (Flagship option). ${PE}</p>
     ${scen('p2sc3','base')}
     <table class="p2-cost"><thead><tr><th>Stage</th><th>Cost it creates</th><th>Recovered by</th><th>Model value</th></tr></thead><tbody id="p2cost"></tbody></table>
     <div class="nums" id="p2n3" style="margin-top:14px"></div>
     <p class="note">Planning estimates · the check-station line is derived from model inputs (checks per day × check-to-purchase × basket × retail margin)</p>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">A shipment is held at customs or a permit is delayed.</span><span class="ar">→</span><span class="a">Reorder points include a lead-time buffer, the range avoids single-source items, and a licensed clearing agent prepares the TMDA permit and documents before goods land.</span></div>
      <div class="risk"><span class="q">A new brand is not yet registered with TMDA.</span><span class="ar">→</span><span class="a">It does not enter the range until it is registered. With 4–5 registered brands per item, the shelf is not left empty.</span></div>
      <div class="risk"><span class="q">Expired or near-expiry stock.</span><span class="ar">→</span><span class="a">Expiry is captured at goods-in, FEFO picking is enforced by the handheld, and near-expiry alerts reach the store lead weeks ahead.</span></div>
      <div class="risk"><span class="q">The internet fails or a rider is unavailable.</span><span class="ar">→</span><span class="a">The till continues selling offline and syncs later. Deliveries are reassigned automatically to another rider, and the customer is told before a promise is missed.</span></div>
      <div class="risk"><span class="q">Import fees and lead times are not yet confirmed.</span><span class="ar">→</span><span class="a">They are planning assumptions until supplier quotations and an agent’s quote are in hand. Section 4.2 holds the landed-cost model.</span></div>
     </div>`]
   ],
   takeaway:'One chain, recorded once, delivers <b>legal stock, fresh stock and full shelves</b> with a <b>small team</b>. Every operating cost along the chain is <b>recovered in customer prices</b>.',
   doors:['s4-2','s4-3','s4-1','s4-5'],
   sources:[S.act,S.dn,S.log,S.tra]});
 },
 init(){
  {const v=$('p23vid');if(v){if(!v.querySelector('track'))[['en','English','media/afya-chain.en.txt'],['sw','Kiswahili','media/afya-chain.sw.txt']].forEach(([l,lab,src])=>fetch(src).then(r=>r.ok?r.text():Promise.reject()).then(t=>{const k=document.createElement('track');k.kind='subtitles';k.srclang=l;k.label=lab;k.src=URL.createObjectURL(new Blob([t],{type:'text/vtt'}));v.appendChild(k);setTimeout(()=>{for(const tt of v.textTracks)tt.mode=(tt.language==='sw'&&document.documentElement.classList.contains('p0-swon'))?'showing':'disabled'},60)}).catch(()=>{}));document.querySelectorAll('.p23s .go').forEach(b=>b.onclick=()=>{v.scrollIntoView({behavior:'smooth',block:'center'});v.currentTime=+b.dataset.t;v.play().catch(()=>{})})}}
  const flow=$('p2flow');if(!flow)return;
  let cur=0,playing=false,tm=null;
  const det=$('p2fdet'),stb=[...document.querySelectorAll('#p2stg button')],pp=$('p2pp');
  const show=(i,dim)=>{cur=i;const x=ST[i];
   flow.querySelectorAll('.p2-fn').forEach(n=>{const k=+n.dataset.i;n.classList.toggle('on',k===i);n.classList.toggle('dim',!!dim&&!dim.includes(k))});
   stb.forEach((b,k)=>b.classList.toggle('on',k===i));$('p2fst').textContent='Stage '+(i+1)+' of 7';
   det.innerHTML=`<div class="p2-fdl"><figure class="p2-fdph"><img src="img/${STPH[i][0]}.webp" alt="${STPH[i][2]}" width="1680" height="944" style="object-position:${STPH[i][1]}"><span class="p2k-cap">Concept image</span></figure><span class="n">Stage ${i+1} · ${esc(x.s)}</span><h3>${esc(x.t)}</h3><p>${x.p}${i===1?' '+C('act',2)+' '+C('log',3)+' '+C('dn',1):''}${i===4?' '+C('tra',4):''}</p></div>
    <div class="p2-fdg"><div><small>Who does it</small><p>${x.who}</p></div><div><small>With which tool</small><p>${x.tool}</p></div><div><small>Time target</small><p>${x.time}</p></div><div><small>Cost recovered from the customer</small><p>${x.cost}</p></div></div>`;
   det.classList.remove('p2-swap');void det.offsetWidth;det.classList.add('p2-swap')};
  const stop=()=>{playing=false;clearInterval(tm);pp.innerHTML=PLAY;pp.setAttribute('aria-label','Play')};
  const play=()=>{playing=true;pp.innerHTML=PAUSE;pp.setAttribute('aria-label','Pause');show((cur+1)%7);clearInterval(tm);tm=later(setInterval(()=>show((cur+1)%7),3600))};
  pp.onclick=()=>playing?stop():play();
  flow.querySelectorAll('.p2-fn').forEach(n=>{n.onclick=()=>{stop();show(+n.dataset.i)};n.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();stop();show(+n.dataset.i)}}});
  stb.forEach((b,i)=>b.onclick=()=>{stop();show(i)});
  wireTabs($('p2lay'),k=>flow.dataset.l=k);
  addEventListener('afya:leave',stop,{once:true});
  show(0);
  /* record-once reveal */
  const once=$('p2once');if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){once.classList.add('go');once.querySelectorAll('li').forEach((l,i)=>l.style.transitionDelay=(i*.18)+'s');io.disconnect()}},{threshold:.25});io.observe(once);addEventListener('afya:leave',()=>io.disconnect(),{once:true})}else once.classList.add('go');
  /* order simulator */
  let ok='sd';const tr=$('p2time');
  const run=(e)=>{const t=+tr.value;$('p2tout').textContent=hm(t);const r=sim(ok,t);
   $('p2tl').innerHTML=r.L.map(x=>`<li><time>${x[0]}</time><i></i><div>${x[1]}</div></li>`).join('');
   const v=$('p2ver');v.textContent=r.v;v.classList.toggle('w',r.w);
   const o=ORD.find(x=>x.k===ok);if(e!==false)flow.querySelectorAll('.p2-fn').forEach(n=>n.classList.toggle('dim',!o.s.includes(+n.dataset.i)))};
  wireTabs($('p2ord'),k=>{ok=k;tr.disabled=k==='box';run()});tr.oninput=()=>run();run(false);
  /* numbers */
  const num=k=>{const B=MODEL.get(k),sc=IN.scenarios[k],o=IN.online,m=IN.members,ck=IN.check,st=IN.store;
   const mem=B.months[11].members,ord=o.orders_day_m12*sc.demand*30;
   const chkGP=ck.checks_day_m12*sc.demand*30*ck.check_to_purchase*st.basket*st.retail_gm,chkCost=IN.opex_month.check_station*sc.cost;
   const rows=[['Supplier','Product cost','One honest shelf price',F.pct(st.retail_gm)+' retail gross margin'],
    ['Import & TMDA','Freight, duties, clearing, permits','Landed cost inside the shelf price','In the same margin; quotes pending'],
    ['Stock · FEFO','Shrink and expiry','Retail margin, kept small by FEFO','Allowance within '+F.pct(st.retail_gm)],
    ['Store · hub','Box, packing and delivery','Charged at cost in the box price',F.tsh(m.packing_delivery_in_price)+' per medium box'],
    ['Customer','Till, systems, staff, rent','Shelf and box prices','Opex '+F.m(B.opex_month)+' / month'],
    ['Delivery · proof','Rider cost per order','Delivery fee (online) or box price',F.tsh(o.delivery_fee)+' fee vs '+F.tsh(o.rider_cost_per_order)+' cost'],
    ['Aftercare','Adviser time, warranty handling','Margin and card fees','Cards '+F.tsh(Math.min(...IN.cards.filter(c=>c.fee_year).map(c=>c.fee_year)))+'–'+F.tsh(Math.max(...IN.cards.map(c=>c.fee_year)))+' / yr']];
   $('p2cost').innerHTML=rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td class="n">${r[3]}</td></tr>`).join('');
   $('p2n3').innerHTML=[[Math.round(mem).toLocaleString('en-US'),'Boxes packed and delivered per month at month 12'],[F.auto(mem*m.packing_delivery_in_price),'Packing &amp; delivery paid inside box prices, per month',1],[Math.round(ord).toLocaleString('en-US'),'Online orders per month at month 12'],[F.auto(ord*(o.delivery_fee-o.rider_cost_per_order)),'Delivery fees left after rider cost, per month'],[F.auto(chkGP-chkCost),'Free Afya Check: margin from check-led sales minus kiosk cost, per month (derived)']].map(x=>`<div class="num${x[2]?' g':''}"><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')};
  wireTabs($('p2sc3'),num);num('base');
 }};
})();
