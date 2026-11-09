/* part3a — Part 3 The experience: 3.1 The store · 3.2 Customer journey & fast checkout · 3.3 Afya Check Station · 3.4 Membership and cards
   All business numbers come from MODEL (planning estimates). Illustrative examples are labelled. */
(function(){
const M=window.MODEL, I=M.inputs, F=M.fmt;
const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
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
const P3={timers:[],rafs:[]};
const p3clear=()=>{P3.timers.forEach(t=>{clearTimeout(t);clearInterval(t)});P3.rafs.forEach(r=>cancelAnimationFrame(r));P3.timers=[];P3.rafs=[]};
window.addEventListener('afya:leave',p3clear);
const later=(fn,ms)=>{const t=setTimeout(fn,ms);P3.timers.push(t);return t};
const every=(fn,ms)=>{const t=setInterval(fn,ms);P3.timers.push(t);return t};
const $=id=>document.getElementById(id);
const OK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const sv=(p,w)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w||1.6}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const IX={
 screen:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>',
 label:'<rect x="3" y="7" width="18" height="10" rx="2"/><path d="M7 12h6M16 10.5v3"/>',
 kiosk:'<rect x="7" y="2" width="10" height="13" rx="1.5"/><path d="M12 15v5M8 21h8"/>',
 cart:'<path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/>',
 lock:'<rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 wifi:'<path d="M2 9a15 15 0 0 1 20 0M5.5 12.5a10 10 0 0 1 13 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="19.5" r="1"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 19V5"/>',
 hand:'<path d="M3 7h13v10H3zM16 10h3l2 3v4h-5"/><circle cx="7" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/>',
 cam:'<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 sms:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>'};

(function(id,css){if(typeof addCSS==='function')return addCSS(id,css);if(document.getElementById('css-'+id))return;const st=document.createElement('style');st.id='css-'+id;st.textContent=css;(document.head||document.documentElement).appendChild(st)})('part3a',`
.p3 .s11lead b{color:var(--ink)}
.p3 .nums .num b{font-size:clamp(1.15rem,1.7vw,1.6rem);white-space:nowrap}
.p3-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p3-card{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.p3-card h3{font:700 1.05rem var(--f-display)}
.p3-card p{margin:8px 0 0;color:var(--ink2);font-size:.9rem;line-height:1.55}
.p3-k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:6px}
.p3-btns{display:flex;flex-wrap:wrap;gap:8px}
.p3-b{display:inline-flex;align-items:center;gap:8px;padding:10px 15px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.55);color:var(--ink2);font:600 .84rem var(--f-body);cursor:pointer;transition:all .2s}
.p3-b:hover{color:var(--ink);border-color:var(--edge2)}
.p3-b.on{color:#1a1204;background:linear-gradient(135deg,var(--gold2),var(--gold));border-color:transparent}
.p3-b.go{color:#021510;background:linear-gradient(135deg,var(--neon2),var(--neon));border-color:transparent}
.p3-b svg{width:16px;height:16px}
.p3-b:disabled{opacity:.45;cursor:not-allowed}
/* 3.1 floor plan */
.p3-planw{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(0,1fr);gap:16px;align-items:start}
.p3-plan{position:relative;border-radius:24px;border:1px solid var(--edge2);background:radial-gradient(700px 400px at 30% 20%,rgba(95,191,143,.08),transparent 60%),#03100c;padding:14px;min-width:0}
.p3-plan svg{display:block;width:100%;height:auto}
.p3-plan .z{cursor:pointer;transition:opacity .25s,filter .25s}
.p3-plan .z:hover,.p3-plan .z.on{filter:drop-shadow(0 0 12px var(--zc)) brightness(1.25)}
.p3-plan.dimmed .z:not(.on){opacity:.35}
.p3-plan text{font-family:var(--f-body);pointer-events:none}
.p3-plan .lb{font:600 22px var(--f-hud);letter-spacing:.14em;fill:#effaf5}
.p3-plan .sm{font:500 18px var(--f-hud);letter-spacing:.08em;fill:#8fb0a3}
.p3-plan .nb{font:700 20px var(--f-hud)}
.p3-pbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:12px}
.p3-pclock{margin-left:auto;font:500 .78rem var(--f-hud);letter-spacing:.1em;color:var(--gold2)}
.p3-pinfo{padding:22px;border-radius:22px;border:1px solid var(--edge);background:var(--panel);min-height:100%}
.p3-pinfo h3{font:800 1.3rem/1.15 var(--f-display);margin-top:6px}
.p3-pinfo p{color:var(--ink2);font-size:.92rem;line-height:1.6;margin:10px 0 0}
.p3-pinfo ul{margin:12px 0 0;padding-left:18px;color:var(--ink2);font-size:.88rem;line-height:1.55}
.p3-pinfo .why{margin-top:14px;padding:12px 14px;border-radius:12px;border:1px solid var(--edge2);background:rgba(242,201,107,.07);font-size:.86rem;color:var(--ink)}
.p3-pinfo .why b{display:block;font:500 .58rem var(--f-hud);letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:3px}
.p3-legend{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin-top:12px}
.p3-legend button{display:flex;align-items:center;gap:8px;text-align:left;padding:8px 10px;border-radius:10px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .76rem var(--f-body);cursor:pointer;min-width:0}
.p3-legend button i{flex:0 0 20px;height:20px;border-radius:6px;background:var(--zc);display:grid;place-items:center;font:700 .62rem var(--f-hud);font-style:normal;color:#04100d}
.p3-legend button.on{border-color:var(--zc);color:var(--ink)}
.p3-walk{margin-top:12px;padding:14px 16px;border-radius:14px;border:1px solid rgba(95,191,143,.3);background:rgba(95,191,143,.06);font-size:.9rem;color:var(--ink);min-height:54px}
.p3-walk b{color:var(--neon2)}
/* interior hotspots */
.p3-int{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:18px;align-items:start}
.p3-int .shot{margin:0}
.p3-hs{position:absolute;z-index:3;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;border:2px solid var(--gold2);background:rgba(2,8,6,.72);color:var(--gold2);font:700 .74rem var(--f-hud);cursor:pointer;display:grid;place-items:center;transition:transform .2s,background .2s,box-shadow .3s}
.p3-hs.on,.p3-hs:hover{background:var(--gold);color:#1a1204;transform:scale(1.15);box-shadow:0 0 0 8px rgba(242,201,107,.22),0 0 22px var(--gold)}
.p3-hsl{list-style:none;margin:0;padding:0;display:grid;gap:6px}
.p3-hsl li{display:grid;grid-template-columns:28px minmax(0,1fr);gap:12px;padding:11px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;transition:all .2s}
.p3-hsl li span{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--edge2);font:700 .72rem var(--f-hud);color:var(--gold2)}
.p3-hsl li b{font:700 .9rem var(--f-display)}
.p3-hsl li p{margin:2px 0 0;font-size:.82rem;line-height:1.45;color:var(--ink2);display:none}
.p3-hsl li.on{border-color:var(--edge2);background:linear-gradient(90deg,rgba(242,201,107,.12),rgba(2,6,8,.4))}
.p3-hsl li.on p{display:block}
.p3-hsl li.on span{background:var(--gold);color:#1a1204}
/* tech grid */
.p3-tech{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p3-t{display:grid;grid-template-columns:34px minmax(0,1fr);gap:14px;padding:18px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3-t>span{font:500 .78rem var(--f-hud);color:var(--gold);letter-spacing:.08em;padding-top:3px;border-top:1px solid rgba(242,201,107,.45);height:max-content}
.p3-t>span svg{width:20px;height:20px}
.p3-t b{font:700 .92rem var(--f-display)}
.p3-t p{margin:4px 0 0;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p3-t small{display:block;margin-top:6px;font:500 .6rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.p3-calm{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p3-calm div{padding:20px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0}
.p3-calm b{display:block;font:700 1rem var(--f-display);color:var(--ink)}
.p3-calm em{display:block;font:500 .6rem var(--f-hud);font-style:normal;letter-spacing:.2em;color:var(--neon);text-transform:uppercase;margin-bottom:8px}
.p3-calm p{margin:6px 0 0;font-size:.86rem;line-height:1.55;color:var(--ink2)}
.p3-calm small{display:block;margin-top:10px;padding-top:10px;border-top:1px solid var(--edge);font:600 .8rem var(--f-body);color:var(--gold2)}
/* 3.2 journeys */
.p3-jtabs{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:16px}
.p3-jtabs button{text-align:left;padding:13px 15px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);cursor:pointer;min-width:0;transition:all .2s}
.p3-jtabs button b{display:block;font:700 .9rem var(--f-display);color:var(--ink)}
.p3-jtabs button span{display:block;margin-top:3px;font:500 .64rem var(--f-hud);letter-spacing:.1em;color:var(--neon)}
.p3-jtabs button.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#3a2a08}
.p3-jtabs button.on b{color:#1a1204}.p3-jtabs button.on span{color:#5a3f06}
.p3-jbox{padding:24px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p3-kctx{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:24px;align-items:center;margin-bottom:18px}
.p3-kctx p{color:var(--ink2);font-size:.92rem;line-height:1.65;margin:0 0 10px}.p3-kctx p b{color:var(--ink)}
@media(max-width:860px){.p3-kctx{grid-template-columns:1fr}}
.p3-jhero{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.4fr);gap:22px;align-items:center;margin-bottom:6px}
.p3-jhero .edp-ph img{aspect-ratio:4/3}
.p3-jwhy{flex-basis:100%;margin-top:4px;padding:12px 14px;border-left:2px solid var(--gold);background:rgba(242,201,107,.06);border-radius:0 12px 12px 0;font-size:.86rem;line-height:1.6;color:var(--ink2)}
.p3-jwhy b{display:block;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
@media(max-width:860px){.p3-jhero{grid-template-columns:1fr}}
.p3-jhead{display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px 24px;align-items:flex-end}
.p3-jhead h3{font:800 1.4rem var(--f-display)}
.p3-jhead p{margin:6px 0 0;color:var(--ink2);font-size:.9rem;max-width:60ch}
.p3-jt{text-align:right}
.p3-jt b{display:block;font:500 2rem/1 var(--f-hud);color:var(--neon);text-shadow:0 0 18px rgba(95,191,143,.45)}
.p3-jt small{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.p3-jbar{position:relative;display:flex;height:40px;margin:22px 0 8px;border-radius:10px;overflow:visible;background:rgba(95,191,143,.06);border:1px solid var(--edge)}
.p3-jbar span{position:relative;height:100%;display:grid;place-items:center;font:600 .7rem var(--f-hud);color:#04100d;overflow:hidden;white-space:nowrap;border-right:2px solid #03100c;animation:p3grow .7s cubic-bezier(.2,.8,.2,1) both}
.p3-jbar span:first-child{border-radius:9px 0 0 9px}
@keyframes p3grow{from{transform:scaleX(0);transform-origin:left}}
.p3-jbar .tg{position:absolute;top:-8px;bottom:-8px;width:2px;background:var(--gold);box-shadow:0 0 10px var(--gold)}
.p3-jbar .tg i{position:absolute;bottom:-22px;right:-2px;font:500 .6rem var(--f-hud);font-style:normal;color:var(--gold2);white-space:nowrap;letter-spacing:.1em}
.p3-jsteps{list-style:none;margin:34px 0 0;padding:0;display:grid;grid-template-columns:repeat(var(--n,5),minmax(0,1fr));gap:10px;counter-reset:js}
.p3-jsteps li{position:relative;padding:16px 16px 16px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.45);min-width:0}
.p3-jsteps li::before{content:"";position:absolute;inset:0 0 auto;height:3px;border-radius:16px 16px 0 0;background:var(--sc)}
.p3-jsteps em{font:500 .66rem var(--f-hud);font-style:normal;color:var(--sc)}
.p3-jsteps b{display:block;margin-top:4px;font:700 .92rem var(--f-display)}
.p3-jsteps p{margin:6px 0 0;font-size:.82rem;line-height:1.5;color:var(--ink2)}
.p3-jfoot{margin-top:14px;font-size:.88rem;color:var(--ink2)}
.p3-jfoot b{color:var(--gold2)}
/* scan-and-go demo */
.p3-demo{display:grid;grid-template-columns:minmax(0,1fr) 320px minmax(0,1fr);gap:22px;align-items:center;padding:26px;border-radius:26px;border:1px solid var(--edge2);background:radial-gradient(500px 380px at 50% 40%,rgba(95,191,143,.12),transparent 65%),linear-gradient(160deg,#071a13,#020807)}
.p3-shelf{display:grid;gap:8px}
.p3-shelf h4,.p3-watch h4{margin:0 0 4px;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p3-prod{display:grid;grid-template-columns:44px minmax(0,1fr) auto;align-items:center;gap:12px;padding:10px 12px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink);cursor:pointer;text-align:left;font:inherit;transition:all .2s}
.p3-prod:hover{border-color:var(--neon);box-shadow:0 0 22px -8px var(--neon)}
.p3-prod:disabled{opacity:.4;cursor:not-allowed;box-shadow:none;border-color:var(--edge)}
.p3-bc{height:32px;border-radius:5px;background:repeating-linear-gradient(90deg,#effaf5 0 2px,transparent 2px 4px,#effaf5 4px 5px,transparent 5px 8px,#effaf5 8px 11px,transparent 11px 12px);opacity:.85}
.p3-prod b{display:block;font:700 .84rem var(--f-display);line-height:1.25}
.p3-prod small{display:block;font-size:.72rem;color:var(--ink3)}
.p3-prod em{font:500 .78rem var(--f-hud);font-style:normal;color:var(--gold2)}
.p3-phone{position:relative;width:300px;height:610px;margin:0 auto;border-radius:44px;padding:12px;background:linear-gradient(160deg,#2b3531,#090d0b);box-shadow:0 40px 80px -20px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.1),0 0 60px -20px rgba(95,191,143,.5)}
.p3-phone::before{content:"";position:absolute;top:22px;left:50%;width:90px;height:22px;border-radius:20px;background:#090d0b;transform:translateX(-50%);z-index:5}
.p3-scr{position:relative;height:100%;border-radius:34px;overflow:hidden;background:#f5f8f6;color:#0b2219;display:flex;flex-direction:column;font-family:var(--f-body)}
.p3-stat{display:flex;justify-content:space-between;padding:14px 24px 0;font:600 .66rem var(--f-body);color:#0b2219}
.p3-apph{padding:26px 18px 12px;background:#0f7a52;color:#fff}
.p3-apph small{display:block;font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;opacity:.8}
.p3-apph b{display:block;font:800 1.05rem var(--f-display);margin-top:2px}
.p3-apph span{font-size:.7rem;opacity:.85}
.p3-cam{margin:12px 14px 0;height:86px;border-radius:14px;background:linear-gradient(160deg,#0b2219,#163d2e);position:relative;overflow:hidden;display:grid;place-items:center;color:#b5dfc6;font:600 .7rem var(--f-body)}
.p3-cam::before{content:"";position:absolute;inset:14px 40px;border:2px solid rgba(181,223,198,.7);border-radius:10px}
.p3-cam::after{content:"";position:absolute;left:40px;right:40px;height:2px;background:#5fbf8f;box-shadow:0 0 12px #5fbf8f;top:20px;animation:p3scan 1.8s ease-in-out infinite alternate}
.p3-cam.hit::before{border-color:#5fbf8f;box-shadow:0 0 0 4px rgba(95,191,143,.25)}
@keyframes p3scan{to{top:64px}}
.p3-items{flex:1;overflow:auto;padding:10px 14px 0;display:flex;flex-direction:column;gap:6px}
.p3-items .e{margin:auto;text-align:center;font-size:.76rem;color:#5b6f66;padding:0 20px}
.p3-it{display:flex;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:10px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.07);font-size:.74rem;animation:rise .35s both}
.p3-it b{font-weight:700;white-space:nowrap}
.p3-tot{padding:10px 16px 14px;border-top:1px solid #dfe8e3;background:#fff}
.p3-tot div{display:flex;justify-content:space-between;font-size:.72rem;color:#5b6f66}
.p3-tot div b{font:800 1rem var(--f-display);color:#0b2219}
.p3-pay{width:100%;margin-top:8px;padding:12px;border:0;border-radius:12px;background:#0b2219;color:#f2c96b;font:800 .86rem var(--f-body);cursor:pointer}
.p3-pay:disabled{opacity:.4;cursor:not-allowed}
.p3-ov{position:absolute;inset:0;z-index:4;display:none;flex-direction:column;justify-content:flex-end;background:rgba(5,20,14,.55);backdrop-filter:blur(2px)}
.p3-ov.on{display:flex;animation:rise .3s both}
.p3-sheet{margin:10px;padding:18px 16px 16px;border-radius:22px;background:#fff;box-shadow:0 -10px 40px rgba(0,0,0,.3)}
.p3-sheet h5{margin:0;font:800 .95rem var(--f-display);color:#0b2219}
.p3-sheet p{margin:6px 0 0;font-size:.74rem;color:#4b5f56;line-height:1.45}
.p3-pin{display:flex;justify-content:center;gap:12px;margin:14px 0}
.p3-pin i{width:14px;height:14px;border-radius:50%;border:2px solid #0f7a52;transition:background .15s}
.p3-pin i.f{background:#0f7a52}
.p3-sheet button{width:100%;padding:12px;border:0;border-radius:12px;background:#0f7a52;color:#fff;font:800 .84rem var(--f-body);cursor:pointer;margin-top:6px}
.p3-sheet button.alt{background:#eef4f0;color:#0b2219}
.p3-meth{display:grid;gap:6px;margin-top:12px}
.p3-meth label{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:12px;border:1.5px solid #dfe8e3;font-size:.78rem;font-weight:700;cursor:pointer}
.p3-meth label.on{border-color:#0f7a52;background:#eaf6f0}
.p3-meth input{accent-color:#0f7a52}
.p3-done{position:absolute;inset:0;z-index:4;display:none;flex-direction:column;background:#eaf2ee;padding:56px 14px 14px;gap:10px}
.p3-done.on{display:flex;animation:rise .35s both}
.p3-paid{display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:#0f7a52;color:#fff}
.p3-paid span{width:30px;height:30px;border-radius:50%;background:#fff;color:#0f7a52;display:grid;place-items:center}
.p3-paid span svg{width:18px;height:18px}
.p3-paid b{display:block;font:800 .9rem var(--f-display)}
.p3-paid small{font-size:.68rem;opacity:.9}
.p3-msg{align-self:flex-start;max-width:92%;padding:12px 13px;border-radius:4px 16px 16px 16px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.08);font-size:.7rem;line-height:1.5;color:#1d3329;animation:rise .4s .2s both}
.p3-msg b{color:#0f7a52}
.p3-msg .qr{float:right;width:44px;height:44px;margin:0 0 4px 8px;border-radius:4px;background:conic-gradient(#0b2219 25%,#fff 0 50%,#0b2219 0 75%,#fff 0) 0 0/11px 11px;border:3px solid #0b2219}
.p3-msg small{display:block;color:#7a8d84;font-size:.6rem;margin-top:4px}
.p3-watch{display:grid;gap:12px}
.p3-sw{padding:18px 20px;border-radius:18px;border:1px solid var(--edge);background:rgba(2,10,8,.6)}
.p3-sw small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--ink3)}
.p3-sw b{display:block;margin-top:6px;font:500 2.4rem/1 var(--f-hud);color:var(--ink)}
.p3-sw.big{border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.12),rgba(2,6,8,.6))}
.p3-sw.big b{font-size:3.2rem;color:var(--gold2)}
.p3-sw .bar{height:6px;border-radius:6px;background:rgba(255,255,255,.08);margin-top:12px;overflow:hidden}
.p3-sw .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--neon),var(--gold));transition:width .2s linear}
.p3-sw .verdict{margin-top:10px;font:600 .84rem var(--f-body);color:var(--ink2)}
.p3-sw .verdict.ok{color:var(--neon)}
.p3-log{list-style:none;margin:0;padding:0;display:grid;gap:4px;font:500 .72rem var(--f-hud);color:var(--ink2)}
.p3-log li{display:flex;gap:10px}.p3-log li em{font-style:normal;color:var(--gold2);flex:0 0 46px}
/* behind the 30 seconds */
.p3-seq{position:relative;padding:30px 24px 24px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p3-seqax{position:relative;height:2px;margin:36px 0 0;background:linear-gradient(90deg,var(--neon),var(--gold))}
.p3-seqax span{position:absolute;top:-6px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#03100c;border:2px solid var(--neon)}
.p3-seqax span i{position:absolute;top:-30px;left:50%;transform:translateX(-50%);font:500 .66rem var(--f-hud);font-style:normal;color:var(--gold2);white-space:nowrap}
.p3-seqg{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:10px;margin-top:22px}
.p3-seqg div{padding:14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45);min-width:0}
.p3-seqg b{display:block;font:700 .86rem var(--f-display)}
.p3-seqg em{display:block;font:500 .6rem var(--f-hud);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:var(--neon);margin-bottom:6px}
.p3-seqg p{margin:4px 0 0;font-size:.8rem;line-height:1.45;color:var(--ink2)}
/* speed dashboard */
.p3-dash{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p3-g{position:relative;display:grid;grid-template-columns:86px minmax(0,1fr);gap:14px;align-items:center;padding:18px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.72));min-width:0}
.p3-g svg{width:86px;height:86px}
.p3-g .ring{fill:none;stroke:rgba(95,191,143,.12);stroke-width:8}
.p3-g .arc{fill:none;stroke:url(#p3grad);stroke-width:8;stroke-linecap:round;transform:rotate(-90deg);transform-origin:50% 50%;transition:stroke-dashoffset 1.2s cubic-bezier(.2,.8,.2,1)}
.p3-g .val{font:600 15px var(--f-hud);fill:#effaf5;text-anchor:middle}
.p3-g .un{font:500 8px var(--f-hud);fill:#6a8a7d;text-anchor:middle;letter-spacing:1px}
.p3-g b{display:block;font:700 .9rem var(--f-display)}
.p3-g p{margin:4px 0 0;font-size:.78rem;line-height:1.45;color:var(--ink2)}
.p3-g small{display:block;margin-top:6px;font:500 .6rem var(--f-hud);letter-spacing:.12em;color:var(--gold);text-transform:uppercase}
/* 3.3 kiosk */
.p3-ev4{grid-template-columns:repeat(4,minmax(0,1fr))}
.p3-cmp{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:16px}
.p3-cmp ol{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:6px;counter-reset:rd}
.p3-cmp li{counter-increment:rd;display:grid;grid-template-columns:26px minmax(0,1fr);gap:10px;align-items:center;font-size:.88rem;color:var(--ink)}
.p3-cmp li::before{content:counter(rd);width:26px;height:26px;border-radius:50%;display:grid;place-items:center;font:600 .66rem var(--f-hud);color:#04100d;background:var(--neon)}
.p3-cmp .full li::before{background:var(--gold)}
.p3-cmp .full ol{grid-template-columns:1fr 1fr}
.p3-cmp .big{font:500 2.2rem/1 var(--f-hud);color:var(--neon);margin-top:8px}
.p3-cmp .full .big{color:var(--gold2)}
.p3-flow6{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:0;position:relative}
.p3-flow6>div{position:relative;padding:20px 16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3-flow6>div+div{border-left:0}
.p3-flow6>div:first-child{border-radius:18px 0 0 18px}.p3-flow6>div:last-child{border-radius:0 18px 18px 0}
.p3-flow6 .t{font:500 1.2rem var(--f-hud);color:var(--neon)}
.p3-flow6 b{display:block;margin-top:4px;font:700 .9rem var(--f-display)}
.p3-flow6 p{margin:6px 0 0;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p3-flow6 small{display:block;margin-top:8px;font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.p3-kdemo{display:grid;grid-template-columns:340px minmax(0,1fr);gap:26px;align-items:start;padding:26px;border-radius:26px;border:1px solid var(--edge2);background:radial-gradient(500px 400px at 25% 30%,rgba(95,191,143,.12),transparent 65%),linear-gradient(160deg,#071a13,#020807)}
.p3-kiosk{position:relative;width:300px;margin:0 auto}
.p3-kh{position:relative;border-radius:26px;padding:14px;background:linear-gradient(160deg,#f4f7f5,#cfd8d3);box-shadow:0 30px 60px -20px rgba(0,0,0,.7),0 0 50px -20px rgba(95,191,143,.4)}
.p3-kh::after{content:"AFYA CHECK";display:block;text-align:center;margin-top:10px;font:700 .62rem var(--f-hud);letter-spacing:.3em;color:#0f7a52}
.p3-ks{position:relative;height:430px;border-radius:14px;overflow:hidden;background:#fbfdfc;color:#0b2219;font-family:var(--f-body);display:flex;flex-direction:column}
.p3-kstand{width:70px;height:120px;margin:0 auto;background:linear-gradient(90deg,#c2ccc7,#eef2f0,#c2ccc7)}
.p3-kbase{width:190px;height:16px;margin:0 auto;border-radius:10px;background:linear-gradient(180deg,#e6ece9,#aab5af)}
.p3-kt{padding:14px 16px;background:#0f7a52;color:#fff}
.p3-kt small{display:block;font-size:.58rem;letter-spacing:.16em;text-transform:uppercase;opacity:.85}
.p3-kt b{font:800 .95rem var(--f-display)}
.p3-kb{flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:8px;overflow:auto}
.p3-kb p{margin:0;font-size:.74rem;line-height:1.5;color:#3d5249}
.p3-kopt{display:block;width:100%;text-align:left;padding:12px 14px;border-radius:12px;border:1.5px solid #d5e2db;background:#fff;cursor:pointer;font:inherit;color:#0b2219}
.p3-kopt:hover{border-color:#0f7a52}
.p3-kopt b{display:block;font:800 .84rem var(--f-display)}
.p3-kopt span{font-size:.7rem;color:#4b5f56}
.p3-kchk{display:flex;gap:9px;align-items:flex-start;font-size:.72rem;line-height:1.4;color:#1d3329;cursor:pointer}
.p3-kchk input{margin-top:2px;accent-color:#0f7a52}
.p3-kgo{padding:11px;border:0;border-radius:11px;background:#0f7a52;color:#fff;font:800 .8rem var(--f-body);cursor:pointer;margin-top:auto}
.p3-kgo:disabled{opacity:.35;cursor:not-allowed}
.p3-kgo.alt{background:#eef4f0;color:#0b2219;margin-top:6px}
.p3-ring{display:grid;place-items:center;margin:6px auto 0;position:relative;width:170px;height:170px}
.p3-ring svg{width:170px;height:170px;transform:rotate(-90deg)}
.p3-ring circle{fill:none;stroke-width:10}
.p3-ring .bg{stroke:#e2ece7}
.p3-ring .fg{stroke:#0f7a52;stroke-linecap:round;transition:stroke-dashoffset .25s linear}
.p3-ring div{position:absolute;text-align:center}
.p3-ring div b{display:block;font:800 1.7rem var(--f-display);color:#0b2219}
.p3-ring div small{font-size:.62rem;color:#5b6f66;letter-spacing:.1em;text-transform:uppercase}
.p3-kread{text-align:center;font-size:.76rem;color:#1d3329;font-weight:700;min-height:20px}
.p3-kdots{display:flex;flex-wrap:wrap;justify-content:center;gap:5px}
.p3-kdots i{width:8px;height:8px;border-radius:50%;background:#d5e2db}
.p3-kdots i.f{background:#0f7a52}
.p3-kres{display:grid;gap:5px}
.p3-kres div{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 9px;border-radius:9px;background:#f0f5f2;font-size:.68rem}
.p3-kres b{font:800 .74rem var(--f-display)}
.p3-dot{width:9px;height:9px;border-radius:50%;flex:0 0 9px}
.p3-rside h4{margin:0 0 6px;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p3-rlist{display:grid;gap:8px;margin-top:14px}
.p3-r{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:12px;align-items:start;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.55);animation:rise .4s both}
.p3-r i{width:12px;height:12px;border-radius:50%;margin-top:4px}
.p3-r b{font:700 .88rem var(--f-display)}
.p3-r p{margin:3px 0 0;font-size:.82rem;line-height:1.5;color:var(--ink2)}
.p3-r em{font:500 .8rem var(--f-hud);font-style:normal;color:var(--ink);white-space:nowrap}
.p3-ref{margin:0 0 4px;padding:14px 16px;border-radius:14px;font-size:.88rem;line-height:1.55}
.p3-ref.ok{border:1px solid rgba(95,191,143,.35);background:rgba(95,191,143,.07);color:var(--ink)}
.p3-ref.warn{border:1px solid rgba(242,201,107,.45);background:rgba(242,201,107,.08);color:var(--ink)}
.p3-ref.red{border:1px solid rgba(255,123,107,.55);background:rgba(255,123,107,.1);color:var(--ink)}
.p3-ref b{display:block;font:700 .92rem var(--f-display);margin-bottom:3px}
.p3-rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.p3-rules div{padding:16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);border-top:3px solid var(--rc)}
.p3-rules b{display:block;font:700 .86rem var(--f-display);color:var(--rc)}
.p3-rules p{margin:6px 0 0;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p3-funnel{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:center}
.p3-funnel svg{width:100%;height:auto;display:block}
.p3-funnel text{font-family:var(--f-body)}
.p3-priv{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
/* 3.4 cards */
.p3-cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;perspective:1400px;max-width:980px}
.p3-cw{min-width:0}
.p3-flip{position:relative;width:100%;aspect-ratio:1.586;cursor:pointer;transform-style:preserve-3d;transition:transform .8s cubic-bezier(.2,.8,.2,1);border:0;padding:0;background:none;display:block}
.p3-cw.fl .p3-flip{transform:rotateY(180deg)}
.p3-face{position:absolute;inset:0;border-radius:16px;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden;padding:14px 16px;display:flex;flex-direction:column;justify-content:space-between;text-align:left;color:#fff;box-shadow:0 24px 40px -18px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.14)}
.p3-face::before{content:"";position:absolute;inset:0;background:radial-gradient(140% 90% at 100% 0%,rgba(255,255,255,.28),transparent 45%),repeating-linear-gradient(120deg,rgba(255,255,255,.05) 0 2px,transparent 2px 9px);pointer-events:none}
.p3-face::after{content:"";position:absolute;right:-30%;bottom:-60%;width:90%;aspect-ratio:1;border-radius:50%;border:1px solid rgba(255,255,255,.18);box-shadow:0 0 0 18px rgba(255,255,255,.03),0 0 0 40px rgba(255,255,255,.025)}
.p3-face>*{position:relative;z-index:1}
.p3-fr{display:flex;justify-content:space-between;align-items:flex-start}
.p3-logo{display:flex;align-items:center;gap:7px;font:800 .7rem var(--f-display);letter-spacing:.04em}
.p3-logo svg{width:18px;height:18px}
.p3-chip{width:30px;height:22px;border-radius:5px;background:linear-gradient(135deg,#ffe7a8,#c9a14a);box-shadow:inset 0 0 0 1px rgba(0,0,0,.2)}
.p3-face .nm{font:800 clamp(.82rem,1.15vw,1.05rem) var(--f-display);letter-spacing:.01em}
.p3-face .no{font:500 .6rem var(--f-hud);letter-spacing:.18em;opacity:.8}
.p3-back{transform:rotateY(180deg);justify-content:flex-start;gap:6px}
.p3-back ul{margin:0;padding:0;list-style:none;display:grid;gap:3px;font-size:.66rem;line-height:1.3}
.p3-back li{display:flex;gap:6px}.p3-back li::before{content:"";flex:0 0 5px;height:5px;border-radius:50%;background:currentColor;margin-top:5px;opacity:.8}
.p3-back .fee{margin-top:auto;font:600 .7rem var(--f-hud)}
.p3-cg{background:linear-gradient(135deg,#0f7a52,#0a5a3c 60%,#063b28)}
.p3-cf{background:linear-gradient(135deg,#18a58a,#0f7a6c 55%,#095449)}
.p3-cc{background:linear-gradient(135deg,#1f6f8b,#0f4f67 55%,#08364a)}
.p3-cs{background:linear-gradient(135deg,#b07a35,#8a5a22 55%,#5e3c14)}
.p3-cr{background:linear-gradient(135deg,#1a1f1c,#0b0f0d 60%,#000);color:#ffe7a8}
.p34map td:first-child small{display:block}.p34map .pk{display:flex;justify-content:space-between;gap:14px;padding:3px 0;border-bottom:1px dashed rgba(255,255,255,.07)}.p34map .pk em{font-style:normal;font-family:var(--f-hud,monospace);color:#5fbf8f;white-space:nowrap}
.p34tier{display:grid;gap:0;margin-top:18px}.p34tier article{padding:24px 0;border-top:1px solid rgba(255,255,255,.09)}.p34tier em{font:600 .68rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;font-style:normal;color:#d8b46a}.p34tier h4{margin:8px 0 10px;font:500 1.5rem var(--f-serif,Georgia,serif);color:#fff}.p34tier p{margin:0 0 10px;font-size:.96rem;line-height:1.7;color:rgba(244,251,247,.86);max-width:880px}
.p3-ck{background:linear-gradient(135deg,#4a524e,#2a312d 55%,#151a17);box-shadow:inset 0 0 0 1px rgba(95,191,143,.35)}
.p3-cr::before{background:radial-gradient(140% 90% at 100% 0%,rgba(242,201,107,.3),transparent 45%),repeating-linear-gradient(120deg,rgba(242,201,107,.06) 0 2px,transparent 2px 9px)}
.p3-cr.p3-face{box-shadow:0 24px 40px -18px rgba(0,0,0,.8),inset 0 0 0 1px rgba(242,201,107,.55)}
.p3-cmeta{margin-top:12px}
.p3-cmeta b{display:block;font:700 .92rem var(--f-display)}
.p3-cmeta span{display:block;font-size:.8rem;color:var(--ink2);line-height:1.4}
.p3-cmeta em{display:block;margin-top:4px;font:500 .8rem var(--f-hud);font-style:normal;color:var(--gold2)}
.p3-tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:.86rem;min-width:720px}
.p3-tblw{overflow-x:auto;border-radius:18px;border:1px solid var(--edge);background:var(--panel)}
.p3-tbl th,.p3-tbl td{padding:12px 14px;text-align:left;border-bottom:1px solid var(--edge);vertical-align:top}
.p3-tbl thead th{font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p3-tbl tbody th{font:700 .86rem var(--f-display);color:var(--ink);white-space:nowrap}
.p3-tbl td{color:var(--ink2)}
.p3-tbl tr:last-child>*{border-bottom:0}
.p3-tbl .y{color:var(--neon)}.p3-tbl .n{color:var(--ink3)}
.p3-tbl tr.hl>*{background:rgba(242,201,107,.08)}
.p3-plans{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p3-plan2{padding:22px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p3-plan2.best{border-color:var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.12),rgba(2,6,8,.6))}
.p3-plan2 small{font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon)}
.p3-plan2 b{display:block;margin-top:6px;font:500 1.9rem var(--f-hud);color:var(--ink)}
.p3-plan2.best b{color:var(--gold2)}
.p3-plan2 p{margin:6px 0 0;font-size:.86rem;color:var(--ink2);line-height:1.5}
.p3-mcalc{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px}
.p3-mcalc .cin label{margin-top:18px}
.p3-seg{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.p3-seg button{flex:1 1 auto;padding:9px 10px;border-radius:10px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .78rem var(--f-body);cursor:pointer}
.p3-seg button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border-color:transparent}
.p3-fl{display:block;margin-top:16px;font-size:.88rem;color:var(--ink2)}
.p3-split{display:flex;height:22px;border-radius:8px;overflow:hidden;margin-top:6px}
.p3-split span{height:100%;transition:width .4s}
.p3-splitl{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:8px;font-size:.74rem;color:var(--ink2)}
.p3-splitl i{display:inline-block;width:9px;height:9px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.p3-chart{padding:20px;border-radius:20px;border:1px solid var(--edge);background:var(--panel)}
.p3-chart svg{width:100%;height:auto;display:block}
.p3-chart text{font-family:var(--f-hud)}
@media (max-width:1150px){
 .p3-planw,.p3-int,.p3-funnel,.p3-mcalc{grid-template-columns:1fr}
 .p3-tech,.p3-calm,.p3-priv{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-jtabs{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p3-jsteps{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-demo{grid-template-columns:minmax(0,1fr) 300px}.p3-watch{grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-seqg{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p3-dash{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-ev4{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-flow6{grid-template-columns:repeat(3,minmax(0,1fr))}.p3-flow6>div{border-radius:0!important;border-left:1px solid var(--edge)!important}
 .p3-kdemo{grid-template-columns:1fr}
 .p3-rules{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-cards{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p3-legend{grid-template-columns:repeat(3,minmax(0,1fr))}
}
@media (max-width:820px){
 .p3-two,.p3-tech,.p3-calm,.p3-priv,.p3-cmp,.p3-plans,.p3-dash,.p3-rules{grid-template-columns:1fr}
 .p3-plan .lb,.p3-plan .sm{display:none}
 .p3-legend{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p3-jtabs{grid-template-columns:1fr 1fr}
 .p3-jsteps{grid-template-columns:1fr}
 .p3-jbar span{font-size:0}
 .p3-demo{grid-template-columns:1fr;padding:16px}.p3-watch{grid-template-columns:1fr}
 .p3-phone{width:286px;height:590px}
 .p3-shelf{order:2}.p3-watch{order:3}
 .p3-seqax{display:none}.p3-seqg{grid-template-columns:1fr;margin-top:0}
 .p3-flow6{grid-template-columns:1fr}
 .p3-kdemo{padding:16px}
 .p3-cmp .full ol{grid-template-columns:1fr}
 .p3-cards{grid-template-columns:1fr 1fr}
 .p3-sw.big b{font-size:2.6rem}
 .p3-r{grid-template-columns:12px minmax(0,1fr)}.p3-r em{grid-column:2}
}
@media (max-width:420px){.p3-cards{grid-template-columns:1fr}.p3-face .nm{font-size:1.1rem}.p3-back ul{font-size:.76rem}}
`);

/* ======================= shared sources ======================= */
const S={
 who_tz:['WHO, United Republic of Tanzania hypertension profile (2012 national STEPS survey)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 who_fs:['WHO fact sheet, 25 September 2025: Hypertension','https://www.who.int/news-room/fact-sheets/detail/hypertension'],
 tcra:['Daily News via AllAfrica, 10 February 2026: Mobile money accounts double in five years (TCRA December 2025 report)','https://allafrica.com/stories/202602100375.html'],
 tra:['Tanzania Revenue Authority: EFD / VFD suppliers and fiscal receipt rules','https://tra.go.tz/page/efd-vfd-suppliers'],
 pdpa:['Afriwise (Clyde & Co), 18 September 2025: What does consent look like under the Tanzania personal data protection laws?','https://www.afriwise.com/blog/what-does-consent-look-like-under-the-tanzania-personal-data-protection-laws']};
const C=(k,n)=>cref(S[k][1],n,S[k][0]);
const SRC=k=>[S[k][0],S[k][1]];
const B=()=>M.get('base');
const staffN=I.staff.reduce((a,x)=>a+x[1],0);
const seedUse=k=>{const r=I.seed.use.find(x=>x[0].toLowerCase().includes(k));return r?r[1]:0};

/* ===================================================================
   3.1 THE STORE
   =================================================================== */
const ZONES=[ // id, name, colour, svg shape, details
 {id:'z1',n:'Mother & Baby',c:'#ff9bb8',num:1,what:'Nappies in every size, wipes, baby lotion, feeding bottles, a baby thermometer, maternity pads, iron and folic acid supplements (registered, over-the-counter).',ex:'Mama Neema comes in with her baby on her back. The pink zone is on the left wall, nearest the self-checkout, so she is in and out quickly, with a hand free.',why:'Mothers are the most frequent repeat visitors. The zone sits along the wall closest to the exit and the self-checkout, so a mother with a baby never crosses the whole store.'},
 {id:'z2',n:'Heart & Diabetes',c:'#ff7b6b',num:2,what:'Blood-pressure monitors, glucose meters, test strips, lancets, pen needles, low-sugar foods, compression socks.',ex:'Baba Juma has just had a raised reading at the Afya Check. The adviser walks him six steps to the red island to compare three monitors in the same price range.',why:'Placed straight across from the Afya Check kiosk: a reading leads naturally to the right device, with no searching.'},
 {id:'z3',n:'Mobility & Recovery',c:'#d9b56e',num:3,what:'Walking sticks and frames, knee and back supports, elastic bandages, hot and cold packs, physiotherapy bands, rental equipment on show.',ex:'After a knee operation at a Dar hospital, a young man tries two knee supports with the store lead, a physiotherapy graduate, who shows him how to wear them.',why:'In the centre, with room around it, so customers can try supports and walking aids with an adviser.'},
 {id:'z4',n:'First Aid & Home',c:'#f2c96b',num:4,what:'First-aid kits for homes, offices and schools, plasters, antiseptic, gloves, masks, digital thermometers, hand sanitiser.',ex:'An office manager in Upanga buys three first-aid kits for the company, and sets them up for a refill reminder every six months.',why:'On the right wall beside the entrance: quick, grab-and-go purchases that do not need advice.'},
 {id:'z5',n:'Personal Care',c:'#c9b8ff',num:5,what:'Oral care, skin care, intimate hygiene, sanitary pads, women’s beauty essentials, hair care.',ex:'A university student picks up sanitary pads and skin care in two minutes, under the big video wall.',why:'Along the back wall under the video wall, so the whole store is drawn deeper and the back of the room never feels empty.'},
 {id:'z6',n:'Seniors',c:'#b5dfc6',num:6,what:'Adult diapers, bed pads, pill organisers, magnifiers, non-slip mats, easy-grip cups, skin-protection creams.',ex:'A granddaughter shopping for Bibi sets up the elderly care box at the counter after choosing the right size of adult diapers.',why:'Close to the lounge chairs, so an older customer or a carer can sit down while an adviser brings items over.'}];
const FIX=[ // other plan elements: id,name,colour,num,what,why
 {id:'f1',n:'Entrance & Afya Check kiosk',c:'#5fbf8f',num:7,what:'Automatic glass doors, a door screen saying “Free health check inside”, and the Afya Check kiosk standing by the glass.',why:'The first thing anyone sees is a free service, not a sales counter. A free four-minute check of fifteen measurements makes it easy to come in.'},
 {id:'f2',n:'Waiting lounge & screens',c:'#5fbf8f',num:8,what:'Four lounge chairs by the glass, a wall screen with health tips and offers, and a small shelf of health books and brochures.',why:'People waiting for an adviser, a delivery or a relative can sit in a calm place and learn something useful.'},
 {id:'f3',n:'Corner service counter',c:'#f2c96b',num:9,what:'A curved counter in the back corner, under a ring of digital menu screens: advice, Afya Box sign-up, collections, returns and payment by the adviser’s till.',why:'Its back-corner position means every visitor walks past the Care Zones; the glowing ring of screens is visible from the door.'},
 {id:'f4',n:'Display tables & lit towers',c:'#ffe7a8',num:10,what:'Two round display tables for new arrivals and monthly themes; white lit towers with a small screen on each zone.',why:'The tables slow people down at the centre of the room; the towers keep the shelves low and the room open.'},
 {id:'f5',n:'Self-checkout points',c:'#5fbf8f',num:11,what:'Two self-checkout points near the exit: scan, pay by mobile money or card, receipt by SMS or WhatsApp.',why:'Customers who know what they want never wait for staff. Advisers are free to advise.'},
 {id:'f6',n:'Click-and-collect shelf',c:'#d9b56e',num:12,what:'A shelf next to the stock room door, where picked online orders wait with the customer’s name and a collection code.',why:'Orders are picked from the stock room without crossing the shop floor, and are ready in under 2 hours.'},
 {id:'f7',n:'Stock room (back of house)',c:'#6a8a7d',num:13,what:'Racks for reserve stock, first-expiry-first-out labels, a packing bench for online orders and boxes, staff area.',why:'Behind the counter and the shelf, so restocking and packing happen out of sight and never block customers.'},
 {id:'f8',n:'Smart locker outside',c:'#b5dfc6',num:14,what:'A lockable parcel wall on the pavement outside the glass, opened with a code sent by SMS.',why:'Customers can collect orders after closing time or without coming inside.'}];
const ALLZ=[...ZONES,...FIX];
const WALK=[ // path waypoints + caption + simulated clock (s)
 [1040,1110,'Arrive. Automatic doors and a door screen: “Free health check inside.”',0],
 [1040,950,'Arrive. Care Zone colours are visible from the door.',8],
 [1200,880,'Afya Check. Fifteen free measurements in about four minutes, from height to blood pressure.',60],
 [1420,800,'Lounge. An adviser explains the reading in plain words, with no pressure to buy.',95],
 [1250,600,'Walk to the zone the reading points to.',110],
 [460,590,'Heart & Diabetes. Three monitors in the same price range, each with a printed “best for” card.',165],
 [640,720,'Display table. This month’s theme: “Know your numbers”.',180],
 [420,830,'Self-checkout. Scan, mobile-money push, approve: paid in under 30 seconds.',205],
 [960,930,'Receipt arrives by SMS. An offer to save the basket as a monthly reminder.',215],
 [1000,1110,'Out of the door with the right device, and a plan.',225]];

function planSVG(){
 const W='#cfe3da';
 const mk=(o,lx,ly)=>`<circle cx="${lx}" cy="${ly}" r="17" fill="#03100c" stroke="${o.c}" stroke-width="2.5"/><text class="nb" x="${lx}" y="${ly+7}" text-anchor="middle" style="fill:${o.c}">${o.num}</text>`;
 const z=(o,shape,lx,ly,sub)=>`<g class="z" data-z="${o.id}" style="--zc:${o.c}" tabindex="0" role="button" aria-label="${esc(o.n)}">${shape}${mk(o,lx,ly)}${sub||''}</g>`;
 function towers(x,y,w,h,c){let s='';const hor=w>h;const n=Math.max(2,Math.floor((hor?w:h)/80));for(let i=0;i<n;i++){const L=hor?w/n:h/n;const tx=hor?x+i*L+6:x+6,ty=hor?y+6:y+i*L+6,tw=hor?L-12:w-12,th=hor?h-12:L-12;s+=`<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" fill="none" stroke="${c}" stroke-opacity=".55" stroke-width="1.5"/><path d="M${tx} ${ty}L${tx+tw} ${ty+th}" stroke="${c}" stroke-opacity=".18" stroke-width="1"/>`}return s}
 const zr=(o,x,y,w,h,lx,ly,lbl,tx,ty,anchor)=>z(o,`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.c}" fill-opacity=".07" stroke="${o.c}" stroke-width="2.5"/>${towers(x,y,w,h,o.c)}`,lx,ly,`<text class="lb" x="${tx}" y="${ty}" text-anchor="${anchor||'start'}">${lbl}</text>`);
 const Z=ZONES,Fx=FIX,ln=(d,o)=>`<path d="${d}" fill="none" stroke="${W}" stroke-width="${o||2}"/>`;
 return `<svg viewBox="0 0 1800 1160" role="img" aria-label="Architectural floor plan of the 180 square metre Afya Basics store">
 <defs><pattern id="p3hat" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V14" stroke="#cfe3da" stroke-opacity=".55" stroke-width="2"/></pattern>
 <pattern id="p3fl" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M60 0H0V60" fill="none" stroke="rgba(207,227,218,.045)" stroke-width="1.5"/></pattern></defs>
 <rect x="0" y="0" width="1800" height="1000" fill="url(#p3fl)"/>
 <rect x="0" y="-14" width="1800" height="22" fill="url(#p3hat)" stroke="${W}" stroke-width="2"/>
 ${ln('M2 8V998M1798 8V998',2)}${ln('M10 8V990M1790 8V990',1)}
 ${ln('M2 998H900M1180 998H1798',2)}${ln('M10 990H900M1180 990H1790',1)}
 ${[150,300,450,600,750,1300,1450,1600].map(x=>`<path d="M${x} 990V998" stroke="${W}" stroke-width="2"/>`).join('')}
 ${[160,320,480,640,800].map(y=>`<path d="M2 ${y}H10M1790 ${y}H1798" stroke="${W}" stroke-width="2"/>`).join('')}
 <path d="M900 998A140 140 0 0 1 1040 858M1180 998A140 140 0 0 0 1040 858" fill="none" stroke="${W}" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="6 6"/>
 <path d="M900 998L1040 858M1180 998L1040 858" stroke="${W}" stroke-opacity=".7" stroke-width="2"/>
 <text class="sm" x="1040" y="1040" text-anchor="middle">ENTRANCE · AUTOMATIC SLIDING DOORS</text>
 <text class="sm" x="40" y="1040">GLAZED FAÇADE · SOLAR-CONTROL GLASS</text>
 <text class="sm" x="40" y="1110" style="opacity:.6">PAVEMENT</text>
 <path d="M0 1070H1800" stroke="${W}" stroke-opacity=".15" stroke-width="1.5" stroke-dasharray="20 10"/>
 <rect x="640" y="12" width="600" height="10" fill="#5fbf8f" fill-opacity=".55"/><text class="sm" x="940" y="48" text-anchor="middle">VIDEO WALL</text>
 ${zr(Z[4],640,62,600,70,610,97,'PERSONAL CARE',940,165,'middle')}
 ${zr(Z[0],20,340,100,380,70,305,'MOTHER &amp; BABY',22,770)}
 ${zr(Z[1],300,440,320,96,268,488,'HEART &amp; DIABETES',460,420,'middle')}
 ${zr(Z[2],740,440,320,96,708,488,'MOBILITY',900,420,'middle')}
 ${zr(Z[5],1140,440,320,96,1108,488,'SENIORS',1300,420,'middle')}
 ${zr(Z[3],1680,330,100,300,1650,300,'FIRST AID',1650,480,'end')}
 ${z(Fx[2],`<path d="M20 300H300A220 220 0 0 0 520 80V20" fill="none" stroke="#f2c96b" stroke-width="2.5"/><path d="M20 250H300A170 170 0 0 0 470 80V20" fill="none" stroke="#f2c96b" stroke-width="2.5"/><path d="M20 250V300M470 20H520" stroke="#f2c96b" stroke-width="2.5"/><circle cx="250" cy="120" r="120" fill="none" stroke="#f2c96b" stroke-opacity=".45" stroke-width="1.5" stroke-dasharray="4 8"/>`,560,300,`<text class="lb" x="210" y="130" text-anchor="middle">COUNTER</text><text class="sm" x="210" y="164" text-anchor="middle">ring of menu screens above</text>`)}
 ${z(Fx[6],`<rect x="1440" y="8" width="350" height="282" fill="url(#p3hat)" fill-opacity=".25" stroke="${W}" stroke-width="2"/><path d="M1440 200V280" stroke="#03100c" stroke-width="6"/><path d="M1440 200A80 80 0 0 0 1360 280" fill="none" stroke="${W}" stroke-opacity=".5" stroke-width="1.5" stroke-dasharray="5 5"/>`,1760,40,`<text class="lb" x="1615" y="150" text-anchor="middle">STOCK ROOM</text><text class="sm" x="1615" y="184" text-anchor="middle">back of house</text>`)}
 ${z(Fx[5],`<rect x="1300" y="26" width="120" height="56" fill="none" stroke="#d9b56e" stroke-width="2.5"/>`,1360,120,`<text class="sm" x="1360" y="190" text-anchor="middle">click &amp; collect</text>`)}
 ${z(Fx[3],`<circle cx="640" cy="760" r="64" fill="none" stroke="#ffe7a8" stroke-width="2.5"/><circle cx="640" cy="760" r="40" fill="none" stroke="#ffe7a8" stroke-opacity=".35" stroke-width="1.5"/><circle cx="960" cy="760" r="64" fill="none" stroke="#ffe7a8" stroke-width="2.5"/><circle cx="960" cy="760" r="40" fill="none" stroke="#ffe7a8" stroke-opacity=".35" stroke-width="1.5"/>`,800,760,`<text class="sm" x="800" y="866" text-anchor="middle">display tables</text>`)}
 ${z(Fx[4],`<rect x="290" y="880" width="90" height="60" fill="none" stroke="#5fbf8f" stroke-width="2.5"/><rect x="420" y="880" width="90" height="60" fill="none" stroke="#5fbf8f" stroke-width="2.5"/><path d="M300 900h70M430 900h70" stroke="#5fbf8f" stroke-opacity=".5" stroke-width="1.5"/>`,400,830,`<text class="sm" x="400" y="975" text-anchor="middle">self-checkout</text>`)}
 ${z(Fx[0],`<rect x="1220" y="860" width="50" height="70" rx="6" fill="none" stroke="#5fbf8f" stroke-width="2.5"/><rect x="1232" y="870" width="26" height="22" fill="none" stroke="#5fbf8f" stroke-opacity=".6" stroke-width="1.5"/><rect x="820" y="890" width="50" height="34" fill="none" stroke="#5fbf8f" stroke-width="2"/>`,1245,815,`<text class="sm" x="1290" y="905">afya check</text>`)}
 ${z(Fx[1],`<rect x="1380" y="690" width="400" height="285" fill="none" stroke="#5fbf8f" stroke-opacity=".6" stroke-width="1.5" stroke-dasharray="10 8"/>${[0,1,2,3].map(i=>`<rect x="${1435+i*85}" y="${850}" width="56" height="56" rx="10" fill="none" stroke="${W}" stroke-opacity=".7" stroke-width="2"/><path d="M${1435+i*85} ${864}h56" stroke="${W}" stroke-opacity=".35" stroke-width="1.5"/>`).join('')}<rect x="1768" y="740" width="8" height="140" fill="#5fbf8f" fill-opacity=".7"/><rect x="1400" y="706" width="200" height="20" fill="none" stroke="#c9b8ff" stroke-width="2"/>`,1700,960,`<text class="sm" x="1575" y="790" text-anchor="middle">lounge · screen · brochures</text>`)}
 ${z(Fx[7],`<rect x="1300" y="1030" width="320" height="70" fill="none" stroke="#b5dfc6" stroke-width="2.5"/>${[0,1,2,3,4,5,6].map(i=>`<path d="M${1300+(i+1)*40} 1030V1100" stroke="#b5dfc6" stroke-opacity=".45" stroke-width="1.5"/>`).join('')}`,1660,1065,'')}
 <g><path d="M40 1140H540" stroke="${W}" stroke-opacity=".6" stroke-width="2"/>${[0,1,2,3,4,5].map(i=>`<path d="M${40+i*100} ${i%5?1134:1128}V1146" stroke="${W}" stroke-opacity=".6" stroke-width="2"/>`).join('')}<text class="sm" x="560" y="1147">5 m</text></g>
 <g transform="translate(1720 1120)"><circle r="26" fill="none" stroke="${W}" stroke-opacity=".5" stroke-width="1.5"/><path d="M0 -22L8 6L0 0L-8 6Z" fill="${W}" fill-opacity=".8"/><text class="sm" x="0" y="-32" text-anchor="middle" style="font-size:18px">N</text></g>
 <path id="p3path" d="${WALK.map((w,i)=>(i?'L':'M')+w[0]+' '+w[1]).join(' ')}" fill="none" stroke="#f2c96b" stroke-width="4" stroke-dasharray="3 12" stroke-linecap="round" opacity="0"/>
 <circle id="p3who" r="16" fill="#f2c96b" stroke="#03100c" stroke-width="4" opacity="0" style="filter:drop-shadow(0 0 12px #f2c96b)"/>
 <text class="sm" x="1660" y="1150" text-anchor="end">18.0 m × 10.0 m ≈ 180 m² · schematic plan, not to final scale</text>
 </svg>`}

const HS=[ // interior hotspots [left%, top%, title, text]
 [26,14,'Ring of menu screens','A circle of screens over the counter shows the Afya Box plans, this month’s offers and Care Zone guides. Visible from the door, it tells every visitor where help is.'],
 [21,47,'Corner service counter','Health advisers in royal green uniforms: advice, Afya Box sign-up, collections and the handheld till. Placed in the back corner so every visitor passes the zones.'],
 [48,26,'Video wall','A large calm screen with nature scenes, health tips and the Afya promise. It draws people deep into the store and makes the glass room feel alive at night.'],
 [55,42,'Lit display towers','White towers lit from inside, each with a digital price label. Shelves stay low enough to see across the whole room.'],
 [42,62,'Display tables','Round tables for new arrivals and the monthly theme, for example “Know your numbers” in World Hypertension month.'],
 [75,58,'Waiting lounge','Lounge chairs by the glass for anyone waiting for an adviser, a relative or a delivery. Calm, never crowded.'],
 [80,27,'Lounge screen & brochures','A wall screen plays short health explainers; a small shelf holds free health books and brochures in Kiswahili and English.'],
 [88,52,'Afya Check kiosk','Free check by the entrance: 15 measurements in about four minutes, results on screen and by SMS.']];
const TECH=[
 ['screen','Video wall & menu-screen ring','One content system plays health tips, Care Zone guides and box plans on the video wall, the ring over the counter and the lounge screen.','Replaces printed posters'],
 ['label','Digital shelf labels (e-labels)','Every price is set once in the system and appears the same on the shelf, in the app and on WhatsApp. One honest price, changed in seconds.','Replaces handwritten tags'],
 ['kiosk','Afya Check kiosk','Fifteen free measurements in about four minutes (body composition, blood pressure, pulse, oxygen, temperature, vision), with consent, and sends results by SMS.','Replaces paper forms'],
 ['cart','Self-checkout & scan-and-go','Two self-checkout points plus scan-and-go in the app. Mobile-money push, card or cash at the counter. TRA receipt by SMS or WhatsApp.','Removes the payment queue'],
 ['hand','Advisers’ handheld tills','Advisers can take payment anywhere on the floor, look up stock and set up an Afya Box in three taps or fewer.','Removes trips to the counter'],
 ['screen','Find-it screen','A screen by the door: type or say a product, see its zone and shelf number on a map of the room.','Product found in under 1 minute'],
 ['lock','Smart locker','Online orders wait outside the glass and open with an SMS code, also after closing time.','Collection without queuing'],
 ['wifi','Offline-safe till & connectivity','The till keeps selling if the internet drops and syncs later; a second connection is kept as backup.','No lost sales when the line is down'],
 ['bolt','Backup power','Battery backup for tills, kiosk, fridges for temperature-sensitive items and lighting, so a power cut never stops a sale.','Store keeps trading in an outage'],
 ['sun','Solar-control glass & shade','Glazing that lets daylight in but keeps heat and glare out; a deep roof overhang shades the glass. Final specification with the architect.','Calm, cool room in Dar heat'],
 ['cam','Security & CCTV','Laminated glass, night shutters, cameras over tills, doors and stock room, linked to the founders’ phones.','Glass stays open by day, safe by night'],
 ['book','Health library shelf','A small shelf of free health books and Care Zone brochures, so learning happens even when no adviser is free.','Advice without waiting']];

/* ---- 3.1 rebuilt: the store, inside out ---- */
const RZ=[ // id, name, colour, rect on plan (x1,y1,x2,y2 in 1280x720), m², what, why
 {id:'z1',n:'Mother & Baby',c:'#ff9bb8',r:[78,140,165,590],m:'≈ 8 m wall',what:'Nappies in every size, wipes, lotion, feeding bottles, baby thermometers, maternity pads, iron and folic acid.',why:'Left wall, nearest the self-checkout: a mother with a baby on her back is in and out in minutes with a hand free.',stop:4},
 {id:'z2',n:'Heart & Diabetes',c:'#ff7b6b',r:[298,298,540,392],m:'Double-sided island',what:'Blood-pressure monitors, glucose meters, test strips, lancets, compression socks, low-sugar foods, with try-me demo units.',why:'The island sits in the open centre, a few steps from the Afya Check: a raised reading leads straight to a device you can try.',stop:5},
 {id:'z3',n:'Mobility & Recovery',c:'#d9b56e',r:[660,250,770,490],m:'Two round tables + bench',what:'Walking aids, knee and back supports, bandages, hot and cold packs, physiotherapy bands, rental equipment on show.',why:'In the centre with space around it, so the store lead (a physiotherapy graduate) can fit a support with a mirror and bench.',stop:6},
 {id:'z4',n:'First Aid & Home',c:'#f2c96b',r:[1118,355,1215,570],m:'≈ 3.5 m wall',what:'First-aid kits for homes, offices and schools, plasters, antiseptic, gloves, masks, thermometers, sanitiser.',why:'Right wall beside the entrance: grab-and-go items that need no advice.',stop:null},
 {id:'z5',n:'Personal Care',c:'#c9b8ff',r:[400,108,905,218],m:'≈ 8 m wall + video wall',what:'Oral care, skin care, intimate hygiene, sanitary pads, hair care.',why:'Along the back wall under the LED video wall, which pulls every visitor deeper into the room.',stop:7},
 {id:'z6',n:'Seniors',c:'#b5dfc6',r:[1118,130,1215,350],m:'≈ 3.5 m wall',what:'Adult diapers, bed pads, pill organisers, magnifiers, non-slip mats, easy-grip cups.',why:'Right wall near the lounge chairs and the counter, so an older customer or a carer can sit while an adviser brings items over.',stop:8},
 {id:'f1',n:'Entrance',c:'#5fbf8f',r:[505,575,780,640],m:'Automatic doors',what:'Automatic glass doors in a protected charcoal facade, a door screen saying “Free health check inside”, a security shutter after hours.',why:'The whole room is visible from the threshold; a free service, not a sales counter, is the first thing you meet.',stop:1},
 {id:'f2',n:'Afya Check & lounge',c:'#5fbf8f',r:[800,455,1095,615],m:'12 m²',what:'The Afya Check kiosk (15 free measurements in about four minutes), four lounge chairs, a health-tips screen and brochures.',why:'Right of the door, by the glass: a reason to step in, and a calm place to wait or talk.',stop:2},
 {id:'f3',n:'Signature counter',c:'#f2c96b',r:[892,125,1085,285],m:'10 m²',what:'Curved oak-and-stone counter under four screens showing the Afya Box packages: advice, box sign-up, collections, returns.',why:'Back corner, so every visitor walks past the Care Zones; the glowing screens are visible from the door.',stop:10},
 {id:'f4',n:'Self-checkout & collect',c:'#d9b56e',r:[235,490,445,605],m:'6 m²',what:'Two self-checkout stations (mobile money and card, receipt by SMS) and the click-and-collect shelf.',why:'Near the exit: customers who know what they want never wait for staff.',stop:12},
 {id:'f5',n:'Consultation room',c:'#c9b8ff',r:[95,35,288,142],m:'8 m²',what:'A private room with a desk, two chairs, a monitor, a scale and a blood-pressure device.',why:'For readings, referrals and box set-up that should not happen across a counter.',stop:9},
 {id:'f6',n:'Stockroom & packing',c:'#6a8a7d',r:[400,38,945,106],m:'20 m²',what:'Reserve racks labelled first-expiry-first-out, a packing bench, sealed boxes waiting for riders.',why:'Behind the back wall: restocking and packing never cross the shop floor.',stop:14},
 {id:'f7',n:'Manager’s office',c:'#5fbf8f',r:[950,38,1065,106],m:'6 m²',what:'Desk with the stock, sales and CCTV dashboard, the safe, and a small table for supplier and partner meetings.',why:'Behind the counter: the manager sees the floor and the back of house, and the founders’ 21:00 report starts here.',stop:13},
 {id:'f8',n:'Staff room & WC',c:'#6a8a7d',r:[292,38,398,106],m:'6 m²',what:'Lockers, a small kitchenette and a staff toilet.',why:'Out of sight and next to the stockroom.',stop:null}];
const STOPS=[
 {img:'exterior',t:'The street front',k:'Outside',p:'A charcoal facade with emerald fins, a gold LED line, a lit fascia sign and vertical advertising screens. The design reads as premium by day and secure by night, and avoids an all-glass front on a Dar es Salaam street.',sp:['180 m² · 18 m × 10 m','Open 09:00–21:00, 7 days']},
 {img:'s-entry',t:'The first look',k:'Entrance',z:'f1',p:'From the threshold the whole room is visible: lit shelving on three walls, each Care Zone marked by its own colour band, two oak tables and the island in the centre, and the glowing counter at the back. Customers can orient themselves before taking a step.',sp:['Six Care Zones in one view','≈ 23 m of lit wall shelving']},
 {img:'s-kiosk',t:'Afya Check',k:'Right of the door',z:'f2',p:'The first service a visitor meets is a free check: a quick reading of blood pressure, pulse and oxygen in about 50 seconds, or the full check of fifteen measurements in about four minutes. No sign-up is needed and there is no obligation to buy. The kiosk brings people into the store and is its main daily source of new members.',sp:['Quick check ≈ 50 s · full check ≈ 4 min','≈ 144 full checks a day capacity']},
 {img:'k-check',t:'Advice, not pressure',k:'Lounge',z:'f2',p:'An adviser sits with the customer, explains each reading in plain language and, only where relevant, directs them to the right zone or to a clinic. The model assumes 35% of checks lead to a purchase.',sp:['Plain-language explanation','Referral when a reading needs a doctor']},
 {img:'s-baby',t:'Mother & Baby',k:'Left wall',z:'z1',p:'Floor-to-ceiling, every nappy size faced in order, wipes, lotions, bottles and thermometers. Digital labels show a single price. The zone sits nearest the self-checkout because mothers are the most frequent and most time-pressed visitors.',sp:['≈ 8 m of shelving','Next to self-checkout']},
 {img:'s-heart',t:'Heart & Diabetes',k:'Centre island',z:'z2',p:'Monitors and meters on lit plinths with demo units and a comparison tablet: three registered brands at the same price level, each with a “best for” card. This is where a raised reading becomes the right device.',sp:['Double-sided island','Try before you buy']},
 {img:'s-mobility',t:'Mobility & Recovery',k:'Centre',z:'z3',p:'Supports on forms, walking aids, a fitting bench and a mirror. The store lead, a physiotherapy graduate, fits supports correctly, and rental equipment is displayed for people recovering from surgery.',sp:['Fitting bench + mirror','Rental equipment on display']},
 {img:'s-videowall',t:'Personal Care · video wall',k:'Back wall',z:'z5',p:'A full-width LED wall shows calm scenes, health tips and this month’s offers, sold as in-store media to partner brands. Beneath it, personal care runs the length of the room.',sp:['≈ 8 m of shelving','LED wall = in-store advertising']},
 {img:'s-lounge',t:'Lounge & Seniors',k:'By the window',z:'z6',p:'Four emerald lounge chairs, a tips screen and the Seniors shelf within reach. Older customers and carers can sit while an adviser brings items over, and people waiting for a check are seated rather than queuing.',sp:['4 lounge chairs','Seniors shelf beside them']},
 {img:'s-consult',t:'Consultation room',k:'Back left',z:'f5',p:'A private room for longer conversations: full checks, readings that need a referral, condition-care box set-up. Privacy is what turns a one-off check into an Afya Care membership.',sp:['≈ 8 m²','Optional paid tests here']},
 {img:'s-counter',t:'The signature counter',k:'Back right',z:'f3',p:'Curved white stone over fluted oak, an emerald glow at the floor, and four screens showing the Afya Box packages. It is where customers join the box, collect orders, return items and speak to an adviser; payment happens elsewhere, so no queue forms here.',sp:['≈ 10 m²','Box sign-up · collections · advice']},
 {img:'s-esl',t:'One price, digital',k:'Every shelf',p:'Electronic shelf labels (phase 2, starting with about 150 on the busiest lines) show the same price as the app and WhatsApp, updated centrally in seconds. Customers can also scan products with their own phone as they shop and pay without queuing.',sp:['Digital labels · phase 2','Scan-and-go in the app']},
 {img:'s-checkout',t:'Self-checkout & collect',k:'By the exit',z:'f4',p:'One self-checkout station opens with the store and a second follows in phase 2. Both take mobile money and cards, and the receipt arrives by SMS. Online orders wait in named bags on the click-and-collect shelf, picked from the stockroom within two hours.',sp:['Payment in under 30 seconds','Click & collect within 2 hours']},
 {img:'s-office',t:'Manager’s office',k:'Back of house',z:'f7',p:'Stock, sales and the cameras on one screen, the safe, and a small table for supplier and partner meetings. The founders’ 21:00 daily report comes from the same system.',sp:['≈ 6 m²','Dashboard + CCTV + meetings']},
 {img:'c-stock',t:'Stockroom',k:'Back of house',z:'f6',p:'Reserve stock on labelled racks, scanned in with batch and expiry and picked first-expiry-first-out. Slower variants live here and are ordered at the counter or in the app, so the floor stays uncluttered.',sp:['Stockroom & packing ≈ 20 m²','FEFO picking']},
 {img:'c-seal',t:'Packing bench',k:'Back of house',z:'f6',p:'Afya Boxes are scanned against the list, photographed and sealed here, then handed to the riders. In the Flagship base case this bench serves about '+Math.round(B().months[11].members)+' box members by month 12.',sp:['Scan · photo · seal','Same-day cut-off 15:00']},
 {img:'s-night',t:'After hours',k:'Outside',p:'At closing, a perforated security shutter comes down, CCTV and the alarm are armed, and the facade screens continue to advertise. From phase 2, smart lockers on the facade allow customers to collect orders at any hour.',sp:['Shutter + CCTV + alarm','Smart lockers · phase 2']}];
const VS=u=>{const m=window.AFYA_VID||{};return (location.protocol==='file:'||location.hostname==='localhost'||!m[u])?u:'/_blob/'+m[u]};
const FILMS={
 p32p:{sub:'pay-demo',parts:[[0,'Online, delivery and the smart locker'],[57.242,'At the counter · the two-way screen'],[97.117,'Self-checkout, handheld till and door check'],[132.981,'Safe by design']].map((x,i)=>({t0:x[0],label:x[1],src:'media/pay-demo-'+(i+1)+'.mp4',poster:'media/p-pay-demo-'+(i+1)+'.jpg'}))},
 p32j:{sub:'visit-film',parts:[[0,'Arrival, free check and the shelf'],[44.378,'Counter, membership, payment and the door'],[92.888,'The Afya Box at home']].map((x,i)=>({t0:x[0],label:x[1],src:'media/visit-film-'+(i+1)+'.mp4',poster:'media/p-visit-film-'+(i+1)+'.jpg'}))},
 p31w:{sub:'store-walkthrough',parts:[[0,'Street front to Mother & Baby'],[63.782,'Heart & Diabetes to consultation room'],[119.91,'Counter to manager’s office'],[166.886,'Back of house, night and summary']].map((x,i)=>({t0:x[0],label:x[1],src:VS('media/store-walk-'+(i+1)+'.mp4'),poster:'media/p-store-walk-'+(i+1)+'.jpg'}))},
 p31d:{sub:'store-plan',parts:[[0,'Size, zones and back of house'],[52.248,'Space, capacity and budget']].map((x,i)=>({t0:x[0],label:x[1],src:VS('media/store-plan-'+(i+1)+'.mp4'),poster:'media/p-store-plan-'+(i+1)+'.jpg'}))}};
const FV=(id,t,cap)=>{const f=FILMS[id];return `<figure class="p31f" id="${id}f"><video id="${id}" controls playsinline preload="metadata" poster="${f.parts[0].poster}"><source src="${f.parts[0].src}" type="video/mp4"></video><figcaption><b>${t}</b> · ${cap} · <span class="hd">1080p HD</span><div class="ch">${f.parts.map((x,i)=>`<button type="button" data-i="${i}"${i?'':' class="on"'}><i>${i+1}</i>${esc(x.label)}</button>`).join('')}</div></figcaption></figure>`};
function chainPlayer(id){const v=$(id),f=FILMS[id];if(!v)return;let cur=0;const bs=[...document.querySelectorAll('#'+id+'f .ch button')];
   const cues={};const sw=()=>document.documentElement.classList.contains('p0-swon');
   const tr={en:v.addTextTrack('subtitles','English','en'),sw:v.addTextTrack('subtitles','Kiswahili','sw')};
   const ts=x=>{const m=x.trim().split(':').map(Number);return m.length===3?m[0]*3600+m[1]*60+m[2]:m[0]*60+m[1]};
   const fill=()=>{const p=f.parts[cur],t0=p.t0,t1=f.parts[cur+1]?f.parts[cur+1].t0:1e9;
    ['en','sw'].forEach(l=>{const T=tr[l];if(T.cues)[...T.cues].forEach(c=>T.removeCue(c));(cues[l]||[]).forEach(c=>{if(c[1]>t0&&c[0]<t1)T.addCue(new VTTCue(Math.max(0,c[0]-t0),Math.min(t1,c[1])-t0,c[2]))})});
    tr.en.mode=sw()?'disabled':'showing';tr.sw.mode=sw()?'showing':'disabled'};
   ['en','sw'].forEach(l=>fetch('media/'+f.sub+'.'+l+'.txt').then(r=>r.ok?r.text():Promise.reject()).then(t=>{cues[l]=t.split(/\n\n+/).map(b=>{const m=b.match(/([\d:.]+)\s*-->\s*([\d:.]+)\n([\s\S]+)/);return m?[ts(m[1]),ts(m[2]),m[3].trim()]:null}).filter(Boolean);fill()}).catch(()=>{}));
   const load=(i,play)=>{cur=i;const p=f.parts[i];v.poster=p.poster;v.src=p.src;bs.forEach((b,k)=>b.classList.toggle('on',k===i));fill();if(play)v.play().catch(()=>{})};
   bs.forEach(b=>b.onclick=()=>load(+b.dataset.i,true));
   v.addEventListener('ended',()=>{if(cur<f.parts.length-1)load(cur+1,true)});
  }
const CSS31=`
.p31f .hd{display:inline-block;padding:1px 7px;border-radius:6px;background:#5fbf8f;color:#02110b;font:700 .66rem var(--f-hud,monospace)}
.p31f .ch{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.p31f .ch button{display:flex;align-items:center;gap:7px;padding:6px 11px 6px 6px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:inherit;font:500 .76rem inherit;cursor:pointer}
.p31f .ch button i{font-style:normal;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.1);font-size:.7rem}.p31f .ch button.on{border-color:#5fbf8f;color:#fff}.p31f .ch button.on i{background:#5fbf8f;color:#02110b}
.p31v{display:grid;grid-template-columns:1fr;gap:14px;margin-top:18px}
.p31v figure{margin:0;border-radius:20px;overflow:hidden;border:1px solid rgba(95,191,143,.25);background:#000}.p31v video{display:block;width:100%;aspect-ratio:16/9;background:#000}
.p31v figcaption{padding:12px 16px;font-size:.9rem;color:rgba(244,251,247,.8)}.p31v figcaption b{color:#fff}
.p31v .two{display:grid;grid-template-columns:1fr;gap:18px}
.p31s{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#08110d;margin-top:18px}
.p31s .im{position:relative;aspect-ratio:16/9;background:#000;overflow:hidden}.p31s .im img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .7s}.p31s .im img.on{opacity:1}
.p31s .mm{position:absolute;right:12px;bottom:12px;width:30%;aspect-ratio:16/9;border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,.3);background:url(img/s-plan.webp) center/cover;box-shadow:0 8px 24px rgba(0,0,0,.5)}
.p31s .mm i{position:absolute;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#5fbf8f;box-shadow:0 0 0 5px rgba(95,191,143,.35);transition:left .8s,top .8s}
.p31s .tx{padding:22px;display:flex;flex-direction:column;gap:10px}.p31s h3{margin:0;font:700 1.4rem/1.15 var(--f-display,inherit)}.p31s p{margin:0;line-height:1.65;color:rgba(244,251,247,.85)}
.p31s .sp{display:flex;flex-wrap:wrap;gap:6px}.p31s .sp span{padding:6px 10px;border-radius:999px;border:1px solid rgba(95,191,143,.3);font-size:.78rem}
.p31s .nv{margin-top:auto;display:flex;gap:8px;align-items:center}.p31s .nv button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:#fff;cursor:pointer}
.p31t{display:flex;gap:6px;overflow-x:auto;padding:10px 2px}.p31t button{flex:0 0 108px;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:4px;background:none;color:inherit;cursor:pointer;text-align:left}
.p31t button img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:8px;display:block}.p31t button span{display:block;font:600 .68rem/1.25 inherit;padding:4px 2px 2px}.p31t button.on{border-color:#5fbf8f}
.p31p{display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:14px;margin-top:16px}
.p31p .pl{position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.12)}.p31p .pl{aspect-ratio:16/9}.p31p .pl img{display:block;width:100%;height:100%!important;max-height:none;object-fit:cover}
.p31p .pl button{position:absolute;border:2px solid var(--c);background:color-mix(in srgb,var(--c) 14%,transparent);border-radius:10px;cursor:pointer;padding:0;transition:background .2s}
.p31p .pl button:hover,.p31p .pl button.on{background:color-mix(in srgb,var(--c) 38%,transparent)}
.p31p .pl button span{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);white-space:nowrap;font:600 .66rem inherit;padding:3px 8px;border-radius:999px;background:rgba(2,8,6,.85);color:#fff;pointer-events:none}
.p31p .pl.dim button:not(.on){opacity:.35}
.p31p aside{border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);padding:20px}.p31p aside h3{margin:6px 0 8px}.p31p aside .why{margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(95,191,143,.07);border:1px solid rgba(95,191,143,.2);line-height:1.55}.p31p aside .why b{display:block;margin-bottom:4px;color:#5fbf8f;font-size:.8rem;letter-spacing:.06em;text-transform:uppercase}.p31p aside p{line-height:1.6;margin:0 0 10px}
.p31c{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-top:16px}
.p31c article{border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);padding:18px 20px}
.p31c h4{margin:0 0 10px;font:700 1.05rem var(--f-display,inherit)}.p31c table{width:100%;border-collapse:collapse;font-size:.88rem}.p31c td{padding:7px 0;border-top:1px solid rgba(255,255,255,.07)}.p31c td:last-child{text-align:right;font-family:var(--f-hud,monospace)}
.p31c tr.t td{font-weight:700;color:#5fbf8f}.p31c p{font-size:.86rem;line-height:1.55;color:rgba(244,251,247,.75);margin:10px 0 0}
@media(max-width:900px){.p31s,.p31p,.p31c,.p31v .two{grid-template-columns:1fr}.p31p .pl button span{display:none}}
`;
addCSS('p31',CSS31);
const pc=(r)=>`left:${(r[0]/12.8).toFixed(2)}%;top:${(r[1]/7.2).toFixed(2)}%;width:${((r[2]-r[0])/12.8).toFixed(2)}%;height:${((r[3]-r[1])/7.2).toFixed(2)}%`;
const AREA=[['Sales floor · six Care Zones, island, tables',112],['Afya Check & lounge',12],['Signature counter',10],['Consultation room',8],['Self-checkout & collect',6],['Stockroom & packing',20],['Manager’s office',6],['Staff room & WC',6]];
/* ======================= 3.1 · 5D STORE TOUR =======================
   Photo-real walk through the store. Each concept image carries an estimated depth map (img/d/*.png), rendered in WebGL so
   the camera moves through real depth (3D), walks from stop to stop (movement) and changes from day to after hours (time). */
const TOUR=[ // image, stop text from STOPS (by image), camera on the plan [x, y, heading°] in the 1280×720 plan space
 ['exterior','exterior',[640,700,0]],['s-entry','s-entry',[640,612,0]],['ac-enter','s-kiosk',[700,560,70]],['s-baby','s-baby',[262,380,-90]],
 ['s-heart','s-heart',[420,472,0]],['s-mobility','s-mobility',[600,430,55]],['s-videowall','s-videowall',[650,322,0]],['s-lounge','s-lounge',[985,420,60]],
 ['s-consult','s-consult',[240,195,-30]],['s-counter','s-counter',[985,330,0]],['s-checkout','s-checkout',[480,540,-110]],['s-night','s-night',[640,700,0]]];
const CSST=`
.t5{display:grid;grid-template-columns:minmax(0,1fr) 330px;gap:0;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#050806}
.t5v{position:relative;min-height:560px;background:#000;cursor:grab;touch-action:pan-y}
.t5v canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
.t5v .ld{position:absolute;inset:0;display:grid;place-items:center;font:500 .8rem var(--f-hud,monospace);color:rgba(244,251,247,.6)}
.t5v .cap{position:absolute;left:18px;bottom:16px;right:18px;display:flex;justify-content:space-between;align-items:flex-end;gap:12px;pointer-events:none}
.t5v .cap b{display:block;font:500 1.6rem/1.15 var(--f-serif,Georgia,serif);color:#fff;text-shadow:0 2px 18px rgba(0,0,0,.6)}
.t5v .cap small{font:600 .66rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#e9c77f;text-shadow:0 1px 8px rgba(0,0,0,.8)}
.t5v .cap span{font:500 .66rem var(--f-hud,monospace);color:rgba(255,255,255,.7);text-shadow:0 1px 8px rgba(0,0,0,.8)}
.t5v .nav{position:absolute;top:50%;transform:translateY(-50%);width:46px;height:46px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(5,10,8,.45);backdrop-filter:blur(6px);color:#fff;font-size:1.2rem;cursor:pointer}
.t5v .nav.p{left:14px}.t5v .nav.n{right:14px}
.t5p{padding:20px 20px 18px;display:flex;flex-direction:column;gap:14px;border-left:1px solid rgba(255,255,255,.08);background:linear-gradient(180deg,#071510,#030806)}
.t5p .k{font:600 .66rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#d8b46a}
.t5p p{margin:0;font-size:.88rem;line-height:1.6;color:rgba(244,251,247,.85)}
.t5p .sp{display:flex;flex-wrap:wrap;gap:6px}.t5p .sp span{padding:3px 9px;border-radius:999px;border:1px solid rgba(95,191,143,.3);font-size:.72rem;color:#c8f5e2}
.t5seg{display:flex;border:1px solid rgba(255,255,255,.14);border-radius:999px;padding:3px;gap:2px}
.t5seg button{flex:1;border:0;background:none;color:rgba(244,251,247,.75);font:600 .74rem inherit;padding:7px 6px;border-radius:999px;cursor:pointer}
.t5seg button.on{background:#5fbf8f;color:#03140d}
.t5map{position:relative;border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.1)}
.t5map img{display:block;width:100%;opacity:.85}.t5map svg{position:absolute;inset:0;width:100%;height:100%}
.t5row{display:flex;gap:8px}.t5row button{flex:1;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.04);color:#fff;border-radius:10px;padding:9px;font:600 .78rem inherit;cursor:pointer}
.t5row button.on{border-color:#5fbf8f;color:#5fbf8f}
.t5th{display:flex;gap:6px;overflow-x:auto;padding:10px;background:#030605;border-top:1px solid rgba(255,255,255,.06);grid-column:1/-1}
.t5th button{flex:0 0 96px;border:2px solid transparent;border-radius:8px;overflow:hidden;padding:0;cursor:pointer;background:#000;opacity:.65}
.t5th button.on{border-color:#5fbf8f;opacity:1}.t5th img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}
.t5dims{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));margin-top:18px;border-top:1px solid rgba(255,255,255,.09)}
.t5dims div{padding:14px 14px 4px 0}.t5dims div+div{padding-left:14px;border-left:1px solid rgba(255,255,255,.09)}
.t5dims b{display:block;font:500 1.05rem var(--f-serif,Georgia,serif);color:#fff}.t5dims em{font:600 .64rem var(--f-hud,monospace);letter-spacing:.14em;font-style:normal;color:#5fbf8f}
.t5dims span{display:block;margin-top:4px;font-size:.82rem;line-height:1.5;color:rgba(244,251,247,.7)}
.t5v:fullscreen{min-height:0}
@media(max-width:980px){.t5{grid-template-columns:1fr}.t5v{min-height:0;aspect-ratio:4/3}.t5p{border-left:0;border-top:1px solid rgba(255,255,255,.08)}.t5dims{grid-template-columns:1fr 1fr}.t5dims div+div{padding-left:0;border-left:0}}
`;
addCSS('t5',CSST);
function tourHTML(){return `<div class="t5" id="t5">
 <div class="t5v" id="t5v"><canvas id="t5c" aria-label="Interactive 5D tour of the Afya Basics store. Drag to look around; use the arrows to walk to the next stop."></canvas><div class="ld" id="t5ld">Loading the tour…</div>
  <button type="button" class="nav p" id="t5pv" aria-label="Previous stop">‹</button><button type="button" class="nav n" id="t5nx" aria-label="Next stop">›</button>
  <div class="cap"><div><small id="t5k"></small><b id="t5t"></b></div><span>Concept images · drag to look around</span></div></div>
 <div class="t5p"><span class="k" id="t5n"></span><p id="t5d"></p><div class="sp" id="t5sp"></div>
  <div><span class="k" style="display:block;margin-bottom:6px">Time of day</span><div class="t5seg" id="t5tod"><button type="button" class="on" data-g="0">Day</button><button type="button" data-g="1">Evening</button><button type="button" data-g="2">After hours</button></div></div>
  <div class="t5map"><img src="img/s-plan.webp" alt="Floor plan of the store with your position"><svg viewBox="0 0 1280 720" aria-hidden="true"><path id="t5cone" fill="rgba(95,191,143,.28)" stroke="#5fbf8f" stroke-width="2"/><circle id="t5dot" r="15" fill="#5fbf8f" stroke="#03140d" stroke-width="4"/></svg></div>
  <div class="t5row"><button type="button" id="t5auto">▶ Walk the store</button><button type="button" id="t5fs">Full screen</button></div></div>
 <div class="t5th" id="t5th">${TOUR.map((x,i)=>`<button type="button" data-i="${i}"${i?'':' class="on"'} aria-label="Stop ${i+1}"><img src="img/${x[0]}.webp" alt="" loading="lazy"></button>`).join('')}</div></div>
 <div class="t5dims">
  <div><em>1 · 2 · 3</em><b>Width, height, depth</b><span>Every view carries a depth map, so near objects move against far ones as you look around.</span></div>
  <div><em>4</em><b>Movement</b><span>Walk the customer route stop by stop, from the street to the counter and out.</span></div>
  <div><em>5</em><b>Time</b><span>See the same space by day, in the evening and after closing.</span></div>
  <div><em>Live</em><b>Where you are</b><span>The floor plan shows your position and the direction you face.</span></div>
  <div><em>Info</em><b>Why it is there</b><span>Each stop explains the zone, its size and the decision behind it.</span></div></div>`}
function tourInit(){const cv=$('t5c');if(!cv)return;const gl=cv.getContext('webgl',{antialias:false,premultipliedAlpha:false});
 const SM=Object.fromEntries(STOPS.map(x=>[x.img,x]));
 const ui=i=>{const t=TOUR[i],x=SM[t[1]]||{},c=t[2];$('t5k').textContent=(x.k||'')+' · stop '+(i+1)+' of '+TOUR.length;$('t5t').textContent=x.t||'';$('t5n').textContent='Stop '+(i+1)+' · '+(x.k||'');$('t5d').textContent=x.p||'';
  $('t5sp').innerHTML=(x.sp||[]).map(s=>`<span>${esc(s)}</span>`).join('');document.querySelectorAll('#t5th button').forEach((b,k)=>b.classList.toggle('on',k===i));
  const a=(c[2]-90)*Math.PI/180,w=.42,L=150;$('t5dot').setAttribute('cx',c[0]);$('t5dot').setAttribute('cy',c[1]);
  $('t5cone').setAttribute('d',`M${c[0]} ${c[1]} L${c[0]+L*Math.cos(a-w)} ${c[1]+L*Math.sin(a-w)} A${L} ${L} 0 0 1 ${c[0]+L*Math.cos(a+w)} ${c[1]+L*Math.sin(a+w)} Z`)};
 if(!gl){$('t5ld').textContent='This browser cannot show the 3D tour; the stops below still work.';ui(0);return}
 const vs=`attribute vec2 p;varying vec2 v;void main(){v=vec2(p.x*.5+.5,.5-p.y*.5);gl_Position=vec4(p,0.,1.);}`;
 const fs=`precision highp float;varying vec2 v;uniform sampler2D A,DA,B,DB;uniform vec2 m;uniform float mx,zA,zB,gr,st,ra;
 vec3 S(sampler2D I,sampler2D D,float z){vec2 uv=(v-.5)*vec2(min(ra,1.),min(1./ra,1.))/z+.5;vec2 o=vec2(0.);for(int k=0;k<3;k++){float d=texture2D(D,uv+o).r;o=m*(d-.45)*st/z;}return texture2D(I,clamp(uv+o,.001,.999)).rgb;}
 vec3 G(vec3 c){float l=dot(c,vec3(.299,.587,.114));vec2 q=v-.5;float vg=1.-dot(q,q)*1.1;
  if(gr<.5)return c*mix(1.,vg,.35);
  if(gr<1.5){vec3 w=c*vec3(1.06,.9,.74)*.84;return mix(w,w*1.15,smoothstep(.65,.95,l))*mix(1.,vg,.6);}
  vec3 n=c*vec3(.30,.36,.50);vec3 lit=c*vec3(1.15,.92,.68);return mix(n,lit,smoothstep(.55,.92,l))*mix(1.,vg,.8);}
 void main(){vec3 a=S(A,DA,zA),b=S(B,DB,zB);gl_FragColor=vec4(G(mix(a,b,mx)),1.);}`;
 const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o};const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);gl.useProgram(pr);
 const bf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,bf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);const pl=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(pl);gl.vertexAttribPointer(pl,2,gl.FLOAT,false,0,0);
 const U=n=>gl.getUniformLocation(pr,n);['A','DA','B','DB'].forEach((n,i)=>gl.uniform1i(U(n),i));
 const tex=()=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);[[gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE],[gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE],[gl.TEXTURE_MIN_FILTER,gl.LINEAR],[gl.TEXTURE_MAG_FILTER,gl.LINEAR]].forEach(x=>gl.texParameteri(gl.TEXTURE_2D,x[0],x[1]));return t};
 const T=[tex(),tex(),tex(),tex()];const cache={};
 const load=src=>cache[src]||(cache[src]=new Promise(r=>{const im=new Image();im.onload=()=>r(im);im.onerror=()=>r(null);im.src=src}));
 const put=(unit,im)=>{if(!im)return;gl.activeTexture(gl.TEXTURE0+unit);gl.bindTexture(gl.TEXTURE_2D,T[unit]);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,im)};
 const pair=i=>Promise.all([load('img/'+TOUR[i][0]+'.webp'),load('img/d/'+TOUR[i][0]+'.png')]);
 let cur=0,busy=false,tr=null,gr=0,grT=0,mt=[0,0],mm=[0,0],drag=null,last=performance.now(),auto=null,alive=true;
 const fit=()=>{const r=cv.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);gl.viewport(0,0,cv.width,cv.height)};
 const go=async i=>{i=(i+TOUR.length)%TOUR.length;if(busy||i===cur&&tr===null&&cv.dataset.ok)return;busy=true;const [im,dm]=await pair(i);put(2,im);put(3,dm);ui(i);tr={t0:performance.now(),i};
  TOUR.forEach((_,k)=>{if(Math.abs(k-i)===1)pair(k)})};
 const frame=now=>{if(!alive)return;if(!document.body.contains(cv)){alive=false;return}const dt=Math.min(.05,(now-last)/1000);last=now;
  if(!drag){const t=now/1000;mt=[Math.sin(t*.32)*.55,Math.cos(t*.23)*.25]}
  mm[0]+=(mt[0]-mm[0])*Math.min(1,dt*3);mm[1]+=(mt[1]-mm[1])*Math.min(1,dt*3);grT+=(gr-grT)*Math.min(1,dt*2.5);
  let mx=0,zA=1.07,zB=1.12;if(tr){const k=Math.min(1,(now-tr.t0)/1500),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;zA=1.07+.28*e;zB=1.16-.09*e;mx=e;
   if(k>=1){put(0,null);[0,1].forEach(u=>{gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,T[u+2])});const s=T[0],sd=T[1];T[0]=T[2];T[1]=T[3];T[2]=s;T[3]=sd;
    [0,1,2,3].forEach(u=>{gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,T[u])});cur=tr.i;tr=null;busy=false;mx=0;zA=1.07}}
  gl.uniform2f(U('m'),mm[0]*.045,mm[1]*.03);gl.uniform1f(U('mx'),mx);gl.uniform1f(U('zA'),zA);gl.uniform1f(U('zB'),zB);gl.uniform1f(U('gr'),grT>1.5?2.:grT>.5?1.:0.);gl.uniform1f(U('st'),1.);gl.uniform1f(U('ra'),cv.width/cv.height/(16/9));
  gl.drawArrays(gl.TRIANGLE_STRIP,0,4);requestAnimationFrame(frame)};
 fit();addEventListener('resize',fit);
 pair(0).then(([im,dm])=>{put(0,im);put(1,dm);put(2,im);put(3,dm);[0,1,2,3].forEach(u=>{gl.activeTexture(gl.TEXTURE0+u);gl.bindTexture(gl.TEXTURE_2D,T[u])});cv.dataset.ok=1;$('t5ld').remove();ui(0);requestAnimationFrame(frame);pair(1)});
 const pos=e=>{const r=cv.getBoundingClientRect();return[((e.clientX-r.left)/r.width-.5)*2,((e.clientY-r.top)/r.height-.5)*2]};
 cv.addEventListener('pointerdown',e=>{drag=1;cv.setPointerCapture(e.pointerId);mt=pos(e)});cv.addEventListener('pointermove',e=>{if(drag||e.pointerType==='mouse'){mt=pos(e);if(!drag)drag=0}});
 cv.addEventListener('pointerup',()=>drag=null);cv.addEventListener('pointerleave',()=>drag=null);
 $('t5nx').onclick=()=>{stop();go(cur+1)};$('t5pv').onclick=()=>{stop();go(cur-1)};
 document.querySelectorAll('#t5th button').forEach(b=>b.onclick=()=>{stop();go(+b.dataset.i)});
 document.querySelectorAll('#t5tod button').forEach(b=>b.onclick=()=>{gr=+b.dataset.g;document.querySelectorAll('#t5tod button').forEach(x=>x.classList.toggle('on',x===b))});
 const stop=()=>{if(auto){clearInterval(auto);auto=null;$('t5auto').textContent='▶ Walk the store';$('t5auto').classList.remove('on')}};
 $('t5auto').onclick=()=>{if(auto)return stop();$('t5auto').textContent='❚❚ Pause the walk';$('t5auto').classList.add('on');go(cur+1);auto=setInterval(()=>go(cur+1),6500)};
 $('t5fs').onclick=()=>{const el=$('t5v');(el.requestFullscreen||el.webkitRequestFullscreen||(()=>{})).call(el)};
 document.addEventListener('fullscreenchange',fit)}

window.SECTIONS['s3-1']={
 render(s,p,pv,nx){const b=B(),m12=b.months[11],A=I.store.area_m2,St=I.store;
  const rent=I.opex_month.rent,rentM2=rent/A,salesM2=m12.walkin/A;
  const buyers=St.visitors_day_m12*St.conversion,hrs=12,avgHr=buyers/hrs,peakHr=Math.round(avgHr*1.7),visPeak=Math.round(St.visitors_day_m12/hrs*1.7);
  const inStore=Math.max(2,Math.round(visPeak*10/60));
  const lead=(I.staff.find(x=>/lead/i.test(x[0]))||[0,1])[1],adv=(I.staff.find(x=>/^Health advis/i.test(x[0]))||[0,2])[1],pick=(I.staff.find(x=>/pick/i.test(x[0]))||[0,1])[1];
  const floorN=lead+adv+pick,openH=hrs*7,perPerson=45,cover=(floorN*perPerson/openH);
  const cust=AREA.slice(0,5).reduce((a,x)=>a+x[1],0),back=A-cust;
  const lease=seedUse('lease'),fit=seedUse('fit-out'),tech=seedUse('technology'),LI=M.leanInputs();
  const FITB=[['Joinery: wall shelving, island, tables, counter',9e6],['Floor, ceiling, lighting, air conditioning',8e6],['Facade, signage, security shutter',fit-17e6]];
  const TECHB=[['Afya Check kiosk (landed, see 3.3)',KIOSK().landed],['Counter POS with two-way screen (SUNMI D3 PRO)',3.0e6],['Self-checkout station ×1 (2nd in phase 2)',4.0e6],['Adviser handheld till (SUNMI V3)',1.85e6],['Door-check podium & QR scanner',0.6e6],['CCTV, alarm & battery backup',1.5e6]];const techSum=TECHB.reduce((a,x)=>a+x[1],0);
  const row=(a,t)=>a.map(x=>`<tr><td>${x[0]}</td><td>${typeof x[1]==='number'?F.m(x[1]):x[1]}</td></tr>`).join('')+(t?`<tr class="t"><td>${t[0]}</td><td>${t[1]}</td></tr>`:'');
  const V=FV;const _unused=(id,t,cap)=>{const f=FILMS[id];return `<figure class="p31f" id="${id}f"><video id="${id}" controls playsinline preload="metadata" poster="${f.parts[0].poster}"><source src="${f.parts[0].src}" type="video/mp4"></video><figcaption><b>${t}</b> · ${cap} · <span class="hd">1080p HD</span><div class="ch">${f.parts.map((x,i)=>`<button type="button" data-i="${i}"${i?'':' class="on"'}><i>${i+1}</i>${esc(x.label)}</button>`).join('')}</div></figcaption></figure>`};
  return secShell({s,p,pv,nx,cls:'p3',
  img:'img/s-entry.webp',imgAlt:'Concept image of the Afya Basics store interior seen from the entrance: lit wall shelving, colour-banded Care Zones, oak tables and a glowing counter at the back',
  h1:'The store, inside out',em:'A calm, organised store in which every square metre has a purpose.',
  lede:window.V3.L('Store #1 is planned as a street-front flagship of '+A+' m² (18 m × 10 m) in Dar es Salaam, open '+esc(St.hours)+'. The layout puts an Afya Check kiosk at the door, six Care Zones visible from the threshold, a signature counter, a private consultation room, self-checkout by the exit, and a back of house with stockroom, packing bench and manager’s office. This section presents the films, a 17-stop tour, the floor plan, and the space, staffing and cost calculations behind it.','Duka #1 limepangwa kuwa duka kuu la barabarani la m² '+A+' (m 18 × m 10) jijini Dar es Salaam, likiwa wazi '+esc(St.hours)+'. Mpangilio unaweka kibanda cha Afya Check mlangoni, Maeneo sita ya Huduma yanayoonekana tangu kizingitini, kaunta maalum, chumba cha faragha cha ushauri, kujilipia karibu na mlango wa kutokea, na upande wa nyuma wenye stoo, meza ya kufungasha na ofisi ya meneja. Sehemu hii inaonyesha filamu, ziara ya vituo 17, ramani ya sakafu, na hesabu za nafasi, wafanyakazi na gharama zilizo nyuma yake.'),
  mods:[
  ['The 5D tour · walk the store',`
   <p class="s11lead">The tour is built from the store’s concept images, each with an estimated depth map, so the view shifts in three dimensions as you look around. It follows the route of a first-time customer from the street to the counter and out. The time-of-day control shows the same space by day, in the evening and after closing, and the floor plan tracks your position. ${tagi('Concept images · final design set with the founders and an architect')}</p>
   <div style="margin-top:16px">${tourHTML()}</div>`],
  ['Watch it · two films',`
   <p class="s11lead">The <b>walk-through</b> follows the route from the pavement to the back office. The <b>store plan film</b> uses the floor plan to explain dimensions, zones, capacity and the fit-out budget. Both films are in 1080p with English and Kiswahili subtitles (CC button); chapters play in sequence, or select one to jump to it.</p>
   <div class="p31v"><div class="two">
    ${V('p31w','The walk-through','pavement to back office · 3½ min in 4 chapters')}
    ${V('p31d','The store plan','space, capacity and budget · 1¾ min in 2 chapters')}</div></div>`],
  ['Inside out · 17 stops',`
   <p class="s11lead">Seventeen stops follow a visitor through the store. The inset map marks each position; use the arrows or select a thumbnail below. ${tagi('Concept images')}</p>
   <div class="p31s" id="p31s"><div class="im">${STOPS.map((x,i)=>`<img src="img/${x.img}.webp" width="1680" height="944" ${i?'loading="lazy"':''} alt="Concept image: ${esc(x.t)}"${i?'':' class="on"'}>`).join('')}<div class="mm"><i id="p31dot"></i></div></div>
    <div class="tx"><span class="p3-k" id="p31k"></span><h3 id="p31h"></h3><p id="p31p"></p><div class="sp" id="p31sp"></div>
     <div class="nv"><button type="button" id="p31prev" aria-label="Previous stop">‹</button><button type="button" id="p31next" aria-label="Next stop">›</button><span id="p31n" style="font:600 .8rem var(--f-hud,monospace);margin-left:6px"></span></div></div></div>
   <div class="p31t" id="p31t">${STOPS.map((x,i)=>`<button type="button" data-i="${i}"><img src="img/${x.img}.webp" loading="lazy" alt=""><span>${i+1}. ${esc(x.t)}</span></button>`).join('')}</div>`],
  ['The store footprint · one plan for the whole business',`
   <p class="s11lead">A single plan of the ${A} m² flagship is used throughout this showroom. The layers show the six Care Zones, every area, the customer route, the nightly restock route and the four seasonal display points. Select any area to see what it holds, why it is placed there and, for each Care Zone, its products and shelf space. ${tagi('Concept plan')}</p>
   ${window.FP?FP.html('p31fp'):''}`],
  ['Planning · space',`
   <p class="s11lead">The ${A} m² is weighted towards customers, but the back of house cannot be squeezed: online orders and Afya Boxes are packed there. ${PE}</p>
   <div class="p31c">
    <article><h4>Area schedule</h4><table>${row(AREA.map(x=>[x[0],x[1]+' m²']),['Total',A+' m²'])}</table>
     <p><b>${cust} m² (${Math.round(cust/A*100)}%)</b> is customer-facing; <b>${back} m² (${Math.round(back/A*100)}%)</b> is back of house. Retail practice puts back of house at 15–25%; this plan sits near the middle of that range because the store also packs the boxes.</p></article>
    <article><h4>What the shelves hold</h4><table>${row([['Lit wall shelving (left, back, right walls)','≈ 23 m'],['Double-sided island + 2 round tables','≈ 9 m equivalent'],['Shelf levels per bay','5'],['Product facings on the floor','≈ 1,700'],['Product families × brands each','~'+I.product_families+' × '+I.brands_per_item],['Electronic shelf labels','phase 2 · ≈150 to start']])}</table>
     <p>About 1,700 facings show every product family in ${I.brands_per_item} brands, with room to double-face fast sellers. Slower variants are held in the stockroom and ordered at the counter or in the app.</p></article></div>`],
  ['Planning · people and flow',`
   <p class="s11lead">The ${A} m² floor and a team of ${staffN} can carry the month-12 traffic in the model with capacity to spare. The working is set out below. ${PE}</p>
   <div class="p31c">
    <article><h4>Traffic and capacity (month 12)</h4><table>${row([['Visitors a day',String(St.visitors_day_m12)],['Buyers a day (× '+F.pct(St.conversion)+')',String(Math.round(buyers))],['Busiest hour (≈1.7× average)','≈ '+visPeak+' visitors · '+peakHr+' buyers'],['People in the store at once (10-min visit)','≈ '+inStore],['Afya Checks needed a day',String(I.check?.checks_day_m12??60)],['Kiosk capacity (4-min check + 1-min clean, 12 h)','≈ 144 a day · '+F.pct((I.check?.checks_day_m12??60)/144)+' used'],['Self-checkout capacity (1 station at launch)','≈ 120 payments an hour (240 with the phase-2 station)']])}</table>
     <p>At the busiest hour about ${inStore} customers are in the store at once. Peak payment demand (≈ ${peakHr} an hour) uses about ${Math.max(1,Math.round(peakHr/120*100))}% of the single self-checkout station’s capacity, and the Afya Check kiosk can run about ${(144/(I.check?.checks_day_m12??60)).toFixed(1)}× the checks the model needs a day, so a second kiosk is only needed if checks more than double.</p></article>
    <article><h4>Staffing the floor</h4><table>${row([['Opening hours a week',hrs+' h × 7 = '+openH+' h'],['Floor team (lead, advisers, picker)',floorN+' people'],['Hours each (planning)','≈ '+perPerson+' h a week'],['Average people on the floor','≈ '+cover.toFixed(1)],['Riders (deliveries, not floor)',String((I.staff.find(x=>/Riders/.test(x[0]))||[0,2])[1])]])}</table>
     <p>Two shifts overlap from 12:00 to 18:00, putting three people on the floor at the busiest time; mornings and late evenings run with two. The dashboard in the manager’s office shows sales, stock and cameras, so the store lead can manage from the floor.</p></article></div>`],
  ['Planning · money',`
   <p class="s11lead">The cost of opening the store, and what each square metre must earn. Seed lines come from the master model; the splits within them are planning estimates to be confirmed by quotations. ${PE}</p>
   <div class="p31c">
    <article><h4>Fit-out & signage</h4><table>${row(FITB,['Seed line',F.m(fit)])}</table><p>The lease advance of ${I.lease_advance_months} months’ rent (${F.m(lease)}) is a separate seed line and is not part of fit-out.</p></article>
    <article><h4>Technology, kiosk & screens</h4><table>${row(TECHB,['Total',F.m(techSum)])+`<tr><td>Seed line today</td><td>${F.m(tech)}</td></tr><tr><td>Gap · founders’ decision in 3.3</td><td style="color:#f2c96b">${F.m(Math.max(0,techSum-tech))}</td></tr>`}</table></article>
    <article><h4>Rent against sales</h4><table>${row([['Rent a month',F.m(rent)],['Rent per m² a month',tz(rentM2)],['Walk-in sales, month 12',F.m(m12.walkin)],['Sales per m² a month',tz(salesM2)],['Rent as % of walk-in sales',F.pct(rent/m12.walkin)]])}</table>
     <p>Walk-in sales = ${St.visitors_day_m12} visitors × ${F.pct(St.conversion)} × ${tz(St.basket)} × 30 days. Afya Box and online orders are packed under the same rent, which is why the back of house justifies its ${back} m².</p></article>
    <article><h4>In-store advertising</h4><table>${row([['LED video wall, counter & lounge screens','partner brands'],['Door and facade screens','street-facing'],['Revenue in the model','not counted (upside)']])}</table>
     <p>The screens serve first as customer guidance. Paid slots for registered partner brands are an upside not included in the model. The full LED wall is phase 2; the store opens with standard commercial displays. Equipment prices are in section 3.2.</p></article></div>`],
  ['Why it is designed this way',`
   <div class="p3-calm">
    <div><em>See it</em><b>The whole room in one look</b><p>Wall shelving and low centre pieces keep sightlines open from the door to the counter.</p><small>Find a product: under 1 minute</small></div>
    <div><em>Service first</em><b>A free check before any product</b><p>The kiosk and lounge sit to the right of the door, so the first thing a visitor meets is a service, not a till.</p><small>Check: 15 measurements · ≈ 4 min</small></div>
    <div><em>Short paths</em><b>Frequent needs near the exit</b><p>Mother &amp; Baby and First Aid are near the doors and self-checkout; advice-heavy zones are in the centre.</p><small>Find and pay: under 3 minutes</small></div>
    <div><em>Premium, understated</em><b>Oak, stone, emerald and gold</b><p>Warm materials, soft light, no loud music, and seating for anyone who needs it.</p><small>Calm is part of the brand</small></div>
    <div><em>Private when needed</em><b>A consultation room</b><p>Readings, referrals and box set-up happen behind a door, not across a counter.</p><small>Privacy supports membership</small></div>
    <div><em>Run by data</em><b>The manager’s office</b><p>Stock, sales and cameras on one screen; the founders’ 21:00 report comes from the same system.</p><small>One system, one price</small></div></div>`],
  ['Risks and our answer',`<div class="risks">
   <div class="risk"><span class="q">The lease advance ties up cash before the first sale.</span><span class="ar">→</span><span class="a">The ${I.lease_advance_months}-month rent advance (${F.m(lease)}) is the largest single pre-opening cost and is funded as its own seed line. We will negotiate a rent-free fit-out period and staged payments; any saving moves to the reserve.</span></div>
   <div class="risk"><span class="q">Fit-out quotations come in higher than planned.</span><span class="ar">→</span><span class="a">The design is modular: shelving bays, island and tables are standard units. The LED wall can start smaller and grow, and the ${F.m(seedUse('reserve'))} working-capital reserve covers overruns.</span></div>
   <div class="risk"><span class="q">Power cuts or internet drops stop tills and screens.</span><span class="ar">→</span><span class="a">Battery backup for tills, kiosk, lights and fridges; offline-safe tills that sync later; a second connection.</span></div>
   <div class="risk"><span class="q">Theft or break-ins on a street-front site.</span><span class="ar">→</span><span class="a">Perforated security shutter, CCTV on doors, tills and stockroom, an alarm, and a safe in the manager’s office.</span></div>
   <div class="risk"><span class="q">The final site may not match this plan.</span><span class="ar">→</span><span class="a">The plan is a set of rules (check by the door, counter at the back, quick needs near the exit, back of house in one strip), not a fixed drawing. It fits any rectangular site of about 150–220 m², and the same rules scale down to the ${LI.store.area_m2} m² Start Small store.</span></div></div>`]],
  takeaway:'The layout is designed to turn visits into membership: <b>a free check at the door</b> brings people in, the Care Zones are legible from the threshold, the counter converts visits into <b>monthly Afya Boxes</b>, and the back of house packs them.',
  doors:['s3-2','s3-3','s3-5','s6-3'],
  sources:[]})},
 init(){
  tourInit();
  const st=$('p31s');if(!st)return;
  const ims=[...st.querySelectorAll('.im img')],th=[...document.querySelectorAll('#p31t button')],dot=$('p31dot');let cur=0;
  const go=i=>{cur=(i+STOPS.length)%STOPS.length;const x=STOPS[cur],z=x.z?RZ.find(r=>r.id===x.z):null;
   ims.forEach((m,k)=>m.classList.toggle('on',k===cur));th.forEach((b,k)=>b.classList.toggle('on',k===cur));
   $('p31k').textContent=(cur+1)+' / '+STOPS.length+' · '+x.k;$('p31h').textContent=x.t;$('p31p').textContent=x.p;
   $('p31sp').innerHTML=x.sp.map(t=>`<span>${esc(t)}</span>`).join('');$('p31n').textContent='Stop '+(cur+1);
   const r=z?z.r:(x.k==='Outside'?[505,640,780,700]:x.img==='s-esl'?[78,140,165,590]:[500,300,780,500]);
   dot.style.left=((r[0]+r[2])/2/12.8)+'%';dot.style.top=((r[1]+r[3])/2/7.2)+'%';
   th[cur]&&th[cur].scrollIntoView({block:'nearest',inline:'center',behavior:'smooth'})};
  $('p31prev').onclick=()=>go(cur-1);$('p31next').onclick=()=>go(cur+1);th.forEach(b=>b.onclick=()=>go(+b.dataset.i));go(0);
  if(window.FP)FP.init('p31fp',{onStop:(id,n)=>{const i=STOPS.findIndex(x=>x.z===id);go(i<0?n:i);st.scrollIntoView({behavior:'smooth',block:'center'})},zoneLink:1});
  Object.keys(FILMS).forEach(chainPlayer);
 }};

/* ===================================================================
   3.2 CUSTOMER JOURNEY & FAST CHECKOUT
   =================================================================== */
const JC=['#5fbf8f','#d9b56e','#f2c96b','#c9b8ff','#ff9bb8'];
const JOUR=[
 {ph:['cj-enter','walking into the store','40% 50%'],why:'Repeat buyers such as Baba Juma carry store revenue. If buying strips takes three minutes rather than thirty, he returns to Afya Basics rather than the nearest kiosk, and the walk-in line of the model ('+F.pct(I.store.conversion)+' of visitors buying, '+tz(I.store.basket)+' average basket) holds up.',n:'Walk-in shopper',tag:'under 3 min',target:180,unit:'s',who:'Baba Juma stops on his way home in Sinza for glucose test strips. He knows what he needs.',
  steps:[['Arrive',10,'Clean glass front, the Afya sign, a door screen: “Free health check inside”. Zone colours visible from the door.'],['Find',60,'He follows the red Heart & Diabetes colour, or asks the find-it screen, which shows the zone and shelf number.'],['Choose',60,'One printed price, a short “best for” card and 4–5 registered brands side by side. An adviser only if he wants one.'],['Pay',30,'Scan-and-go in the app, a self-checkout point or an adviser’s handheld till. Mobile money, card or cash.'],['Leave with a plan',10,'TRA receipt by SMS or WhatsApp, and a one-tap offer to save the strips as a monthly reminder or Afya Box.']],
  foot:'Budget <b>2 min 50 s</b> against a target of <b>under 3 minutes</b>, for a customer who knows what they need.'},
 {ph:['cj-m-check','an Afya Check with an adviser','60% 40%'],why:'This is the slowest journey by design. Time spent explaining a reading builds the trust that turns a first visit into an Afya Care membership. The model assumes '+F.pct(I.check.check_to_purchase)+' of checks lead to a purchase; the rest leave with advice and come back.',n:'Customer who needs advice',tag:'under 12 min',target:720,unit:'s',who:'Mama Rehema, 52, has headaches and wants to know her blood pressure before buying a monitor.',
  steps:[['Afya Check',240,'Free check: 15 measurements in about 4 minutes. Results on screen and by SMS, with her consent.'],['Adviser explains',180,'A health adviser explains each reading in plain words. If a reading needs a doctor, she is referred to a clinic first.'],['Right product',150,'The adviser shows the right monitor or kit in her price range, with its warranty and how to use it.'],['Pay',30,'Paid on the adviser’s handheld till by mobile-money push, right where she is sitting.'],['Follow-up',30,'A reminder for her next check, and an offer of the Afya Care card if she wants regular checks.']],
  foot:'Budget <b>10 min 30 s</b> against a target of <b>under 12 minutes</b>, including the full fifteen-measurement check.'},
 {ph:['cj-home','reordering from home','40% 45%'],why:'Online orders reach about '+I.online.orders_day_m12+' a day by month 12 in the model. Each one pays a '+tz(I.online.delivery_fee)+' delivery fee against a rider cost of about '+tz(I.online.rider_cost_per_order)+', so faster delivery does not cost the business money.',n:'Online & WhatsApp order',tag:'under 30 s',target:30,unit:'s',who:'Neema, a nurse on night shifts in Mbezi, reorders nappies and wipes from her phone during a break.',
  steps:[['Open',5,'She opens the Afya app or messages the Afya WhatsApp number.'],['Order again',5,'“Order again” shows her last basket. One tap to confirm.'],['Pay',15,'A mobile-money push appears on her phone. She enters her PIN to approve.'],['Delivery or collect',5,'Same-day delivery in Dar (ordered before 15:00) or click and collect within 2 hours.']],
  foot:'Budget <b>30 seconds</b> to order. Then: picker’s handheld gets the order instantly, rider assigned by zone, live tracking, photo or code proof at the door.'},
 {ph:['hub','boxes packed from locked choices','45% 45%'],why:'Automatic renewal is the most valuable design decision in the business: a member who takes no action remains a member. At an average box of '+tz(I.members.avg_box)+', every month a family does not cancel is revenue the store does not have to win again.',n:'Afya Box member',tag:'0 clicks',target:0,unit:'clicks',who:'The Mushi family has the Mama na Mtoto box on a 12-month plan. No action is needed each month unless they want a change.',
  steps:[['Auto-renew',0,'The box renews on the member’s date and plan, automatically. Nothing to click.'],['Reminder',0,'Twelve days before month end: keep the box as it is, or swap brands (Afya Choice). Optional.'],['Packed',0,'The box is packed from the locked choices, photographed and sealed at the packing bench.'],['Delivered',0,'Delivered on a fixed day, or left in the smart locker. Packing and delivery are already in the box price.'],['Points & next check',0,'Points, savings and the date of the next free check appear in the app.']],
  foot:'Customer effort: <b>zero clicks</b> each month. An optional brand swap takes about 30 seconds, up to 12 days before month end.'},
 {ph:['boxdoor','the box handed over at the door','55% 40%'],why:'Tanzanians abroad already send money home. Afya Basics converts part of it into care that can be verified: the delivery photo is what brings a sender in Muscat back the following month.',n:'Diaspora gift',tag:'under 2 min',target:120,unit:'s',who:'Hamisi, working in Muscat, sends his mother in Temeke an elderly care box for the month.',
  steps:[['Choose',40,'He picks an Afya Box or a gift card for his mother, from the app or website.'],['Pay',45,'Pays by international card. The price already includes packing and delivery.'],['Message',25,'Adds his mother’s phone number and a short message.'],['Confirm',5,'Confirmation by email. When the box arrives, he receives a photo of the delivery.']],
  foot:'Budget <b>1 min 55 s</b> against a target of <b>under 2 minutes</b>. The family at home receives the box with a photo sent back to him.'}];
const PROD=[['Digital blood-pressure monitor','Heart & Diabetes',65000],['Glucose test strips ×50','Heart & Diabetes',38000],['Baby nappies, size 3 ×44','Mother & Baby',28500],['Baby wipes ×80','Mother & Baby',6500],['Digital thermometer','First Aid & Home',12000],['Elastic bandage 7.5 cm','Mobility & Recovery',5000]];
const SPEED=[ // label, value shown, unit, fraction of ring, how, budget
 ['Find a product in store','1','min','.95','Care Zones, shelf numbers, find-it screen and app map','Budget 60 s'],
 ['Find and pay in store','3','min','.94','Walk-in journey, step by step','Budget 2:50'],
 ['Pay in store','30','sec','.5','Scan-and-go, self-checkout, mobile-money push','Demo: about 10–15 s'],
 ['Repeat order online','30','sec','1','Saved basket, saved address, one-tap payment','Budget 30 s'],
 ['Click and collect ready','2','hours','.75','Order sent instantly to the picker’s handheld','Picking from stock room'],
 ['Same-day delivery in Dar','15:00','cut-off','.62','Riders assigned automatically by zone','Order before 15:00'],
 ['Answer on WhatsApp','5','min','.6','Quick replies, catalogue links, staff inbox','In opening hours'],
 ['Monthly Afya Box','0','clicks','0','Automatic renewal, reminders, locked packing list','Automatic']];

/* ---- 3.2 rebuilt: fast, safe, confirmed ---- */
const S32={
 d3:['NeoTech UAE, product page: SUNMI D3 PRO desktop POS (15.6" + optional 10.1" customer display), listed AED 4,428','https://neotech.ae/products/sunmi-d3-pro-advanced-desktop-pos-terminal'],
 k2:['NeoTech UAE, product page: SUNMI K2 MINI self-service kiosk, listed AED 12,205–14,646','https://neotech.ae/products/sunmi-k2-mini-self-service-kiosk'],
 v3:['NeoTech UAE, product page: SUNMI V3 handheld POS with 58 mm printer, listed AED 2,698.80','https://neotech.ae/products/sunmi-v3-android-pos-terminal-uae'],
 esl:['KORONA POS: How much do electronic shelf labels cost? ($5–12 average per label; gateway $300–400; software ~$500)','https://koronapos.com/blog/how-much-do-electronic-shelf-labels-cost/'],
 eas:['Store gate security alarm installation cost guide (dual-pedestal RF system $3,000–7,000 incl. basic installation)','https://wiki.dronebotworkshop.com/wiki/store-gate-security-alarm-installation-cost.html'],
 fee:['Kolonell, 2026: Accepting Tigo Pesa / mobile money in a Dar es Salaam store (Selcom ≈1.5–2%, no monthly fee)','https://kolonell.com/en/blog/accept-tigo-pesa-payment-dar-es-salaam-store-2026'],
 lock:['StoreMoreStore: smart parcel lockers (outdoor 17-door unit listed at $16,187.50)','https://www.storemorestore.com/Parcel-Package-Delivery-Lockers-Any-Time-Access-s/1410.htm'],
 fx:['Pound Sterling Live: USD/TZS exchange rate (≈2,640 at time of research; plan uses 2,640)','https://poundsterlinglive.com/data/currencies/usd-pairs/USDTZS-exchange-rate']};
const C2=(k,n)=>cref(S32[k][1],n,S32[k][0]);
const FXR=(window.MODEL&&MODEL.inputs.meta.fx_usd)||2600; // the master model's planning rate
const AED=2.723e-1*FXR; // TSh per AED (1 AED = 0.2723 USD)
const MACH=[ // name, model, what, list price text, TSh, qty day one, when, src
 ['Counter POS with two-way screen','SUNMI D3 PRO · 15.6" adviser screen + 10.1" customer display · 80 mm printer','The adviser builds the basket; the customer sees every line and total on the facing screen, chooses how to pay and signs up for membership.','AED 4,428',4428*AED,1,'Day one','d3'],
 ['Self-checkout station','Benchmark: SUNMI K2 MINI kiosk (AED 12,205–14,646 ≈ TSh 8.3–10.0M). Our route: D3-class terminal + 2D scanner + steel stand','Scan, pay by mobile money or card, receipt and door QR by SMS. One station at opening; the second when visitors pass 80 a day.','≈ TSh 4.0M built · K2 benchmark TSh 8.3–10.0M',4.0e6,1,'Day one (1), month 6+ (2nd)','k2'],
 ['Adviser handheld till','SUNMI V3 · 6.75" screen · 58 mm printer · 4G + Wi-Fi','Takes payment in the lounge, at the Afya Check or in a zone; prints or texts the receipt.','AED 2,698.80',2698.8*AED,1,'Day one (1), month 4+ (2nd)','v3'],
 ['Door-check podium','2D QR scanner + small status screen on a slim podium','Confirms every receipt once before the customer leaves; green or red in about five seconds.','Planning estimate',0.6e6,1,'Day one',null],
 ['Cameras, alarm and battery backup','CCTV over tills, door and stockroom; alarm; UPS for tills, kiosk and lights','Protects cash and stock; keeps selling in a power cut.','Planning estimate',1.5e6,1,'Day one',null],
 ['Electronic shelf labels','Starter set of ≈150 labels + gateway + software (full store ≈600 labels ≈ TSh 7.8–18.7M)','One price on the shelf, in the app and on WhatsApp; price changes in seconds.','$5–12 per label · gateway $300–400 · software ≈$500',(150*8+350+500)*FXR,0,'Phase 2 (from operating cash)','esl'],
 ['Smart parcel locker (after-hours collection)','Outdoor unit on the facade, code or QR, door camera','Lets customers collect online orders 24/7 with no staff.','Branded 17-door benchmark $16,188 · Asian-made on quotation',16188*FXR,0,'Phase 2 · after quotes','lock'],
 ['Anti-theft (EAS) gate','Dual-pedestal gate + tags, installed','Only if losses run above target after six months of door checks and CCTV.','$3,000–7,000 installed',5000*FXR,0,'Phase 2 · only if needed','eas']];
const CSS32=`
.p3 .edp-body h3,.p3 .edp-tb h3,.p3 .edp-bt h3,.p31s h3,.p31p aside h3,.p31c h4,.p32cd h5,.p32sec article b,.p3 .p3-card h3{font-family:var(--f-serif,Georgia,serif);font-weight:500;letter-spacing:-.012em}
.p3 .edp-body h3,.p3 .edp-bt h3{font-size:1.6rem;line-height:1.15}
.p32m table{width:100%;border-collapse:collapse;font-size:.88rem}.p32m th{font:600 .68rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;text-align:left;color:rgba(244,251,247,.6);padding:10px 8px;border-bottom:1px solid rgba(255,255,255,.12)}
.p32m td{padding:12px 8px;border-bottom:1px solid rgba(255,255,255,.07);vertical-align:top;line-height:1.5}.p32m td b{display:block;font-size:.95rem}.p32m td small{display:block;color:rgba(244,251,247,.65);font-size:.78rem;margin-top:3px}
.p32m td.r{text-align:right;font-family:var(--f-hud,monospace);white-space:nowrap}.p32m tr.t td{font-weight:700;color:#5fbf8f;border-bottom:0}.p32m .ph{display:inline-block;padding:2px 8px;border-radius:999px;font-size:.7rem;border:1px solid rgba(95,191,143,.35)}.p32m .ph.l{border-color:rgba(242,201,107,.4);color:#f2c96b}
.p32wrap{overflow-x:auto;border-radius:18px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.02);padding:6px 12px}
.p32c{display:grid;grid-template-columns:minmax(0,1.55fr) minmax(0,1fr);gap:16px;margin-top:16px;align-items:start}
.p32pos{border-radius:20px;background:#121615;padding:12px;border:1px solid rgba(255,255,255,.1)}
.p32pos .sc{display:grid;grid-template-columns:minmax(0,1fr) 200px;border-radius:12px;overflow:hidden;background:#f7f4ee;color:#0d1c16;min-height:330px}
.p32pos .tabs{display:flex;gap:6px;padding:10px 10px 0}.p32pos .tabs button{border:1px solid #dcd6ca;background:#fff;border-radius:999px;padding:6px 12px;font:600 .74rem inherit;color:#0d1c16;cursor:pointer}.p32pos .tabs button.on{background:#0f6b4f;color:#fff;border-color:#0f6b4f}
.p32pos .grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:10px}.p32pos .grid button{border:1px solid #e7e1d5;background:#fff;border-radius:12px;padding:9px;text-align:left;cursor:pointer;color:#0d1c16;font:inherit}
.p32pos .grid button i{display:block;height:28px;border-radius:7px;margin-bottom:6px}.p32pos .grid button b{display:block;font-size:.76rem;line-height:1.25}.p32pos .grid button span{font:500 .72rem var(--f-hud,monospace);color:#0f6b4f}
.p32pos .bk{background:#fff;border-left:1px solid #e7e1d5;padding:10px;display:flex;flex-direction:column;font-size:.76rem}.p32pos .bk .ln{display:flex;justify-content:space-between;gap:6px;padding:5px 0;border-bottom:1px solid #efeae0}
.p32pos .bk .tt{display:flex;justify-content:space-between;font-weight:700;font-size:.95rem;margin-top:auto;padding-top:8px}.p32pos .bk button{margin-top:8px;border:0;border-radius:10px;padding:10px;background:#0f6b4f;color:#fff;font:700 .8rem inherit;cursor:pointer}.p32pos .bk button:disabled{opacity:.45;cursor:default}
.p32cd{border-radius:20px;background:#121615;padding:10px;border:1px solid rgba(255,255,255,.1)}.p32cd .sc{border-radius:12px;background:#0b211a;color:#f6f3ec;padding:16px;min-height:250px;font-size:.84rem}
.p32cd .sc h5{margin:0 0 8px;font:500 1.1rem var(--f-serif,Georgia),serif}.p32cd .ln{display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,.08)}
.p32cd .opts{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px}.p32cd .opts button{border:1.5px solid rgba(255,255,255,.2);background:transparent;color:#f6f3ec;border-radius:10px;padding:9px 6px;font:600 .74rem inherit;cursor:pointer}.p32cd .opts button:hover{border-color:#5fbf8f}
.p32cd input{width:100%;margin-top:6px;padding:9px 10px;border-radius:9px;border:1.5px solid #5fbf8f;background:transparent;color:#fff;font:500 .9rem var(--f-hud,monospace)}
.p32cd .go{margin-top:10px;width:100%;border:0;border-radius:10px;padding:10px;background:#5fbf8f;color:#05261b;font:700 .8rem inherit;cursor:pointer}
.p32lab{font:600 .64rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#d8b46a;margin:0 0 8px}
.p32sec{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}.p32sec article{border-radius:16px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);padding:16px 18px}.p32sec article em{font:600 .64rem var(--f-hud,monospace);letter-spacing:.14em;color:#d8b46a;font-style:normal}.p32sec article b{display:block;font-size:1rem;margin:6px 0}.p32sec article p{margin:0;font-size:.86rem;line-height:1.55;color:rgba(244,251,247,.8)}
.p32door{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-top:14px;counter-reset:d}.p32door div{border-radius:14px;border:1px solid rgba(95,191,143,.25);padding:14px;font-size:.86rem;line-height:1.5}.p32door b{display:block;margin-bottom:4px}
@media(max-width:900px){.p32c,.p32sec,.p32door{grid-template-columns:1fr}.p32pos .sc{grid-template-columns:1fr}}
`;
const CPRO=[['BP monitor, upper arm',65000,'#ff7b6b','p'],['Glucose strips ×50',38000,'#ff7b6b','p'],['Nappies size 3 ×44',28500,'#ff9bb8','p'],['Baby wipes ×80',6500,'#ff9bb8','p'],['Digital thermometer',12000,'#f2c96b','p'],['Knee support',22000,'#d9b56e','p'],
 ['Lipid profile test · 4 values',15000,'#5fbf8f','s'],['Home delivery today',4000,'#5fbf8f','s'],['Equipment rental · walker, 1 month',30000,'#5fbf8f','s'],
 ['Afya Box · Presha Care, monthly',35000,'#c9b8ff','b'],['Afya Box · Sukari Care, monthly',77500,'#c9b8ff','b']];
function counterDemo(){const g=$('p32grid');if(!g)return;const cd=$('p32cd');let tab='p',bk=[],member=null,stage='basket';
 const tot=()=>bk.reduce((a,i)=>a+CPRO[i][1],0);
 const grid=()=>{g.innerHTML=CPRO.map((x,i)=>x[3]===tab?`<button type="button" data-i="${i}"><i style="background:linear-gradient(135deg,${x[2]}55,${x[2]}18)"></i><b>${esc(x[0])}</b><span>${tz(x[1])}</span></button>`:'').join('');g.querySelectorAll('button').forEach(b=>b.onclick=()=>{if(stage!=='basket')return;bk.push(+b.dataset.i);paint()})};
 const lines=()=>bk.map(i=>`<div class="ln"><span>${esc(CPRO[i][0])}</span><b>${tz(CPRO[i][1])}</b></div>`).join('');
 const cust=()=>{const T=tot();
  if(stage==='basket')cd.innerHTML=`<h5>Karibu Afya Basics</h5>${bk.length?lines():'<p style="opacity:.7">Your items will appear here as the adviser adds them.</p>'}<div class="ln" style="border:0;margin-top:6px;font-size:1.05rem"><span>Total · VAT incl.</span><b>${tz(T)}</b></div>${member?`<p style="margin-top:8px;color:#5fbf8f">Afya Green member · +${Math.floor(T/1000)} points on this basket</p>`:`<button type="button" class="go" id="p32join" style="background:transparent;border:1.5px solid #5fbf8f;color:#5fbf8f">Join Afya Green · free</button>`}`;
  if(stage==='join')cd.innerHTML=`<h5>Join Afya Green · free</h5><label style="font-size:.78rem;opacity:.8">Phone number<input id="p32ph" inputmode="tel" value="+255 754 210 318"></label><label style="display:flex;gap:8px;margin-top:10px;font-size:.74rem;line-height:1.45;align-items:flex-start"><input type="checkbox" id="p32cons" style="width:auto;margin-top:2px"> I agree that Afya Basics keeps my purchases and readings to give me points and reminders. I can withdraw at any time.</label><button type="button" class="go" id="p32otp">Send code &amp; join</button>`;
  if(stage==='pay')cd.innerHTML=`<h5>${tz(T)}</h5><p style="opacity:.8">Choose how to pay</p><div class="opts"><button type="button" data-m="mm">Mobile money<br><small style="opacity:.7">request to phone</small></button><button type="button" data-m="card">Card<br><small style="opacity:.7">tap on reader</small></button><button type="button" data-m="cash">Cash<br><small style="opacity:.7">at this counter</small></button></div>`;
  if(stage==='wait')cd.innerHTML=`<h5>Check your phone</h5><p style="opacity:.85">A request for <b>${tz(T)}</b> to AFYA BASICS has been sent. Approve it with your PIN on your own phone.</p><button type="button" class="go" id="p32appr">Enter PIN on my phone (simulated)</button>`;
  if(stage==='card')cd.innerHTML=`<h5>Tap your card</h5><p style="opacity:.85">Hold the card or phone near the provider’s reader. Card details go to the payment provider, never to Afya.</p>`;
  if(stage==='paid')cd.innerHTML=`<h5 style="color:#5fbf8f">Asante · Paid ${tz(T)}</h5><p style="opacity:.85">TRA fiscal receipt sent by SMS${member?' · '+Math.floor(T/1000)+' points added':''}. Show this QR at the door.</p><div style="width:96px;height:96px;margin-top:10px;background:repeating-conic-gradient(#0d1c16 0 25%,#fff 0 50%) 0 0/12px 12px;border:6px solid #fff"></div><button type="button" class="go" id="p32new">New customer</button>`;
  const j=$('p32join');if(j)j.onclick=()=>{stage='join';paint()};
  const o=$('p32otp');if(o)o.onclick=()=>{if(!$('p32cons').checked){$('p32cons').parentElement.style.color='#ffb4a3';return}member=$('p32ph').value;stage='basket';paint()};
  cd.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{const m=b.dataset.m;if(m==='mm'){stage='wait';paint()}else if(m==='card'){stage='card';paint();later(()=>{stage='paid';paint()},1800)}else{stage='paid';paint()}});
  const a=$('p32appr');if(a)a.onclick=()=>{a.disabled=true;a.textContent='Approved ✓';later(()=>{stage='paid';paint()},700)};
  const n=$('p32new');if(n)n.onclick=()=>{bk=[];member=null;stage='basket';paint()}};
 const paint=()=>{const T=tot();$('p32lines').innerHTML=lines()||'<p style="color:#6c7a73;margin:8px 0">Tap items to add them.</p>';$('p32tot').textContent=tz(T);$('p32vat').textContent='VAT included '+tz(T*18/118);
  $('p32who').textContent=member?'Member · Afya Green · '+member:'Customer · walk-in';const c=$('p32chg');c.disabled=!bk.length||stage!=='basket';c.textContent=stage==='paid'?'✓ Paid · receipt sent':stage==='basket'?'Charge '+tz(T):'Waiting for customer…';cust()};
 $('p32tabs').querySelectorAll('button').forEach(b=>b.onclick=()=>{tab=b.dataset.t;$('p32tabs').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));grid()});
 $('p32chg').onclick=()=>{if(!bk.length)return;stage='pay';paint()};$('p32clr').onclick=()=>{bk=[];stage='basket';paint()};
 grid();paint()}
const UIM=(f,alt,w)=>`<img src="img/ui/${f}.webp" alt="${esc(alt)}" loading="lazy" class="p32ui${w?' '+w:''}">`;
const STEP=(n,t,time,imgs,c,a,s,note)=>`<article class="p32st"><div class="p32st-im${imgs.length>1?' two':''}">${imgs.join('')}</div><div class="p32st-tx"><div class="p32st-h"><span class="n">${n}</span><div><h4>${t}</h4>${time?`<span class="tm">${time}</span>`:''}</div></div>
 <dl>${c?`<dt>Customer</dt><dd>${c}</dd>`:''}${a?`<dt>Staff</dt><dd>${a}</dd>`:''}${s?`<dt>System</dt><dd>${s}</dd>`:''}</dl>${note?`<p class="p32st-n">${note}</p>`:''}</div></article>`;
const CSS32B=`
.p32st{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:22px;padding:22px 0;border-top:1px solid rgba(255,255,255,.08);align-items:center}
.p32st:first-of-type{border-top:0}
.p32st-im{display:flex;gap:12px;align-items:flex-end;justify-content:center}.p32st-im.two .p32ui.wide{max-width:62%}
.p32ui{display:block;max-width:100%;height:auto;border-radius:14px;box-shadow:0 24px 50px -20px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.08)}
.p32ui.ph{width:44%;max-width:300px;min-width:170px;border-radius:28px}.p32ui.wide{width:100%}.p32ui.half{width:48%}
.p32st-h{display:flex;gap:14px;align-items:flex-start;margin-bottom:10px}.p32st-h .n{flex:none;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;background:#0f6b4f;color:#fff;font:700 1rem var(--f-body)}
.p32st-h h4{margin:0;font:500 1.35rem/1.2 var(--f-serif,Georgia,serif)}.p32st-h .tm{display:inline-block;margin-top:5px;font:600 .7rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:#d8b46a}
.p32st dl{margin:0;display:grid;grid-template-columns:86px 1fr;gap:8px 12px;font-size:.92rem;line-height:1.6}.p32st dt{font:600 .66rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:rgba(244,251,247,.55);padding-top:4px}.p32st dd{margin:0;color:rgba(244,251,247,.88)}
.p32st-n{margin:12px 0 0;padding:10px 14px;border-radius:12px;background:rgba(95,191,143,.07);border:1px solid rgba(95,191,143,.2);font-size:.86rem;line-height:1.55}
.p32sum{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:18px 0 6px}.p32sum div{border-radius:14px;border:1px solid rgba(255,255,255,.1);padding:14px 16px}.p32sum b{display:block;font:600 1.4rem var(--f-body)}.p32sum span{font-size:.8rem;color:rgba(244,251,247,.7)}
.p32tbl{width:100%;border-collapse:collapse;font-size:.88rem}.p32tbl td,.p32tbl th{padding:9px 8px;border-bottom:1px solid rgba(255,255,255,.07);text-align:left}.p32tbl th{font:600 .66rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:rgba(244,251,247,.55)}.p32tbl td.r,.p32tbl th.r{text-align:right;font-family:var(--f-hud,monospace)}
.p32cal{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px;margin-top:14px}.p32cal div{border-radius:14px;padding:14px;border:1px solid rgba(201,184,255,.3);background:rgba(201,184,255,.05);font-size:.85rem;line-height:1.5}.p32cal b{display:block;font:600 .7rem var(--f-hud,monospace);letter-spacing:.1em;color:#d8b46a;margin-bottom:4px}
@media(max-width:900px){.p32st{grid-template-columns:1fr}.p32sum,.p32cal{grid-template-columns:repeat(2,minmax(0,1fr))}.p32st dl{grid-template-columns:1fr}}
`;
addCSS('p32b',CSS32B);
function boxEx(){const X=window.AFYABOX;try{const bx=X.BK('mama'),o={...X.dopt(bx),stage:'m6'};const c6=X.calc(bx,o,6,false,null,true),c6c=X.calc(bx,o,6,true,null,true),c1=X.calc(bx,o,1,false,null,true);
 return{p6:c6.price,p6c:c6c.price,p1:c1.price,val:c6.val,save:c6.save,sp:c6.sp,sp1:c1.sp,items:c6.first.mon.map(x=>[x[2]||X.it(x[0])[1],x[1],X.it(x[0])[2]]),st:[...(c6.first.r.s||[]),...(c6.first.r.x||[])].map(x=>x[2]||X.it(x[0])[1]),disc:c6.first.disc,pd:[X.PACKC,X.DELC]}}catch(e){return{p6:188000,p6c:184500,p1:205500,val:217525,save:76680,sp:161000,sp1:273500,items:[],st:[],disc:.16,pd:[2000,3500]}}}
const qf=q=>q>=1?String(q):q>=.49&&q<=.51?'every 2nd month':q>=.33&&q<=.35?'every 3rd month':q>=.24&&q<=.26?'every 4th month':q>=.16&&q<=.18?'every 6th month':String(q);
function deepMods(){const bx=boxEx();return [
 ['Step by step · paying at the counter',`
   <p class="s11lead">An illustrative visit, shown on the actual screen designs. <b>Mama Amani</b>, 29, arrives with her six-month-old asleep in a carrier and brings nappies, wipes and a thermometer to the counter. Each step shows who does what and how long it takes. ${tagi('Illustrative customer · real screen designs')}</p>
   <div class="p32sum"><div><b>≈ 90 s</b><span>whole counter visit, including a new membership</span></div><div><b>≈ 20 s</b><span>to pay once the total is shown</span></div><div><b>0</b><span>PINs typed on shop equipment</span></div><div><b>1</b><span>fiscal receipt, on her phone</span></div></div>
   ${STEP(1,'The adviser builds the basket','0:00 – 0:15',[UIM('p-posm','Adviser screen with three products and the total','wide')],'Places the items on the counter and watches her screen.','Scans each barcode (or taps the product photo if the label is damaged). Products and services sit in one menu.','Looks up the one price set centrally, the same as on the shelf label and in the app; checks stock; adds VAT automatically.','Every line is shown to the customer as it is added, so there is never a surprise at the end.')}
   ${STEP(2,'The customer sees every line','0:05 – 0:20',[UIM('c-basket','Customer screen showing items, total and a join button','wide')],'Reads each item, quantity and price on the 10.1-inch screen facing her. Sees the total: TSh 47,000.','Offers one thing: free Afya Green membership, with points on every purchase and a free Afya Check.','Mirrors the adviser’s basket in real time and shows the membership offer only to non-members.')}
   ${STEP(3,'She joins Afya Green in 20 seconds','0:20 – 0:40',[UIM('c-join','Customer screen: phone number, one-time code and consent','wide')],'Types her own phone number on her own screen, enters the 4-digit code that arrives by SMS, and ticks the consent box after reading it.','Waits. The adviser never types the customer’s number or sees the code.','Verifies the phone with a one-time code, records consent with time and counter, creates the member, applies 47 points to today’s basket.','Consent is required by Tanzania’s Personal Data Protection Act; it is recorded, and the member can see, change or delete her data at any time.')}
   ${STEP(4,'She chooses how to pay','0:40 – 0:50',[UIM('c-pay','Customer screen: mobile money, card or cash','wide')],'Taps Mobile money (or Card, or Cash) on her screen.','Presses Charge on the adviser screen.','Fixes the amount and sends a payment request through the licensed aggregator to the phone number she chose.')}
   ${STEP(5,'She approves on her own phone','0:50 – 1:10',[UIM('m-stk','Phone showing the mobile money PIN prompt','ph'),UIM('c-wait','Customer screen: check your phone','half')],'Sees the prompt from her mobile-money provider: “Lipa TSh 47,000 kwa AFYA BASICS LTD”. Enters her PIN on her own phone.','Waits; the screen says “Afya Basics staff never ask for your PIN”.','Receives the provider’s confirmation (typically within seconds), records the sale once and issues the TRA fiscal receipt through the virtual fiscal device.','If no answer in 60 seconds, the screen offers to resend, or to pay by card or cash. Nothing is charged twice.')}
   ${STEP(6,'Paid: receipt, points and a QR for the door','1:10 – 1:30',[UIM('c-paid','Customer screen: paid with a QR code','wide'),UIM('m-sms','SMS with receipt and welcome','ph')],'Reads “Asante · Paid”. Gets two SMS messages: the fiscal receipt with a QR, and her welcome with 47 points and the date of her next free check.','Bags the items and thanks her.','Updates stock, the member’s history and the founders’ 21:00 report at the same moment.')}`],
 ['Step by step · ordering online and paying by phone',`
   <p class="s11lead"><b>Baba Daudi</b>, 46, has diabetes and buys the same test strips every month. It is 18:40 and he is at home in Mbezi Beach. The screens below are the ones he uses. ${tagi('Illustrative customer · real screen designs')}</p>
   <div class="p32sum"><div><b>≈ 25 s</b><span>from opening the app to paid</span></div><div><b>4</b><span>taps plus his PIN</span></div><div><b>Same day</b><span>delivery if ordered before 15:00 · evening slots after</span></div><div><b>${tz(I.online.delivery_fee)}</b><span>delivery fee (locker or counter: free)</span></div></div>
   ${STEP(1,'Order again','0:00 – 0:05',[UIM('a-home','App home screen with Order again','ph')],'Opens the Afya app (or WhatsApp) and taps Reorder on last month’s basket.','—','Remembers his last basket, his address and his preferred wallet.')}
   ${STEP(2,'Choose delivery and wallet','0:05 – 0:15',[UIM('a-checkout','Checkout with delivery options and wallets','ph')],'Chooses same-day delivery (or the locker, or counter collection) and M-Pesa. Taps Pay TSh 42,000.','—','Shows the full price including VAT and delivery before he pays. Supports M-Pesa, Mixx by Yas, Airtel Money, HaloPesa and cards through one aggregator.')}
   ${STEP(3,'Approve with his PIN','0:15 – 0:25',[UIM('a-stk','Mobile money PIN prompt','ph')],'His mobile-money provider’s own prompt appears. He enters his PIN and taps TUMA.','—','Never sees or stores the PIN: it goes straight from his phone to his provider.')}
   ${STEP(4,'Paid, and the receipt by SMS','0:25',[UIM('a-paid','Payment received screen','ph'),UIM('a-sms','SMS receipt','ph')],'Sees “Payment received”, with the order number and the fiscal receipt number. The same receipt arrives by SMS.','The picker’s handheld beeps with the new order.','Issues the TRA receipt, reserves the stock, prints a packing slip in the stockroom.')}
   ${STEP(5,'Picked, checked, sealed, delivered','19:05 – 19:41',[UIM('a-track','Order tracking screen','ph')],'Follows the order live; the rider calls 10 minutes before arriving.','Picker scans every item against the order, photographs the open bag, seals it. Rider is assigned by zone.','Records each step with time and staff name; the delivery photo is attached to the order.','If he is not home, he taps “Send to locker” and collects later (see below).')}`],
 ['Collect at any hour · the smart locker in detail',`
   <p class="s11lead">Many customers cannot reach the store before 21:00: night-shift nurses, late workers and families who live further away. A smart locker built into the facade lets them collect at 22:00 or at 05:00 with no staff on duty. ${tagi('Phase 2 equipment · real screen designs')}</p>
   ${STEP(1,'The order goes into a locker door','Before 21:00',[UIM('k-open','Locker screen showing a door open','half')],'Chooses “Smart locker” at checkout (free) or taps “Send to locker” on a delivery.','The picker scans the sealed bag at the locker; the system opens an empty door of the right size; the picker places the bag and closes it.','Links the bag, the door (for example B-07) and the order; starts a 48-hour timer.','Only sealed, room-temperature items go in the locker. Anything cold or high-value (for example a large monitor order) is collected at the counter.')}
   ${STEP(2,'The customer gets a one-time code','Instantly',[UIM('a-lsms','SMS with locker code','ph'),UIM('a-locker','App showing locker code and QR','ph')],'Receives an SMS and an app notification: locker B-07, code 4819, valid until Thursday 21:00, plus a QR.','—','Generates a code that works once and only for that door; it can be re-sent in the app if lost.')}
   ${STEP(3,'At the locker, any hour','e.g. 22:17',[UIM('k-code','Locker keypad entering a code','half'),`<img src="img/cj-keypad.webp" class="p32ui half" alt="Concept image: a customer typing a code on the smart locker keypad at night" loading="lazy">`],'Types the 4-digit code on the locker screen, or holds the QR to the scanner. Door B-07 opens, he takes the bag and closes it.','—','Records the time, takes a door-camera photo, marks the order collected and sends a confirmation SMS.','The door camera and the time stamp settle any “I never got it” question in seconds.')}
   ${STEP(4,'If it is not collected','After 48 h',[],'Gets a reminder at 24 hours and a final one at 44 hours.','At 48 hours staff move the bag back to the counter shelf and tell the customer; a refund or redelivery is offered.','Frees the door for the next order.')}
   <div class="p31c" style="margin-top:12px"><article><h4>What the locker costs</h4><table><tr><td>Branded outdoor smart locker, 17 doors (US list price)</td><td>$16,188 ≈ ${F.m(16188*FXR)}</td></tr><tr><td>Asian-made outdoor express locker, 43 doors</td><td>price on quotation</td></tr></table><p>The branded benchmark is far above the seed budget, so the locker is <b>phase 2</b>: we will price two Asian-made units through local distributors and add the locker once online orders justify it. Until then, collection is at the counter, 09:00–21:00, seven days a week. ${C2('lock',10)}</p></article>
    <article><h4>Why it matters</h4><table><tr><td>Store hours a week</td><td>84 h</td></tr><tr><td>Locker hours a week</td><td>168 h</td></tr><tr><td>Staff needed at the locker</td><td>0</td></tr><tr><td>Delivery cost avoided per locker order</td><td>${tz(I.online.rider_cost_per_order)}</td></tr></table><p>Every order collected from the locker instead of delivered saves the rider cost, and the customer pays no delivery fee.</p></article></div>`],
 ['The Afya Box · a real example, in the store and at checkout',`
   <p class="s11lead">The Afya Box is a monthly delivery of what a household uses, with sizes and quantities that adjust as needs change. The example below is priced by the section 3.5 box engine and follows Mama Amani from the first conversation at the counter to the first box at her door. ${tagi('Illustrative customer · prices from the 3.5 box engine')}</p>
   ${STEP(1,'In the store: the adviser shows a real box','At the counter',[`<img src="img/cj-boxcounter.webp" class="p32ui wide" alt="Concept image: an adviser shows Mama Amani an open Afya Box at the counter" loading="lazy">`],'Sees the box open on the counter: nappies, wipes, cream, wash, lotion. Asks what changes when the baby grows.','Explains the Mama na Mtoto box for a baby aged 6–12 months: the system counts about 6 changes a day, moves nappies up a size automatically, and adds spoons, a cup and a toothbrush as the baby starts solids.','Shows the exact contents and price for her baby’s stage on the customer screen.')}
   ${STEP(2,'At home: she starts the box in the app','Two days later',[UIM('a-box','App page for the Mama na Mtoto box','ph')],'Opens the Mama na Mtoto page the adviser showed her, checks this month’s list, chooses the 6-month plan and taps Start my box. She pays the first month with her mobile-money PIN.','Nothing: the adviser who served her gets a note, so the next visit is personal.','Builds the box from her baby’s stage, the plan and the shelf price of every line, and books delivery for the 5th of each month.','Every item can be swapped for another registered brand at the shelf-price difference (Afya Choice, section 3.5).')}
   <div class="p32wrap" style="margin:6px 0 14px"><table class="p32tbl"><thead><tr><th>Item this month (baby 6–12 months)</th><th class="r">Qty</th><th class="r">Shelf price each</th></tr></thead><tbody>${bx.items.slice(0,12).map(x=>`<tr><td>${esc(x[0])}</td><td class="r">${qf(x[1])}</td><td class="r">${tz(x[2])}</td></tr>`).join('')}${bx.items.length>12?`<tr><td colspan="3" style="color:rgba(244,251,247,.6)">+ ${bx.items.length-12} more lines (seasonal and long-lasting items, shown in section 3.5)</td></tr>`:''}</tbody></table></div>
   <div class="p31c"><article><h4>Her price, line by line</h4><table><tr><td>Shelf value of this month’s items</td><td>${tz(bx.val)}</td></tr><tr><td>Member + 6-month plan discount</td><td>−${Math.round(bx.disc*100)}%</td></tr><tr><td>Packing + delivery (inside the price)</td><td>${tz(bx.pd[0]+bx.pd[1])}</td></tr><tr class="t"><td>She pays per month, delivered</td><td>${tz(bx.p6)}</td></tr><tr><td>Or collected in store</td><td>${tz(bx.p6c)}</td></tr><tr><td>1-month plan instead</td><td>${tz(bx.p1)}</td></tr></table><p>Compared with buying the same items in small packs with four trips a month, she saves about <b>${tz(bx.save)}</b> a month (Research Lab method, section 3.5).</p></article>
    <article><h4>One-time starter items for this stage</h4><table>${bx.st.slice(0,6).map(x=>`<tr><td>${esc(x)}</td><td>once</td></tr>`).join('')}<tr class="t"><td>Starter set on a 6-month plan</td><td>${tz(bx.sp)}</td></tr><tr><td>Same set on a 1-month plan</td><td>${tz(bx.sp1)}</td></tr></table><p>Charged once, with the first box; on 6- and 12-month plans devices are free and other starters are half price.</p></article></div>
   ${STEP(3,'Or at checkout: the box joins the counter basket','If she decides in the store',[UIM('p-posbox','Adviser screen with the Afya Box added','wide'),UIM('c-basketbox','Customer screen with the box line','wide')],'Had she decided at the counter, she would see a new line on her screen: “Afya Box · Mama na Mtoto · 6-month plan · per month”, and pay her items plus the first month in one mobile-money payment (TSh 47,000 + TSh '+bx.p6.toLocaleString('en-US')+').','Adds the box from the Services & Boxes tab, sets the delivery day (the 5th of each month) and address.','Creates the subscription, schedules six boxes, and records the plan discount.','Store or app, the price, the contents and the monthly cycle are identical: one system.')}
   ${STEP(4,'Every month after that','Automatic',[UIM('a-boxsms','Monthly box reminder and payment SMS','ph')],'Gets a reminder on the 25th (reply SWAP to change a brand before the 28th). On the 1st, a payment request arrives on her phone; she approves it with her PIN.','Packs the box from the locked list, photographs it and seals it.','Ships only after payment. If not approved within 48 hours, an adviser calls her; nothing is charged without her PIN.')}
   ${STEP(5,'The box arrives','Delivery day',[`<img src="img/cj-boxhome.webp" class="p32ui wide" alt="Concept image: Mama Amani opening her Afya Box at home" loading="lazy">`],'Opens the box at home, or collects it at the counter (or the locker in phase 2) for the lower price.','The rider takes a doorstep photo.','Moves nappies up a size when the baby’s stage changes, without anyone having to remember.')}
   <div class="p32cal"><div><b>Day 25</b>Reminder SMS · swap a brand if you want</div><div><b>Day 28</b>Box list locked</div><div><b>Day 1</b>Payment request · PIN on her phone</div><div><b>Day 2–4</b>Packed, photographed, sealed</div><div><b>Day 5</b>Delivered or collected</div></div>`],
 ['Step by step · self-checkout and the door check',`
   <p class="s11lead">Self-checkout serves customers who know what they want: no app, no staff, no queue. Every customer, however they paid, then passes the door check.</p>
   ${STEP(1,'Scan at the self-checkout','0:00 – 0:15',[UIM('s-scan','Self-checkout screen with scanned items','half'),`<img src="img/cj-selfco.webp" class="p32ui half" alt="Concept image: a customer at the self-checkout" loading="lazy">`],'Scans each barcode under the light. Each item appears with its photo and price.','An adviser nearby helps first-time users; no staff needed after that.','Checks each barcode against the price list; flags an age-restricted or prescription item for an adviser.')}
   ${STEP(2,'Pay and get the QR','0:15 – 0:30',[UIM('s-paid','Self-checkout paid with QR','half')],'Pays by mobile money (PIN on her phone) or card. The fiscal receipt with a QR arrives by SMS; the screen shows the same QR.','—','Records the sale and issues the TRA receipt.')}
   ${STEP(3,'Door check: green','About 5 s',[UIM('d-ok','Door podium screen: paid and verified','half'),`<img src="img/cj-exit.webp" class="p32ui half" alt="Concept image: the door host scans Mama Amani’s receipt QR" loading="lazy">`],'Shows the QR on her phone or the printed receipt.','Scans it; the podium turns green and lists the items so the host can glance at the bag. “Asante, karibu tena.”','Marks the receipt as checked, so the same QR can never pass again.')}
   ${STEP(4,'Door check: red','Rare',[UIM('d-bad','Door podium screen: already used','half')],'If a code has already been used, she is asked politely to step to the counter.','Re-checks the bag privately at the counter, never at the door.','Saves the event with the door-camera clip for the 21:00 report.')}`]];}
addCSS('p32',CSS32);
window.SECTIONS['s3-2']={
 render(s,p,pv,nx){const b=B(),o=I.online;
  const day1=MACH.filter(m=>m[5]>0).reduce((a,m)=>a+m[4]*m[5],0),kioskC=KIOSK().landed,techLine=seedUse('technology');
  return secShell({s,p,pv,nx,cls:'p3',
  img:'img/cj-cnt.webp',imgAlt:'Concept image: an Afya Basics adviser operates a dual-screen till while a customer watches the facing screen and holds his phone to pay',
  h1:'Fast to pay. Safe to pay.',em:'Confirmed before you leave.',
  lede:'Checkout is where most shops lose customers to queues. Afya Basics is designed so that payment takes seconds in every channel: by phone at home, at a counter with a two-way screen, at self-checkout, or on an adviser’s handheld till. Every sale issues a TRA fiscal receipt to the customer’s phone, and every receipt is verified once at the door.',
  mods:[
  ['The cost of a slow checkout',`
   ${FEAT({f:'cj-queue',alt:'Concept image: a long queue of tired customers at a single pharmacy counter',cap:'today: one counter, one long queue',pos:'50% 40%',k:'The hidden price',h:'Forty minutes, two shops, one missing item',
    body:`<p>Mama Neema lives in Mbezi and carries her six-month-old on her back. She needs size-3 nappies, wipes and a thermometer. At the first pharmacy she queues for fifteen minutes and is told the size is out of stock. She walks to a second shop for the nappies, and buys the thermometer wherever she can, with no way of knowing whether it is accurate. ${tagi('Illustrative')}</p><p>The receipt shows a few thousand shillings. The real cost includes a bajaji fare, a lost afternoon and no assurance that the thermometer is accurate. For the shop the cost is greater: <b>a customer who will try a competitor next time.</b></p>`,
    facts:[['Target: find and pay in store','under 3 min'],['Target: pay','under 30 s'],['Target: reorder from the phone','under 30 s']]})}
   <div class="edp-tiles c2" style="margin-top:16px">${[
    {f:'cj-receipt',alt:'Concept image: a handwritten receipt book and counted cash on a pharmacy counter',cap:'handwritten receipts, counted change',k:'Cost 2 · trust',h:'Prices and receipts you cannot check',p:'A handwritten tag, a carbon-copy receipt and a search for change. The customer cannot compare or verify the price, and leaves unsure whether it was fair.'},
    {f:'cj-walkout',alt:'Concept image: a man leaving a crowded shop empty-handed onto a busy street',cap:'the sale that walks away',k:'Cost 3 · the sale',h:'The customer who leaves and does not return',p:'When the queue is long, customers leave. The lost sale never appears in the shop’s books, which makes it the most expensive cost and the least managed.'}].map(x=>`<article class="edp-tile">${PH(x.f,x.alt,x.cap)}<div class="edp-tb"><span class="edp-k">${x.k}</span><h3>${x.h}</h3><p>${x.p}</p></div></article>`).join('')}</div>
   <div class="plain" style="margin-top:18px"><span class="modno" style="margin:0 0 12px">Why the problem can now be solved</span><ol>
    <li><b>Customers already pay by phone.</b> Tanzania had <b>76,466,691</b> mobile money accounts in December 2025, more than double 2021 ${C('tcra',1)}. A checkout built around the customer’s own phone fits how people already live.</li>
    <li><b>Receipts can be digital and legal.</b> TRA accepts fiscal receipts from approved electronic systems, including cloud-based virtual fiscal devices ${C('tra',2)}, so the receipt can go straight to the customer’s phone.</li>
    <li><b>The hardware is affordable.</b> A professional dual-screen till costs about TSh 3 million and a handheld about TSh 1.8 million at list price ${C2('d3',3)} ${C2('v3',5)}. The full price list is further down this page.</li></ol></div>`],
  ['Watch it · two films',`
   <p class="s11lead">The films give the overview; each step is then documented below with the actual screens. The <b>payment demo</b> covers ordering at home, the smart locker, the two-way counter screen, self-checkout, the handheld till and the door check. <b>One visit, start to finish</b> follows Mama Amani from the door to her free check, the counter, a new membership, payment, the door, and her first Afya Box. Full HD, subtitles in English and Kiswahili. ${tagi('Concept images · real interface designs')}</p>
   <div class="p31v"><div class="two">${FV('p32p','The payment demo','online, locker, counter, self-checkout, door · 2¾ min in 4 chapters')}${FV('p32j','One visit, start to finish','door to membership and the Afya Box · 2 min in 3 chapters')}</div></div>`],
  ['Five ways to pay, none requiring a queue',`
   <p class="s11lead">Customers have different needs. A regular wants no contact at all; a walk-in in a hurry may not have the app; someone who has just had a reading explained is already seated with an adviser. <b>Each method removes the queue for a different person</b>, and all five use the same system, the same price and the same fiscal receipt.</p>
   <div class="edp-tiles" style="margin-top:14px">${[
    {f:'cj-home',k:'01 · Online & WhatsApp',h:'Order again from the sofa',p:'“Order again” loads the last basket. Choose M-Pesa, Mixx by Yas, Airtel Money, HaloPesa or card; approve with your PIN on your own phone. Same-day delivery before 15:00, or the smart locker.',s:'About 30 seconds to order'},
    {f:'cj-cnt',k:'02 · The counter',h:'A two-way screen',p:'The adviser builds the basket on a 15.6-inch screen; the customer watches every line on a 10.1-inch screen facing them, chooses how to pay, and can join membership on the same screen.',s:'Products and services in one menu'},
    {f:'cj-selfco',k:'03 · Self-checkout',h:'No app, no staff',p:'Scan, pay by mobile money or card, receive the receipt and a door QR by SMS. Built for the customer who knows what they want.',s:'Under 30 seconds'},
    {f:'cj-handheld',k:'04 · Handheld till',h:'Pay where you sit',p:'After advice, the adviser takes payment in the lounge or at the Afya Check, and prints or texts the receipt. Nobody stands up to queue.',s:'Advice first, payment last'},
    {f:'cj-phone',k:'05 · Scan-and-go',h:'Your phone is the till',p:'Regular customers scan barcodes with the Afya app as they shop and pay before reaching the door. The demo below shows the flow.',s:'No queue'},
    {f:'cj-locker',k:'+ · Smart locker (phase 2)',h:'Collect at any hour',p:'Online orders wait in a locker on the facade, opened with a one-time code sent by SMS, valid for 48 hours. Until the locker arrives, collection is at the counter until 21:00. Full step-by-step below.',s:'Day or night, no staff'}].map(x=>`<article class="edp-tile">${PH(x.f,x.h,x.k)}<div class="edp-tb"><span class="edp-k">${x.k}</span><h3>${x.h}</h3><p>${x.p}</p><small>${x.s}</small></div></article>`).join('')}</div>`],
  ...deepMods(),
  ['Try it · the two-way counter',`
   <p class="s11lead">In this demo you act as the adviser. Select products, services or an Afya Box on the adviser screen; the customer screen on the right updates as each line is added. Add a free membership if the customer wants one, then press <b>Charge</b> and complete the payment as the customer. ${tagi('Illustrative prices · simulated payment')}</p>
   <div class="p32c">
    <div><p class="p32lab">Adviser screen · 15.6-inch touch</p><div class="p32pos"><div class="sc"><div><div class="tabs" id="p32tabs"><button type="button" class="on" data-t="p">Products</button><button type="button" data-t="s">Services</button><button type="button" data-t="b">Afya Box</button></div><div class="grid" id="p32grid"></div></div>
     <div class="bk"><b style="font-size:.85rem">Order A-1042</b><small id="p32who" style="margin:4px 0 6px;color:#6c7a73">Customer · walk-in</small><div id="p32lines"></div><div class="tt"><span>Total</span><span id="p32tot">TSh 0</span></div><small style="color:#6c7a73" id="p32vat">VAT included TSh 0</small><button type="button" id="p32chg" disabled>Charge</button><button type="button" id="p32clr" style="background:#ece7dc;color:#0d1c16">Clear</button></div></div></div></div>
    <div><p class="p32lab">Customer screen · 10.1-inch, facing the customer</p><div class="p32cd"><div class="sc" id="p32cd"></div></div>
     <p class="note" style="margin-top:10px">The PIN is never typed on the shop’s screens: mobile money is approved on the customer’s own phone.</p></div></div>`],
  ['Safe and secure · six layers',`
   <div class="p32sec">
    <article><em>01 · PIN</em><b>Approved on your own phone</b><p>Mobile money is a request sent to the customer’s phone. Staff never see, ask for or type a PIN, and every screen says so.</p></article>
    <article><em>02 · Card data</em><b>Never stored by Afya</b><p>Cards are processed by a licensed payment provider on its own certified reader. Afya keeps only a reference number.</p></article>
    <article><em>03 · Receipt</em><b>A fiscal receipt for every sale</b><p>Each sale is issued through an approved virtual fiscal device and sent by SMS, so the tax record and the customer’s copy always match.</p></article>
    <article><em>04 · Door</em><b>One-time QR check</b><p>Receipts are confirmed once at the exit; a reused or unknown code turns red. Scan-and-go stays fast and honest.</p></article>
    <article><em>05 · Cash & cameras</em><b>Little cash, all on camera</b><p>CCTV covers tills, door and stockroom. Cash is kept to a minimum, counted at closing and banked daily.</p></article>
    <article><em>06 · Refunds & data</em><b>Back to the source, with consent</b><p>Refunds return only to the wallet or card that paid. Membership data is used only with the customer’s recorded consent.</p></article></div>`],
  ['The machines · what we buy and what it costs',`
   <p class="s11lead">Each item is priced from a published supplier list price, before shipping, duty and installation, and converted at the master model’s planning rate of <b>1 USD = TSh ${FXR.toLocaleString('en-US')}</b> ${C2('fx',9)}. Final quotations will come from Tanzanian distributors. ${PE}</p>
   <div class="p32wrap p32m"><table><thead><tr><th>Machine</th><th>What it does</th><th>List price</th><th style="text-align:right">≈ TSh each</th><th>When</th></tr></thead><tbody>
    ${MACH.map((m,i)=>`<tr><td><b>${m[0]}</b><small>${m[1]}</small></td><td>${m[2]}</td><td>${m[3]} ${m[7]?C2(m[7],{d3:3,k2:4,v3:5,esl:6,eas:7,lock:10}[m[7]]):''}</td><td class="r">${F.m(m[4])}</td><td><span class="ph${m[5]?'':' l'}">${m[6]}</span></td></tr>`).join('')}
    <tr class="t"><td colspan="3">Day-one checkout &amp; security kit (rows with “Day one”)</td><td class="r">${F.m(day1)}</td><td></td></tr></tbody></table></div>
   <div class="p31c" style="margin-top:14px">
    <article><h4>Fit against the seed budget</h4><table><tr><td>Day-one checkout &amp; security kit</td><td>${F.m(day1)}</td></tr><tr><td>Afya Check kiosk (section 3.3)</td><td>${F.m(kioskC)}</td></tr><tr class="t"><td>Total day-one technology</td><td>${F.m(day1+kioskC)}</td></tr><tr><td>Seed line: technology, kiosk &amp; screens</td><td>${F.m(techLine)}</td></tr></table>
     <p>${day1+kioskC<=techLine?(techLine-day1-kioskC<5e5?'It fits, just inside the line, before shipping and duty; any overrun comes from the reserve.':'It fits, with about '+F.m(techLine-day1-kioskC)+' to spare.'):'Including the kiosk, day-one technology is '+F.m(day1+kioskC-techLine)+' over the line. Section 3.3 sets out three options to close the gap; the recommendation is a small increase in the seed so the reserve stays intact.'} Shelf labels, the second self-checkout, a second handheld and an anti-theft gate are <b>phase 2</b>, paid from operating cash once the store is trading.</p></article>
    <article><h4>Running costs of payments</h4><table><tr><td>Mobile money via an aggregator</td><td>≈1.5–2% ${C2('fee',8)}</td></tr><tr><td>Monthly subscription</td><td>none quoted</td></tr><tr><td>Cards</td><td>provider quote</td></tr><tr><td>Fiscal receipts (VFD)</td><td>TRA-approved provider</td></tr></table>
     <p>No operator or aggregator has been signed yet. The store will connect at least two, so a single outage cannot stop payments.</p></article></div>`],
  ['How it works · the five journeys',`
   <p class="s11lead">Select a journey. The bar shows how its time budget is spent, step by step, against the target (gold line). ${tagi('Illustrative customers')}</p>
   <div class="p3-jtabs" id="p3jt" role="tablist">${JOUR.map((j,i)=>`<button type="button" role="tab" data-j="${i}" class="${i?'':'on'}" aria-selected="${!i}"><b>${esc(j.n)}</b><span>${esc(j.tag)}</span></button>`).join('')}</div>
   <div class="p3-jbox" id="p3jbox"></div>`],
  ['Try it · scan-and-go demo',`
   <p class="s11lead">Select products on the shelf to scan them into the phone basket, then press <b>Pay</b> and approve the mobile-money request with a PIN; the TRA receipt follows. The stopwatch times the payment from the moment Pay is pressed. <b>Play the demo</b> runs the sequence automatically. ${tagi('Illustrative prices · simulated payment')}</p>
   <div class="p3-demo">
    <div class="p3-shelf"><h4>The shelf · tap to scan</h4>${PROD.map((x,i)=>`<button type="button" class="p3-prod" data-p="${i}"><span class="p3-bc"></span><span><b>${esc(x[0])}</b><small>${esc(x[1])}</small></span><em>${tz(x[2])}</em></button>`).join('')}</div>
    <div class="p3-phone"><div class="p3-scr" id="p3scr">
     <div class="p3-stat"><span>09:41</span><span>4G ▪▪▪</span></div>
     <div class="p3-apph"><small>Afya Basics · Scan &amp; go</small><b>Karibu, Juma</b><span>Store #1 · Dar es Salaam</span></div>
     <div class="p3-cam" id="p3cam">Point at a barcode</div>
     <div class="p3-items" id="p3items"><p class="e">Your basket is empty. Scan a product on the shelf.</p></div>
     <div class="p3-tot"><div><span id="p3cnt">0 items</span><b id="p3sum">TSh 0</b></div><div><span>Points this visit</span><span id="p3pts">0</span></div><button type="button" class="p3-pay" id="p3pay" disabled>Pay</button></div>
     <div class="p3-ov" id="p3m"><div class="p3-sheet"><h5>How would you like to pay?</h5><div class="p3-meth"><label class="on"><input type="radio" name="p3m" checked> Mobile money (push to this phone)</label><label><input type="radio" name="p3m" disabled> Card saved in app</label></div><button type="button" id="p3mgo">Pay <span id="p3msum"></span></button><button type="button" class="alt" id="p3mx">Back to basket</button></div></div>
     <div class="p3-ov" id="p3push"><div class="p3-sheet"><h5>Mobile money request</h5><p id="p3ptxt">Pay to AFYA BASICS. Enter your PIN to approve.</p><div class="p3-pin" id="p3pin"><i></i><i></i><i></i><i></i></div><button type="button" id="p3appr">Enter PIN &amp; approve</button><p style="text-align:center;margin-top:8px">Simulated · no real payment</p></div></div>
     <div class="p3-done" id="p3done"></div>
    </div></div>
    <div class="p3-watch">
     <div class="p3-sw big"><small>Time to pay · from tapping Pay</small><b id="p3sw">0.0 s</b><div class="bar"><i id="p3swb"></i></div><div class="verdict" id="p3ver">Target: under 30 seconds</div></div>
     <div class="p3-sw"><small>Whole visit · from first scan</small><b id="p3vis">0:00</b><div class="verdict">Target: find and pay in under 3 minutes</div></div>
     <div><ul class="p3-log" id="p3log"></ul><div class="p3-btns" style="margin-top:12px"><button type="button" class="p3-b go" id="p3auto">${sv('<path d="M7 4l12 8-12 8z"/>',2)}Play the demo</button><button type="button" class="p3-b" id="p3rst">Reset</button></div></div>
    </div>
   </div>`,'p3scan'],
  ['Behind the 30-second payment',`
   <p class="s11lead">Between the tap and the receipt, five systems exchange messages in about ten to fifteen seconds; the customer sees only two screens. ${tagi('Illustrative timings · to be measured in the pilot')}</p>
   <div class="p3-seq"><div class="p3-seqax">${['0 s','~1 s','~8 s','~10 s','~11 s','~12 s'].map((x,k)=>`<span style="left:${((k+.5)/6*100).toFixed(2)}%"><i>${x}</i></span>`).join('')}</div>
    <div class="p3-seqg">
     <div><em>Customer</em><b>Taps Pay</b><p>The basket total is fixed; the app sends it to the Afya system.</p></div>
     <div><em>Afya system → provider</em><b>Push request</b><p>The payment provider sends a mobile-money prompt to the customer’s phone.</p></div>
     <div><em>Customer</em><b>Enters PIN</b><p>The customer’s only action: a four-digit PIN on their own phone.</p></div>
     <div><em>Provider → Afya</em><b>Payment confirmed</b><p>The provider confirms; the sale is recorded once.</p></div>
     <div><em>Afya → TRA VFD</em><b>Fiscal receipt</b><p>The cloud fiscal device issues the receipt with its verification code.</p></div>
     <div><em>Customer</em><b>SMS / WhatsApp</b><p>Receipt, points and a “save as monthly” offer. Stock and dashboard update.</p></div></div></div>
   <p class="note">Then the door check: the receipt’s one-time QR is scanned at the exit podium in about five seconds (see “The door check” above).</p>`],
  ['Speed targets and online economics',`
   <svg width="0" height="0" style="position:absolute"><defs><linearGradient id="p3grad" x1="0" x2="1"><stop offset="0" stop-color="#5fbf8f"/><stop offset="1" stop-color="#f2c96b"/></linearGradient></defs></svg>
   <div class="p3-dash" id="p3dash">${SPEED.map(x=>{const r=34,c=2*Math.PI*r;return `<div class="p3-g"><svg viewBox="0 0 86 86"><circle class="ring" cx="43" cy="43" r="${r}"/><circle class="arc" cx="43" cy="43" r="${r}" stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${c.toFixed(1)}" data-f="${x[3]}" data-c="${c.toFixed(1)}"/><text class="val" x="43" y="46">${x[0]==='Same-day delivery in Dar'||x[1]==='0'?'':'&lt;'}${x[1]}</text><text class="un" x="43" y="58">${x[2].toUpperCase()}</text></svg><div><b>${esc(x[0])}</b><p>${esc(x[4])}</p><small>${esc(x[5])}</small></div></div>`}).join('')}</div>
   <p class="note">Ring = share of the target used by the designed time budget · targets from the master framework · actual times to be measured daily in the one system</p>
   <div class="nums" style="margin-top:20px">
    <div class="num"><b>${o.orders_day_m12}</b><span>online &amp; WhatsApp orders a day by month 12</span></div>
    <div class="num"><b>${tz(o.basket)}</b><span>average online basket</span></div>
    <div class="num g"><b>${tz(o.delivery_fee)}</b><span>delivery fee paid by the customer</span></div>
    <div class="num"><b>${tz(o.rider_cost_per_order)}</b><span>rider cost per order · fee covers it</span></div>
    <div class="num"><b>${F.m(b.months[11].online)}</b><span>online revenue in month 12 (base)</span></div></div>
   <p class="note">Planning estimates from the master model · delivery margin per order = ${tz(o.delivery_fee-o.rider_cost_per_order)} (fee minus rider cost)</p>`],
  ['Risks and our answer',`<div class="risks">
   <div class="risk"><span class="q">The mobile-money network is down at the moment of payment.</span><span class="ar">→</span><span class="a">The customer switches to card or cash at the counter; the till keeps selling offline and sends the fiscal receipt as soon as the line returns. More than one payment provider is connected, so one outage never stops all payments.</span></div>
   <div class="risk"><span class="q">Scan-and-go and self-checkout make it easier to leave without paying.</span><span class="ar">→</span><span class="a">Every receipt is confirmed once at the door podium; monitors and other high-value items are shown as demo units with stock behind the counter; CCTV covers tills and the exit. If losses stay above target after six months, an anti-theft gate is added (phase 2).</span></div>
   <div class="risk"><span class="q">Equipment costs more once shipped to Dar es Salaam.</span><span class="ar">→</span><span class="a">List prices exclude freight and duty. The day-one kit leaves headroom inside the technology line, and the second self-checkout, shelf labels and gate wait for phase 2. Two local distributor quotes are required before ordering.</span></div>
   <div class="risk"><span class="q">A customer feels embarrassed by the door check.</span><span class="ar">→</span><span class="a">The check applies to everyone, takes about five seconds and is framed as “asante, karibu tena”. A red result is resolved privately at the counter, never at the door.</span></div>
   <div class="risk"><span class="q">Some customers will not want an app.</span><span class="ar">→</span><span class="a">No app is required: self-checkout and the adviser’s handheld till give the same speed with no download, and WhatsApp ordering works on any smartphone.</span></div>
   <div class="risk"><span class="q">Speed targets are promises we have not yet measured.</span><span class="ar">→</span><span class="a">Every step is time-stamped by the system. The 21:00 daily report shows actual checkout times, so the slowest step is addressed first.</span></div></div>`]],
  takeaway:'Payment takes <b>seconds in every channel</b>, the PIN never leaves the customer’s phone, and <b>every receipt is verified at the door</b>. Speed will be <b>measured daily, not assumed</b>. A fast checkout frees advisers to advise, lets a small team serve more customers, and makes the <b>next visit more likely</b>.',
  doors:['s3-1','s3-3','s3-4','s3-8'],
  sources:[SRC('tcra'),SRC('tra'),S32.d3,S32.k2,S32.v3,S32.esl,S32.eas,S32.fee,S32.fx,S32.lock]})},
 init(){
  if(!$('p3jbox'))return;
  chainPlayer('p32p');chainPlayer('p32j');counterDemo();
  // journeys
  const tabs=[...document.querySelectorAll('#p3jt button')],box=$('p3jbox');
  const fmtS=sec=>sec>=60?Math.floor(sec/60)+' min'+(sec%60?' '+sec%60+' s':''):sec+' s';
  const showJ=i=>{const j=JOUR[i];tabs.forEach((t,k)=>{t.classList.toggle('on',k===i);t.setAttribute('aria-selected',k===i)});
   const used=j.steps.reduce((a,x)=>a+x[1],0);
   let bar;if(j.target===0){bar=`<div class="p3-jbar" style="background:rgba(201,184,255,.08)"><span style="width:100%;background:linear-gradient(90deg,rgba(201,184,255,.25),rgba(201,184,255,.05));color:var(--ink);font-size:.72rem">Customer effort each month: 0 clicks · everything below is done by the system</span></div>`}
   else{bar=`<div class="p3-jbar">${j.steps.map((x,k)=>`<span style="width:${(x[1]/j.target*100).toFixed(2)}%;background:${JC[k%5]};animation-delay:${k*.08}s" title="${esc(x[0])}: ${fmtS(x[1])}">${x[1]/j.target>.09?fmtS(x[1]):''}</span>`).join('')}<div class="tg" style="left:calc(100% - 1px)"><i>TARGET ${esc(j.tag.toUpperCase())}</i></div></div>`}
   box.innerHTML=`<div class="p3-jhero">${PH(j.ph[0],j.n+': '+j.ph[1],j.ph[1],{pos:j.ph[2]})}<div class="p3-jhead"><div><span class="p3-k">Journey ${'ABCDE'[i]}</span><h3>${esc(j.n)}</h3><p>${esc(j.who)} ${tagi('Illustrative')}</p></div><div class="p3-jt"><b>${j.target===0?'0':fmtS(used)}</b><small>${j.target===0?'clicks needed':'designed budget'}</small></div><div class="p3-jwhy"><b>Why this journey matters to the business</b>${esc(j.why)}</div></div></div>${bar}
    <ol class="p3-jsteps" style="--n:${j.steps.length}">${j.steps.map((x,k)=>`<li style="--sc:${JC[k%5]}"><em>${String(k+1).padStart(2,'0')} · ${j.target===0?'automatic':fmtS(x[1])}</em><b>${esc(x[0])}</b><p>${esc(x[2])}</p></li>`).join('')}</ol><p class="jfoot p3-jfoot">${j.foot}</p>`};
  tabs.forEach((t,i)=>t.onclick=()=>showJ(i));showJ(0);
  // dashboard gauges animate when visible
  const arcs=[...document.querySelectorAll('#p3dash .arc')];
  const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){arcs.forEach(a=>a.style.strokeDashoffset=(+a.dataset.c*(1-+a.dataset.f)).toFixed(1));io.disconnect()}})},{threshold:.2});
  io.observe($('p3dash'));
  // scan-and-go demo
  let basket=[],tPay=0,tVisit=0,swT=null,visT=null,busy=false;
  const items=$('p3items'),sum=$('p3sum'),cnt=$('p3cnt'),pts=$('p3pts'),pay=$('p3pay'),log=$('p3log'),cam=$('p3cam');
  const prods=[...document.querySelectorAll('.p3-prod')];
  const total=()=>basket.reduce((a,i)=>a+PROD[i][2],0);
  const stamp=()=>tVisit?((performance.now()-tVisit)/1000):0;
  const addLog=t=>{const s=stamp();log.insertAdjacentHTML('beforeend',`<li><em>${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}</em>${t}</li>`);while(log.children.length>6)log.firstElementChild.remove()};
  const paint=()=>{const T=total();sum.textContent=tz(T);cnt.textContent=basket.length+(basket.length===1?' item':' items');pts.textContent=Math.floor(T/1000);pay.disabled=!basket.length;pay.textContent=basket.length?'Pay '+tz(T):'Pay';
   items.innerHTML=basket.length?basket.map(i=>`<div class="p3-it"><span>${esc(PROD[i][0])}</span><b>${tz(PROD[i][2])}</b></div>`).join(''):'<p class="e">Your basket is empty. Scan a product on the shelf.</p>';items.scrollTop=items.scrollHeight};
  const scan=i=>{if(busy&&!auto)return;if(!tVisit){tVisit=performance.now();visT=every(()=>{const s=stamp();$('p3vis').textContent=Math.floor(s/60)+':'+String(Math.floor(s%60)).padStart(2,'0')},250)}
   basket.push(i);cam.classList.add('hit');cam.textContent='Scanned: '+PROD[i][0];later(()=>{cam.classList.remove('hit');cam.textContent='Point at a barcode'},700);addLog('Scanned '+PROD[i][0]);paint()};
  let auto=false;
  prods.forEach(b=>b.onclick=()=>{if(!busy)scan(+b.dataset.p)});
  const ov=id=>['p3m','p3push'].forEach(k=>$(k).classList.toggle('on',k===id));
  const startSW=()=>{tPay=performance.now();swT=every(()=>{const s=(performance.now()-tPay)/1000;$('p3sw').textContent=s.toFixed(1)+' s';$('p3swb').style.width=Math.min(100,s/30*100)+'%'},100)};
  pay.onclick=()=>{if(!basket.length)return;busy=true;prods.forEach(b=>b.disabled=true);startSW();addLog('Tapped Pay');$('p3msum').textContent=tz(total());ov('p3m')};
  $('p3mx').onclick=()=>{ov(null);busy=false;prods.forEach(b=>b.disabled=false);clearInterval(swT);$('p3sw').textContent='0.0 s';$('p3swb').style.width='0'};
  $('p3mgo').onclick=()=>{addLog('Mobile-money push sent');$('p3ptxt').textContent='Pay '+tz(total())+' to AFYA BASICS (Store #1). Enter your PIN to approve.';ov(null);later(()=>{ov('p3push');addLog('Push received on phone')},900)};
  $('p3appr').onclick=()=>{const dots=[...document.querySelectorAll('#p3pin i')];$('p3appr').disabled=true;dots.forEach((d,k)=>later(()=>d.classList.add('f'),k*180));
   later(()=>{addLog('PIN approved');ov(null);$('p3appr').disabled=false;dots.forEach(d=>d.classList.remove('f'));
    later(()=>{const s=(performance.now()-tPay)/1000;clearInterval(swT);clearInterval(visT);$('p3sw').textContent=s.toFixed(1)+' s';$('p3swb').style.width=Math.min(100,s/30*100)+'%';
     const v=$('p3ver');v.className='verdict'+(s<30?' ok':'');v.innerHTML=s<30?`Paid in ${s.toFixed(1)} s · under the 30-second target`:`${s.toFixed(1)} s · over the 30-second target`;
     addLog('TRA receipt sent by SMS');const T=total(),no='AFY1-'+String(Math.floor(100000+Math.random()*899999));
     $('p3done').innerHTML=`<div class="p3-paid"><span>${OK}</span><div><b>Paid ${tz(T)}</b><small>Mobile money · ${basket.length} items · ${s.toFixed(1)} s</small></div></div>
      <div class="p3-msg"><span class="qr"></span><b>AFYA BASICS</b> · Store #1 Dar es Salaam<br>Receipt ${no}<br>${basket.length} items · Total <b>${tz(T)}</b><br>VAT incl. · Fiscal receipt, verify with code<br>Points +${Math.floor(T/1000)} · Asante<small>SMS · just now · illustrative receipt</small></div>
      <div class="p3-msg" style="animation-delay:.6s">Save this basket as a monthly reminder or an Afya Box? Reply <b>1</b> for yes.<small>WhatsApp · just now</small></div>`;
     $('p3done').classList.add('on');addLog('Press Reset for a new basket');busy=false},1100)},900)};
  const reset=()=>{p3clear();basket=[];tPay=0;tVisit=0;busy=false;auto=false;ov(null);$('p3done').classList.remove('on');$('p3done').innerHTML='';prods.forEach(b=>b.disabled=false);
   $('p3sw').textContent='0.0 s';$('p3swb').style.width='0';$('p3vis').textContent='0:00';const v=$('p3ver');v.className='verdict';v.textContent='Target: under 30 seconds';log.innerHTML='';$('p3appr').disabled=false;paint()};
  $('p3rst').onclick=reset;
  $('p3auto').onclick=()=>{reset();auto=true;const seq=[1,4,3];seq.forEach((i,k)=>later(()=>scan(i),600+k*1100));
   later(()=>pay.click(),600+seq.length*1100+500);later(()=>$('p3mgo').click(),600+seq.length*1100+2200);later(()=>$('p3appr').click(),600+seq.length*1100+5200)};
  paint();
 }};

/* ===================================================================
   3.3 THE AFYA CHECK STATION
   =================================================================== */
const KIOSK=()=>{const ck=I.check,fx=I.meta.fx_usd,fob=ck.kiosk_usd*fx;return{fob,landed:fob*1.2,usd:ck.kiosk_usd,fx}};
const S33={
 sisu:['SiSU Health: the SiSU Health Station · free self-service health checks, Class IIa medical device','https://sisuhealthgroup.com/sisu-health-station'],
 jmir:['Flitcroft L. et al., Journal of Medical Internet Research 2020;22(6):e14977: Self-Guided Blood Pressure Screening in the Community: Opportunities, and Challenges','https://www.jmir.org/2020/6/e14977'],
 rev:['Communications Medicine (Nature Portfolio), January 2025: Vital signs-based healthcare kiosks for screening chronic and infectious diseases: a systematic review','https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11751283/'],
 sht:['Zhengzhou Shanghe Electronic Technology, Made-in-China.com: SH-T15 health checkup kiosk, self-service, with blood pressure (supplier listing)','https://zzshdz.en.made-in-china.com/product/DJupkISUbBWK/China-Sh-T15-Health-Checkup-Kiosk-Self-Service-with-Blood-Pressure-Health-Check.html'],
 shc:['Zhengzhou Shanghe Electronic Technology, Made-in-China.com: health checkup kiosk catalogue (other configurations, incl. telemedicine)','https://zzshdz.en.made-in-china.com/product-group/wbIfNdYAngrc/Health-Checkup-Kiosk-catalog-1.html'],
 lej:['Henan Lejia (Leka Scale), Made-in-China.com: supplier page for health check kiosks and BMI scales','https://fr.made-in-china.com/co_lekascale'],
 mayo:['Mayo Clinic: Hypertensive crisis: What are the symptoms?','https://www.mayoclinic.org/diseases-conditions/high-blood-pressure/expert-answers/hypertensive-crisis/faq-20058491'],
 nhs:['Gloucestershire Hospitals NHS Foundation Trust: Pulse oximeter, how to guide (when to seek help by oxygen level)','https://www.gloshospitals.nhs.uk/media/documents/Pulse_Oximeter_ED_how_to_guide_FINAL_VERSION.pdf']};
const C3=(k,n)=>cref(S33[k][1],n,S33[k][0]);
const CSS33=`
.p33{--g:#5fbf8f;--au:#e9c77f;--mu:rgba(244,251,247,.66);--ln:rgba(255,255,255,.09)}
.p33 .p33lead{font-size:1.12rem;line-height:1.75;color:rgba(244,251,247,.9);max-width:760px;margin:0}
.p33 .p33lead+.p33lead{margin-top:14px}
.p33 .p33lead b{color:#fff}
.p33glance{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--ln);border-bottom:1px solid var(--ln)}
.p33glance div{padding:26px 22px 24px 0}.p33glance div+div{padding-left:22px;border-left:1px solid var(--ln)}
.p33glance b{display:block;font:500 2.6rem/1 var(--f-serif,Georgia,serif);letter-spacing:-.02em;color:#fff}
.p33glance span{display:block;margin-top:10px;font-size:.88rem;line-height:1.5;color:var(--mu)}
.p33split{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:44px;align-items:center}
.p33split.rev>:first-child{order:2}
.p33fig{margin:0;position:relative}
.p33fig img{display:block;width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:18px}
.p33fig figcaption{margin-top:10px;font:500 .72rem var(--f-hud,monospace);letter-spacing:.08em;color:rgba(244,251,247,.5)}
.p33fig .scr{position:absolute;right:-14px;bottom:28px;width:23%;min-width:96px;border-radius:12px;box-shadow:0 20px 40px rgba(0,0,0,.55),0 0 0 5px #15191a}
.p33h{font:500 1.75rem/1.2 var(--f-serif,Georgia,serif);letter-spacing:-.012em;margin:0 0 14px;color:#fff}
.p33k{display:block;font:600 .68rem var(--f-hud,monospace);letter-spacing:.18em;text-transform:uppercase;color:var(--au);margin-bottom:10px}
.p33big{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin:26px 0 8px}
.p33big div{padding:4px 22px 4px 0}.p33big div+div{padding-left:22px;border-left:1px solid var(--ln)}
.p33big b{display:block;font:500 3rem/1 var(--f-serif,Georgia,serif);color:var(--c,#fff)}
.p33big span{display:block;margin-top:10px;font-size:.9rem;line-height:1.55;color:var(--mu)}
.p33ex{margin-top:26px;padding:22px 26px;border-left:3px solid var(--au);background:linear-gradient(90deg,rgba(233,199,127,.07),transparent 70%);border-radius:0 14px 14px 0}
.p33ex b.t{display:block;font:600 .7rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:var(--au);margin-bottom:8px}
.p33ex p{margin:0;font-size:1rem;line-height:1.7;color:rgba(244,251,247,.88)}.p33ex p+p{margin-top:8px}
.p33ol{list-style:none;margin:18px 0 0;padding:0;counter-reset:n}
.p33ol li{counter-increment:n;position:relative;padding:14px 0 14px 46px;border-top:1px solid var(--ln);font-size:.98rem;line-height:1.65;color:rgba(244,251,247,.86)}
.p33ol li:before{content:counter(n,decimal-leading-zero);position:absolute;left:0;top:15px;font:600 .8rem var(--f-hud,monospace);color:var(--g)}
.p33ol li b{color:#fff}
.p33dl{margin:0;display:grid;grid-template-columns:auto 1fr;border-top:1px solid var(--ln)}
.p33dl dt,.p33dl dd{margin:0;padding:12px 0;border-bottom:1px solid var(--ln);font-size:.92rem}
.p33dl dt{color:var(--mu);padding-right:24px}.p33dl dd{text-align:right;font-family:var(--f-hud,monospace);color:#fff}
.p33tbl{width:100%;border-collapse:collapse;font-size:.92rem}
.p33tbl th{font:600 .66rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;text-align:left;color:rgba(244,251,247,.5);padding:12px 14px 10px 0;border-bottom:1px solid rgba(255,255,255,.18)}
.p33tbl td{padding:16px 14px 16px 0;border-bottom:1px solid var(--ln);vertical-align:top;line-height:1.6;color:rgba(244,251,247,.84)}
.p33tbl td:first-child b{display:block;font:500 1.05rem var(--f-serif,Georgia,serif);color:#fff}
.p33tbl td small{display:block;margin-top:3px;font:500 .7rem var(--f-hud,monospace);color:rgba(244,251,247,.45);letter-spacing:.06em}
.p33tbl td.v{white-space:nowrap;font-family:var(--f-hud,monospace);color:#fff}
.p33tbl td.v i{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:8px;vertical-align:1px}
.p33tbl tr.grp td{padding:26px 0 8px;border-bottom:0;font:600 .7rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:var(--g)}
.p33wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
@media(max-width:620px){.p33big{grid-template-columns:1fr}.p33big div,.p33big div+div{padding:12px 0;border-left:0;border-top:1px solid var(--ln)}.p33big b{font-size:2.4rem}.p33wrap{max-width:100%}.p33tbl{min-width:0}.p34t23{grid-template-columns:1fr!important;max-width:100%}.p34t23 article{min-width:0;max-width:100%;box-sizing:border-box}.p34tier{max-width:100%;overflow:hidden}}
.p33step{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:40px;align-items:center;padding:34px 0;border-top:1px solid var(--ln)}
.p33step:nth-of-type(even)>.p33fig{order:2}
.p33step .tm{display:inline-block;font:600 .74rem var(--f-hud,monospace);color:var(--g);letter-spacing:.1em;margin-bottom:8px}
.p33step h4{margin:0 0 12px;font:500 1.55rem/1.2 var(--f-serif,Georgia,serif);color:#fff}
.p33step p{margin:0 0 10px;font-size:.98rem;line-height:1.7;color:rgba(244,251,247,.86)}
.p33step p.why{margin-top:14px;padding-top:12px;border-top:1px dashed var(--ln);color:var(--mu);font-size:.92rem}
.p33step p.why b{color:var(--au);font-weight:600}
.p33rules{width:100%;border-collapse:collapse}
.p33rules td{padding:16px 16px 16px 0;border-bottom:1px solid var(--ln);vertical-align:top;font-size:.94rem;line-height:1.6;color:rgba(244,251,247,.86)}
.p33rules td:first-child{width:28%;font:500 1.05rem var(--f-serif,Georgia,serif);color:#fff}
.p33rules td:first-child:before{content:"";display:inline-block;width:10px;height:10px;border-radius:50%;background:var(--c);margin-right:10px}
.p33opt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0;margin-top:20px;border-top:1px solid var(--ln)}
.p33opt div{padding:20px 22px 6px 0}.p33opt div+div{padding-left:22px;border-left:1px solid var(--ln)}
.p33opt em{font:600 .66rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;font-style:normal;color:var(--mu)}
.p33opt .rec em{color:var(--g)}
.p33opt b{display:block;margin:8px 0;font:500 1.2rem/1.3 var(--f-serif,Georgia,serif);color:#fff}
.p33opt p{margin:0;font-size:.9rem;line-height:1.6;color:rgba(244,251,247,.8)}
.p33src{font-size:.78rem;color:rgba(244,251,247,.5);margin-top:12px}
@media(max-width:900px){.p33glance,.p33big,.p33opt{grid-template-columns:1fr}.p33glance div+div,.p33big div+div,.p33opt div+div{padding-left:0;border-left:0;border-top:1px solid var(--ln)}
 .p33split,.p33step{grid-template-columns:1fr;gap:20px}.p33split.rev>:first-child,.p33step:nth-of-type(even)>.p33fig{order:0}.p33fig .scr{right:8px}.p33glance b{font-size:2.1rem}}
`;
addCSS('p33',CSS33);
FILMS.p33f={sub:'afya-check',parts:[[0,'Welcome, consent and body composition'],[45.225,'Blood pressure, oxygen, temperature, vision and results'],[82.029,'Advice, optional test, hygiene and results by SMS']].map((x,i)=>({t0:x[0],label:x[1],src:'media/afya-check-'+(i+1)+'.mp4',poster:'media/p-afya-check-'+(i+1)+'.jpg'}))};
/* the 15 free measurements: [label, how it is measured, healthy or typical range, why it matters] */
const MEAS=[
 ['Height','Ultrasonic sensor in the top of the column, ±0.5 cm','—','Needed for BMI. Slow loss of height in later life can point to bone loss.'],
 ['Weight','Load cells under the foot plates, ±0.1 kg','—','The simplest number to follow over months, kept only with consent.'],
 ['Body mass index','Weight (kg) ÷ height (m)²','18.5 – 24.9','A first screen for underweight, overweight and obesity, all linked to diabetes and heart disease.'],
 ['Body fat','Bioimpedance: a tiny, painless current between hand grips and foot plates','Men under 25% · women under 32% (typical)','Two people with the same BMI can carry very different amounts of fat. This shows which one is at risk.'],
 ['Muscle mass','Estimated from the same bioimpedance reading','Varies by height, age and sex','Muscle protects blood-sugar control and strength in later life.'],
 ['Body water','Estimated from how easily the current flows','Men 50–65% · women 45–60% (typical)','In Dar es Salaam’s heat, a low value is a simple prompt to drink more.'],
 ['Bone mass','Estimated mineral weight of the skeleton','Typical for height and sex','A conversation starter on diet and activity. Not a bone-density scan.'],
 ['Visceral fat','Index of fat stored around the organs','Level 1 – 9','Fat around the organs is the type most closely tied to diabetes and heart disease.'],
 ['Basal metabolic rate','Energy used at rest, from body composition','Individual','Turns diet advice into plain portions an adviser can explain.'],
 ['Body age','Body-composition profile compared with typical values by age','At or below real age','A motivating number customers remember and come back to improve.'],
 ['Blood pressure','Automatic upper-arm cuff (oscillometric), after one minute’s rest','Below 120/80 mmHg','The main reason the station exists: most people with high blood pressure feel nothing.'],
 ['Pulse','Read by the cuff, checked again by the finger clip','60 – 100 beats a minute at rest','A fast resting pulse can reflect fever, dehydration, stress or a rhythm problem.'],
 ['Blood oxygen','Finger-clip pulse oximeter, red and infrared light','95 – 100%','A low value can signal a lung or heart problem that needs a clinician quickly.'],
 ['Temperature','Non-contact infrared thermometer at the forehead','About 36.1 – 37.2 °C','Fever is a reason to see a clinic, and to repeat a high blood pressure on another day.'],
 ['Vision','On-screen tumbling-E chart, one eye at a time','6/6 (normal)','Poor vision is common and easy to correct. A low score leads to an eye-test referral.']];
const PROF={ // illustrative 15-reading profiles
 a:{n:'Mama Neema, 34 · in range',sex:'f',age:34,h:162,w:61,fat:27.4,mus:42.1,wat:53.0,bone:2.4,vis:5,bmr:1312,bage:31,bp:[116,76],pulse:70,spo2:98,temp:36.6,vis2:'6/6'},
 b:{n:'Baba Juma, 52 · from the film',sex:'m',age:52,h:172,w:86.4,fat:29.8,mus:57.6,wat:51.2,bone:3.1,vis:13,bmr:1742,bage:58,bp:[148,94],pulse:78,spo2:97,temp:36.7,vis2:'6/9'},
 c:{n:'Mzee Hamisi, 63 · urgent',sex:'m',age:63,h:170,w:95,fat:35.1,mus:58.0,wat:47.6,bone:3.0,vis:16,bmr:1810,bage:71,bp:[184,118],pulse:96,spo2:93,temp:37.0,vis2:'6/18'}};
function readings(pf){const r=[],bmi=pf.w/((pf.h/100)**2);
 const add=(l,v,u,s,t,x)=>r.push([l,v,u,s,t,x||s]);
 add('Height',pf.h.toFixed(1),'cm',0,'Recorded for BMI.');
 add('Weight',pf.w.toFixed(1),'kg',0,'Saved only if you agreed, so you can follow changes.');
 add('Body mass index',bmi.toFixed(1),'BMI',bmi>=25||bmi<18.5?1:0,bmi>=30?'In the obesity range. Small, steady changes help; an adviser or clinic can plan them with you.':bmi>=25?'Above the healthy range for most adults.':bmi<18.5?'Below the healthy range.':'In the healthy range for most adults.');
 const fh=pf.sex==='m'?25:32;add('Body fat',pf.fat.toFixed(1),'%',pf.fat>=fh?1:0,pf.fat>=fh?'Above the typical range. Activity and diet help most.':'Within a typical range.');
 add('Muscle mass',pf.mus.toFixed(1),'kg',0,'Within the expected range for your height.');
 add('Body water',pf.wat.toFixed(1),'%',pf.wat<45?1:0,pf.wat<45?'On the low side. Drink more water through the day.':'Well hydrated.');
 add('Bone mass',pf.bone.toFixed(1),'kg',0,'An estimate only, within the expected range.');
 add('Visceral fat',pf.vis,'level',pf.vis>=10?1:0,pf.vis>=10?'Above 9, the level linked to higher diabetes and heart risk. Waist size and activity are worth discussing.':'In the healthy range (1 to 9).');
 add('Basal metabolic rate',pf.bmr.toLocaleString('en-US'),'kcal',0,'The energy your body uses at rest each day.');
 add('Body age',pf.bage,'years',pf.bage>pf.age+3?1:0,pf.bage>pf.age+3?'Older than your real age. A motivating number to bring down.':'In line with your real age.');
 const s=pf.bp[0],d=pf.bp[1],bpS=s>=180||d>=120?3:s>=140||d>=90?2:s>=120||d>=80?1:0;
 add('Blood pressure',s+'/'+d,'mmHg',Math.min(bpS,2),['In the ideal range.','Above ideal. Not a diagnosis: recheck within a few weeks.','At or above 140/90. One reading is not a diagnosis: please see a clinic this week to confirm it.','180/120 or higher. The adviser repeats it after rest; if it stays this high, see a doctor today.'][bpS],bpS);
 add('Pulse',pf.pulse,'bpm',pf.pulse>100||pf.pulse<50?2:pf.pulse>90?1:0,pf.pulse>90?'A little fast at rest. We measure again after a few minutes.':'A normal resting pulse.');
 const oS=pf.spo2<=92?3:pf.spo2<=94?2:0;add('Blood oxygen',pf.spo2,'%',Math.min(oS,2),oS===3?'Low. Please get medical help now.':oS===2?'Lower than expected (93–94%). Please see a clinic today.':'Your blood is carrying oxygen well.',oS);
 add('Temperature',pf.temp.toFixed(1),'°C',pf.temp>=38?2:pf.temp>=37.5?1:0,pf.temp>=37.5?'Raised. See a clinic if you feel unwell.':'No fever.');
 const vb=+pf.vis2.split('/')[1];add('Vision',pf.vis2,'both eyes',vb>=12?1:0,vb>=12?'Below normal. A full eye test is recommended.':'Normal or near normal.');
 return r}
const STC=['#5fbf8f','#f2c96b','#ff7b6b'];
const FIG=(f,alt,cap,scr,pos)=>`<figure class="p33fig"><img src="img/${f}.webp" alt="${esc(alt)}" loading="lazy"${pos?` style="object-position:${pos}"`:''}>${scr?`<img class="scr" src="img/ui/${scr}.webp" alt="The kiosk screen at this step" loading="lazy">`:''}<figcaption>Concept image · ${cap}</figcaption></figure>`;
const STEP3=(time,h,ps,why,fig)=>`<article class="p33step">${fig}<div><span class="tm">${time}</span><h4>${h}</h4>${ps.map(p=>`<p>${p}</p>`).join('')}${why?`<p class="why"><b>Why it matters · </b>${why}</p>`:''}</div></article>`;
window.SECTIONS['s3-3']={
 render(s,p,pv,nx){const ck=I.check,b=B(),st=I.store,K=KIOSK(),n=ck.free_readings.length;
  const day1=MACH.filter(m=>m[5]>0).reduce((a,m)=>a+m[4]*m[5],0),techLine=seedUse('technology'),total=day1+K.landed,gap=Math.max(0,total-techLine),gapR=Math.ceil(gap/1e6)*1e6;
  const cap=Math.floor(60/(ck.minutes+1)),hrs=12,capDay=cap*hrs,util=ck.checks_day_m12/capDay,peak=Math.round(ck.checks_day_m12/hrs*1.7);
  const RB=readings(PROF.b),cnt=[0,1,2].map(x=>RB.filter(r=>r[3]===x).length);
  const chk=ck.checks_day_m12,buy=chk*ck.check_to_purchase,gpM=buy*st.basket*st.retail_gm*30;
  return secShell({s,p,pv,nx,cls:'p3 p33',
  img:'img/ac-enter.webp',imgAlt:'Concept image: a man walks into an Afya Basics store and notices the white Afya Check health kiosk beside the entrance',
  h1:'Know your numbers.',em:'Fifteen measurements, free, in about four minutes.',
  lede:`Every Afya Basics store greets visitors with a free health check rather than a till. The Afya Check kiosk beside the door offers two levels: a quick check of blood pressure, pulse and oxygen in about ${ck.quick_seconds} seconds, and the full check of ${n} measurements in about ${ck.minutes} minutes, from height and body fat to blood pressure, blood oxygen and vision. A trained adviser explains the results in Kiswahili or English and refers the customer to a clinic when a reading requires it. No purchase is required. This section covers the case for the station, the machine, the measurements, the visit, and what it costs and earns.`,
  mods:[
  ['At a glance',`
   <div class="p33glance">
    <div><b>${n}</b><span>free measurements in the full check; the ${ck.quick_seconds}-second quick check covers blood pressure, pulse and oxygen</span></div>
    <div><b>≈ ${ck.minutes} min</b><span>from the first tap to the results screen, plus about 3 minutes of advice</span></div>
    <div><b>US$${K.usd.toLocaleString('en-US')}</b><span>for the kiosk, about ${F.m(K.landed)} landed in Dar es Salaam</span></div>
    <div><b>${capDay}</b><span>checks a day one kiosk can serve. The model needs ${chk} (${F.pct(util)})</span></div></div>`],
  ['Watch a first visit',`
   <p class="p33lead">Baba Juma is 52. He feels well and has never had his blood pressure measured. The film follows his first Afya Check in real order and real time: consent, the standing measurements, a minute of rest, the cuff, oxygen and temperature, his results, the adviser’s explanation, one optional paid test, the hygiene reset between customers, and the text message he leaves with. ${tagi('Illustrative customer · AI-generated people, no real faces')}</p>
   <div class="p31v" style="margin-top:22px">${FV('p33f','Afya Check · a first visit','English or Kiswahili subtitles')}</div>`],
  ['Why the station exists · the silent problem',`
   <div class="p33split"><div>
    <p class="p33lead">High blood pressure rarely hurts until it causes a stroke, a heart attack or kidney failure. WHO puts it plainly: <b>“Checking your blood pressure is the best way to know if you have high blood pressure”</b> ${C('who_fs',2)}. In Tanzania, most adults with the condition have never been diagnosed.</p>
    <div class="p33big">
     <div style="--c:#ff9b87"><b>25.7%</b><span>of adults aged 25–64 had high blood pressure in the 2012 national STEPS survey (the 2023 survey, cited in 1.4, found 23.1% of adults 18–69) ${C('who_tz',1)}</span></div>
     <div style="--c:#ffb36b"><b>17.6%</b><span>of them knew they had it ${C('who_tz',1)}</span></div>
     <div style="--c:#ff7b9c"><b>2.2%</b><span>had it under control ${C('who_tz',1)}</span></div></div></div>
    ${FIG('ac-cuff','Concept image of a man seated at the kiosk with his arm in the blood-pressure cuff while an adviser steadies his elbow','the measurement most people have never had','k-bp','40% 40%')}</div>
   <div class="p33ex"><b class="t">What that means on one street</b>
    <p>Take 100 adults aged 25 to 64 passing a store in Sinza. About <b>26</b> have high blood pressure. Only about <b>5</b> of those 26 know it, and fewer than <b>1</b> has it under control. The other 21 have no symptoms.</p>
    <p>Few of them will book a clinic visit for a condition they cannot feel. Many will step through an open door for a free check on the way to buy something else. The station is designed around that behaviour.</p></div>
   <p class="p33src">Tanzania figures: WHO country profile based on the 2012 national STEPS survey, the latest national data in that profile.</p>`],
  ['Proof it works · the SiSU Health Station',`
   <div class="p33split rev"><div>
    <span class="p33k">A real example at national scale</span>
    <h3 class="p33h">Free self-service checks in pharmacies, used by hundreds of thousands</h3>
    <p class="p33lead">In Australia, <b>SiSU Health</b> places free health stations in pharmacies, supermarkets and workplaces. The station is a registered <b>Class IIa medical device</b>. It measures blood pressure, heart rate, body fat, height, weight and BMI in a few minutes and sends the results to the user’s phone ${C3('sisu',4)}. Afya Check follows the same model, with more measurements and an adviser beside every machine.</p></div>
    <div class="p33big" style="grid-template-columns:1fr 1fr;margin:0">
     <div><b>180,442</b><span>free checks in nine months at 192 sites, almost all in community pharmacies ${C3('jmir',5)}</span></div>
     <div style="--c:#5fbf8f"><b>15.8→12.9%</b><span>repeat users with high blood pressure, first check to latest ${C3('jmir',5)}</span></div></div></div>
   <p class="p33lead" style="margin-top:26px">That second number is the important one. People who came back for a second and third check got healthier: fewer had high blood pressure, average BMI fell by almost one point, and fewer smoked ${C3('jmir',5)}. A 2025 review of 36 kiosk studies supports the idea but warns that many kiosks ignore accessibility and many studies are small ${C3('rev',6)}. We take three lessons:</p>
   <ol class="p33ol">
    <li><b>Convenience outperforms appointments.</b> People used SiSU because it stood in a shop they already visited. The Afya Check stands by the door, visible from the street.</li>
    <li><b>The benefit comes from coming back.</b> Every Afya Check ends with a reminder for the next free check, and Afya Care members get a full check every month.</li>
    <li><b>A person beside the machine.</b> Kiosks alone leave people confused or falsely reassured. Every Afya Check has a trained adviser within a few steps, and every screen is designed for someone who has never used one.</li></ol>`],
  ['The machine we chose',`
   <div class="p33split"><div>${FIG('ac-studio','Concept image of an all-in-one white health-check kiosk with touchscreen, blood-pressure cuff, hand grips, foot plates and side tray','the class of machine we will buy',null,'50% 50%')}</div>
    <div><span class="p33k">All-in-one smart health-check kiosk</span>
     <h3 class="p33h">One column, fifteen readings, one affordable price</h3>
     <p class="p33lead">A premium imported pharmacy brand, at several times the price, is not required. Specialist factories build all-in-one health kiosks for pharmacies, clinics and employers worldwide. Our reference model is the <b>Shanghe SH-T15 / SH-K5</b>: <b>US$${K.usd.toLocaleString('en-US')}</b> for one unit, falling to US$4,490 for fifty, CE marked and made under ISO 13485, the medical-device quality standard ${C3('sht',7)}. A second factory, Henan Lejia, offers similar machines in the same price range, so we can compare quotes ${C3('lej',8)}.</p></div></div>
   <div class="p33split" style="margin-top:30px;align-items:start"><dl class="p33dl">
     <dt>Price, one unit</dt><dd>US$${K.usd.toLocaleString('en-US')} · ${F.m(K.fob)}</dd>
     <dt>Landed in Dar (+20% freight, duty, clearance)</dt><dd>≈ ${F.m(K.landed)}</dd>
     <dt>Size and weight</dt><dd>97 × 71 × 232 cm · 55 kg</dd>
     <dt>Screen and printer</dt><dd>15″ Android touch · thermal</dd>
     <dt>Connections</dt><dd>Wi-Fi / 4G · cloud · RS-232</dd>
     <dt>Blood-pressure range</dt><dd>0–299 mmHg · pulse 40–180</dd>
     <dt>Weight · height accuracy</dt><dd>±0.1 kg · ±0.5 cm</dd>
     <dt>Add-ons later</dt><dd>ECG · glucose · cholesterol · urine</dd></dl>
    <div><p class="p33lead"><b>What it does.</b> The kiosk guides the customer through each step on screen, sends results by text message, keeps an encrypted history with consent, and shows health messages while idle. It replaces four separate devices, a clipboard and a notebook.</p>
     <p class="p33lead"><b>Why it fits the model.</b> It is self-service, so one adviser can supervise it while serving the floor. Nobody needs an appointment or money, and everyone leaves with numbers they can take to a clinic.</p>
     <p class="p33lead"><b>What it costs.</b> Spread over five years, the machine costs about ${F.m(K.landed/60)} a month, less than half of what the station costs to run each month.</p></div></div>
   <span class="p33k" style="margin-top:34px">Four conditions before we pay</span>
   <ol class="p33ol">
    <li><b>TMDA registration.</b> The blood-pressure and oxygen functions are medical devices. The importer registers them with the Tanzania Medicines and Medical Devices Authority before the kiosk is switched on.</li>
    <li><b>A validated blood-pressure module.</b> The supplier must show that the cuff passed a recognised validation protocol (ISO 81060-2 or the European Society of Hypertension protocol). If it cannot, we fit a validated cuff instead.</li>
    <li><b>Kiswahili software.</b> Every screen, the consent wording and the text message in plain Kiswahili and English, reviewed by a clinician.</li>
    <li><b>Local service.</b> Spare cuffs and clips in stock and a Dar es Salaam biomedical technician who calibrates the kiosk every six months, logged in the system.</li></ol>
   <p class="p33src">Specifications and prices from the supplier listing ${C3('sht',7)}. Final choice after a written quotation and a sample unit tested against a validated monitor.</p>`],
  [`The ${n} free measurements, one by one`,`
   <p class="p33lead">Ten values come from standing on the plates for about twenty seconds. Five come from sitting. Each result appears with a colour (green in range, amber above ideal, red see a clinic) and one plain sentence. The right-hand column shows Baba Juma’s results from the film: <b>${cnt[0]} in range, ${cnt[1]} above ideal, ${cnt[2]} see a clinic</b>. ${tagi('Free · no purchase needed')}</p>
   <div class="p33wrap" style="margin-top:14px"><table class="p33tbl"><thead><tr><th>Measurement</th><th>How the kiosk measures it</th><th>Healthy range</th><th>Baba Juma</th></tr></thead><tbody>
    ${MEAS.map((m,i)=>`${i===0?'<tr class="grp"><td colspan="4">Standing · about 20 seconds · 10 values</td></tr>':''}${i===10?'<tr class="grp"><td colspan="4">Seated · after one minute’s rest · 5 values</td></tr>':''}<tr><td><b>${esc(m[0])}</b><small>${esc(m[3])}</small></td><td>${esc(m[1])}</td><td>${esc(m[2])}</td><td class="v"><i style="background:${STC[RB[i][3]]}"></i>${RB[i][1]} ${RB[i][2]}</td></tr>`).join('')}
   </tbody></table></div>
   <div class="p33ex"><b class="t">Reading Baba Juma’s results like an adviser</b>
    <p>Ten readings are in range. Four are slightly above ideal (BMI 29.2, body fat 29.8%, visceral fat level 13 and a body age of 58), which together say the same thing: weight around the waist. Those are worth a conversation, not a referral.</p>
    <p>One number matters today: blood pressure <b>148/94</b>, above the WHO threshold of 140/90 ${C('who_fs',2)}. One reading is not a diagnosis, so the adviser asks him to see a clinic this week to confirm it on another day.</p></div>
   <span class="p33k" style="margin-top:30px">Optional paid tests · done by a trained adviser in the private room</span>
   <div class="p33wrap"><table class="p33tbl"><thead><tr><th>Test</th><th>How</th><th style="text-align:right">Price</th></tr></thead><tbody>${ck.paid_tests.map(x=>`<tr><td><b style="font-size:.98rem">${esc(x[0])}</b></td><td>${/Urine/.test(x[0])?'Urine sample on a test strip, read by the kiosk’s optional analyser, about 2 minutes':'Finger-prick with a single-use lancet, result in 1–3 minutes'}</td><td class="v" style="text-align:right">${tz(x[1])}</td></tr>`).join('')}</tbody></table></div>
   <p class="p33src">Healthy ranges are general adult guides used for screening; body-composition ranges are typical consumer-scale ranges. Paid-test prices are planning estimates and are not in the financial model, so any income from them is upside.</p>`],
  ['A visit, step by step',`
   ${STEP3('0:00 – 0:20','Welcome, language and consent',['Baba Juma taps <b>Start</b>, chooses English or Kiswahili and reads, in one screen, what will be measured and who will see it. He ticks the one required box, and the optional box to receive results by text message.','The adviser greets him and offers help, but never fills in the consent for him. No ID is needed.'],'Health data is sensitive personal data under Tanzanian law. Clear consent first is what makes customers trust the results that follow.',FIG('ac-tap','Concept image of a man tapping Start on the kiosk touchscreen','starting the check','k-consent','50% 40%'))}
   ${STEP3('0:20 – 0:50','Shoes off, stand on the plates, hold the grips',['He stands barefoot on the two metal foot plates and holds one grip in each hand, arms slightly away from his body. In about twenty seconds the kiosk records height, weight and eight body-composition values.','Before this step the kiosk asks whether he has a pacemaker or is pregnant. Anyone who answers yes skips body composition, because it passes a tiny current through the body.'],'Body composition shows what weight alone hides: where the weight is, and how much of it is fat around the organs.',FIG('ac-grips','Concept image of a man standing barefoot on the kiosk plates holding both hand grips, an adviser beside him','standing measurements','k-stand','45% 40%'))}
   ${STEP3('0:50 – 2:20','Sit, rest one minute, then the cuff',['He sits on the fold-down seat, feet flat, back supported, and rests quietly for one minute while the screen counts down. Then he places his bare upper arm in the cuff at heart level and stays still and silent while it inflates.','The adviser checks the posture. If the first reading is high, she offers a second one after five more minutes of rest.'],'A rushed reading is the most common cause of a falsely high number. Rest and a supported arm make the result worth acting on.',FIG('ac-cuff','Concept image of a seated man with his arm in the kiosk blood-pressure cuff','blood pressure after rest','k-bp','40% 40%'))}
   ${STEP3('2:20 – 4:00','Finger clip, forehead thermometer, eye chart',['A finger clip reads blood oxygen and pulse in about fifteen seconds. The adviser holds a non-contact thermometer near his forehead for two seconds. Finally he covers one eye at a time and taps the direction of each letter E on the screen.'],'Low oxygen or a fever change the advice immediately. Poor vision is one of the most common problems in adults, and one of the easiest to fix.',FIG('ac-oxi','Concept image of a fingertip in a white pulse-oximeter clip on the kiosk','oxygen and pulse','k-spo','40% 50%'))}
   ${STEP3('4:00','Fifteen results, in colour',[`All fifteen numbers appear on the screen with a colour and one sentence each: for Baba Juma, ${cnt[0]} green, ${cnt[1]} amber and ${cnt[2]} red. If he chose it, the same summary arrives by text message, and he can print it.`,'The system alerts the adviser’s handheld to any red result, so she reaches him before he walks away.'],'A red result is never left on a screen alone. A person always explains it.',FIG('ac-results','Concept image of a man reading his results on the kiosk screen as an adviser walks over smiling','the results screen','k-res','45% 40%'))}
   ${STEP3('+ about 3 min','An adviser explains, the customer decides',['They sit in the lounge chairs. The adviser explains each amber and red number in plain words, and why one high blood-pressure reading is a reason to see a clinic, not a diagnosis. A referral slip goes to his phone.','Only after the advice may she suggest a product, and only if it fits. Most people leave with advice and a reminder, not a bag.'],'Advice before any sale is what turns a free check into trust, and trust into a returning customer.',FIG('ac-explain','Concept image of an adviser in a green uniform explaining results on a tablet to a man in the lounge','advice in the lounge',null,'50% 40%'))}
   ${STEP3('+ about 2 min','Optional: a finger-prick test',['Baba Juma chooses one paid test, blood sugar for TSh 3,000. It is done in the private room with gloves, a single-use lancet and a sharps box. His result is in the normal range.'],'Paid tests are optional, cheap and done properly, so they add value without ever being pushed.',FIG('ac-prick','Concept image of an adviser in blue gloves doing a finger-prick glucose test in a private room','optional paid test',null,'50% 45%'))}
   ${STEP3('About 1 min','Hygiene reset between customers',['The adviser wipes the cuff opening, both grips, the foot plates, the finger clip and the screen with a disinfectant wipe. The system logs the clean.'],'A visibly clean machine is part of the promise. The cleaning minute is included in every capacity figure on this page.',FIG('ac-clean','Concept image of an adviser wiping the kiosk blood-pressure cuff with a disinfectant wipe','cleaning between customers',null,'50% 45%'))}
   ${STEP3('Leaving','Results in his pocket',['Baba Juma leaves with all fifteen readings on his phone, a clinic referral and a reminder for his next free check in a month. He had no symptoms when he arrived; he now has a reading to act on.'],'',FIG('ac-leave','Concept image of a man leaving the store at dusk reading a text message on his phone','results by text message','k-sms','45% 40%'))}`],
  ['Try it · the kiosk demo',`
   <p class="p33lead">Run a simulated check with one of three <b>illustrative profiles</b>, including Baba Juma from the film. The kiosk clock shows real elapsed time; the demo runs about fifteen times faster. ${tagi('Illustrative results · not medical advice')}</p>
   <div class="p3-kdemo" style="margin-top:18px">
    <div class="p3-kiosk"><div class="p3-kh"><div class="p3-ks" id="p3ks"></div></div><div class="p3-kstand"></div><div class="p3-kbase"></div></div>
    <div class="p3-rside">
     <h4>Illustrative profile</h4><div class="p3-btns" id="p3prof">${Object.keys(PROF).map((k,i)=>`<button type="button" class="p3-b${i===1?' on':''}" data-k="${k}">${esc(PROF[k].n)}</button>`).join('')}</div>
     <div class="p3-rlist" id="p3rl"><div class="p3-ref ok"><b>Waiting for a check</b>Press Start on the kiosk screen. All fifteen results and what the adviser would say will appear here.</div></div>
    </div></div>`,'p3kiosk'],
  ['When the adviser refers',`
   <p class="p33lead">Advisers do not diagnose. They follow four written rules, to be signed off by a licensed Tanzanian clinician before launch.</p>
   <div class="p33wrap" style="margin-top:12px"><table class="p33rules">
    <tr><td style="--c:#5fbf8f">In range</td><td>Blood pressure below 120/80, oxygen 95% or more, no fever. Encourage, save the readings if agreed, remind for the next free check.</td></tr>
    <tr><td style="--c:#f2c96b">Above ideal</td><td>Blood pressure 120–139 / 80–89, BMI 25 or more, visceral fat 10 or more, vision 6/12 or worse. Practical advice and a recheck in a few weeks; an eye test for vision.</td></tr>
    <tr><td style="--c:#ff9b87">See a clinic this week</td><td>Blood pressure 140/90 or higher, the WHO threshold, which must be confirmed on two different days ${C('who_fs',2)}. Random blood sugar 11.1 mmol/L or more. Fever of 38 °C or more.</td></tr>
    <tr><td style="--c:#ff5b5b">Medical help today</td><td>Blood pressure 180/120 or higher, a hypertensive-crisis level ${C3('mayo',9)}; oxygen of 93–94% (same day) or 92% and below (urgent) ${C3('nhs',10)}; or any reading together with chest pain, breathlessness, weakness or confusion. The adviser stays with the customer and helps arrange care.</td></tr></table></div>`],
  ['In our store',`
   <div class="p33split"><div>${FIG('ac-enter','Concept image of the Afya Check kiosk just inside the store entrance next to the lounge','right of the entrance, beside the lounge',null,'45% 50%')}</div>
    <div><span class="p33k">Placement and staffing</span><h3 class="p33h">Right of the door, facing the street</h3>
     <p class="p33lead">The kiosk stands on the right as you enter, in the 12 m² wellness zone beside the lounge chairs, under a simple sign: <b>“Pima afya bure · Free health check”</b>. It is the first thing a passer-by sees through the glass. The private room for paid tests is a few steps away.</p>
     <p class="p33lead">It is available whenever the store is open, ${hrs} hours a day. One health adviser per shift is responsible for it while also serving the floor; a second adviser joins at busy times.</p></div></div>
   <div class="p33ex"><b class="t">Worked example · can one kiosk cope?</b>
    <p>One check takes about ${ck.minutes} minutes and the clean about 1 more, so one kiosk serves <b>${cap} people an hour</b>, or <b>${capDay} a day</b> over ${hrs} hours.</p>
    <p>By month 12 the model expects <b>${chk} checks a day</b>, or ${F.pct(util)} of that capacity. The busiest hour is usually about 1.7 times the average, so about <b>${peak} people</b> against a capacity of ${cap}. One kiosk is sufficient for year one, with time for a second reading or a longer conversation. When use passes about 70%, a second kiosk costs less than the customers a queue would lose.</p></div>`],
  ['Consent and privacy',`
   <p class="p33lead">Under Tanzania’s data protection law, data concerning health is <b>sensitive data</b>. Processing it requires the <b>prior written consent</b> of the person, and withdrawing consent must be <b>“simple and accessible at any time and without any explanation or charges”</b> ${C('pdpa',3)}. The Afya Check is built around that rule.</p>
   <ol class="p33ol">
    <li><b>Before.</b> One clear screen in Kiswahili and English: what is measured, why, and who sees it. One required tick; separate optional ticks for results by text and for saving to an Afya account. A parent or guardian consents for a child.</li>
    <li><b>During.</b> No camera and no ID. A phone number only if the customer wants results by text message.</li>
    <li><b>After.</b> Saved readings are encrypted and visible only to the customer and their adviser. Sharing with a relative needs separate consent. Deletion on request with one text message.</li></ol>
   <p class="p33src">Legal review needed: registration with the Personal Data Protection Commission and the final consent wording will be confirmed with a Tanzanian lawyer before launch.</p>`],
  ['The money · what it costs, what it earns',`
   <div class="p33glance">
    <div><b>${F.m(K.landed)}</b><span>kiosk, landed: US$${K.usd.toLocaleString('en-US')} × ${K.fx.toLocaleString('en-US')} + 20%</span></div>
    <div><b>${F.m(I.opex_month.check_station)}</b><span>running cost a month in the model: consumables, cleaning, calibration, data</span></div>
    <div><b>${F.pct(ck.check_to_purchase)}</b><span>of checks lead to a purchase in the model ${PE}</span></div>
    <div><b>TSh 0</b><span>price of the ${n} measurements, always</span></div></div>
   <div class="p33ex"><b class="t">Worked example · month 12, base case</b>
    <p>${chk} checks a day × ${F.pct(ck.check_to_purchase)} who then buy = about <b>${Math.round(buy)} purchases a day</b>. At an average basket of ${tz(st.basket)} and a retail margin of ${F.pct(st.retail_gm)}, that is about <b>${F.m(gpM)} of gross profit a month</b> from people who came in for the check.</p>
    <p>The station costs ${F.m(I.opex_month.check_station)} a month to run, so check-driven profit covers it about <b>${(gpM/I.opex_month.check_station).toFixed(1)} times</b>, before any paid-test income and before the value of the customers who come back.</p></div>
   <div class="p3-btns" id="p3sc" style="margin:22px 0 14px">${M.scenarios.map((k,i)=>`<button type="button" class="p3-b${i?'':' on'}" data-s="${k}">${esc(I.scenarios[k].label)} case</button>`).join('')}</div>
   <div class="p3-funnel"><div class="p3-chart" id="p3fun"></div><div class="nums" id="p3fnums" style="grid-template-columns:1fr 1fr"></div></div>
   <p class="p33src">Checks per day = model input ${chk} × scenario demand factor. Sales and gross profit derived from the store basket and retail margin. Planning estimates.</p>
   <span class="p33k" style="margin-top:34px">A decision for the founders · funding the kiosk</span>
   <p class="p33lead">The kiosk costs more than the technology seed line allows. With the day-one checkout and security kit from section 3.2 (${F.m(day1)}), technology comes to <b>${F.m(total)}</b> against a seed line of <b>${F.m(techLine)}</b>, a gap of about <b>${F.m(gap)}</b>. The financial model is unchanged until the founders decide.</p>
   <div class="p33opt">
    <div class="rec"><em>Option A · recommended</em><b>Raise the seed by about ${F.m(gapR)}</b><p>From ${F.m(I.seed.amount)} to about ${F.m(I.seed.amount+gapR)}. The full station opens on day one and the reserve stays whole.</p></div>
    <div><em>Option B</em><b>Defer self-checkout, use part of the reserve</b><p>Move the self-checkout (about TSh 4M) to phase 2 and draw the balance from the ${F.m(seedUse('reserve'))} working-capital reserve. No new money, but a thinner cushion.</p></div>
    <div><em>Option C</em><b>A simpler station for year one</b><p>A validated blood-pressure monitor, a body-composition scale and an oxygen clip on a branded stand, about TSh 4M. Fewer readings, more adviser time.</p></div></div>`],
  ['Risks and our answers',`
   <ol class="p33ol">
    <li><b>A reading is treated as a diagnosis, or someone is falsely reassured.</b> Every screen and text says “screening, not diagnosis”. Referral rules are clinician-signed, and advisers never diagnose or prescribe.</li>
    <li><b>A low-cost machine gives inaccurate readings.</b> We buy only with evidence of a validated cuff, test a sample unit against a validated monitor, calibrate every six months and repeat any high blood pressure after rest.</li>
    <li><b>Import, registration or spare parts are delayed.</b> Order three months before opening, start TMDA registration with the order, and buy a spare cuff and clip with the kiosk.</li>
    <li><b>Health data leaks or is misused.</b> Consent first, minimal data, encryption, access by role, deletion on request, and legal review before launch.</li>
    <li><b>Hygiene, or a queue at busy times.</b> A logged wipe-down after every customer; capacity of ${cap} an hour against a busiest-hour need of about ${peak}; a second kiosk when use passes 70%.</li></ol>`]],
  takeaway:`The Afya Check is the store’s main source of new customers: <b>${n} free measurements in about ${ck.minutes} minutes</b>, or a ${ck.quick_seconds}-second quick check, on an affordable machine and explained by a trained adviser. It reaches people before they know they need care, and the model assumes about <b>one in three checks</b> leads to a purchase, without sales pressure.`,
  doors:['s3-1','s3-2','s3-4','s4-5'],
  sources:[SRC('who_tz'),SRC('who_fs'),SRC('pdpa'),S33.sisu,S33.jmir,S33.rev,S33.sht,S33.lej,S33.mayo,S33.nhs,S33.shc]})},
 init(){
  chainPlayer('p33f');
  const ks=$('p3ks');if(!ks)return;let prof='b';
  const pb=[...document.querySelectorAll('#p3prof button')];pb.forEach(b=>b.onclick=()=>{prof=b.dataset.k;pb.forEach(x=>x.classList.toggle('on',x===b));home()});
  const rl=$('p3rl');
  const wait=()=>{rl.innerHTML=`<div class="p3-ref ok"><b>Waiting for a check</b>Press Start on the kiosk screen. The fifteen measurements below fill in as the check runs, with what the adviser would say.</div><div class="p3-wl">${MEAS.map((m,i)=>`<div><i>${String(i+1).padStart(2,'0')}</i><span>${esc(m[0])}</span><em>${m[2]==='—'?'recorded':esc(m[2])}</em></div>`).join('')}</div>`};
  if(!document.getElementById('p3wl-css')){const e=document.createElement('style');e.id='p3wl-css';e.textContent='.p3-wl{margin-top:10px;border-top:1px solid rgba(255,255,255,.08)}.p3-wl>div{display:grid;grid-template-columns:32px 1fr auto;gap:10px;padding:8px 2px;border-bottom:1px solid rgba(255,255,255,.06);font-size:.84rem;color:rgba(244,251,247,.78)}.p3-wl i{font:600 .7rem var(--f-hud,monospace);font-style:normal;color:rgba(244,251,247,.4)}.p3-wl em{font:500 .74rem var(--f-hud,monospace);font-style:normal;color:rgba(244,251,247,.5)}';document.head.appendChild(e)}
  const home=()=>{p3clear();wait();ks.innerHTML=`<div class="p3-kt"><small>Karibu · Welcome</small><b>Afya Check · free</b></div><div class="p3-kb"><p>Know your numbers. ${I.check.free_readings.length} measurements in about ${I.check.minutes} minutes.</p>
   <button type="button" class="p3-kopt" data-l="en"><b>Start · English</b><span>Height, weight, body composition, blood pressure, pulse, oxygen, temperature, vision</span></button>
   <button type="button" class="p3-kopt" data-l="sw"><b>Anza · Kiswahili</b><span>Urefu, uzito, muundo wa mwili, shinikizo la damu, mapigo, oksijeni, joto, macho</span></button>
   <p style="margin-top:auto;font-size:.66rem">Screening, not diagnosis · free · no purchase needed</p></div>`;
   ks.querySelectorAll('.p3-kopt').forEach(b=>b.onclick=consent)};
  const consent=()=>{ks.innerHTML=`<div class="p3-kt"><small>Step 1 of 5</small><b>Before we start</b></div><div class="p3-kb"><p>We will measure ${I.check.free_readings.length} things. Your results are yours.</p>
   <label class="p3-kchk"><input type="checkbox" id="p3c1"> I agree to be measured and understand this is screening, not a diagnosis. (required)</label>
   <label class="p3-kchk"><input type="checkbox" id="p3c2" checked> Send my results to my phone by SMS (optional)</label>
   <label class="p3-kchk"><input type="checkbox" id="p3c3"> Save to my Afya account to follow changes (optional)</label>
   <button type="button" class="p3-kgo" id="p3kgo" disabled>Start check</button><button type="button" class="p3-kgo alt" id="p3kbk">Back</button></div>`;
   const c1=$('p3c1'),go=$('p3kgo');c1.onchange=()=>go.disabled=!c1.checked;$('p3kbk').onclick=home;go.onclick=()=>measure($('p3c2').checked)};
  const PH5=[['Step 2 of 5','Stand on the plates, hold the grips',20,30,10],['Step 3 of 5','Sit and rest quietly',50,60,0],['Step 3 of 5','Blood pressure · keep still',110,30,2],['Step 4 of 5','Finger in the clip · forehead',140,40,2],['Step 5 of 5','Vision · tap the direction of the E',180,60,1]];
  const measure=sms=>{const R=readings(PROF[prof]),D=16000,real=240,r=70,c=2*Math.PI*r;let done=0;
   ks.innerHTML=`<div class="p3-kt"><small id="p3kst">Step 2 of 5</small><b id="p3kti">Measuring</b></div><div class="p3-kb"><div class="p3-ring"><svg viewBox="0 0 170 170"><circle class="bg" cx="85" cy="85" r="${r}"/><circle class="fg" id="p3fg" cx="85" cy="85" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c}"/></svg><div><b id="p3kclk">0:20</b><small>check clock</small></div></div><div class="p3-kread" id="p3kr"></div><div class="p3-kdots">${R.map(()=>'<i></i>').join('')}</div><p style="text-align:center;font-size:.66rem">Demo runs 15× faster than real time</p></div>`;
   rl.innerHTML=`<div class="p3-ref ok"><b>Measuring</b>Fifteen measurements in progress. Results appear here as each step finishes.</div>`;
   const dots=[...ks.querySelectorAll('.p3-kdots i')],t0=performance.now();
   const fr=now=>{const k=Math.min(1,(now-t0)/D),sim=20+k*(real-20);$('p3fg').style.strokeDashoffset=c*(1-k);$('p3kclk').textContent=Math.floor(sim/60)+':'+String(Math.floor(sim%60)).padStart(2,'0');
    let ph=PH5[0];PH5.forEach(x=>{if(sim>=x[2])ph=x});$('p3kst').textContent=ph[0];$('p3kti').textContent=ph[1];
    let target=0;PH5.forEach(x=>{if(sim>=x[2]+x[3])target+=x[4]});
    while(done<target&&done<R.length){dots[done].classList.add('f');done++}
    $('p3kr').textContent=done?R[done-1][0]+' · '+R[done-1][1]+' '+R[done-1][2]:'…';
    if(k<1)P3.rafs.push(requestAnimationFrame(fr));else{dots.forEach(d=>d.classList.add('f'));later(()=>results(R,sms),400)}};
   P3.rafs.push(requestAnimationFrame(fr))};
  const results=(R,sms)=>{const worst=Math.max(...R.map(x=>x[3])),urgent=R.some(x=>x[5]===3),cnt=[0,1,2].map(s=>R.filter(x=>x[3]===s).length);
   ks.innerHTML=`<div class="p3-kt"><small>Results · 4:00 · ${cnt[0]} in range · ${cnt[1]} above ideal · ${cnt[2]} see a clinic</small><b>Your ${R.length} results</b></div><div class="p3-kb"><div class="p3-kres">${R.map(x=>`<div><span style="display:flex;align-items:center;gap:7px"><i class="p3-dot" style="background:${STC[x[3]]}"></i>${esc(x[0])}</span><b>${x[1]} <small style="font-weight:500;font-size:.6rem">${x[2]}</small></b></div>`).join('')}</div>
    <p style="font-size:.66rem">${sms?'Sent to your phone by SMS. ':''}An adviser will explain your results. Screening, not diagnosis.</p><button type="button" class="p3-kgo" id="p3kag">New check</button></div>`;
   $('p3kag').onclick=home;
   const ref=urgent?`<div class="p3-ref red"><b>Medical help today</b>A reading is at an urgent level. The adviser stays with the customer, repeats it after rest, and if it is confirmed helps arrange same-day care. Nothing is sold first.</div>`
    :worst===2?`<div class="p3-ref red"><b>Referral: see a clinic this week</b>At least one reading is in the “see a clinic” range. The adviser explains that one reading is not a diagnosis, sends a referral slip by SMS and books a follow-up check. A product is suggested only if the clinic recommends home monitoring.</div>`
    :worst===1?`<div class="p3-ref warn"><b>Above ideal: advice and a recheck</b>No referral today. The adviser explains what “above ideal” means, gives simple, practical tips and sets a reminder for a recheck in a few weeks.</div>`
    :`<div class="p3-ref ok"><b>All in range</b>The adviser explains the results, saves the readings if the customer agreed and suggests the next free check in three to six months. No sale is suggested.</div>`;
   rl.innerHTML=ref+R.map((x,i)=>`<div class="p3-r" style="animation-delay:${i*.04}s"><i style="background:${STC[x[3]]}"></i><div><b>${esc(x[0])}</b><p>${esc(x[4])}</p></div><em>${x[1]} ${x[2]}</em></div>`).join('')};
  home();
  const fun=$('p3fun'),fn=$('p3fnums'),sb=[...document.querySelectorAll('#p3sc button')];
  const drawF=k=>{const d=I.scenarios[k].demand,ck=I.check,st=I.store,vis=st.visitors_day_m12*d,chk=ck.checks_day_m12*d,buy=chk*ck.check_to_purchase,sales=buy*st.basket,gp=sales*st.retail_gm,gpM=gp*30;
   const W=560,rows=[['Visitors a day',vis,'#d9b56e'],['Take an Afya Check',chk,'#5fbf8f'],['Buy after the check',buy,'#f2c96b']];const mx=vis;
   const bx=230,bw=360,cx=bx+bw/2,wd=v=>Math.max(.14,v/mx)*bw;
   fun.innerHTML=`<svg viewBox="0 0 ${W+40} 300" role="img" aria-label="Funnel from visitors to checks to purchases">${rows.map((r,i)=>{const w=wd(r[1]),y=18+i*96,nw=i<2?wd(rows[i+1][1]):0;
    return `${i<2?`<path d="M${cx-w/2} ${y+62}H${cx+w/2}L${cx+nw/2} ${y+96}H${cx-nw/2}Z" fill="${r[2]}" fill-opacity=".07"/>`:''}<rect x="${cx-w/2}" y="${y}" width="${w}" height="62" rx="12" fill="${r[2]}" fill-opacity=".22" stroke="${r[2]}" stroke-width="1.5"/><text x="${cx}" y="${y+41}" text-anchor="middle" font-size="26" font-weight="700" fill="#effaf5" font-family="JetBrains Mono,monospace">${Math.round(r[1])}</text><text x="0" y="${y+28}" font-size="17" font-weight="700" fill="#effaf5">${r[0]}</text><text x="0" y="${y+50}" font-size="14" fill="${r[2]}">${i?(i===1?F.pct(r[1]/vis)+' of visitors':F.pct(ck.check_to_purchase)+' of checks'):'month 12, per day'}</text>`}).join('')}</svg>`;
   fn.innerHTML=`<div class="num"><b>${Math.round(chk*30).toLocaleString('en-US')}</b><span>checks a month</span></div><div class="num"><b>${Math.round(buy*30).toLocaleString('en-US')}</b><span>purchases a month after a check</span></div><div class="num g"><b>${F.m(sales*30)}</b><span>check-driven sales a month</span></div><div class="num g"><b>${F.m(gpM)}</b><span>gross profit from those sales</span></div><div class="num" style="grid-column:1/-1"><b>${(gpM/I.opex_month.check_station).toFixed(1)}<em>×</em></b><span>the station’s monthly running cost (${tz(I.opex_month.check_station)}) covered by check-driven gross profit</span></div>`};
  sb.forEach(b=>b.onclick=()=>{sb.forEach(x=>x.classList.toggle('on',x===b));drawF(b.dataset.s)});drawF('base');
 }};

/* ===================================================================
   3.4 MEMBERSHIP AND CARDS
   =================================================================== */
const CCLS={green:'p3-cg',family:'p3-cf',care:'p3-cc',senior:'p3-cs',royal:'p3-cr',kazini:'p3-ck'};
const CEX={green:'Anyone: a student, a shopper passing by. Sign up with a phone number at the till.',family:'The Mushi family in Kinondoni, with a toddler and a newborn.',care:'Baba Juma, living with diabetes, who wants his strips and a full check every month.',senior:'Bibi Zawadi in Temeke, cared for by her granddaughter, who manages her account from work.',royal:'A household that wants premium brands and a personal adviser, or a company gifting care to staff.',kazini:'Mama Rehema’s restaurant in Sinza, six staff, on the Kazini Chakula kit.'};
const PTS={per:1000,value:10}; // planning estimate: 1 point per TSh 1,000 spent; 1 point worth TSh 10 (≈1% back)
const LOGO='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M 3.26 10.86 L 12 3.64 L 20.74 10.86"/><path d="M 12 20.36 C 7.44 17.32 5.54 15.04 5.54 12.57 C 5.54 10.67 7.06 9.34 8.77 9.34 C 10.1 9.34 11.24 10.1 12 11.24 C 12.76 10.1 13.9 9.34 15.23 9.34 C 16.94 9.34 18.46 10.67 18.46 12.57 C 18.46 15.04 16.56 17.32 12 20.36 Z"/></svg>';
const cardFace=(c,i)=>`<div class="p3-cw" data-c="${i}"><button type="button" class="p3-flip" aria-label="Flip the ${esc(c.name)} card">
 <span class="p3-face ${CCLS[c.key]}"><span class="p3-fr"><span class="p3-logo">${LOGO}AFYA BASICS</span><span class="p3-chip"></span></span><span><span class="nm">${esc(c.name)}</span><br><span class="no">•••• ${String(2026+i*1111).slice(-4)} · MEMBER</span></span></span>
 <span class="p3-face p3-back ${CCLS[c.key]}"><span class="nm" style="font-size:.8rem">${esc(c.name)}</span><ul>${c.perks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><span class="fee">${c.fee_year?tz(c.fee_year)+' / year':'Free'}</span></span></button>
 <div class="p3-cmeta"><b>${esc(c.name)}</b><span>${esc(c.who)}</span><em>${c.fee_year?tz(c.fee_year)+' a year':'Free to join'}</em></div></div>`;
function memberMath(o){ // o: {fee, box, factor, churn}
 const mb=I.members,pd=mb.packing_delivery_in_price,bx=o.box*o.factor;
 const NF=(window.MODEL&&MODEL.NETF)||1,prodRev=Math.max(0,bx-pd)*NF,gpBox=prodRev*mb.box_products_gm+pd*(mb.pd_margin||0),ptsCost=bx/PTS.per*PTS.value;
 const gpMonth=gpBox-ptsCost,yearCost=o.fee+12*bx,saving=12*o.box*(1-o.factor),gpYear=gpMonth*12+o.fee,life=1/o.churn;
 return {bx,gpBox,ptsCost,gpMonth,yearCost,saving,gpYear,life,ltv:gpMonth*life+o.fee*life/12,points:Math.floor(12*bx/PTS.per),
  split:{cost:prodRev*(1-mb.box_products_gm),vat:Math.max(0,bx-pd)*(1-NF),pack:pd*(1-(mb.pd_margin||0)),gp:gpMonth,pts:ptsCost}}}

const NUM=n=>Math.round(n).toLocaleString('en-US');
const CSS34=`
.p34cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 26px;margin-top:22px}
.p34c{min-width:0}
.p34pf{position:relative;margin:0;aspect-ratio:16/10;border-radius:6px;overflow:hidden;background:#141414}
.p34pf>img{width:100%;height:100%;object-fit:cover;display:block}
.p34pf .bk{position:absolute;inset:0;display:grid;place-items:center;background:radial-gradient(circle at 50% 40%,#2a2a28,#121211);opacity:0;transition:opacity .45s}
.p34pf .bk img{width:72%;filter:drop-shadow(0 18px 24px rgba(0,0,0,.6));border-radius:4.4%/7%}
.p34c.fl .p34pf .bk{opacity:1}
.p34flip{position:absolute;right:10px;bottom:10px;padding:5px 11px;border-radius:4px;border:1px solid rgba(255,255,255,.25);background:rgba(12,12,12,.62);color:#efe8d8;font:600 .62rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(4px)}
.p34c h4{margin:16px 0 2px;font:500 1.25rem var(--f-serif,Georgia,serif);color:#fff}
.p34c .fee{font:600 .74rem var(--f-hud,monospace);color:#d8b46a;letter-spacing:.06em}
.p34c p{margin:8px 0 0;font-size:.88rem;line-height:1.6;color:rgba(244,251,247,.78)}
.p34c .pk2{margin-top:8px;font-size:.8rem;line-height:1.55;color:rgba(244,251,247,.6)}
.p34c .pk2 b{color:#d8b46a;font:600 .66rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;display:block;margin-bottom:2px}
.p34calc{display:grid;grid-template-columns:minmax(0,340px) minmax(0,1fr);border:1px solid rgba(255,255,255,.1);border-radius:20px;overflow:hidden;margin-top:18px}
.p34in{padding:22px;background:#0b0d0c;border-right:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;gap:18px}
.p34in label,.p34in .lb{display:block;font:600 .66rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:#d8b46a;margin-bottom:8px}
.p34cs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.p34cs button{display:flex;flex-direction:column;align-items:flex-start;gap:3px;border:1px solid rgba(236,228,210,.14);border-radius:6px;padding:9px 10px;background:none;cursor:pointer;color:rgba(244,240,230,.7);text-align:left;transition:.2s}.p34cs button i{width:22px;height:14px;border-radius:2px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.18)}.p34cs button b{font:500 .86rem var(--f-serif,Georgia,serif);color:#f1ebdd}.p34cs button small{font:600 .6rem var(--f-hud,monospace);letter-spacing:.06em;color:rgba(236,228,210,.5)}
.p34cs button.on{border-color:#d8b46a;background:rgba(216,180,106,.08)}.p34cs img{display:block;width:100%;border-radius:7px}
.p34in select{width:100%;padding:11px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:#0b1a14;color:#fff;font:500 .92rem inherit}
.p34seg{display:flex;border:1px solid rgba(255,255,255,.16);border-radius:10px;overflow:hidden}
.p34seg button{flex:1;border:0;background:none;color:rgba(244,251,247,.8);padding:10px 4px;font:600 .8rem inherit;cursor:pointer;border-left:1px solid rgba(255,255,255,.08)}
.p34seg button:first-child{border-left:0}.p34seg button.on{background:#ece4d2;color:#141210}
.p34in input[type=range]{width:100%;accent-color:#d8b46a}
.p34in .hint{font-size:.78rem;line-height:1.5;color:rgba(244,251,247,.6);margin-top:6px}
.p34out{padding:24px 26px;display:flex;flex-direction:column;gap:20px}
.p34two{display:grid;grid-template-columns:1fr 1fr;gap:26px}
.p34st h5{margin:0 0 8px;font:600 .68rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:#b9c7bf}
.p34st table{width:100%;border-collapse:collapse;font-size:.88rem}
.p34st td{padding:8px 0;border-bottom:1px solid rgba(255,255,255,.07);color:rgba(244,251,247,.82);vertical-align:top}
.p34st td.v{text-align:right;font-family:var(--f-hud,monospace);color:#fff;white-space:nowrap;padding-left:10px}
.p34st tr.t td{border-bottom:0;border-top:1px solid rgba(255,255,255,.3);font-weight:700;color:#fff}.p34st tr.t td.v{color:#e9c77f}
.p34st tr.m td{color:rgba(244,251,247,.6)}
.p34bar{display:flex;height:16px;border-radius:4px;overflow:hidden}
.p34bl{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:8px;font-size:.78rem;color:rgba(244,251,247,.75)}.p34bl i{display:inline-block;width:10px;height:10px;border-radius:2px;margin-right:6px;vertical-align:-1px}
.p34say{padding:16px 18px;border-left:3px solid #e9c77f;background:linear-gradient(90deg,rgba(233,199,127,.07),transparent);border-radius:0 12px 12px 0;font-size:.95rem;line-height:1.7;color:rgba(244,251,247,.9)}
.p34say b{color:#fff}
.p34hero{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:40px;align-items:center}
.p34hero img{width:100%;display:block;border-radius:18px}
@media(max-width:980px){.p34cards{grid-template-columns:1fr 1fr}.p34calc{grid-template-columns:1fr}.p34in{border-right:0;border-bottom:1px solid rgba(255,255,255,.08)}.p34two,.p34hero{grid-template-columns:1fr}}
@media(max-width:560px){.p34cards{grid-template-columns:1fr}}

.p34t23{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:6px}.p34t23 article{min-width:0}.p34t23 .tph{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:6px;display:block;margin-bottom:16px}
.p34s .s11lead,.p34s .p33lead{max-width:900px}
.p34s .take{font-family:var(--f-serif,Georgia,serif);font-weight:400;color:#f1ebdd;max-width:900px}.p34s .take b{color:#d8b46a;font-weight:500}
.p34s .p3-chart{background:#0d0f0e;border-color:rgba(236,228,210,.12)}
@media(max-width:760px){.p34t23{grid-template-columns:1fr}}
/* 3.4 v3: editorial modules */
.p34vs{margin-top:20px;border-top:1px solid rgba(236,228,210,.14)}
.p34vs>div{display:grid;grid-template-columns:1fr 1fr;border-bottom:1px solid rgba(236,228,210,.1)}
.p34vs>div p{margin:0;padding:14px 18px 14px 0;font-size:.9rem;line-height:1.55;color:rgba(244,240,230,.62)}
.p34vs>div p:last-child{padding-left:18px;border-left:1px solid rgba(216,180,106,.35);color:rgba(244,240,230,.88)}
.p34vs>div p b{display:block;margin-bottom:3px;color:rgba(244,240,230,.8);font-weight:600}.p34vs>div p:last-child b{color:#f1ebdd}
.p34vs .h span{padding:10px 0;font:600 .64rem var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:rgba(236,228,210,.45)}
.p34vs .h span:last-child{padding-left:18px;color:#d8b46a;border-left:1px solid rgba(216,180,106,.35)}
.p34tl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:34px 24px;margin-top:22px;counter-reset:t}
.p34tl figure{margin:0;min-width:0}
.p34tl .im{position:relative;aspect-ratio:3/2;border-radius:6px;overflow:hidden;background:#111}
.p34tl .im img{width:100%;height:100%;object-fit:cover;display:block}
.p34tl figure.ui .im{background:linear-gradient(160deg,#1a2620,#0c110f)}.p34tl figure.ui .im img{object-fit:contain;padding:14px 0;filter:drop-shadow(0 14px 22px rgba(0,0,0,.55))}
.p34tl .im span{position:absolute;left:12px;top:12px;font:500 1.05rem var(--f-serif,Georgia,serif);color:#f4efe4;text-shadow:0 1px 8px rgba(0,0,0,.7)}
.p34tl figcaption{padding-top:14px;border-top:1px solid rgba(216,180,106,.4);margin-top:14px}
.p34tl figcaption em{display:block;font:600 .64rem var(--f-hud,monospace);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:#d8b46a}
.p34tl figcaption b{display:block;margin:6px 0 6px;font:500 1.15rem var(--f-serif,Georgia,serif);color:#f4efe4}
.p34tl figcaption p{margin:0;font-size:.86rem;line-height:1.6;color:rgba(244,240,230,.7)}
.p34rules{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:34px;border-top:1px solid rgba(236,228,210,.14);border-bottom:1px solid rgba(236,228,210,.14)}
.p34rules>div{padding:18px 18px 20px 0}.p34rules>div+div{padding-left:18px;border-left:1px solid rgba(236,228,210,.1)}
.p34rules em,.p34kpi span{display:block;font:600 .62rem var(--f-hud,monospace);font-style:normal;letter-spacing:.14em;text-transform:uppercase;color:rgba(236,228,210,.5)}
.p34rules b{display:block;margin:6px 0;font:500 1.05rem var(--f-serif,Georgia,serif);color:#f4efe4}
.p34rules p{margin:0;font-size:.82rem;line-height:1.55;color:rgba(244,240,230,.66)}
.p34kpi{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:20px;border-top:1px solid rgba(236,228,210,.14);border-bottom:1px solid rgba(236,228,210,.14)}
.p34kpi>div{padding:22px 18px 22px 0}.p34kpi>div+div{padding-left:18px;border-left:1px solid rgba(236,228,210,.1)}
.p34kpi b{display:block;font:400 2.1rem/1.05 var(--f-serif,Georgia,serif);color:#f4efe4;margin-bottom:8px}
.p34kpi span{color:#d8b46a}.p34kpi p{margin:10px 0 0;font-size:.82rem;line-height:1.55;color:rgba(244,240,230,.64)}
.p34sub{margin:40px 0 14px;font:600 .66rem var(--f-hud,monospace);letter-spacing:.16em;text-transform:uppercase;color:rgba(236,228,210,.55)}
.p34wf svg{width:100%;height:auto;display:block}
.p34why{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.p34why figure{margin:0}.p34why img{width:100%;aspect-ratio:3/2;object-fit:cover;border-radius:6px;display:block}
.p34why figcaption{padding-top:12px}.p34why b{display:block;font:500 1.08rem var(--f-serif,Georgia,serif);color:#f4efe4}
.p34why p{margin:6px 0 0;font-size:.85rem;line-height:1.6;color:rgba(244,240,230,.68)}
.p34risk td{font-size:.86rem;line-height:1.55;color:rgba(244,240,230,.75);vertical-align:top}.p34risk td:first-child b{font:500 1rem var(--f-serif,Georgia,serif);color:#f4efe4}
.p34risk td:last-child{color:#e3d3ad;font-size:.8rem}
td.kzi{display:flex;gap:12px;align-items:center}td.kzi img{width:64px;height:46px;object-fit:cover;border-radius:4px;flex:none}
@media(max-width:980px){.p34tl,.p34why{grid-template-columns:1fr 1fr}.p34rules,.p34kpi{grid-template-columns:1fr 1fr}.p34rules>div:nth-child(3),.p34kpi>div:nth-child(3){padding-left:0;border-left:0}}
@media(max-width:620px){.p34tl,.p34why,.p34rules,.p34kpi,.p34vs>div{grid-template-columns:1fr}.p34rules>div,.p34kpi>div{padding-left:0!important;border-left:0!important;border-top:1px solid rgba(236,228,210,.1)}.p34vs>div p:last-child{padding-left:12px}}
/* editorial restyle: calm type, no neon, photographic cards */
.p34s{--neon:#d8b46a;--neon2:#e9dcc0}
.p34s .s01h{font-family:var(--f-serif,Georgia,serif);font-weight:400;letter-spacing:-.02em;line-height:1.02;font-size:clamp(2.6rem,5.4vw,4.9rem);color:#f4efe4}
.p34s .s01h em{background:none;-webkit-background-clip:initial;background-clip:initial;color:#d8b46a;font-style:italic}
.p34s .state{filter:saturate(.3)}
.p34s .p33tbl em,.p34s .p34map em{color:#e3d3ad!important;text-shadow:none}
.p34s .p34calc{border-color:rgba(236,228,210,.14);background:#0d0f0e}
.p34s .p34cs img{filter:saturate(.85)}
.p34face{display:flex;align-items:center;justify-content:center;width:100%;height:100%;background:radial-gradient(120% 90% at 30% 20%,#1d2621,#0b0e0c);padding:8%}.p34face img{width:100%;height:auto!important;border-radius:14px;box-shadow:0 30px 50px rgba(0,0,0,.55),0 6px 14px rgba(0,0,0,.4);transform:rotate(-4deg)}
@media(max-width:620px){.p34map thead{display:none}.p34map,.p34map tbody,.p34map tr,.p34map td{display:block;width:100%}.p34map tr{padding:14px 0;border-bottom:1px solid rgba(236,228,210,.12)}.p34map td{border:0;padding:4px 0}}
.p34ph{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:40px 28px;margin-top:24px}
.p34ph figure{margin:0;min-width:0}
.p34ph .im{position:relative;aspect-ratio:4/3;border-radius:6px;overflow:hidden;background:#111}
.p34ph .im img{width:100%;height:100%;object-fit:cover;display:block;transition:opacity .5s}
.p34ph .im img.b{position:absolute;inset:0;opacity:0}
.p34ph figure:hover .im img.b{opacity:1}
.p34ph .im span{position:absolute;right:10px;bottom:10px;padding:3px 8px;border-radius:3px;background:rgba(10,10,10,.6);font:600 .6rem var(--f-hud,monospace);letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.75)}
@media(max-width:980px){.p34ph{grid-template-columns:1fr 1fr}}@media(max-width:560px){.p34ph{grid-template-columns:1fr}}
`;
addCSS('p34',CSS34);
const C34={ // one-line purpose and an example customer for each card
 green:['The free card every customer starts with. It records purchases, earns points, saves the basket and keeps Afya Check readings (with consent).','Amina, 26, signs up after a free Afya Check and takes Afya Glow.'],
 family:['For households with children. Free same-day delivery on boxes and a priority WhatsApp line, so nappies and school supplies are replenished before they run out.','The Mushi family in Kinondoni: a toddler and a newborn, two nappy sizes.'],
 care:['For people living with a condition. A full Afya Check every month, reading history and reminders, with supplies timed to the treatment.','Baba Juma, living with diabetes, about 60 test strips a month.'],
 senior:['For older parents and the family who care for them. Home delivery, a discount on equipment rental, and account access for a carer anywhere in the world.','Bibi Zawadi in Temeke, 78, her granddaughter manages the account from work.'],
 royal:['A small premium line: any package in premium brands, gift packaging, a personal adviser and same-day priority delivery.','A household that wants the best service, or a company gifting care to staff.'],
 kazini:['The business account. One monthly delivery of the safety, hygiene and first-aid kit a workplace needs, one invoice and staff training.','Mama Rehema’s restaurant in Sinza, six staff, on Kazini Chakula.']};
window.SECTIONS['s3-4']={
 render(s,p,pv,nx){const mb=I.members,b=B(),m12=b.months[11],SV=M.services(),K=M.kazini();
  const base=memberMath({fee:0,box:mb.avg_box,factor:1,churn:mb.monthly_churn});
  const yBox=b.months.reduce((a,x)=>a+x.boxes,0),share=m12.boxes/m12.revenue,hud=(SV.avg_margin+SV.avg_comm);
  const up12=Math.round(m12.members*0.4)*mb.avg_box*mb.plans.m12*12;
  const G=AFYA_PKG.groups(),all=G.flatMap(g=>g.items);
  return secShell({s,p,pv,nx,cls:'p3 p33 p34s',
  img:'/_blob/5adf45a12c4693ff51013063995dbac1',imgAlt:'Concept image: the six Afya Basics membership cards laid out on dark green linen',
  h1:'One account for every family.',em:'Care that arrives before you run out.',
  lede:`Membership is the core of the Afya Basics model. A customer joins once and chooses the package the household needs; the right products, checks and services then arrive every month without a new search, queue or decision. Six cards cover every customer segment: Afya Green (free), Family, Care, Senior and Royal for households, and Kazini for businesses. Members are recruited from store customers and Afya Check users. This section covers each card, the packages it unlocks, the monthly cycle, what a member pays and saves, and how the company earns from it.`,
  mods:[
  ['Membership at a glance',`
   <div class="p33glance">
    <div><b>6</b><span>cards: five for households, one business account</span></div>
    <div><b>${all.length}</b><span>packages: ${all.filter(x=>!x.kz).length} Afya Boxes and ${all.filter(x=>x.kz).length} Afya Kazini business kits</span></div>
    <div><b>${NUM(m12.members)}</b><span>box members by month 12 in the Flagship base case</span></div>
    <div><b>${F.m(m12.boxes)}</b><span>box sales in month 12, ${F.pct(share)} of all revenue, renewing every month</span></div></div>`],
  ['Why membership · the problem it solves',`
   <div class="p33split"><div>
    <p class="p33lead">Health needs repeat. A baby needs about six nappy changes a day, a person with diabetes uses the same strips every week, and an older parent needs adult diapers every month. Yet each month the household starts again from zero. Membership removes that cost.</p>
    <div class="p34vs"><div class="h"><span>Without membership</span><span>With an Afya membership</span></div>
     <div><p><b>Every month starts from zero.</b> A trip, a search, a queue, a price that changed, a brand that ran out.</p><p><b>The month is already planned.</b> The box arrives on a fixed day, with the right sizes, before anything runs out.</p></div>
     <div><p><b>Conditions drift between clinic visits.</b> In the 2012 national survey only 8.3% of people with high blood pressure were on treatment and 2.2% had it under control ${C('who_tz',1)}.</p><p><b>Supplies and a check arrive on schedule.</b> Strips, tablets and cuffs come with the box; Care members get a full Afya Check every month.</p></div>
     <div><p><b>The shop does not know the family.</b> Every visit, they explain the nappy size, the meter model, Bibi’s diaper size again.</p><p><b>One record follows the family.</b> Sizes, devices and readings are saved once, with consent, and the box adapts as children grow.</p></div>
     <div><p><b>Loyalty earns nothing.</b> A family that spends every month is treated as a first-time visitor.</p><p><b>Loyalty is paid back.</b> Points worth about 1% back, lower prices on longer plans, and priority delivery on paid cards.</p></div></div></div>
    <figure class="p33fig"><img src="/_blob/fcfff253559462f95df7f299b65cbfae" alt="Concept render of the Mama na Mtoto Afya Box with its rose category band and QR code" loading="lazy"><figcaption>Concept render · the member’s box, same design for every package, a colour band per category</figcaption></figure></div>`],
  ['The six cards',`
   <p class="p33lead">Each card is a real membership account, held first in the Afya app and on WhatsApp, with a physical card printed at the counter for anyone who wants one. The card carries the member number used at the till, at self-checkout and at the door, and the contactless chip lets a member identify themselves with a tap. Select “See the back” for the benefits printed on the reverse. ${tagi('Concept card designs in photographed settings')}</p>
   <div class="p34cards">${I.cards.map((c,i)=>{const it=all.filter(x=>x.card===c.key);return `<div class="p34c" data-i="${i}"><figure class="p34pf"><img src="${({green:'/_blob/7037a3869fd70633559cb81132aa1dcc',family:'/_blob/b653d447dd9c3ee207f44a6363cd7867',care:'/_blob/79545ffca65d550817436e9905819913',senior:'/_blob/f81e92c6693411b62a37c22fa1d465e8',royal:'/_blob/467233b9dc1ea38c95bdf0204690c555',kazini:'/_blob/5300515a4441088fb79e7fa5bd176c62'})[c.key]}" alt="${esc(c.name)} card photographed in use" loading="lazy" width="1600" height="893"><div class="bk"><img src="img/cards/${c.key}-back.webp?v=2" alt="${esc(c.name)} card, back with its benefits" loading="lazy"></div><button type="button" class="p34flip">See the back</button></figure>
     <h4>${esc(c.name)}</h4><span class="fee">${c.fee_year?tz(c.fee_year)+' a year':(c.key==='kazini'?'Business account · no card fee':'Free')}</span><p>${C34[c.key][0]}</p>
     <div class="pk2"><b>Designed for</b>${it.length?it.map(x=>esc(x.n)).join(' · '):'Any package, in premium brands'}</div><div class="pk2"><b>Example member</b>${esc(C34[c.key][1])} ${tagi('Illustrative')}</div></div>`}).join('')}</div>`],
  ['Every package, and the card that unlocks it',`
   <p class="s11lead">A card and a package are two halves of one promise. The <b>package</b> (the Afya Box) is what arrives every month. The <b>card</b> is who the customer is to us, and decides what comes with the box: free delivery, a monthly check, a carer’s access, a personal adviser, or a business invoice. Anyone can buy any package; when a household’s package belongs to a paid card, the adviser offers that card only if its perks are worth more than its fee to that family.</p>
   <div class="p33wrap" style="margin-top:16px"><table class="p33tbl p34map"><thead><tr><th>Card · yearly fee</th><th>Packages designed for this card · lowest 1-month price</th><th>What the card adds to the box</th></tr></thead><tbody>
    ${I.cards.map(c=>{const it=AFYA_PKG.groups().flatMap(g=>g.items).filter(x=>x.card===c.key);return `<tr><td><b>${esc(c.name)}</b><small>${c.fee_year?tz(c.fee_year)+' a year':(c.key==='kazini'?'No card fee · business account':'Free')}</small><small style="margin-top:6px;color:rgba(244,251,247,.6);font-family:inherit;letter-spacing:0">${esc(c.who)}</small></td><td>${it.length?it.map(x=>`<div class="pk"><span>${esc(x.n)}</span><em>from ${tz(x.from)}</em></div>`).join(''):'<span style="color:rgba(244,251,247,.6)">Any package, in premium brands with gift packaging</span>'}</td><td>${c.perks.map(esc).join('<br>')}</td></tr>`}).join('')}
   </tbody></table></div>
   <div class="p33ex"><b class="t">How the right card is chosen, in practice</b>
    <p>Neema signs up free on <b>Afya Green</b> after an Afya Check and takes <b>Afya Glow</b>. Three months later she is pregnant: the adviser moves her box to <b>Mama Mjamzito</b> and her card to <b>Afya Family</b>, because free same-day delivery on boxes and the priority WhatsApp line are worth more to her than the ${tz(I.cards.find(c=>c.key==='family').fee_year)} fee. Her points and history move with her. The card follows the life stage; the account never resets.</p></div>
   <p class="note">“From” prices are the smallest version of each box on the 1-month plan, taken from the section 3.5 box engine; a fuller box costs more, with packing and delivery inside; 6 and 12-month plans cost less · Afya Kazini kit prices are for a small business of about ${I.kazini.staff_avg} staff</p>`],
  ['Business accounts · Afya Kazini, Afya Ofisi and Afya Hoteli',`
   <p class="s11lead">Businesses buy health and safety supplies the way households used to: one item at a time, when something runs out, from whichever shop is open. Tanzanian law requires every workplace to keep a stocked first-aid box and trained first aiders, and to provide soap and clean toilets for staff (OSH Rules 2015). <b>Afya Kazini</b> turns that obligation into one monthly delivery and one invoice. It is structured in three tiers, so each size of business has one package to buy.</p>
   ${(()=>{const K=M.kazini(),X=window.AFYABOX;let OF=null,HO=null;try{const f=k=>{const bx=X.BK(k),c=X.calc(bx,X.dopt(bx),1,false,null,true);return{p:c.price,items:c.first.mon.map(x=>x[2]||X.it(x[0])[1])}};OF=f('office');HO=f('hotel')}catch(e){}
    const core=I.kazini.core.map(x=>x[0]);
    return `<div class="p34tier">
     <article><em>Tier 1 · small businesses, 1–10 staff</em><h4>Afya Kazini Ndogo</h4><p>A core kit every workplace needs, plus a sector kit for the risks of that trade. Five sector kits, one per kind of business:</p>
      <div class="p33wrap"><table class="p33tbl"><tbody>${K.rows.map(r=>`<tr><td class="kzi"><img src="img/kz-${r.k||r.key}.webp" alt="" loading="lazy"><div><b style="font-size:.98rem">${esc(r.name)}</b><small>${esc(r.en)}</small></div></td><td>${r.extra.map(x=>esc(x[0])).join(' · ')}${r.svc?` · <span style="color:#f2c96b">${esc(r.svc[0])} ×${r.svc[2]} a year</span>`:''}</td><td class="v">${tz(r.price)}</td></tr>`).join('')}</tbody></table></div>
      <p style="margin-top:12px"><b>In every Kazini kit:</b> ${core.map(esc).join(' · ')}, plus one accredited first-aid training seat and one fire-extinguisher service a year.</p></article>
     <div class="p34t23"><article><img class="tph" src="img/s-office.webp" alt="Concept image: an office workplace" loading="lazy"><em>Tier 2 · larger workplaces, per 25 staff</em><h4>Afya Ofisi</h4><p>For offices, schools, factories and NGOs. Priced per block of 25 staff, so a company of 75 takes three blocks. ${OF?`From <b>${tz(OF.p)} a month</b> per block.`:''}</p><p>${OF?OF.items.map(esc).join(' · '):''}</p><p>Includes two first-aid training seats a year, a monthly staff blood-pressure and BMI screening day, and an annual first-aid review report for the employer’s safety file.</p></article>
     <article><img class="tph" src="img/hotel.webp" alt="Concept image: a hotel reception" loading="lazy"><em>Tier 3 · hospitality, per 20 rooms</em><h4>Afya Hoteli</h4><p>For hotels, lodges and serviced apartments. Priced per block of 20 rooms. ${HO?`From <b>${tz(HO.p)} a month</b> per block.`:''}</p><p>${HO?HO.items.map(esc).join(' · '):''}</p><p>Includes four pest-control visits a year, a guest health line answered within two hours, and a monthly safety checklist for the manager.</p></article></div></div>`})()}
   <div class="p33ex"><b class="t">Worked example · Mama Rehema’s restaurant, Sinza, six staff</b>
    ${(()=>{const r=M.kazini().rows.find(x=>x.k==='chakula');return `<p>She takes <b>Kazini Chakula</b> at <b>${tz(r.price)} a month</b>. It arrives on a fixed day: the core kit (first-aid refill, plasters, hand wash, sanitiser, disinfectant, toilet cleaner, paper towels) plus the kitchen kit (gloves, antibacterial kitchen wipes, burn gel dressings), with a pest-control visit twice a year and a first-aid training seat for her cook.</p><p>Buying the same goods from small shops would cost her about <b>${tz(r.shop)}</b> a month and four trips; with Afya Kazini she saves about <b>${tz(r.shop-r.price)}</b> a month, receives one invoice for her books, and keeps her kitchen ready for a health inspection.</p>`})()}</div>
   <p class="note">Sources for the legal duties: Occupational Health and Safety Rules 2015 (first-aid box, rule 4(4); soap for employees, rule 7(3)(d)) as quoted in the master model · prices are planning estimates from the model and the section 3.5 box engine</p>`],
  ['How membership works, month by month',`
   <p class="p33lead">One month in the life of a member, from the first two minutes at the counter to the box on the kitchen table. The same cycle then repeats every month without the family having to start again.</p>
   <div class="p34tl">${[
    ['ui/c-join','Day 1 · 2 minutes','Joining','After a free Afya Check, at the counter, in the app or on WhatsApp: phone number, consent, household, package, plan and delivery day. The digital card appears at once.',1],
    ['ui/a-box','Day 1','Package and plan','The family picks the box and pays monthly, or 6 or 12 months ahead for a lower monthly price. Packing and delivery are inside the price.',1],
    ['ui/a-boxsms','Day −12','Afya Choice','A message offers a swap among 4–5 registered brands at the same price, or the next nappy size. Doing nothing keeps the box as it is; then choices lock.',1],
    ['c-seal','Day −2','Packed and sealed','The packing list is generated automatically. Every item is scanned, photographed and sealed, first expiry first out.',0],
    ['j-delivery','Delivery day','At the door','A rider brings the box on the family’s fixed day, or it waits in a locker or at the counter. Monthly members approve a mobile-money request; plan members have already paid.',0],
    ['/_blob/40cfe32d8a7aaae77fb5ec2f5f65eab2','Every month after','Points, and life changes','Points worth about 1% back are added. When life changes (a pregnancy, a diagnosis, a parent moving in) the box and card change; the history and points stay.',0]
   ].map((x,i)=>`<figure class="${x[4]?'ui':''}"><div class="im"><img src="${x[0].startsWith('/_blob/')?x[0]:'img/'+x[0]+'.webp'}" alt="${esc(x[2])}" loading="lazy"><span>${String(i+1).padStart(2,'0')}</span></div><figcaption><em>${x[1]}</em><b>${x[2]}</b><p>${x[3]}</p></figcaption></figure>`).join('')}</div>
   <div class="p34rules">
    <div><em>Plans</em><b>Pay ahead, pay less</b><p>Members save 3% off shelf prices on the monthly plan, 6% on a 6-month plan and 9% on a 12-month plan. Because packing and delivery stay at cost, the whole box costs about 2–3% less on 6 months and 4–6% less on 12 months than on the monthly plan (section 3.5). The financial model takes a cautious ${Math.round((1-mb.plans.m6)*100)}% and ${Math.round((1-mb.plans.m12)*100)}%.</p></div>
    <div><em>Points</em><b>${tz(PTS.value)} back for every ${tz(PTS.per)}</b><p>Earned in store, online and on the box, and spent on any later purchase. A family on a ${tz(mb.avg_box)} box earns about ${tz(mb.avg_box/PTS.per*PTS.value*12)} a year.</p></div>
    <div><em>Stopping</em><b>No lock-in</b><p>A monthly plan can stop at any time before the day −12 lock; a 6 or 12-month plan does not renew. Final terms will be written with a lawyer.</p></div>
    <div><em>Family abroad</em><b>Pay from anywhere</b><p>A son or daughter abroad pays a parent’s box by international card and receives the delivery photo and a short monthly report, with the parent’s consent.</p></div></div>`],
  ['The member calculator · what the member pays, and what Afya Basics earns',`
   <p class="p33lead">Choose a card, a package and a plan. The calculator shows both sides of the same membership: what the member pays and saves, and what the company keeps after product cost, packing, delivery and points, over the average life of a membership. ${PE}</p>
   <div class="p34calc">
    <div class="p34in">
     <div><span class="lb">1 · Card</span><div class="p34cs" id="p34cs">${I.cards.map((c,i)=>`<button type="button" data-k="${c.key}" class="${c.key==='family'?'on':''}"><i style="background:${({green:'#1f5a3e',family:'#1d6b52',care:'#1b3f63',senior:'#8a6d3b',royal:'#161616',kazini:'#24302b'})[c.key]}"></i><b>${esc(c.name.replace('Afya ',''))}</b><small>${c.fee_year?tz(c.fee_year).replace('TSh ','')+'/yr':(c.key==='kazini'?'business':'free')}</small></button>`).join('')}</div></div>
     <div><label for="p34pk">2 · Package</label><select id="p34pk">${G.map(g=>`<optgroup label="${esc(g.en)}">${g.items.map(x=>`<option value="${x.k}">${esc(x.n)}</option>`).join('')}</optgroup>`).join('')}</select><p class="hint" id="p34pkh"></p></div>
     <div><span class="lb">3 · Plan</span><div class="p34seg" id="p34pl"><button type="button" data-n="1">1 month</button><button type="button" data-n="6">6 months</button><button type="button" data-n="12" class="on">12 months</button></div></div>
     <div><label for="p34ch">4 · Members who leave each month</label><input type="range" id="p34ch" min="1" max="10" step="0.5" value="${mb.monthly_churn*100}"><p class="hint" id="p34chh"></p></div></div>
    <div class="p34out">
     <div class="p34two">
      <div class="p34st"><h5>The member</h5><table id="p34m"></table></div>
      <div class="p34st"><h5>Afya Basics · per month</h5><table id="p34a"></table></div></div>
     <div class="p34st"><h5>Where each shilling of the box goes</h5><div class="p34bar" id="p34bar"></div><div class="p34bl" id="p34bl"></div></div>
     <div class="p34st"><h5>Over the whole membership</h5><table id="p34l"></table></div>
     <div class="p34say" id="p34say"></div></div></div>
   <p class="p33src">Box price per plan from the section 3.5 box engine (packing and delivery inside). Gross profit = (box − packing &amp; delivery) ÷ ${(1/((window.MODEL&&MODEL.NETF)||1)).toFixed(3)} to remove VAT × ${F.pct(mb.box_products_gm)} product margin after member and plan discounts − points; packing &amp; delivery are charged at cost, so they add no margin. Same formula as the master model. Afya Huduma care-pack figures from the services model. Average membership = 1 ÷ monthly churn.</p>`,'p34calc'],
  ['How the company benefits',`
   <p class="p33lead">A one-off shopper is worth one basket; a member is worth every month they stay. The figures below show what membership adds to the business in the Flagship base case of the master model.</p>
   <div class="p34kpi">
    <div><b>${F.m(m12.boxes)}</b><span>a month in box sales by month 12</span><p>${F.pct(share)} of all revenue, renewing without a new advert or visit. Year-1 box sales: ${F.m(yBox)}.</p></div>
    <div><b>${F.m(up12)}</b><span>paid before stock is bought</span><p>If 4 in 10 month-12 members choose the 12-month plan at the average box. This cash pays suppliers and reduces borrowing. ${tagi('Illustrative')}</p></div>
    <div><b>${tz(base.ltv)}</b><span>gross profit per member</span><p>Over an average ${Math.round(1/mb.monthly_churn)}-month membership at the average ${tz(mb.avg_box)} box, before any services or card fee.</p></div>
    <div><b>${F.m(hud*m12.members+m12.kazini)}</b><span>a month from two extra streams</span><p>About ${F.m(hud*m12.members)} of Afya Huduma gross profit plus ${F.m(m12.kazini)} of Afya Kazini sales from ${NUM(m12.kazini_accounts)} business accounts.</p></div></div>
   <h5 class="p34sub">One member, one month · where the money goes</h5>
   <div class="p34wf" id="p34wf"></div>
   <p class="p33src">The model’s average box of ${tz(mb.avg_box)} on the monthly plan, with an Afya Family card and the average Afya Huduma care pack. Same formula as the calculator above.</p>
   <h5 class="p34sub">Why a member costs less to serve than a walk-in shopper</h5>
   <div class="p34why">
    <figure><img src="img/c-dash.webp" alt="Concept image: the stock dashboard" loading="lazy"><figcaption><b>Buying to known demand</b><p>Every box locks twelve days before month end, so the store orders what it will sell: fewer stock-outs, less expired stock, larger and cheaper factory orders.</p></figcaption></figure>
    <figure><img src="img/c-scan.webp" alt="Concept image: an item scanned into a box" loading="lazy"><figcaption><b>Packed and delivered in batches</b><p>Boxes are packed on fixed days and delivered by area. The ${tz(mb.packing_delivery_in_price)} for packing and delivery is inside every box price, so the customer pays for it.</p></figcaption></figure>
    <figure><img src="img/cj-member.webp" alt="Concept image: a customer joining at the counter" loading="lazy"><figcaption><b>Won without paid advertising</b><p>Members come mostly through the free Afya Check and the free Green card, and the system offers the next package as life changes.</p></figcaption></figure></div>
   <h5 class="p34sub">Members over the first year</h5>
   <div class="p3-chart" id="p3mchart"></div>
   <p class="p33src">Members over the first 12 months in the three scenarios of the master model · planning estimates</p>`],
  ['Risks and our answers',`
   <div class="p33wrap"><table class="p33tbl p34risk"><thead><tr><th>Risk</th><th>Why it matters</th><th>Our answer</th><th>What we watch</th></tr></thead><tbody>
    <tr><td><b>Members leave faster than planned</b></td><td>At 12% a month instead of ${F.pct(mb.monthly_churn)}, the value of a member falls by about a third. Try it in the calculator.</td><td>6 and 12-month plans paid ahead, Afya Choice swaps, a reminder twelve days before month end, the monthly check for Care members.</td><td>Monthly churn, target ${F.pct(mb.monthly_churn)} or lower</td></tr>
    <tr><td><b>Card fees put people off</b></td><td>A fee at the door would slow sign-ups.</td><td>Afya Green is free, so nobody pays to start. Paid cards are offered only when their perks are worth more than the fee.</td><td>Share of members who upgrade to a paid card</td></tr>
    <tr><td><b>Discounts and points squeeze margin</b></td><td>Plan savings and points are given back on every box.</td><td>Both are already inside every number on this page. Plans bring cash upfront and longer memberships; points cost about 1% of the box.</td><td>Gross profit per box, about ${F.pct(base.gpMonth/mb.avg_box)} of the price</td></tr>
    <tr><td><b>Afya Royal sells in small numbers</b></td><td>A premium line may stay small.</td><td>It is a premium and gift line; the member numbers in the model do not depend on it.</td><td>Royal sales, reported separately</td></tr>
   </tbody></table></div>`]],
  takeaway:'Membership turns one-off shoppers into <b>planned, monthly households and businesses</b>. Each member is worth about <b>'+tz(base.ltv)+'</b> in gross profit over their membership, pays for packing and delivery inside the price, and on longer plans pays before the stock is bought. Recurring revenue is the foundation of the investment case.',
  doors:['s3-5','s6-1','s6-2','s5-1'],
  sources:[SRC('who_tz')]})},
 init(){
  document.querySelectorAll('.p34c').forEach(c=>{const b=c.querySelector('.p34flip');b.onclick=()=>{c.classList.toggle('fl');b.textContent=c.classList.contains('fl')?'See the photo':'See the back'}});
  const g=id=>$(id);if(!g('p34pk'))return;
  const mb=I.members,SV=M.services(),KZ=M.kazini(),X=window.AFYABOX,all=AFYA_PKG.groups().flatMap(x=>x.items);
  let card='family',pk='home',n=12;
  const price=(k,n)=>{const it=all.find(x=>x.k===k);if(!it)return 0;const AM=window.AFYAMB;if(AM){try{const pk=it.kz?'kz':k,P=AM.D.PKG[pk],sk=it.kz?String(k).split(':')[1]:P.stages[0].k;return AM.stage(pk,sk,'E',n).month.box}catch(e){}}return Math.round(it.price*({1:mb.plans.m1,6:mb.plans.m6,12:mb.plans.m12}[n])/500)*500};
  const setPk=k=>{pk=k;g('p34pk').value=k;const it=all.find(x=>x.k===k);if(it&&it.card!==card&&!(card==='royal')){card=it.card;paintCards()}};
  const paintCards=()=>document.querySelectorAll('#p34cs button').forEach(b=>b.classList.toggle('on',b.dataset.k===card));
  const up=()=>{const it=all.find(x=>x.k===pk),c=I.cards.find(x=>x.key===card),ch=+g('p34ch').value/100,life=1/ch;
   const bx=price(pk,n),bx1=price(pk,1),NFv=(window.MODEL&&MODEL.NETF)||1,pd=(()=>{try{const AM=window.AFYAMB,p2=it.kz?'kz':pk,P=AM.D.PKG[p2],sk=it.kz?String(pk).split(':')[1]:P.stages[0].k;return AM.stage(p2,sk,'E',n).month.pd}catch(e){return mb.packing_delivery_in_price}})(),gm=mb.box_products_gm;
   const prodRev=Math.max(0,bx-pd)*NFv,cost=prodRev*(1-gm)+Math.max(0,bx-pd)*(1-NFv),pack=pd,pts=bx/PTS.per*PTS.value,gp=prodRev*gm-pts;
   const sv=SV.rows.find(r=>r.k===pk),hFee=sv?sv.fee:0,hGp=sv?sv.margin+sv.comm:0,feeM=c.fee_year/12;
   const year=12*bx+c.fee_year+12*hFee,save=12*(bx1-bx),points=Math.floor(12*bx/PTS.per);
   let stl='';if(!it.kz&&X){try{const bq=X.BK(pk),dq=X.dopt(bq);if(dq.stage&&bq.stages){const sq=bq.stages.find(z=>z[0]===dq.stage);if(sq)stl=String(sq[1]).replace(/<[^>]+>/g,'')}}catch(e){}}
   g('p34pkh').textContent=it.t[0]+' · '+AFYA_PKG.cardName[it.card]+' package · priced as the standard box'+(stl?' ('+stl+')':'')+'; the smallest version starts at '+tz(it.from)+' a month on the 1-month plan. Build the exact box in section 3.5.';
   g('p34chh').textContent=`${(ch*100).toFixed(1)}% a month means an average membership of about ${life.toFixed(0)} months.`;
   const row=(l,v,cl)=>`<tr${cl?` class="${cl}"`:''}><td>${l}</td><td class="v">${v}</td></tr>`;
   g('p34m').innerHTML=row(`${esc(it.n)} · ${n}-month plan`,tz(bx)+' / mo')+(hFee?row(`Afya Huduma care pack (${esc(sv.service.toLowerCase())})`,tz(hFee)+' / mo'):'')+row(`${esc(c.name)} card`,c.fee_year?tz(c.fee_year)+' / yr':'free')
    +row('Pays in a year',tz(year),'t')+row(n>1?`Saved vs the monthly plan`:'Save on a 6 or 12-month plan',n>1?tz(save):'—','m')+row('Points earned in a year',`${points.toLocaleString('en-US')} (worth ${tz(points*PTS.value)})`,'m')+(n>1?row(`Paid upfront for ${n} months`,tz(bx*n),'m'):'');
   g('p34a').innerHTML=row('Box revenue',tz(bx))+row('− Product cost and VAT',tz(cost))+row('− Packing &amp; delivery cost',tz(pack))+row('− Points given back',tz(pts))+row('= Gross profit on the box',tz(gp),'t')
    +(hGp?row('+ Afya Huduma margin and commission',tz(hGp)):'')+(feeM?row('+ Card fee (per month)',tz(feeM)):'')+row('Total gross profit per member',tz(gp+hGp+feeM),'t');
   const T=cost+pack+pts+Math.max(0,gp),parts=[[cost,'#4f5d56','Product cost & VAT'],[pack,'#7d8079','Packing & delivery'],[pts,'#a58d64','Points'],[Math.max(0,gp),'#e3c98f','Afya gross profit']];
   g('p34bar').innerHTML=parts.map(x=>`<span style="width:${(x[0]/T*100).toFixed(2)}%;background:${x[1]}" title="${tz(x[0])}"></span>`).join('');
   g('p34bl').innerHTML=parts.map(x=>`<span><i style="background:${x[1]}"></i>${x[2]} ${tz(x[0])} (${Math.round(x[0]/T*100)}%)</span>`).join('');
   const mGp=gp+hGp+feeM;
   g('p34l').innerHTML=row('Average membership',`${life.toFixed(0)} months`)+row('Member pays in total',tz((bx+hFee)*life+c.fee_year*life/12))+row('Afya Basics gross profit over the membership',tz(mGp*life),'t')+row('Gross profit per year of membership',tz(mGp*12),'m');
   g('p34say').innerHTML=`<b>Summary:</b> a member on ${esc(it.n)} with the ${esc(c.name)} card pays <b>${tz(bx)}</b> a month on the ${n}-month plan${n>1?`, ${tz(save)} a year less than paying monthly, and pays ${tz(bx*n)} upfront`:''}. From each box Afya Basics pays about ${tz(cost)} for the products and VAT and ${tz(pack)} for the box and delivery, at cost, gives ${tz(pts)} back in points, and keeps <b>${tz(gp)}</b>${hGp||feeM?`, plus ${tz(hGp+feeM)} from services and the card fee`:''}. Over an average membership of ${life.toFixed(0)} months, that member is worth about <b>${tz(mGp*life)}</b> of gross profit to the company.`};
  document.querySelectorAll('#p34cs button').forEach(b=>b.onclick=()=>{card=b.dataset.k;paintCards();const first=all.find(x=>x.card===card);if(first&&card!=='royal')setPk(first.k);up()});
  g('p34pk').onchange=e=>{setPk(e.target.value);up()};
  document.querySelectorAll('#p34pl button').forEach(b=>b.onclick=()=>{n=+b.dataset.n;document.querySelectorAll('#p34pl button').forEach(x=>x.classList.toggle('on',x===b));up()});
  g('p34ch').oninput=up;g('p34pk').value=pk;up();
  const W=900,H=300,pl=50,pr=20,pt=20,pb=40,data=M.scenarios.map(k=>({k,l:I.scenarios[k].label,v:M.get(k).months.map(m=>m.members)}));
  const mx=Math.ceil(Math.max(...data.flatMap(d=>d.v))/100)*100,Xs=i=>pl+i*(W-pl-pr)/11,Y=v=>H-pb-v/mx*(H-pt-pb),col={base:'#e3c98f',best:'#9fb3a8',down:'#8f7f72'};
  let svg=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Members over the first 12 months by scenario">`;
  for(let v=0;v<=mx;v+=mx/4){svg+=`<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="rgba(236,228,210,.08)"/><text x="${pl-8}" y="${Y(v)+4}" text-anchor="end" font-size="12" fill="#6a8a7d">${v}</text>`}
  for(let i=0;i<12;i++)svg+=`<text x="${Xs(i)}" y="${H-14}" text-anchor="middle" font-size="12" fill="#6a8a7d">M${i+1}</text>`;
  data.forEach(d=>{svg+=`<path d="${d.v.map((v,i)=>(i?'L':'M')+Xs(i).toFixed(1)+' '+Y(v).toFixed(1)).join(' ')}" fill="none" stroke="${col[d.k]}" stroke-width="${d.k==='base'?3:2}" ${d.k==='base'?'':'stroke-dasharray="6 6"'}/><circle cx="${Xs(11)}" cy="${Y(d.v[11])}" r="5" fill="${col[d.k]}"/><text x="${Xs(11)-12}" y="${Y(d.v[11])+(d.k==='best'?-12:20)}" text-anchor="end" font-size="13" fill="${col[d.k]}">${d.l} · ${Math.round(d.v[11])}</text>`});
  $('p3mchart').innerHTML=svg+'</svg>';
  {const mb2=I.members,bx=mb2.avg_box,pd=mb2.packing_delivery_in_price,gm=mb2.box_products_gm,NF2=(window.MODEL&&MODEL.NETF)||1,prod=(bx-pd)*NF2,cost=prod*(1-gm)+(bx-pd)*(1-NF2),pack=pd,pts=bx/PTS.per*PTS.value,gp=prod*gm-pts,SVx=M.services(),hd=SVx.avg_margin+SVx.avg_comm,cf=I.cards.find(c=>c.key==='family').fee_year/12,tot=gp+hd+cf;
   const st=[['The member pays for the box',bx,0,'in'],['Products at cost, and VAT',-cost,bx,'c'],['Packing and delivery',-pack,bx-cost,'c'],['Points given back',-pts,bx-cost-pack,'c'],['Gross profit on the box',gp,0,'g'],['Afya Huduma margin and commission',hd,gp,'a'],['Afya Family card fee, per month',cf,gp+hd,'a'],['Afya Basics earns per member a month',tot,0,'t']];
   const W=1000,L=300,R=150,rh=40,H=st.length*rh+20,X=v=>L+v/bx*(W-L-R);
   let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Waterfall of one member's monthly box">`;
   st.forEach((r,i)=>{const y=10+i*rh,v=r[1],x0=X(Math.min(r[2],r[2]+v)),w=Math.max(2,Math.abs(X(v)-X(0)));const col={in:'#6d756f',c:'#3e4641',g:'#d8b46a',a:'#b39256',t:'#e9d3a0'}[r[3]];
    g+=`<text x="${L-14}" y="${y+rh/2+4}" text-anchor="end" font-size="14" fill="${r[3]==='t'||r[3]==='g'?'#f4efe4':'rgba(244,240,230,.7)'}" ${r[3]==='t'?'font-weight="600"':''}>${r[0]}</text><rect x="${x0}" y="${y+8}" width="${w}" height="${rh-16}" rx="2" fill="${col}"/><text x="${x0+w+10}" y="${y+rh/2+4}" font-size="13.5" font-family="var(--f-hud,monospace)" fill="${r[3]==='c'?'rgba(244,240,230,.6)':'#f4efe4'}">${v<0?'− ':(r[3]==='a'?'+ ':'')}${tz(Math.abs(v))}</text>`;
    if(r[3]==='g'||r[3]==='t')g+=`<line x1="${L-4}" x2="${W-10}" y1="${y+1}" y2="${y+1}" stroke="rgba(236,228,210,.18)"/>`});
   $('p34wf').innerHTML=g+'</svg>'}
 }};
})();
