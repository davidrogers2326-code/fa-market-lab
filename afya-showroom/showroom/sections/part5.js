/* part5: Growth — 5.1 Winning customers · 5.2 Partnerships and B2B · 5.3 Competition and our moat · 5.4 The road to TSh billions
   All business numbers are read from MODEL (planning estimates). Facts are cited inline. */
(function(){
/* ============================== CSS ============================== */
const CSS=`
.p5 .s11lead b{color:var(--ink)}
.p5-sub{font:800 clamp(1.15rem,2vw,1.5rem)/1.2 var(--f-display);letter-spacing:-.01em;margin:34px 0 12px}
.p5-sub:first-child{margin-top:0}
.p5-sub em{font-style:normal;color:var(--neon)}
.p5-p{color:var(--ink2);font-size:.95rem;line-height:1.65;max-width:74ch;margin:0 0 14px}
.p5-p b{color:var(--ink)}
.p5-ex{margin:14px 0 0;padding:14px 18px;border-left:2px solid var(--gold);border-radius:0 14px 14px 0;background:rgba(242,201,107,.06);color:var(--ink2);font-size:.9rem;line-height:1.6}
.p5-ex b{color:var(--gold2)}
.p5-grid2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p5-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p5-card{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));min-width:0}
.p5-card h4{margin:0;font:700 1.02rem/1.25 var(--f-display);color:var(--ink)}
.p5-card p{margin:8px 0 0;color:var(--ink2);font-size:.88rem;line-height:1.55}
.p5-card .k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin-bottom:8px}
.p5-card dl{margin:12px 0 0;display:grid;gap:8px}
.p5-card dt{font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--gold)}
.p5-card dd{margin:2px 0 0;color:var(--ink2);font-size:.86rem;line-height:1.5}
.p5-badge{display:inline-flex;align-items:center;gap:7px;margin-top:12px;padding:5px 10px;border-radius:999px;border:1px dashed rgba(255,179,163,.5);font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:#ffb3a3}
.p5-badge i{width:6px;height:6px;border-radius:50%;border:1px solid #ffb3a3}
.p5-btns{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px}
.p5-btns button{padding:9px 14px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer;transition:all .2s}
.p5-btns button:hover{border-color:var(--edge2);color:var(--ink)}
.p5-btns button.on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;border-color:transparent}
.p5-sel{display:inline-flex;align-items:center;gap:10px;font-size:.88rem;color:var(--ink2);margin:0 0 16px;flex-wrap:wrap}
.p5-sel select{padding:9px 12px;border-radius:12px;border:1px solid var(--edge2);background:#04140f;color:var(--ink);font:600 .85rem var(--f-body)}
.p5-svg{display:block;width:100%;height:auto}
.p5-svg text{font-family:var(--f-body)}
.p5-legend{display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font:500 .66rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p5-legend i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:6px;vertical-align:-1px}
.p5-tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:.86rem}
.p5-tblw{overflow-x:auto;border-radius:18px;border:1px solid var(--edge);background:var(--panel)}
.p5-tbl th,.p5-tbl td{padding:11px 14px;text-align:left;border-bottom:1px solid rgba(95,191,143,.08);white-space:nowrap}
.p5-tbl th{font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p5-tbl td{color:var(--ink2)}
.p5-tbl td.n{font-family:var(--f-hud);text-align:right;color:var(--ink)}
.p5-tbl th.n{text-align:right}
.p5-tbl tr:last-child td{border-bottom:0}
.p5-tbl td.neg{color:#ffb3a3}
/* ---- flywheel ---- */
.p5-fly{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:26px;align-items:center}
.p5-flyw{position:relative;max-width:470px;width:100%;margin:0 auto}
.p5-fly svg .arc{fill:none;stroke:url(#p5flyg);stroke-width:3;stroke-linecap:round}
.p5-fly svg .flow{fill:none;stroke:#b5dfc6;stroke-width:3;stroke-linecap:round;stroke-dasharray:4 22;animation:p5dash 2.4s linear infinite;opacity:.7}
@keyframes p5dash{to{stroke-dashoffset:-104}}
.p5-fly svg .nd{cursor:pointer}
.p5-fly svg .nd circle.o{fill:#04140f;stroke:rgba(242,201,107,.45);stroke-width:1.5;transition:all .25s}
.p5-fly svg .nd text{fill:#effaf5;font:700 11px var(--f-display);text-anchor:middle;pointer-events:none}
.p5-fly svg .nd text.no{fill:#f2c96b;font:500 9px var(--f-hud);letter-spacing:.15em}
.p5-fly svg .nd.on circle.o{fill:#0f7a52;stroke:#ffe7a8;stroke-width:2.5;filter:drop-shadow(0 0 12px rgba(95,191,143,.7))}
.p5-fly svg .nd:focus{outline:none}.p5-fly svg .nd:focus-visible circle.o{stroke:#b5dfc6;stroke-width:3}
.p5-flyd{padding:26px;border-radius:22px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6));min-height:330px}
.p5-flyd .k{font:500 .62rem var(--f-hud);letter-spacing:.2em;color:var(--gold);text-transform:uppercase}
.p5-flyd h3{margin:8px 0 0;font:800 1.5rem/1.15 var(--f-display);letter-spacing:-.02em}
.p5-flyd p{margin:10px 0 0;color:var(--ink2);font-size:.92rem;line-height:1.6}
.p5-flyd .m{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-top:16px}
.p5-flyd .m div{padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5)}
.p5-flyd .m small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p5-flyd .m b{display:block;margin-top:4px;font:500 1.05rem var(--f-hud);color:var(--neon2)}
.p5-flyd.swap{animation:rise .45s cubic-bezier(.2,.8,.2,1)}
/* ---- channels ---- */
.p5-ch{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p5-chc{position:relative;padding:20px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0;overflow:hidden}
.p5-chc::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--c),transparent)}
.p5-chc .top{display:flex;justify-content:space-between;align-items:center;gap:8px}
.p5-chc .top b{font:700 1rem var(--f-display);color:var(--ink)}
.p5-chc .top span{font:500 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--c);border:1px solid color-mix(in srgb,var(--c) 45%,transparent);padding:3px 8px;border-radius:999px;white-space:nowrap}
.p5-chc p{margin:10px 0 0;color:var(--ink2);font-size:.86rem;line-height:1.55}
.p5-chc q{display:block;margin-top:10px;padding:10px 12px;border-radius:12px;background:rgba(2,10,8,.55);font-size:.82rem;color:var(--ink);quotes:none;font-style:italic}
.p5-chc .kpi{margin-top:10px;font:500 .62rem var(--f-hud);letter-spacing:.1em;color:var(--gold2)}
.p5-bud{margin-top:22px;padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.08),rgba(2,6,8,.6))}
.p5-budbar{display:flex;height:34px;border-radius:10px;overflow:hidden;margin:14px 0 12px;border:1px solid var(--edge)}
.p5-budbar span{display:grid;place-items:center;font:500 .62rem var(--f-hud);color:#04140f;min-width:0;overflow:hidden;white-space:nowrap}
.p5-budl{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px 18px;font-size:.84rem;color:var(--ink2)}
.p5-budl i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:8px}
.p5-budl b{font-family:var(--f-hud);font-weight:500;color:var(--ink)}
/* ---- mockups ---- */
.p5-mock{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr) minmax(0,.9fr);gap:16px;align-items:stretch}
.p5-mk{border-radius:22px;border:1px solid var(--edge);background:var(--panel);padding:20px;display:flex;flex-direction:column;gap:12px;min-width:0}
.p5-mk figcaption{font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin-top:auto}
.p5-phone{width:100%;max-width:240px;margin:0 auto;border-radius:30px;padding:9px;background:linear-gradient(160deg,#2a332f,#0b0f0d);box-shadow:0 30px 50px -14px rgba(0,0,0,.7),inset 0 0 0 1px rgba(255,255,255,.08)}
.p5-phs{border-radius:22px;overflow:hidden;background:#ece5dc;min-height:380px;display:flex;flex-direction:column}
.p5-phh{display:flex;align-items:center;gap:8px;padding:12px 12px 10px;background:#0f7a52;color:#fff}
.p5-phh i{width:26px;height:26px;border-radius:50%;background:#fff;display:grid;place-items:center}
.p5-phh i svg{width:16px;height:16px}
.p5-phh b{display:block;font:700 .74rem var(--f-display)}
.p5-phh small{display:block;font-size:.56rem;opacity:.8}
.p5-msgs{padding:10px;display:flex;flex-direction:column;gap:7px;flex:1}
.p5-msg{max-width:88%;padding:8px 10px;border-radius:10px;background:#fff;color:#14261e;font-size:.64rem;line-height:1.45;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.p5-msg b{color:#0f7a52}
.p5-msg.me{align-self:flex-end;background:#d9f5e6}
.p5-msg .t{display:block;text-align:right;font-size:.5rem;color:#6a7a72;margin-top:3px}
.p5-msg .bt{display:block;margin-top:6px;padding:6px;border-radius:7px;text-align:center;background:#e9f6ef;color:#0f7a52;font-weight:700}
.p5-poster{flex:1;border-radius:16px;overflow:hidden;position:relative;min-height:300px;background:#020608 url(img/exterior.webp) 50% 50%/cover no-repeat;display:flex;align-items:flex-end}
.p5-poster::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,6,8,.92),rgba(2,6,8,.15) 65%)}
.p5-poster div{position:relative;z-index:1;margin:18px;padding:16px 18px;border-radius:14px;background:#fff;color:#0b2219;max-width:300px}
.p5-poster small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;color:#0f7a52;text-transform:uppercase}
.p5-poster b{display:block;margin-top:6px;font:800 1.15rem/1.15 var(--f-display);color:#0b2219}
.p5-poster span{display:block;margin-top:6px;font-size:.74rem;color:#3f554b}
.p5-poster em{display:inline-block;margin-top:10px;padding:5px 10px;border-radius:8px;background:#0f7a52;color:#fff;font-style:normal;font-size:.7rem;font-weight:700}
.p5-sms{display:grid;gap:10px}
.p5-smsc{padding:14px 16px;border-radius:16px;background:#f4f8f6;color:#14261e;font-size:.78rem;line-height:1.5}
.p5-smsc small{display:flex;justify-content:space-between;font:500 .56rem var(--f-hud);letter-spacing:.1em;color:#5b6f66;text-transform:uppercase;margin-bottom:6px}
.p5-smsc b{color:#0f7a52}
/* ---- calendar ---- */
.p5-cal{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p5-mo{position:relative;padding:18px 18px 16px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0;display:flex;flex-direction:column;gap:8px}
.p5-mo.l{border-color:var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.14),rgba(2,6,8,.6))}
.p5-mo .h{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
.p5-mo .h b{font:800 1.05rem var(--f-display)}
.p5-mo .h span{font:500 .58rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.p5-mo .ph{font:500 .58rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--neon)}
.p5-mo .d{display:flex;flex-wrap:wrap;gap:5px}
.p5-mo .d span{font:500 .6rem var(--f-hud);padding:3px 8px;border-radius:999px;border:1px solid rgba(255,179,163,.4);color:#ffcdbf}
.p5-mo .d span.s{border-color:rgba(217,181,110,.4);color:#b6f1ff}
.p5-mo p{margin:0;font-size:.82rem;line-height:1.5;color:var(--ink2)}
.p5-mo p b{color:var(--ink)}
.p5-mo .t{margin-top:auto;padding-top:10px;border-top:1px solid rgba(95,191,143,.1);display:flex;justify-content:space-between;font:500 .62rem var(--f-hud);color:var(--ink3)}
.p5-mo .t b{color:var(--gold2);font-weight:500}
.p5-cal.swap .p5-mo{animation:rise .45s cubic-bezier(.2,.8,.2,1) both}
/* ---- retention ladder ---- */
.p5-lad{display:grid;gap:10px;counter-reset:ld}
.p5-lad div{display:grid;grid-template-columns:40px minmax(0,220px) minmax(0,1fr);gap:14px;align-items:start;padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);counter-increment:ld}
.p5-lad div::before{content:counter(ld,decimal-leading-zero);font:500 .9rem var(--f-hud);color:var(--gold)}
.p5-lad b{font:700 .95rem var(--f-display);color:var(--neon2)}
.p5-lad p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.55}
/* ---- funnel calc ---- */
.p5-fun{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:16px}
.p5-fun .cin label{grid-template-columns:minmax(0,1fr) 120px}
.p5-funv{padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6));display:flex;flex-direction:column;gap:16px}
.p5-funo{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.p5-funo div{padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.5);min-width:0}
.p5-funo small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}
.p5-funo b{display:block;margin-top:4px;font:500 clamp(1.05rem,1.8vw,1.4rem) var(--f-hud);color:var(--gold2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p5-funo div.big{grid-column:1/-1;border-color:var(--edge2)}
.p5-funo div.big b{font-size:clamp(1.4rem,2.6vw,2rem)}
.p5-reset{align-self:flex-start;margin-top:14px;padding:8px 14px;border-radius:10px;border:1px solid var(--edge2);background:rgba(242,201,107,.06);color:var(--gold2);font:600 .8rem var(--f-body);cursor:pointer}
/* ---- partners ---- */
.p5-pt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p5-pt .p5-card{display:flex;flex-direction:column}
.p5-pt .p5-card h4{display:flex;align-items:center;gap:10px}
.p5-pt .p5-card h4 svg{width:22px;height:22px;color:var(--gold);flex:none}
.p5-pt .p5-card .rev{margin-top:12px;padding:10px 12px;border-radius:12px;background:rgba(95,191,143,.07);border:1px solid rgba(95,191,143,.2);font-size:.84rem;color:var(--ink)}
.p5-pt .p5-card .rev small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--neon);margin-bottom:3px}
.p5-pipe{position:relative;padding:26px 22px 22px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p5-pipes{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;position:relative}
.p5-pipes::before{content:"";position:absolute;left:10%;right:10%;top:17px;height:2px;background:linear-gradient(90deg,var(--gold),rgba(242,201,107,.15))}
.p5-ps{position:relative;text-align:center;padding:0 8px;min-width:0}
.p5-ps i{display:grid;place-items:center;width:36px;height:36px;margin:0 auto;border-radius:50%;background:#04140f;border:1.5px solid rgba(242,201,107,.35);font:500 .7rem var(--f-hud);color:var(--ink3);font-style:normal;position:relative;z-index:1}
.p5-ps.on i{background:var(--gold);color:#1a1204;border-color:var(--gold2);box-shadow:0 0 16px rgba(242,201,107,.6)}
.p5-ps b{display:block;margin-top:10px;font:700 .9rem var(--f-display)}
.p5-ps p{margin:6px 0 0;font-size:.78rem;line-height:1.45;color:var(--ink2)}
.p5-ps .who{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;margin-top:10px}
.p5-ps .who span{font:500 .56rem var(--f-hud);padding:3px 7px;border-radius:999px;background:rgba(242,201,107,.12);color:var(--gold2)}
.p5-mx{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(0,1fr);gap:16px}
.p5-mxt{border-radius:20px;border:1px solid var(--edge);background:var(--panel);overflow:hidden}
.p5-mxr{display:grid;grid-template-columns:minmax(0,1.5fr) repeat(5,minmax(0,1fr));align-items:center;border-bottom:1px solid rgba(95,191,143,.08);cursor:pointer;transition:background .2s}
.p5-mxr:last-child{border-bottom:0}
.p5-mxr.hd{cursor:default;background:rgba(2,10,8,.5)}
.p5-mxr>*{padding:12px 10px;min-width:0}
.p5-mxr.hd span{font:500 .55rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--gold);text-align:center}
.p5-mxr.hd span:first-child{text-align:left}
.p5-mxr b{font:700 .86rem var(--f-display);color:var(--ink);padding-left:16px}
.p5-mxr:not(.hd):hover{background:rgba(95,191,143,.05)}
.p5-mxr.on{background:rgba(242,201,107,.09)}
.p5-mxr.on b{color:var(--gold2)}
.p5-dot{display:grid;place-items:center}
.p5-dot i{display:grid;place-items:center;width:100%;max-width:46px;height:32px;border-radius:8px;font:500 .82rem var(--f-hud);font-style:normal;border:1px solid rgba(95,191,143,.18)}
.p5-ptc{padding:0;overflow:hidden;display:flex;flex-direction:column}
.p5-ptc>.p5-ph{border-radius:0;border:0;box-shadow:none}
.p5-ptc>.p5-ph img{aspect-ratio:16/9}
.p5-ptc>.b{padding:20px 22px 22px;display:flex;flex-direction:column;flex:1}
.p5-mxd{padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p5-mxd h4{margin:0;font:800 1.2rem var(--f-display)}
.p5-mxd ol{margin:12px 0 0;padding:0;list-style:none;display:grid;gap:8px;counter-reset:rk}
.p5-mxd li{display:grid;grid-template-columns:28px minmax(0,1fr) auto;gap:10px;align-items:center;padding:9px 12px;border-radius:12px;background:rgba(2,10,8,.5);border:1px solid var(--edge);font-size:.86rem;color:var(--ink2);counter-increment:rk}
.p5-mxd li::before{content:counter(rk);font:500 .8rem var(--f-hud);color:var(--gold)}
.p5-mxd li b{font:500 .78rem var(--f-hud);color:var(--neon2)}
.p5-mxd li.on{border-color:var(--edge2);color:var(--ink)}
.p5-slip{background:#fbfaf6;color:#13261d;border-radius:14px;padding:18px 20px;box-shadow:0 20px 40px -18px rgba(0,0,0,.7);font-size:.78rem;line-height:1.5;position:relative}
.p5-slip::before{content:"";position:absolute;left:0;right:0;top:0;height:6px;border-radius:14px 14px 0 0;background:linear-gradient(90deg,#0f7a52,#0f7a52 70%,#f2c96b 70%)}
.p5-slip h5{margin:6px 0 2px;font:800 .95rem var(--f-display);color:#0f7a52}
.p5-slip small{font:500 .54rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:#6b7d74}
.p5-slip .ln{display:flex;justify-content:space-between;gap:10px;border-bottom:1px dashed #cfd9d3;padding:6px 0}
.p5-slip .ln span:first-child{color:#5b6f66}
.p5-slip .ln b{font-weight:700}
.p5-slip .ft{margin-top:10px;font-size:.66rem;color:#5b6f66}
.p5-dash{background:#f4f8f6;color:#13261d;border-radius:14px;padding:16px;box-shadow:0 20px 40px -18px rgba(0,0,0,.7);font-size:.76rem}
.p5-dash .hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.p5-dash .hd b{font:800 .9rem var(--f-display);color:#0f7a52}
.p5-dash .hd span{font:500 .56rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:#6b7d74}
.p5-dash .tiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.p5-dash .tiles div{padding:10px;border-radius:10px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06)}
.p5-dash .tiles small{display:block;font-size:.56rem;color:#6b7d74;text-transform:uppercase;letter-spacing:.06em}
.p5-dash .tiles b{display:block;font:800 1rem var(--f-display);color:#0b2219;margin-top:2px}
.p5-dash .rows{margin-top:10px;display:grid;gap:6px}
.p5-dash .rows div{display:flex;justify-content:space-between;padding:7px 10px;border-radius:8px;background:#fff}
.p5-dash .rows b{color:#0f7a52}
.p5-b2b{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:16px}
.p5-stack{display:flex;height:40px;border-radius:12px;overflow:hidden;border:1px solid var(--edge);margin:8px 0 12px}
.p5-stack span{min-width:0;transition:flex-grow .4s}
/* ---- competition ---- */
.p5-ct{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.p5-ct .p5-card{padding:18px}
.p5-ct .p5-card h4{font-size:.95rem}
.p5-ct .p5-card .g,.p5-ct .p5-card .w{display:block;margin-top:10px;font-size:.8rem;line-height:1.5;color:var(--ink2)}
.p5-ct .p5-card .g::before{content:"Strong at · ";font:500 .56rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--neon)}
.p5-ct .p5-card .w::before{content:"Falls short · ";font:500 .56rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:#ffb3a3}
.p5-cm th button{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:5px}
.p5-cm th button:hover,.p5-cm th button:focus-visible{color:var(--gold2)}
.p5-cm th.on{color:var(--neon2)}
.p5-cm th.on button::after{content:"▼";font-size:.5rem}
.p5-cm td.c{text-align:center}
.p5-cm td.on{background:rgba(95,191,143,.06)}
.p5-cm tr.afya td{background:rgba(242,201,107,.07);color:var(--ink)}
.p5-cm tr.afya td:first-child{color:var(--gold2);font-weight:700}
.p5-cm tr.sel td{background:rgba(217,181,110,.06)}
.p5-hc{display:inline-grid;place-items:center;width:40px;height:30px;border-radius:8px;font:500 .8rem var(--f-hud);background:rgba(95,191,143,var(--a));border:1px solid rgba(95,191,143,.16);color:var(--ink)}
.p5-hc.a{background:rgba(242,201,107,var(--a));border-color:rgba(242,201,107,.3);color:#1a1204}
.p5-pips{display:inline-flex;gap:3px}
.p5-pips i{width:8px;height:8px;border-radius:50%;background:rgba(169,196,184,.18)}
.p5-pips i.f{background:var(--neon)}
tr.afya .p5-pips i.f{background:var(--gold)}
.p5-h2h{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;margin-top:16px}
.p5-h2hb{padding:22px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.08),rgba(2,6,8,.6))}
.p5-hb{display:grid;grid-template-columns:110px minmax(0,1fr);gap:4px 12px;align-items:center;margin-top:10px;font-size:.8rem;color:var(--ink2)}
.p5-hb .bars{display:grid;gap:3px}
.p5-hb .bars span{height:8px;border-radius:5px;transition:width .5s cubic-bezier(.2,.8,.2,1)}
.p5-hb .bars .a{background:linear-gradient(90deg,var(--gold),var(--gold2))}
.p5-hb .bars .c{background:rgba(217,181,110,.7)}
.p5-map{padding:18px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p5-sw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p5-moat{display:grid;gap:10px}
.p5-mt{display:grid;grid-template-columns:minmax(0,230px) minmax(0,1fr) minmax(0,220px);gap:16px;align-items:center;padding:16px 18px;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
.p5-mt b{font:700 .95rem var(--f-display);color:var(--ink)}
.p5-mt p{margin:0;font-size:.85rem;line-height:1.5;color:var(--ink2)}
.p5-mt .bar{height:10px;border-radius:6px;background:rgba(169,196,184,.12);overflow:hidden}
.p5-mt .bar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,var(--neon),var(--gold));transition:width .6s cubic-bezier(.2,.8,.2,1)}
.p5-mt small{display:block;margin-top:6px;font:500 .6rem var(--f-hud);color:var(--gold2);letter-spacing:.06em}
/* ---- road ---- */
.p5-stairs{padding:20px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p5-gates{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.p5-gate{padding:18px 20px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p5-gate .h{display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap}
.p5-gate .h b{font:700 .98rem var(--f-display)}
.p5-gate .h span{font:500 .6rem var(--f-hud);letter-spacing:.12em;color:var(--gold2);text-transform:uppercase}
.p5-gate ul{margin:10px 0 0;padding:0;list-style:none;display:grid;gap:6px}
.p5-gate li{position:relative;padding-left:22px;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p5-gate li::before{content:"";position:absolute;left:2px;top:6px;width:10px;height:10px;border-radius:3px;border:1.5px solid var(--neon)}
.p5-gate .cap{margin-top:12px;font:500 .64rem var(--f-hud);letter-spacing:.06em;color:var(--ink3)}
.p5-gate .cap b{color:var(--neon2);font-weight:500}
.p5-road{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:16px}
.p5-roadm{padding:16px;border-radius:22px;border:1px solid var(--edge);background:radial-gradient(500px 300px at 70% 40%,rgba(95,191,143,.07),transparent 70%),var(--panel)}
.p5-roadm svg .city circle.b{transition:r .5s,opacity .5s}
.p5-roadk{display:flex;flex-direction:column;gap:12px}
.p5-yr{padding:20px;border-radius:20px;border:1px solid var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p5-yr label{display:block;font-size:.9rem;color:var(--ink2)}
.p5-yr input{width:100%;accent-color:var(--gold);margin-top:10px}
.p5-yr .y b{white-space:nowrap}
.p5-yr .y{flex-wrap:wrap;display:flex;justify-content:space-between;align-items:baseline;gap:10px}
.p5-yr .y b{font:800 1.6rem var(--f-display);color:var(--gold2)}
.p5-yr .y span{font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--neon)}
.p5-yr p{margin:8px 0 0;font-size:.86rem;color:var(--ink2);line-height:1.5}
.p5-kp{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.p5-kp div{padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p5-kp small{display:block;font:500 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p5-kp b{display:block;margin-top:4px;font:500 1.15rem var(--f-hud);color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p5-kp b.neg{color:#ffb3a3}.p5-kp b.pos{color:var(--neon2)}
.p5-chart{padding:20px;border-radius:22px;border:1px solid var(--edge);background:var(--panel)}
.p5-chart svg .bar{transition:all .5s cubic-bezier(.2,.8,.2,1)}
.p5 .num b{white-space:nowrap;font-size:clamp(1.15rem,1.8vw,1.75rem)}
.p5-scrollhint{display:none;margin:8px 0 0;font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
@media (max-width:520px){.p5-funo{grid-template-columns:1fr}.p5-funo div.big{grid-column:auto}}
.p5-play{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0}
.p5-play .step{padding:22px 18px}
@media (max-width:1150px){
 .p5-fly,.p5-fun,.p5-mx,.p5-b2b,.p5-road,.p5-h2h{grid-template-columns:1fr}
 .p5-ch,.p5-pt,.p5-grid3,.p5-sw{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p5-cal{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p5-ct{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p5-mock{grid-template-columns:minmax(0,1fr) minmax(0,1fr)}
 .p5-mock .p5-mk:nth-child(2){grid-column:1/-1;order:-1}
 .p5-mt{grid-template-columns:minmax(0,200px) minmax(0,1fr)}
 .p5-mt>div:last-child{grid-column:1/-1}
 .p5-play{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p5-play .step{border-radius:0!important;border-left:1px solid var(--edge)!important}
 .p5-play .step::after{display:none}
}
@media (max-width:820px){
 .p5-grid2,.p5-ch,.p5-pt,.p5-grid3,.p5-sw,.p5-ct,.p5-gates,.p5-mock,.p5-cal,.p5-play{grid-template-columns:1fr}
 .p5-mock .p5-mk:nth-child(2){grid-column:auto}
 .p5-budl{grid-template-columns:1fr 1fr}
 .p5-budbar span{font-size:0}
 .p5-lad div{grid-template-columns:32px minmax(0,1fr)}
 .p5-lad div p{grid-column:2}
 .p5-pipes{grid-template-columns:1fr;gap:14px}
 .p5-pipes::before{left:17px;right:auto;top:10px;bottom:10px;width:2px;height:auto;background:linear-gradient(180deg,var(--gold),rgba(242,201,107,.15))}
 .p5-ps{display:grid;grid-template-columns:36px minmax(0,1fr);gap:4px 14px;text-align:left;padding:0}
 .p5-ps i{margin:0;grid-row:span 3}
 .p5-ps b{margin-top:6px}
 .p5-ps .who{justify-content:flex-start}
 .p5-mxr{grid-template-columns:minmax(0,1.3fr) repeat(5,minmax(0,1fr))}
 .p5-mxr>*{padding:10px 4px}
 .p5-mxr b{padding-left:10px;font-size:.74rem}
 .p5-mxr.hd span{font-size:.44rem;letter-spacing:.04em}
 .p5-mt{grid-template-columns:1fr}
 .p5-funo{grid-template-columns:1fr 1fr}
 .p5-kp{grid-template-columns:1fr 1fr}
 .p5-hb{grid-template-columns:86px minmax(0,1fr)}
 .p5-flyd{min-height:0}
 .p5-cm th,.p5-cm td{padding:9px 6px}
 .p5-cm td:first-child,.p5-cm th:first-child{white-space:normal;min-width:118px;padding-left:12px}
 .p5-hc{width:32px;height:28px;font-size:.74rem}
 .p5-pips i{width:6px;height:6px}
 .p5-pips{gap:2px}
 .p5-stairs,.p5-chart>div:first-child{overflow-x:auto;-webkit-overflow-scrolling:touch}
 .p5-stairs svg{min-width:620px}
 .p5-chart svg{min-width:640px}
 .p5-scrollhint{display:block!important}
 .p5-dash .tiles{grid-template-columns:1fr 1fr 1fr}
}

/* ---- growth loop (photo journey) ---- */
.p5-jr{display:grid;gap:14px}
.p5-jrm{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px;align-items:stretch}
.p5-jrph{min-height:360px}
.p5-jrph img{position:absolute;inset:0;height:100%;aspect-ratio:auto}
.p5-jrt{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.p5-jrb{position:relative;display:flex;flex-direction:column;justify-content:space-between;text-align:left;padding:0;border-radius:16px;overflow:hidden;border:1px solid var(--edge);background:#020608;cursor:pointer;min-height:138px;color:var(--ink);font:inherit}
.p5-jrb img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.5;transition:opacity .3s,transform .7s}
.p5-jrb::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(2,6,8,.15),rgba(2,6,8,.94) 78%)}
.p5-jrb .n,.p5-jrb b,.p5-jrb small{position:relative;z-index:1;display:block;padding:0 14px}
.p5-jrb .n{padding-top:12px;font:500 .58rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p5-jrb b{margin-top:auto;padding-top:36px;font:700 .92rem/1.2 var(--f-display)}
.p5-jrb small{padding-bottom:12px;margin-top:4px;font:500 .55rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p5-jrb:hover img{opacity:.75;transform:scale(1.05)}
.p5-jrb.on{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold),0 16px 30px -16px rgba(242,201,107,.6)}
.p5-jrb.on img{opacity:.85}
.p5-jrb.on small{color:var(--gold2)}
.p5-jrb:focus-visible{outline:2px solid var(--neon2);outline-offset:2px}
.p5-jrloop{margin:4px 0 0;padding:14px 18px;border-left:2px solid var(--neon);border-radius:0 14px 14px 0;background:rgba(95,191,143,.05);color:var(--ink2);font-size:.9rem;line-height:1.6}
.p5-jrloop b{color:var(--ink)}
@media (max-width:1150px){.p5-jrm{grid-template-columns:1fr}.p5-jrph{min-height:0}.p5-jrph img{position:relative;aspect-ratio:16/10}}
@media (max-width:820px){.p5-jrt{grid-template-columns:1fr 1fr}.p5-jrb:last-child{grid-column:1/-1}.p5-jrb{min-height:120px}}
.p5-reg{margin-top:12px;display:grid;gap:0;border-radius:16px;border:1px solid var(--edge);overflow:hidden;background:rgba(2,10,8,.4)}
.p5-regh,.p5-regr{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr) minmax(0,1.3fr);gap:12px;align-items:center;padding:10px 16px;border-bottom:1px solid rgba(95,191,143,.08)}
.p5-regh span{font:500 .56rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.p5-regr b{font:700 .88rem var(--f-display);color:var(--ink3);transition:color .3s}
.p5-regr b small,.p5-regr .o small{display:block;margin-top:2px;font:500 .54rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--ink3)}
.p5-regr .o{font-size:.78rem;color:var(--ink3)}
.p5-regr .v{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center}
.p5-regr .bar{height:8px;border-radius:5px;background:rgba(169,196,184,.1);overflow:hidden}
.p5-regr .bar i{display:block;height:100%;width:0;border-radius:5px;background:linear-gradient(90deg,#0f7a52,var(--neon));transition:width .5s cubic-bezier(.2,.8,.2,1)}
.p5-regr em{font:500 .74rem var(--f-hud);font-style:normal;color:var(--ink3);min-width:64px;text-align:right}
.p5-regr.on b{color:var(--ink)}.p5-regr.on em{color:var(--neon2)}.p5-regr.on .o{color:var(--ink2)}
.p5-regt{display:flex;justify-content:space-between;padding:12px 16px;background:rgba(242,201,107,.07);font-size:.82rem;color:var(--ink2)}
.p5-regt b{font:500 .82rem var(--f-hud);color:var(--gold2)}
@media (max-width:820px){.p5-regh,.p5-regr{grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);padding:10px 12px}.p5-regh span:nth-child(2),.p5-regr .o{display:none}}
/* ---- editorial photography (quality pass) ---- */
.p5-ed{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:clamp(20px,3.2vw,44px);align-items:center;margin:30px 0}
.p5-ed.r>figure{order:2}
.p5-ed.top{align-items:start}
.p5-ph{margin:0;position:relative;border-radius:22px;overflow:hidden;border:1px solid rgba(242,201,107,.22);background:#020608;box-shadow:0 30px 60px -32px rgba(0,0,0,.85);min-width:0}
.p5-ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.p5-ph:hover img{transform:scale(1.03)}
.p5-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(2,6,8,.6));pointer-events:none}
.p5-ph figcaption{position:absolute;left:14px;bottom:14px;right:14px;z-index:1;display:flex;gap:6px;flex-wrap:wrap;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}
.p5-ph figcaption span{padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08)}
.p5-ph figcaption span:first-child{color:var(--gold2)}
.p5-ph.tall img{aspect-ratio:4/5}
.p5-ph.wide img{aspect-ratio:21/9}
.p5-ed .t{min-width:0}
.p5-ed .t .k,.p5-pc .k,.p5-band .k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.p5-ed .t h3{font:800 clamp(1.3rem,2.2vw,1.95rem)/1.14 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p5-ed .t h3 em,.p5-band h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p5-ed .t p{color:var(--ink2);font-size:.95rem;line-height:1.72;margin:0 0 12px}
.p5-ed .t p b,.p5-pc p b,.p5-band p b{color:var(--ink)}
.p5-ed .t ul{margin:4px 0 12px;padding:0;list-style:none;display:grid;gap:8px}
.p5-ed .t li{position:relative;padding-left:20px;color:var(--ink2);font-size:.9rem;line-height:1.6}
.p5-ed .t li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p5-ed .t li b{color:var(--ink)}
.p5-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.p5-facts div{padding:12px 0 0;border-top:1px solid rgba(242,201,107,.35);min-width:0}
.p5-facts b{display:block;font:500 clamp(1rem,1.5vw,1.25rem) var(--f-hud);color:var(--gold2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p5-facts span{display:block;font-size:.76rem;color:var(--ink3);line-height:1.45;margin-top:4px}
.p5-pcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.p5-pcs.c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.p5-pcs.c4{grid-template-columns:repeat(4,minmax(0,1fr))}
.p5-pc{border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));display:flex;flex-direction:column;min-width:0}
.p5-pc>.p5-ph{border-radius:0;border:0;box-shadow:none}
.p5-pc>.p5-ph img{aspect-ratio:16/9}
.p5-pc .b{padding:18px 20px 20px;display:flex;flex-direction:column;gap:8px;flex:1}
.p5-pc h4{margin:0;font:700 1.05rem/1.25 var(--f-display);color:var(--ink)}
.p5-pc p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.6}
.p5-band{position:relative;border-radius:26px;overflow:hidden;border:1px solid rgba(242,201,107,.24);min-height:400px;display:flex;align-items:center;margin:30px 0;background:#020608}
.p5-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p5-band::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(2,6,8,.96) 0%,rgba(2,6,8,.9) 42%,rgba(2,6,8,.45) 70%,rgba(2,6,8,.08) 100%)}
.p5-band .in{position:relative;z-index:2;padding:clamp(24px,4vw,48px);max-width:600px}
.p5-band h3{font:800 clamp(1.4rem,2.6vw,2.2rem)/1.12 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p5-band p{color:var(--ink2);font-size:.95rem;line-height:1.7;margin:0 0 10px}
.p5-band .cap{position:absolute;right:16px;bottom:14px;z-index:2;padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
@media (max-width:1100px){.p5-pcs.c4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
 .p5-ed{grid-template-columns:1fr;gap:18px}.p5-ed.r>figure{order:0}
 .p5-pcs,.p5-pcs.c2,.p5-pcs.c4{grid-template-columns:1fr}
 .p5-facts{grid-template-columns:1fr 1fr}
 .p5-band{min-height:0;display:block}
 .p5-band>img{position:relative;height:auto;aspect-ratio:16/10}
 .p5-band::before{display:none}
 .p5-band .in{padding:20px 20px 24px}
 .p5-band .cap{top:12px;bottom:auto;right:12px}
 .p5-ph.tall img{aspect-ratio:16/11}
}
`;
(function put(){if(document.getElementById('css-part5'))return;const st=document.createElement('style');st.id='css-part5';st.textContent=CSS;document.head.appendChild(st)})();

/* ============================== shared ============================== */
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const SRC={
 tcra:['TanzaniaInvest, 14 June 2026: TCRA telecom statistics, Q1 2026 (58.9M internet subscriptions, 80.98M mobile money accounts, 42.5% smartphone penetration)','https://tanzaniainvest.com/telecoms/tcra-telecom-stats-q1-2026'],
 addo:['D-tree, 8 May 2023: Scaling up pharmacy-based healthcare models (over 17,400 accredited drug dispensing outlets; about one-third of acutely ill Tanzanians go to an ADDO first)','https://www.d-tree.org/scaling-up-pharmacy-based-healthcare-models-to-achieve-health-for-all/'],
 plos:['Embrey M. et al., PLOS ONE 11(11), 2016: Understanding the role of accredited drug dispensing outlets in Tanzania’s health system','https://pmc.ncbi.nlm.nih.gov/articles/PMC5100953'],
 gff:['Yadav P., Global Financing Facility case study: Making the pharmaceutical market work for the poor, Tanzania (600+ retail pharmacies in Dar es Salaam vs under 30 in Rukwa; data to about 2012)','https://www.globalfinancingfacility.org/sites/gff_new/files/documents/Session_9-Tanzania-Case-Study_EN.pdf'],
 who_sf:['WHO news release, 28 November 2017: 1 in 10 medical products in low- and middle-income countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 cal:['Public Health Update: Public health calendar of international days (World Health Day 7 April, World Hypertension Day 17 May, World Breastfeeding Week 1–7 August, World Heart Day 29 September, World Diabetes Day 14 November, and others)','https://publichealthupdate.com/publichealthcalendar/'],
 school:['Africa Check, July 2026: No, Tanzania didn’t postpone second-term school reopening (official 2026 calendar: second term reopened 6 July)','https://africacheck.org/fact-checks/meta-programme-fact-checks/no-tanzania-didnt-postpone-second-term-school-reopening-july'],
 rem:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 meta:['Stackmatix, 6 September 2026: Facebook ads CPM by country, 2026 (Kenya US$0.90–2.40, Nigeria US$0.80–2.20 per 1,000 impressions; Tanzania not listed)','https://stackmatix.com/blog/facebook-ads-cpm-by-country-2026'],
 uhis:['TanzaniaInvest, January 2026: Tanzania starts universal health insurance scheme (“Bima ya Afya kwa Wote”, from 26 January 2026; TSh 150,000 a year for a household of up to six)','https://www.tanzaniainvest.com/?p=32358'],
 gl:['LeapFrog Investments, 2025: Goodlife Pharmacies exit note (19 stores at investment in November 2016, 148 at exit in July 2025; Kenya and Uganda; 593 full-time employees)','https://leapfroginvest.com/wp-content/uploads/2025/10/Goodlife-Pharmacies_ExitNote-Ext_2025.pdf'],
 glp:['Proparco: Proparco finances Goodlife Pharmacies to strengthen its commitment to the healthcare sector (development-finance debt for the chain’s expansion)','https://proparco.fr/en/actualites/proparco-grants-12m-goodlife-pharmacies-strengthen-its-commitment-healthcare-sector'],
 uhi:['WTW, 29 February 2024: Tanzania — all residents must be covered by health insurance (Universal Health Insurance Act; employers must ensure staff are covered; about 15% insured at end of 2021)','https://wtwco.com/en-gh/insights/2024/02/tanzania-all-residents-must-be-covered-by-health-insurance']};
const srcList=keys=>keys.map(k=>SRC[k]);
addCSS('p5prose',`.p5prose{max-width:880px}.p5prose p{font-size:1.02rem;line-height:1.75;color:var(--ink2);margin:0 0 16px}.p5prose p b{color:var(--ink)}
.p5prose h4{font:600 1.15rem/1.3 var(--f-serif,var(--f-display));color:var(--ink);margin:26px 0 10px}
.p5prose .p5sum{font-size:1.2rem;line-height:1.6;color:var(--ink);border-left:3px solid var(--gold2,#d8b25a);padding-left:18px}
.p5x{margin:18px 0 22px;padding:18px 20px;border:1px solid rgba(216,178,90,.35);border-radius:14px;background:rgba(216,178,90,.06)}
.p5x>span{display:block;font:600 .68rem/1.4 var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2,#d8b25a);margin-bottom:8px}
.p5x p{margin:0;color:var(--ink)}
.p5prose .p5-tblw{margin:14px 0 18px}
.p5stat{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin:6px 0 22px}
.p5stat div{border:1px solid var(--edge2);border-radius:14px;padding:14px 16px;background:linear-gradient(180deg,rgba(95,191,143,.06),rgba(0,0,0,0))}
.p5stat b{display:block;font:500 1.5rem/1.1 var(--f-display,serif);color:var(--gold2,#d8b25a)}
.p5stat span{display:block;margin-top:6px;font-size:.8rem;line-height:1.45;color:var(--ink2)}
.p5vis{margin:18px 0 24px;border:1px solid var(--edge2);border-radius:18px;padding:20px;background:rgba(3,16,12,.6)}
.p5vis>.hd{font:600 .66rem/1.4 var(--f-hud,monospace);letter-spacing:.14em;text-transform:uppercase;color:var(--gold2,#d8b25a);margin-bottom:14px}
.p5vis svg{width:100%;height:auto;display:block}
@media (max-width:820px){.p5prose p{font-size:.98rem}.p5stat{grid-template-columns:1fr 1fr}}
.p5vis p.note,.p5prose p.note{font-size:.62rem!important;line-height:1.55!important;letter-spacing:.1em}`);
const C=(k,n)=>cref(SRC[k][1],n,SRC[k][0]);
const I=()=>MODEL.inputs, F=()=>MODEL.fmt;
const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const nf=n=>Math.round(n).toLocaleString('en-US');
const $=id=>document.getElementById(id);
const SVGI={
 clinic:'<path d="M4 21V8l8-5 8 5v13"/><path d="M10 21v-5h4v5"/><path d="M12 8v5M9.5 10.5h5"/>',
 shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18"/>',
 school:'<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/>',
 hotel:'<path d="M3 21V6h12v15M15 10h6v11"/><path d="M7 10h1M11 10h1M7 14h1M11 14h1M7 18h4"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
 leaf:'<path d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15"/><path d="M5 19l7-7"/>'};
const ic=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${SVGI[k]}</svg>`;
const plain=items=>`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>${items.map(x=>`<li><b>${x[0]}</b> ${x[1]}</li>`).join('')}</ol></div>`;
const risks=r=>`<div class="risks">${r.map(x=>`<div class="risk"><span class="q">${x[0]}</span><span class="ar">→</span><span class="a">${x[1]}</span></div>`).join('')}</div>`;

/* ---- editorial photography helpers (quality pass) ---- */
const p5pho=(f,alt,cap,cls)=>`<figure class="p5-ph${cls?' '+cls:''}"><img src="img/${f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(alt)}"><figcaption><span>Concept image</span>${cap?`<span>${cap}</span>`:''}</figcaption></figure>`;
const p5ed=(o)=>`<div class="p5-ed${o.r?' r':''}${o.top?' top':''}">${p5pho(o.f,o.alt,o.cap,o.cls)}<div class="t">${o.k?`<span class="k">${o.k}</span>`:''}${o.h?`<h3>${o.h}</h3>`:''}${o.body||''}${o.facts?p5facts(o.facts):''}</div></div>`;
const p5facts=a=>`<div class="p5-facts">${a.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`;
const p5pcs=(items,c)=>`<div class="p5-pcs${c?' c'+c:''}">${items.map(x=>`<article class="p5-pc">${p5pho(x.f,x.alt,x.cap)}<div class="b">${x.k?`<span class="k">${x.k}</span>`:''}<h4>${x.h}</h4>${x.body}</div></article>`).join('')}</div>`;
const p5band=(o)=>`<div class="p5-band"><img src="img/${o.f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(o.alt)}"><div class="in">${o.k?`<span class="k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body||''}${o.facts?p5facts(o.facts):''}</div><span class="cap">Concept image${o.cap?' · '+o.cap:''}</span></div>`;

/* ======================================================================
   5.1 WINNING CUSTOMERS
   ====================================================================== */
const FLY=[
 ['Free Afya Check','Awareness → trust',
  'A free 50-second check at the entrance (blood pressure, pulse, oxygen) gives people a reason to enter for the first time, with no obligation to buy. The adviser explains the reading in plain language and refers anyone with a concerning result to a clinic.',
  'Mzee Juma, 58, passes the store every evening. The screen at the door reads “Free health check · 50 seconds”. His reading is 152/96. The adviser explains the result, recommends a clinic visit this week and, with his consent, sends the reading to his phone by SMS.',
  ()=>[['Checks per day · month 12',nf(I().check.checks_day_m12)],['Price to the customer','Free']]],
 ['First purchase','Trust → sale',
  'Because advice comes before the sale, the first purchase fits the need: a blood-pressure monitor with the right cuff size, test strips that match the meter, nappies in the correct size. Each item is offered in 4–5 registered brands at one published price, and payment takes under 30 seconds.',
  'Juma’s clinic confirms high blood pressure. He returns for a home monitor. The adviser shows three registered brands at one published price; he pays by mobile money and receives the TRA receipt by SMS.',
  ()=>[['Check-to-purchase rate',MODEL.fmt.pct(I().check.check_to_purchase)],['Average basket',tz(I().store.basket)]]],
 ['Saved basket','Sale → habit',
  'Every purchase is linked to the customer’s phone number through the free Afya Green card. A repeat order takes under 30 seconds in the app or on WhatsApp, and the system sends a reminder before supplies run out.',
  'Three weeks later Juma receives a WhatsApp message: “The batteries for your monitor and your BP diary may need replacing soon. Reply 1 to reorder.” He replies 1.',
  ()=>[['Repeat order target','< 30 s'],['Free card','Afya Green']]],
 ['Afya Box member','Habit → recurring revenue',
  'When a need recurs every month, the adviser offers the Afya Box: the same essentials delivered before they run out, on 1, 6 or 12-month plans. Members pay shelf prices less a member saving of 3% to 9% by plan, can swap brands up to 12 days before month end, and pay for the box and delivery at cost.',
  'Juma’s daughter sets up a Presha Care box for him on a 6-month plan (TSh 42,500 a month on the 1-month plan, less on longer plans). He no longer queues for supplies, and his monthly full check is booked automatically.',
  ()=>[['Average box',tz(I().members.avg_box)],['Members · month 12 (flagship)',nf(MODEL.get('base').months[11].members)]]],
 ['Referral & diaspora','Member → new customers',
  'Satisfied members introduce others: a neighbour, a pregnant sister, a son abroad who pays for his mother’s box. Each referral restarts the loop at little marketing cost, so the cost of acquiring a member should fall over time.',
  'Juma mentions the free check to two friends at the mosque. His son in Muscat sees the delivery photos and orders a box for his aunt in Temeke, paid by international card.',
  ()=>[['Diaspora remittances 2024/25','TSh 3.3T'],['Cost of a referral','Low']]]];

const FLYIMG=[['check','the free Afya Check kiosk in use by the glass entrance'],['interior','the store interior with Care Zones, digital price labels and the corner counter'],['prod-heart','heart and diabetes care essentials: a home blood-pressure monitor, glucose meter and strips'],['boxdoor','a closed royal-green Afya Box handed over at a home doorstep'],['rider','an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street']];
function jrHTML(){return `<div class="p5-jr"><div class="p5-jrm"><figure class="p5-ph p5-jrph"><img id="p5jrimg" src="img/check.webp" width="1680" height="944" alt="Concept image: ${esc(FLYIMG[0][1])}"><figcaption><span>Concept image</span><span id="p5jrcap">Step 01 · ${esc(FLY[0][0])}</span></figcaption></figure><div class="p5-flyd" id="p5flyd" aria-live="polite"></div></div>
 <div class="p5-jrt" role="tablist" aria-label="The five steps of the Afya growth loop">${FLY.map((f,i)=>`<button type="button" role="tab" class="p5-jrb${i?'':' on'}" data-i="${i}" aria-selected="${i?'false':'true'}"><img src="img/${FLYIMG[i][0]}.webp" width="1680" height="944" loading="lazy" alt=""><span class="n">Step 0${i+1}</span><b>${esc(f[0])}</b><small>${esc(f[1])}</small></button>`).join('')}</div>
 <p class="p5-jrloop"><b>A loop, not a funnel.</b> Step 05 feeds step 01: each referral and diaspora order brings a new household to the free check. A funnel must be refilled with paid advertising every month; a loop is partly refilled by its own members, which lowers the cost of each new customer.</p></div>`}

const CHANNELS=[
 ['WhatsApp','#5fbf8f','Conversion · retention','The everyday channel. A business account with a catalogue and quick replies, answering within 5 minutes during opening hours. Used for reorders, reminders, health-day invitations (opted-in contacts only) and delivery photos for diaspora senders.','“Habari Mama Neema, your baby’s next nappy size is due. Reply 1 to add size 4 to this month’s box.”','Reply time < 5 min · reorders per week'],
 ['Community health talks','#f2c96b','Trust · awareness','Short, free sessions led by the store lead (a physiotherapy graduate) with a portable check station, held at women’s groups (vikundi), mosques, churches, markets and residents’ associations. The content is educational; the store is mentioned only at the end.','“Blood pressure: the silent problem. 20 minutes, free readings for everyone, questions answered in Kiswahili.”','Talks per month · checks done · visits within 14 days'],
 ['Clinics & maternity referrals','#d9b56e','Trust · conversion','Clinics and maternity wards can give patients a printed list of the home supplies they will need and where to find them. We never pay per referral and never influence medical advice (see 5.2).','“Going home after delivery? Your new-mother checklist, ready at Afya Basics or delivered the same day.”','Referral slips redeemed · new members from referrals'],
 ['Social media','#c9b8ff','Awareness · diaspora','Short videos filmed in the store: how to use a blood-pressure monitor, what to pack in a hospital bag, how a box is packed. Targeted advertising reaches Tanzanians abroad for parent boxes and gifts.','“60 seconds: how to read your blood-pressure numbers. Free check at our Dar store, every day.”','Cost per store visit · diaspora orders'],
 ['Local radio','#ffb36b','Awareness at scale','A weekly Kiswahili health slot on a Dar es Salaam station, plus spots around World Hypertension Day, World Breastfeeding Week and World Diabetes Day. Radio reaches carers and older listeners who are not on social media.','“Afya Tip ya Wiki: do you know your numbers? Free Afya Check, every day, no appointment.”','Calls & WhatsApp messages after each slot'],
 ['The store itself','#ff9b87','Visibility','The store itself is our largest advertisement: lit at night, AFYA BASICS on the roof edge, a video wall facing the road and the free-check screen at the door. Sites are selected partly on passing traffic.','“Free Afya Check inside · 50 seconds · no appointment.”','Passers-by who walk in · first-visit checks']];
const BUD=[['WhatsApp & digital','#5fbf8f',.30],['Community talks','#f2c96b',.20],['Radio','#ffb36b',.20],['Clinic & referral materials','#d9b56e',.10],['In-store events & screens','#ff9b87',.10],['Print & signage refresh','#c9b8ff',.10]];

/* Calendar: calendar-month events (cited dates) */
const CALM=[
 {d:[['School term opens','s'],['New year','s']],c:'<b>New-year health reset.</b> A week of free full Afya Checks (about 4 minutes, 15 measurements). Back-to-school first-aid kits for families; school nurse kits offered to private schools in the catchment.'},
 {d:[['14 Feb','s']],c:'<b>“Check your heart, for the one you love.”</b> Couples’ checks during Valentine’s week, with the Heart & Diabetes zone featured on the video wall.'},
 {d:[['World Kidney Day · 2nd Thu']],c:'<b>Kidney and dialysis support.</b> A session with partner clinics on managing dialysis at home, and the introduction of a dialysis-support box (contents to be confirmed by the founders).'},
 {d:[['World Health Day · 7 Apr'],['World Malaria Day · 25 Apr']],c:'<b>Open house.</b> Free full checks all day on 7 April; First Aid & Home zone promotes nets and repellents for the long rains.'},
 {d:[['World Hypertension Day · 17 May'],['Menstrual Hygiene Day · 28 May'],['World No-Tobacco Day · 31 May']],c:'<b>“Know your numbers”: our signature campaign.</b> Mobile check station at markets and offices; radio spots; a free reading card for everyone checked. Personal-hygiene box for girls and women around 28 May.'},
 {d:[['Mid-year','s']],c:'<b>Carers’ month.</b> Seniors and Mobility & Recovery zones featured; equipment rental (walking frames, wheelchairs) and the Afya Senior card with carer access. The first 6-month plans come up for renewal.'},
 {d:[['Second term reopens · 6 Jul 2026','s']],c:'<b>School restock.</b> First-aid refills for schools and families; Afya Kazini staff kits offered to employers ahead of the second half of the year.'},
 {d:[['World Breastfeeding Week · 1–7 Aug']],c:'<b>Mama na Mtoto week.</b> Breastfeeding talks with maternity partners, featuring the Mama na Mtoto box and the Afya Family card; new-mother checklists in maternity wards.'},
 {d:[['World Heart Day · 29 Sep']],c:'<b>Family heart check.</b> Bring a parent for a free full check; carers can link a parent’s account to their own phone.'},
 {d:[['World Mental Health Day · 10 Oct'],['World Sight Day · 14 Oct']],c:'<b>Calm care.</b> Talks on stress and sleep for carers; reading-glasses and eye-care corner for seniors.'},
 {d:[['World Diabetes Day · 14 Nov']],c:'<b>Diabetes month.</b> Free quick checks all month; an optional finger-prick glucose test (TSh 3,000); a trial month of the Sukari Care box for new members.'},
 {d:[['Festive season','s'],['World AIDS Day · 1 Dec']],c:'<b>Diaspora gift season.</b> Families return home or send gifts: Bibi na Babu boxes for parents, paid by international card and delivered with a photo to the sender.'}];
const PHASE=i=>i===0?['Launch','Grand opening · 30 days of free full checks · founders and advisers on the floor daily']:i<3?['Awareness','Talks, radio and the store’s visibility drive first visits']:i<6?['Membership drive','Every repeat buyer is offered the Afya Box; tranche 3 requires 100 members after three months of trading']:i<9?['Referral & diaspora','Member referrals and parent boxes paid from abroad']:['Renewal & B2B','Renew 6-month plans, sign first institutional pilots'];

function sec51(s,p,pv,nx){const A=I(),fm=F(),B=MODEL.get('base');
 const mk=A.opex_month.marketing,mkY=mk*12,launch=(A.seed.use.find(x=>/marketing/i.test(x[0]))||[0,0])[1];
 const newY1=B.months.reduce((a,m,i)=>a+Math.max(0,m.members-(i?B.months[i-1].members*(1-A.members.monthly_churn):0)),0);
 const cac=(mkY+launch)/newY1;
 const NF=1/(1+A.tax.vat*A.tax.taxable_share),netRev=(A.members.avg_box-A.members.packing_delivery_in_price)*NF+A.members.packing_delivery_in_price;
 const gpm=(A.members.avg_box-A.members.packing_delivery_in_price)*NF*A.members.box_products_gm+A.members.packing_delivery_in_price*(A.members.pd_margin||0)-netRev*A.tax.payment_fees;
 const m12=Math.round(B.months[11].members);
 const life=1/A.members.monthly_churn,payback=cac/gpm;
 const flyMods=`${jrHTML()}<p class="note">Choose a step · photographs are concept images · examples are illustrative, not real customers</p>`;
 return secShell({s,p,pv,nx,cls:'p5',img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics store at dusk, lit like a billboard, with AFYA BASICS on the roof edge',
  h1:'Customers earned by service,',em:'retained by subscription.',
  lede:'Afya Basics acquires customers in Dar es Salaam with a free health check, converts them through accurate advice and retains them with the monthly Afya Box. Marketing spend builds recurring revenue rather than one-off traffic.',
  mods:[
  ['In summary · how customers are won and kept',`<div class="p5prose">
   <p class="p5sum">Afya Basics does not buy its customers with discounts. It earns them with a free health check that people can see from the street, converts them with honest advice, and keeps them with a monthly Afya Box that renews itself. Marketing money therefore builds recurring revenue instead of one-off traffic.</p>
   <div class="p5stat"><div><b>${fm.m(mk)}</b><span>marketing a month, plus ${fm.m(launch)} launch budget in the seed</span></div><div><b>${nf(m12)}</b><span>Afya Box members at the end of month 12, base case</span></div><div><b>${tz(cac)}</b><span>marketing spent per new member in year 1</span></div><div><b>${tz(gpm)}</b><span>gross profit a member brings each month, after VAT and payment fees</span></div><div><b>${payback.toFixed(1)} months</b><span>to earn back the marketing spent on one member</span></div><div><b>${(gpm*life/cac).toFixed(1)}×</b><span>lifetime gross profit of a member compared with the cost of winning them</span></div></div>
   <p>The plan works in three steps. First, people are brought to the store by the store itself, a standalone store with a free Afya Check at the door, supported by WhatsApp, community health talks, radio and clinic referrals. Second, the adviser explains the reading and helps the person choose the right product, without pressure. Third, the customer’s basket is saved, a reminder arrives before the product runs out, and the natural next step is a monthly box delivered to the door.</p>
   <p>This section explains each channel and what it costs, shows what the customer actually sees, sets out the first-year calendar and the campaigns, and ends with the numbers that matter to an investor: what it costs to win one member, how quickly that money comes back, and how much a member is worth over their membership.</p></div>`],
  ['The problem · a new brand in an established market',`
   ${plain([['No customers on day one.','Afya Basics opens with no customer base and no reputation. Households already have a habitual supplier: the corner drug shop, the supermarket or a hospital pharmacy.'],
     ['Existing habits are strong.',`There are more than 17,400 accredited drug dispensing outlets (ADDOs) in Tanzania, and about one in three people with an acute illness goes to one first ${C('addo',1)}. A new store needs a concrete reason for people to change.`],
     ['Discounting is not a durable answer.','Price cuts conflict with the customer-funded model and attract customers who leave when the discount ends. The entry offer must cost little to provide and be valuable to the household.'],
     ['The channels already exist.',`Tanzania has 80.98 million mobile money accounts, 58.9 million internet subscriptions and 42.5% smartphone penetration (March 2026) ${C('tcra',2)}. Households can be reached on their phones; the task is to give them a relevant message.`]])}
   <p class="oneline" style="margin-top:30px">We do not buy customers. We <b>earn them with a free check</b> and <b>keep them with a box that arrives on time</b>.</p>`],
  ['Our answer · the Afya growth loop',`
   <p class="s11lead">Growth is designed as a <b>loop rather than a funnel</b>. A free check builds trust, trust makes the first purchase accurate, a saved basket turns that purchase into a habit, the habit becomes an Afya Box membership, and members refer the next household. Select a step to see the store process, the metrics and a worked example.</p>${flyMods}`],
  ['How it works · six acquisition channels',`
   <p class="s11lead">Each channel has a defined role in the loop. None relies on paid celebrities or deep discounts; most use assets already in the cost base: the advisers, the check station and the store itself.</p>
   ${p5band({f:'exterior',alt:'the Afya Basics store lit at dusk with AFYA BASICS on the roof edge',cap:'the flagship at dusk',k:'Channel zero · the store itself',h:'The store is <em>the first advertisement</em>.',
     body:`<p>Before any post or radio spot, the building does the work. A lit, protected standalone store with AFYA BASICS on the roof edge, a video wall facing the road and a door screen reading <b>“Free Afya Check · ${A.check.quick_seconds} seconds”</b> is visible to everyone who passes by car, on foot or by daladala until closing time.</p>
      <p>This is why rent, at <b>${fm.m(A.opex_month.rent)} a month</b> for the flagship option, is the largest single cost line: it buys visibility as well as floor space. Sites are scored on passing traffic first (see the location tool in 7.1). The model expects walk-in visitors to grow from <b>${A.store.visitors_day_start} a day</b> in month 1 to <b>${A.store.visitors_day_m12} a day</b> by month 12, with about <b>${A.check.checks_day_m12} free checks a day</b>.</p>`,
     facts:[[A.store.visitors_day_start+' → '+A.store.visitors_day_m12,'walk-in visitors a day, month 1 → 12 (model)'],[nf(A.check.checks_day_m12)+' / day','free Afya Checks by month 12 (model)'],[fm.m(A.opex_month.rent),'flagship rent a month · also the visibility budget']]})}
   <div class="p5-ch">${CHANNELS.map(c=>`<article class="p5-chc" style="--c:${c[1]}"><div class="top"><b>${c[0]}</b><span>${c[2]}</span></div><p>${c[3]}</p><q>${c[4]}</q><div class="kpi">Measured by · ${c[5]}</div></article>`).join('')}</div>
   <div class="p5-bud"><div class="hud g">Marketing budget · ${fm.m(mk)} a month ${PE}</div>
    <p class="p5-p" style="margin:10px 0 0">The master model allocates <b>${fm.m(mk)} a month (${fm.m(mkY)} a year)</b> to marketing, plus <b>${fm.m(launch)}</b> of launch marketing within the seed. The channel split below is the proposed starting allocation; it is rebalanced each quarter towards the channels with the lowest cost per new member.</p>
    <div class="p5-budbar">${BUD.map(b=>`<span style="flex:${b[2]};background:${b[1]}">${Math.round(b[2]*100)}%</span>`).join('')}</div>
    <div class="p5-budl">${BUD.map(b=>`<div><i style="background:${b[1]}"></i>${b[0]} · <b>${fm.m(mk*b[2])}</b></div>`).join('')}</div>
    <p class="note">Channel split is a planning estimate derived for this section · total from MODEL.inputs.opex_month.marketing</p></div>`],
  ['What the marketing money buys',`<div class="p5prose">
   <p>The master model sets marketing at ${fm.m(mk)} a month, ${fm.m(mkY)} a year, with a further ${fm.m(launch)} for the launch inside the seed. That is a small budget for a new brand, and it is deliberately so: the most expensive “advertising” Afya Basics pays for is the rent of a visible site, which is already in the store’s costs. The marketing budget is spread across six channels, starting with the split shown above and moved each quarter towards the channels that bring new members most cheaply.</p>
   <div class="p5x"><span>Worked example · one month of WhatsApp and digital advertising</span><p>The digital share is 30% of the monthly budget, ${tz(mk*0.30)}. Published Facebook advertising prices for Tanzania are not available; in neighbouring Kenya, 1,000 ad views cost between US$0.90 and US$2.40 in 2026 ${C('meta',6)}. At TSh 2,640 to the dollar, that is TSh 2,376 to TSh 6,336 per 1,000 views. If about half of the digital budget, ${tz(mk*0.15)}, goes on paid social posts, it buys roughly ${nf(mk*0.15/6336*1000)} to ${nf(mk*0.15/2376*1000)} views a month in the store’s neighbourhood. The other half pays for WhatsApp business messages to people who have opted in, which are reminders and invitations rather than advertising.</p></div>
   <p>The measure that decides where money goes is not views or likes but cost per new member: marketing spent in a channel divided by the members who joined after first contact through it. Each channel is tracked because every customer’s first visit is recorded with how they heard of Afya Basics.</p></div>`],
  ['The experience · what a customer sees',`
   <p class="s11lead">Three moments from the first weeks, shown as the customer would see them. <span class="tagi">Illustrative mock-ups</span></p>
   <div class="p5-mock">
    <figure class="p5-mk" style="margin:0"><div class="p5-phone"><div class="p5-phs"><div class="p5-phh"><i>${'<svg viewBox="0 0 48 48"><rect width="48" height="48" rx="13" fill="#0f7a52"/><path d="M20 9h8v11h11v8H28v11h-8V28H9v-8h11z" fill="#fff"/></svg>'}</i><div><b>Afya Basics</b><small>business account · online</small></div></div>
     <div class="p5-msgs"><div class="p5-msg"><b>17 May · World Hypertension Day</b><br>Habari! Do you know your blood-pressure numbers? Free Afya Check today, 50 seconds, no appointment. Our mobile station is at Mwenge market 10:00–14:00.<span class="bt">Get directions</span><span class="t">08:02</span></div>
     <div class="p5-msg me">Asante. Can I bring my mother?<span class="t">08:05</span></div>
     <div class="p5-msg">Of course, karibu sana. Checks are free for everyone, and we can save her readings to your phone if she agrees.<span class="t">08:06</span></div></div></div></div>
     <figcaption>WhatsApp · opted-in health-day invitation</figcaption></figure>
    <figure class="p5-mk" style="margin:0"><div class="p5-poster" role="img" aria-label="Concept image of the store with a window poster offering a free Afya Check"><div><small>At the glass door</small><b>Free Afya Check inside.</b><span>Blood pressure, pulse and oxygen in about 50 seconds. No appointment, no pressure to buy.</span><em>Karibu · walk in</em></div></div>
     <figcaption>The store as a billboard · concept image with poster mock-up</figcaption></figure>
    <figure class="p5-mk" style="margin:0"><div class="p5-sms">
     <div class="p5-smsc"><small><span>SMS · Afya Basics</span><span>Day 0</span></small>Your Afya Check today: BP <b>128/82</b>, pulse 74, oxygen 98%. Next free check any time. Afya yako, nyumbani kwako.</div>
     <div class="p5-smsc"><small><span>WhatsApp</span><span>Day 24</span></small>Your test strips (50) may run low this week. Reply <b>1</b> to reorder for same-day delivery, or <b>2</b> to start a monthly box.</div>
     <div class="p5-smsc"><small><span>Member reminder</span><span>Month end −12</span></small>Your Sukari Care box ships on the 1st. Swap a brand before Friday in the app (Afya Choice). <b>No action needed</b> to keep it as it is.</div></div>
     <figcaption>The follow-up · check → reorder → member</figcaption></figure>
   </div>`],
  ['How it works · the first-year calendar',`
   <p class="s11lead">The first twelve months are planned in advance. The calendar combines the launch phases (driven by the master model’s monthly targets) with the health days and school terms that already prompt households to think about health. International health-day dates are from a public calendar ${C('cal',3)}; Tanzania’s second school term reopened on 6 July 2026 under the official calendar ${C('school',4)}, and the first term opens each January.</p>
   <label class="p5-sel">Opening month (not yet fixed; select one to see the plan shift):<select id="p5open">${MON.map((m,i)=>`<option value="${i}"${i===0?' selected':''}>${m}</option>`).join('')}</select></label>
   <div class="p5-cal" id="p5cal"></div>
   <p class="note">Member and visitor targets per month from MODEL.get('base').months · planning estimates · the opening date is set after the lease is signed</p>`],
  ['Campaigns and retention',`
   <h3 class="p5-sub">Four signature campaigns</h3>
   <div class="p5-grid2">
    <div class="p5-card"><span class="k">Every May · around 17 May</span><h4>“Know your numbers”</h4><p>Our largest annual campaign. The portable check station visits markets, bus stands and office lobbies; everyone checked receives a reading card and an SMS, supported by radio and WhatsApp. Target: the highest number of free blood-pressure checks in our catchment in one week, with every high reading referred to a clinic.</p></div>
    <div class="p5-card"><span class="k">Every August · 1–7 August</span><h4>Mama na Mtoto week</h4><p>With maternity partners: talks on breastfeeding and the first weeks at home, the new-mother checklist and the Mama na Mtoto box. An expectant mother can assemble her hospital bag in store or schedule its delivery before her due date.</p></div>
    <div class="p5-card"><span class="k">Every November · around 14 November</span><h4>Diabetes month</h4><p>Free quick checks, guidance on foot care and test strips, and a trial month of the Sukari Care box. A father living with diabetes leaves with his meter and strips recorded on his account, so he does not buy incompatible strips again.</p></div>
    <div class="p5-card"><span class="k">December and before holidays</span><h4>“Care from afar”</h4><p>For Tanzanians abroad, who sent home TSh 3.3 trillion in 2024/25 ${C('rem',5)}: a parent box such as Bibi na Babu, paid by international card in under 2 minutes, with a delivery photo sent to the sender.</p></div>
   </div>
   ${p5ed({f:'s-kiosk',alt:'the Afya Check kiosk where advisers run every campaign',cap:'where every campaign starts',k:'Who runs the campaigns',h:'Advisers, <em>not salespeople</em>.',
     body:`<p>Every campaign is run by the store team: a <b>store lead, preferably a physiotherapy graduate</b>, ${A.staff[1][1]} health advisers on two shifts, a picker-packer and ${A.staff[3][1]} riders (${A.staff.reduce((a,x)=>a+x[1],0)} people in the flagship model). There is no separate sales force, which keeps marketing at ${fm.m(A.opex_month.marketing)} a month.</p>
      <ul><li><b>They explain; they do not sell.</b> After a high reading the adviser explains the result in Kiswahili or English and refers the person to a clinic. No product is offered at that point.</li>
      <li><b>They measure.</b> Each talk records checks completed and store visits within 14 days; each campaign is judged on members gained, not on social-media engagement.</li>
      <li><b>They keep records.</b> With consent, readings and purchases are saved to the customer’s phone number, so each visit continues from the last.</li></ul>`})}
   <h3 class="p5-sub">Six retention practices</h3>
   <p class="p5-p">The model assumes <b>${fm.pct(A.members.monthly_churn)} of members leave each month</b>. Each point of churn avoided is worth more than additional advertising, so retention is built into the product rather than added as a promotion.</p>
   <div class="p5-lad">
    <div><b>Automatic renewal</b><p>The box renews on the member’s plan with no action required, so staying is easier than leaving.</p></div>
    <div><b>Reminder 12 days before month end</b><p>By phone, SMS, email or WhatsApp: keep the box as it is, or swap brands (Afya Choice) at the same price. Members stay in control.</p></div>
    <div><b>Monthly check for condition members</b><p>Afya Care members receive a monthly full check. Visible improvement in readings is the strongest reason to keep the box.</p></div>
    <div><b>Savings shown monthly</b><p>The app shows points earned and the saving against buying item by item, in shillings, every month.</p></div>
    <div><b>Carer and diaspora access</b><p>A granddaughter or a son abroad can manage a parent’s box. Memberships with two engaged people are cancelled less often.</p></div>
    <div><b>Win-back by solving the cause</b><p>When a member pauses, the adviser calls to understand why. Wrong size, wrong brand or a tight month each has a remedy: a swap, a one-month pause or a smaller box.</p></div>
   </div>`],
  ['Try it · the funnel calculator',`
   <p class="s11lead">Adjust the inputs to see how many members the first store could have after 12 months and the revenue that implies. Defaults come from the master model; the buyer-to-member rate is calibrated so the defaults reproduce the model’s ${nf(m12)} members at month 12.</p>
   <div class="p5-fun">
    <div class="cin">
     <label><span>Store visitors per day at month 12</span><input type="range" id="f_vis" min="30" max="250" step="5"><output id="fo_vis"></output></label>
     <label><span>Share of visitors who take a free Afya Check</span><input type="range" id="f_chk" min="0.1" max="0.9" step="0.01"><output id="fo_chk"></output></label>
     <label><span>Check-to-purchase rate</span><input type="range" id="f_ctp" min="0.1" max="0.7" step="0.01"><output id="fo_ctp"></output></label>
     <label><span>Visitors who buy (all visitors)</span><input type="range" id="f_conv" min="0.2" max="0.8" step="0.01"><output id="fo_conv"></output></label>
     <label><span>Average basket (TSh)</span><input type="range" id="f_bsk" min="10000" max="60000" step="1000"><output id="fo_bsk"></output></label>
     <label><span>Buyers who join the Afya Box each month</span><input type="range" id="f_rate" min="0.01" max="0.12" step="0.001"><output id="fo_rate"></output></label>
     <label><span>Members who leave each month</span><input type="range" id="f_churn" min="0.01" max="0.12" step="0.005"><output id="fo_churn"></output></label>
     <button class="p5-reset" id="f_reset" type="button">Reset to model values</button>
    </div>
    <div class="p5-funv"><svg class="p5-svg" id="f_svg" viewBox="0 0 520 250" role="img" aria-label="Funnel chart for month 12: visitors, Afya Checks, buyers, new members"></svg>
     <div class="p5-funo">
      <div class="big"><small>Afya Box members after 12 months</small><b id="fr_mem">–</b></div>
      <div><small>Box revenue · month 12</small><b id="fr_box">–</b></div>
      <div><small>Store sales · month 12</small><b id="fr_walk">–</b></div>
      <div><small>Year-1 revenue (store + boxes)</small><b id="fr_y1">–</b></div>
      <div><small>Marketing per new member</small><b id="fr_cac">–</b></div>
     </div></div>
   </div><p class="note">Planning estimates · online orders are excluded here (see 3.8) · visitors ramp from the model’s opening level to the month-12 level</p>`,'p5try'],
  ['The numbers · what a member costs and what a member is worth',`<div class="p5prose">
   <p>For an investor, the most important growth question is whether the money spent to win a customer comes back, and how fast. The calculation below uses only inputs from the master model and shows every step.</p>
   <div class="p5-tblw"><table class="p5-tbl"><thead><tr><th>Step</th><th>Calculation</th><th class="n">Result</th></tr></thead><tbody>
    <tr><td>Marketing in year 1</td><td>${fm.m(mk)} × 12 months + ${fm.m(launch)} launch</td><td class="n">${fm.m(mkY+launch)}</td></tr>
    <tr><td>New members in year 1</td><td>All members who joined, including those replacing members who left</td><td class="n">${nf(newY1)}</td></tr>
    <tr><td><b>Cost to win one member</b></td><td>${fm.m(mkY+launch)} ÷ ${nf(newY1)}</td><td class="n"><b>${tz(cac)}</b></td></tr>
    <tr><td>Products in an average box, net of VAT</td><td>(${tz(A.members.avg_box)} − ${tz(A.members.packing_delivery_in_price)} packing and delivery) ÷ 1.153</td><td class="n">${tz((A.members.avg_box-A.members.packing_delivery_in_price)*NF)}</td></tr>
    <tr><td>Gross profit on those products</td><td>× ${fm.pct(A.members.box_products_gm)} margin, less ${fm.pct(A.tax.payment_fees)} mobile-money fees on the whole box</td><td class="n">${tz(gpm)}</td></tr>
    <tr><td><b>Months to earn back the cost</b></td><td>${tz(cac)} ÷ ${tz(gpm)}</td><td class="n"><b>${payback.toFixed(1)}</b></td></tr>
    <tr><td>Average membership length</td><td>1 ÷ ${fm.pct(A.members.monthly_churn)} of members leaving each month</td><td class="n">${life.toFixed(1)} months</td></tr>
    <tr><td><b>Lifetime gross profit of a member</b></td><td>${tz(gpm)} × ${life.toFixed(1)} months</td><td class="n"><b>${tz(gpm*life)}</b></td></tr>
    <tr><td><b>Lifetime value ÷ cost to win</b></td><td>${tz(gpm*life)} ÷ ${tz(cac)}</td><td class="n"><b>${(gpm*life/cac).toFixed(1)}×</b></td></tr></tbody></table></div>
   <p>Three points make these figures conservative. First, the whole marketing budget is charged to members, although the same spending also brings in every walk-in customer and online order. Second, the 26% margin on box products is lower than the 32% earned on store sales, because members pay less. Third, the packing box and delivery are charged at cost, so they add no profit here. A ratio of lifetime value to acquisition cost above 3 is generally read as healthy; the model gives about ${(gpm*life/cac).toFixed(1)}.</p>
   <p>The figure most worth watching after launch is the share of members who leave each month. At ${fm.pct(A.members.monthly_churn)}, an average member stays ${life.toFixed(1)} months. If retention practices bring it down to 6%, the average membership rises to about 16.7 months and each member’s lifetime gross profit rises by a third, with no extra marketing.</p>
   <p class="note">Derived in this section from MODEL inputs · planning estimates · full unit economics in 3.4 and 6.1</p></div>`],
  ['Risks and our answer',risks([
   ['Free checks attract people who never buy.','This is accepted by design: the check is the advertisement. The model assumes only '+fm.pct(A.check.check_to_purchase)+' of checks lead to a purchase, and the check station costs '+fm.m(A.opex_month.check_station)+' a month, inside the marketing logic. If conversion falls, advisers follow up by SMS with readings, not sales messages.'],
   ['Health messages could feel like pressure, or break advertising rules.','Every message is educational first, sent only to people who opted in, and checked against Tanzanian rules on advertising medicines before use. Prescription medicines are never advertised. Advisers are trained never to push a sale after a high reading; they refer to a clinic.'],
   ['Members may join more slowly than planned.','One-off kits and walk-in sales generate revenue without membership; each quarter the calendar shifts spend to the channel with the lowest cost per member; and tranche 3 of the seed is released only after three months of trading, with 100 members and a monthly loss below TSh 16M.'],
   ['WhatsApp or social platforms change their rules or prices.','Customer phone numbers and consent live in our own system (4.1), so we can switch to SMS or the app without losing anyone.']])]
  ],
  takeaway:'Customers are <b>earned with a free check</b>, converted by honest advice, and <b>kept by a box that renews itself</b>, so marketing money builds recurring revenue instead of one-off traffic.',
  doors:['s3-3','s3-4','s5-2','s6-1'],
  sources:srcList(['addo','tcra','cal','school','rem','meta'])});}

function init51(){const A=I(),fm=F(),B=MODEL.get('base');
 /* growth loop */
 const d=$('p5flyd');if(d){const nodes=[...document.querySelectorAll('.p5-jrb')],im=$('p5jrimg'),cap=$('p5jrcap');
  const show=i=>{const f=FLY[i];nodes.forEach((n,k)=>{n.classList.toggle('on',k===i);n.setAttribute('aria-selected',k===i?'true':'false')});
   if(im){im.src='img/'+FLYIMG[i][0]+'.webp';im.alt='Concept image: '+FLYIMG[i][1]}if(cap)cap.textContent='Step 0'+(i+1)+' · '+f[0];
   d.innerHTML=`<span class="k">Step 0${i+1} · ${esc(f[1])}</span><h3>${esc(f[0])}</h3><p>${f[2]}</p><div class="p5-ex"><b>Example · </b>${esc(f[3])} <span class="tagi">Illustrative</span></div><div class="m">${f[4]().map(x=>`<div><small>${x[0]}</small><b>${x[1]}</b></div>`).join('')}</div>`;
   d.classList.remove('swap');void d.offsetWidth;d.classList.add('swap')};
  nodes.forEach((n,i)=>n.addEventListener('click',()=>show(i)));show(0)}
 /* calendar */
 const cal=$('p5cal'),sel=$('p5open');
 if(cal&&sel){const draw=()=>{const o=+sel.value;cal.innerHTML=[...Array(12)].map((_,i)=>{const cm=(o+i)%12,ev=CALM[cm],ph=PHASE(i),m=B.months[i];
   return `<article class="p5-mo${i===0?' l':''}"><div class="h"><b>${MON[cm]}</b><span>Month ${i+1}</span></div><div class="ph">${ph[0]}</div><p>${ph[1]}.</p><div class="d">${ev.d.map(x=>`<span${x[1]?' class="s"':''}>${esc(x[0])}</span>`).join('')}</div><p>${ev.c}</p><div class="t"><span>Members <b>${nf(m.members)}</b></span><span>Visitors/day <b>${nf(m.visitors_day)}</b></span></div></article>`}).join('');
   cal.classList.remove('swap');void cal.offsetWidth;cal.classList.add('swap')};sel.onchange=draw;draw()}
 /* funnel */
 if(!$('f_vis'))return;
 const s=A.store,shape=s.visitors_day_start/s.visitors_day_m12;
 const sim=(V,conv,r,ch)=>{let mem=0,walk=0,box=0,newT=0,lastV=0;for(let i=0;i<12;i++){const v=V*(shape+(1-shape)*i/11);lastV=v;const buy=v*conv;const nw=buy*30*r;mem=mem*(1-ch)+nw;newT+=nw;walk+=buy*s.basket*30;box+=mem*A.members.avg_box}return {mem,newT,lastV}};
 /* calibrate buyer->member rate so defaults reproduce end_y1 members */
 let lo=0.0001,hi=0.5;for(let k=0;k<60;k++){const m=(lo+hi)/2;sim(s.visitors_day_m12,s.conversion,m,A.members.monthly_churn).mem<B.months[11].members?lo=m:hi=m}
 const R0=(lo+hi)/2;
 const DEF={f_vis:s.visitors_day_m12,f_chk:+(A.check.checks_day_m12/s.visitors_day_m12).toFixed(2),f_ctp:A.check.check_to_purchase,f_conv:s.conversion,f_bsk:s.basket,f_rate:+R0.toFixed(3),f_churn:A.members.monthly_churn};
 const set=()=>Object.keys(DEF).forEach(k=>$(k).value=DEF[k]);set();
 const mkY=A.opex_month.marketing*12+((A.seed.use.find(x=>/marketing/i.test(x[0]))||[0,0])[1]);
 const svg=$('f_svg');
 const up=()=>{const V=+$('f_vis').value,ck=+$('f_chk').value,ctp=+$('f_ctp').value,conv=+$('f_conv').value,bsk=+$('f_bsk').value,r=+$('f_rate').value,ch=+$('f_churn').value;
  $('fo_vis').textContent=V+' / day';$('fo_chk').textContent=fm.pct(ck);$('fo_ctp').textContent=fm.pct(ctp);$('fo_conv').textContent=fm.pct(conv);$('fo_bsk').textContent=tz(bsk);$('fo_rate').textContent=(r*100).toFixed(1)+'%';$('fo_churn').textContent=(ch*100).toFixed(1)+'%';
  let mem=0,walk=0,box=0,newT=0,lastWalk=0;for(let i=0;i<12;i++){const v=V*(shape+(1-shape)*i/11);const buy=v*conv;const nw=buy*30*r;mem=mem*(1-ch)+nw;newT+=nw;lastWalk=buy*bsk*30;walk+=lastWalk;box+=mem*A.members.avg_box}
  const vM=V*30,cM=vM*ck,bM=vM*conv,fromChk=Math.min(cM*ctp,bM),nM=bM*r;
  $('fr_mem').textContent=nf(mem);$('fr_box').textContent=fm.m(mem*A.members.avg_box)+' / mo';$('fr_walk').textContent=fm.m(lastWalk)+' / mo';$('fr_y1').textContent=fm.auto(walk+box);$('fr_cac').textContent=newT>0?tz(mkY/newT):'–';
  const rows=[['Visitors',vM,'#d9b56e','a month at month 12'],['Afya Checks',cM,'#5fbf8f','free checks taken'],['Buyers',bM,'#f2c96b',nf(fromChk)+' of them started at the check'],['New members',nM,'#ffe7a8','join the Afya Box that month']];
  const mx=Math.sqrt(Math.max(vM,cM,bM,1));
  svg.innerHTML=rows.map((x,i)=>{const w=Math.max(250,Math.sqrt(x[1])/mx*500),y=8+i*60,xo=(520-w)/2;
   return `<g><rect x="${xo.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="46" rx="12" fill="${x[2]}" fill-opacity=".16" stroke="${x[2]}" stroke-opacity=".7"/><text x="260" y="${y+20}" text-anchor="middle" fill="#effaf5" style="font:700 15px var(--f-display)">${x[0]} · ${nf(x[1])}</text><text x="260" y="${y+37}" text-anchor="middle" fill="#a9c4b8" style="font:500 11.5px var(--f-body)">${esc(x[3])}</text></g>`}).join('')};
 Object.keys(DEF).forEach(k=>$(k).oninput=up);$('f_reset').onclick=()=>{set();up()};up()}

/* ======================================================================
   5.2 PARTNERSHIPS AND B2B
   ====================================================================== */
const PARTNERS=[
 {k:'clinic',ph:'check',pha:'a client using the Afya Check kiosk; readings she can take to her doctor',sh:'Clinics',n:'Clinics & maternity hospitals',ic:'clinic',
  get:'A reliable source of home supplies for patients (monitors, dressings, maternity and baby essentials): registered products, published prices and same-day delivery, plus check-station readings that patients can bring to their doctor.',
  we:'Credibility by association, access to new mothers and newly diagnosed patients when the need arises, and condition-care members.',
  rev:'Patients buy from us at our normal prices; clinics can also order their own consumables on account. No payment per patient referred.',
  ex:'A maternity ward gives every discharged mother a new-mother checklist; she can collect everything in one visit or have it delivered the same day.'},
 {k:'ins',ph:'prod-heart',pha:'heart and diabetes care essentials for members living with a condition',sh:'Insurers',n:'Health insurers',ic:'shield',
  get:'A cost-control partner: members who manage their conditions at home, with check-station readings and adherence data (with consent), which can reduce costly hospital visits.',
  we:'Large groups of insured members, and later, insurer-paid or co-paid condition-care boxes.',
  rev:'Phase 1: insurer promotes Afya Boxes to its members (member pays). Phase 2: insurer pays part of the box for chronic-care members, invoiced monthly.',
  ex:'An insurer offers members living with hypertension a co-paid Presha Care box and a monthly full check.'},
 {k:'emp',ph:'hub',pha:'Afya staff packing closed green boxes at the packing hub for employer orders',sh:'Employers',n:'Employers',ic:'brief',
  get:'Afya Kazini business kits and on-site check days that support staff health, a first-aid supply contract for the office, and one monthly invoice. The Universal Health Insurance Act already requires employers to ensure staff are insured.',
  we:'Bulk, predictable monthly orders and a direct route to working families.',
  rev:'Monthly invoice for Afya Kazini kits or Afya Ofisi boxes (company-paid or by salary deduction), first-aid kit refills and quarterly check days.',
  ex:'A company with 80 staff books a quarterly check day and a monthly hygiene box for each employee, billed on one invoice.'},
 {k:'sch',ph:'prod-kids',pha:'children’s health essentials of the kind a school nurse room needs',sh:'Schools',n:'Schools',ic:'school',
  get:'First-aid kits that are always complete, refilled at the start of every term, and a health talk for pupils and parents.',
  we:'Term-start orders, and introductions to hundreds of families through parents’ meetings.',
  rev:'Kit sale plus a termly refill subscription, timed to the January and July term starts.',
  ex:'A private primary school orders 12 classroom first-aid kits and a nurse-room refill every term.'},
 {k:'hot',ph:'prod-care',pha:'personal-care and amenity essentials for hotel guests',sh:'Hotels',n:'Hotels & guest houses',ic:'hotel',
  get:'Guest amenity and first-aid supplies, a ready guest health kit, and fast delivery when a guest needs something urgently.',
  we:'Steady consumables orders and visibility with visitors and the diaspora when they come home.',
  rev:'Monthly supply contract (for example the Afya Hoteli box) for first-aid and amenity items; guest orders delivered at standard prices.',
  ex:'A city hotel keeps a stocked first-aid cabinet on every floor, refilled monthly, with same-day delivery for guest requests.'},
 {k:'dia',ph:'boxdoor',pha:'a closed Afya Box handed over at a parent’s doorstep, paid from abroad',sh:'Diaspora',n:'Diaspora associations',ic:'globe',
  get:'A trusted way for members abroad to turn money sent home into visible care: parent boxes, gift boxes, photo confirmation of delivery.',
  we:'Groups of high-intent buyers paying by international card, with very low acquisition cost per member.',
  rev:'Members pay for boxes directly; the association gets a community benefit (for example, free check days for families back home), not cash.',
  ex:'A Tanzanian community association abroad shares an Afya parent-box link with its members before the festive season.'}];
/* matrix: revenue, members, trust, speed to revenue, ease to win (1–5, our assessment) */
const PMX={clinic:[3,5,5,3,3],ins:[5,4,4,1,1],emp:[4,3,3,4,3],sch:[2,2,3,4,4],hot:[2,1,2,4,4],dia:[3,4,3,3,4]};
const PMXH=['Revenue','Members','Trust','Speed','Ease'];
const PRI=[['Year 1 · cash & trust',[1,1,3,3,3]],['Years 2–3 · members',[1,3,2,1,1]],['Scale · revenue',[3,1,1,1,1]]];
const MIX={emp:.32,clinic:.22,ins:.16,sch:.10,hot:.10,dia:.10};

function sec52(s,p,pv,nx){const A=I(),fm=F(),G=A.growth,B=MODEL.get('base');
 const b2b=y=>{const r=B.years[y-1].revenue;return y===1?0:r*G.b2b_share/(1+G.b2b_share)};
 return secShell({s,p,pv,nx,cls:'p5',img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior with the corner counter and Afya Check kiosk, where partner customers are served',
  h1:'Institutional partners',em:'reach whole communities.',
  lede:'Clinics, insurers, employers, schools, hotels and diaspora associations each serve many households at once. Partnering with them lets one store reach whole communities. Every partner listed is a target; no agreement has been signed.',
  mods:[
  ['In summary · why partners matter',`<div class="p5prose">
   <p class="p5sum">A clinic, an employer, a school, a hotel, an insurer or a diaspora association each serves many households at once. One agreement with one of them can bring Afya Basics dozens or hundreds of families without spending more on advertising.</p>
   <div class="p5stat"><div><b>6</b><span>partner types targeted: clinics, insurers, employers, schools, hotels, diaspora groups</span></div><div><b>${fm.pct(G.b2b_share)}</b><span>business sales added on top of store sales in the model, from year 2</span></div><div><b>0</b><span>business sales counted in year 1, so the first store must prove itself on households alone</span></div><div><b>${fm.m(b2b(2))}</b><span>business sales in year 2, base case</span></div><div><b>${fm.auto(b2b(12))}</b><span>business sales in year 12, base case</span></div><div><b>0</b><span>agreements signed today: every partner is a target</span></div></div>
   <p>Partnerships are treated cautiously in the plan. No business revenue is counted in the first year. From year 2 it is added at ${fm.pct(G.b2b_share)} of store sales, a modest figure for a business whose products are bought every month by clinics, employers and schools. And no partner is counted as signed: each one is a target that must be won through the five-stage pipeline described below.</p>
   <p>Two changes in Tanzania make partners more valuable now than a few years ago. The Universal Health Insurance Act requires every resident to have at least basic cover and every employer to ensure its staff are insured ${C('uhi',1)}, and the national scheme started on 26 January 2026 at TSh 150,000 a year for a household of up to six ${C('uhis',3)}. Employers and insurers now have a direct interest in keeping people healthy at lower cost, which is exactly what a monthly box, a free check and an employer first-aid service provide.</p></div>`],
  ['The problem · institutions buy health supplies piecemeal',`
   ${plain([['Institutions serve many people at once.','A clinic sees hundreds of patients a week, a company employs dozens of families and a school is responsible for hundreds of children. Each needs health supplies, and each buys them in small, irregular orders.'],
     ['Insurance is becoming compulsory.',`The Universal Health Insurance Act requires every resident to have at least basic cover and employers to ensure their staff are insured; at the end of 2021 only about 15% of Tanzanians had any health insurance ${C('uhi',1)}. The national scheme, “Bima ya Afya kwa Wote”, started on 26 January 2026 at TSh 150,000 a year for a household of up to six ${C('uhis',3)}. Employers and insurers are now looking for ways to keep people healthy at lower cost.`],
     ['Patients leave the clinic with a list but no supplier.','A new mother or a newly diagnosed father is told what to buy for home care, then has to find it shop by shop. Good clinical advice is lost in the search.'],
     ['Families abroad want a trusted channel.',`Tanzanians abroad sent home TSh 3.3 trillion in 2024/25 ${C('rem',2)}. Their associations can direct members to one trusted channel for turning money into care.`]])}
   ${p5ed({f:'prod-firstaid',alt:'a complete first-aid kit laid out: dressings, bandages, antiseptic and gloves',cap:'what a school or office kit holds',k:'A worked example · one school',h:'The first-aid kit that is <em>never complete</em>.',
     body:`<p>Consider a private primary school in Mbezi with 400 pupils. Each classroom should have a first-aid kit. In practice, plasters and gauze run out early in the term, items are bought ad hoc from the nearest duka when a child is hurt, and gaps are discovered only when something is needed.</p>
      <p>Afya Basics replaces this with <b>one termly order</b>: complete kits delivered before the January and July term starts, a refill list generated by the system, one invoice and a short health talk for parents. The school gains reliability; the store gains a predictable order and an introduction to hundreds of families at the parents’ meeting.</p>`,
     facts:[['2','term starts a year when refills are timed (January, July)'],['1','invoice per term instead of many small cash buys'],['0','agreements signed today · all partners are targets']]})}`],
  ['Our answer · six partner types, one offer',`
   <p class="s11lead">For each partner type: what they receive, what we receive, how revenue flows, and an illustrative example. <b>Status for all six: target, no agreement yet.</b></p>
   <div class="p5-pt">${PARTNERS.map(x=>`<article class="p5-card p5-ptc">${p5pho(x.ph,x.pha,x.sh)}<div class="b"><h4>${x.n}</h4><dl><dt>What they get</dt><dd>${x.get}</dd><dt>What we get</dt><dd>${x.we}</dd></dl><div class="rev"><small>Revenue model</small>${x.rev}</div><p class="p5-ex" style="margin-top:12px"><b>Example · </b>${x.ex} <span class="tagi">Illustrative</span></p><span class="p5-badge"><i></i>Target · no agreement yet</span></div></article>`).join('')}</div>`],
  ['How it works · the partnership pipeline',`
   <p class="s11lead">Every partnership passes through the same five stages and advances only when the previous stage has succeeded. All six partner types are currently at stage 1.</p>
   <div class="p5-pipe"><div class="p5-pipes">
    <div class="p5-ps on"><i>01</i><b>Identify</b><p>List named targets near the flagship and research what each buys today.</p><div class="who">${PARTNERS.map(x=>`<span>${x.sh}</span>`).join('')}</div></div>
    <div class="p5-ps"><i>02</i><b>First meeting</b><p>Founders or the store lead present the offer, with a free check day as the first step.</p></div>
    <div class="p5-ps"><i>03</i><b>90-day pilot</b><p>A small, measured trial in one department, ward or class, with success measures agreed in writing.</p></div>
    <div class="p5-ps"><i>04</i><b>Agreement</b><p>Written terms reviewed by our lawyer: prices, payment days, data consent and no inducements.</p></div>
    <div class="p5-ps"><i>05</i><b>Scale</b><p>Roll out across the organisation, then repeat with the next partner of the same type.</p></div>
   </div></div>
   ${p5ed({f:'s-counter',alt:'the Afya corner counter where partners are welcomed',cap:'where a partner is welcomed',r:1,k:'Stage 02 → 03 · the first meeting and the pilot',h:'Partners meet the <em>advisers</em>, not a brochure.',
     body:`<p>A clinic manager, HR officer or head teacher is invited to the flagship to see the Care Zones, take a free Afya Check and meet the store lead who would manage the account. The visit is more persuasive than any presentation.</p>
      <ul><li><b>Pilot terms are written down.</b> One ward, one department or one school year group for 90 days, with three measures agreed in advance: orders delivered on time, staff or patients using the offer, and invoices paid on the agreed day.</li>
      <li><b>Prices stay the store’s prices.</b> Partners pay the same published price as households; volume brings convenience and a single invoice, not hidden discounts that the customer-funded model cannot carry.</li>
      <li><b>The system handles administration.</b> Recurring orders, delivery days and monthly statements run on the same connected system, so a new partner adds work for the packer and rider, not a new office.</li></ul>`})}
   <div class="p5-grid2" style="margin-top:16px">
    <div class="p5-card"><span class="k">Rules we keep</span><h4>Clean partnerships</h4><p>No payment to clinics or health workers for sending patients. No interference with prescribing. Patient data is shared only with written consent. Every agreement is reviewed for compliance with Pharmacy Council and TMDA rules before signing (see 4.5).</p></div>
    <div class="p5-card"><span class="k">Who does it</span><h4>Founders first, then a B2B lead</h4><p>In year 1 the founders and the store lead open doors themselves. When institutional orders justify it, a part-time B2B coordinator is added; the one connected system handles invoices, recurring orders and delivery schedules.</p></div>
   </div>`],
  ['The experience · what a partner sees',`
   <p class="s11lead">Two touchpoints, shown as mock-ups. <span class="tagi">Illustrative mock-ups · no real partner names</span></p>
   <div class="p5-grid2">
    <figure class="p5-mk" style="margin:0"><div class="p5-slip"><small>Given at discharge · example maternity ward</small><h5>Your first weeks at home</h5>
     <div class="ln"><span>Mama na mtoto essentials</span><b>Checklist inside</b></div><div class="ln"><span>Where</span><b>Afya Basics store or same-day delivery</b></div><div class="ln"><span>Order</span><b>WhatsApp, app or walk in</b></div><div class="ln"><span>Free</span><b>Afya Check for mother</b></div>
     <div class="ft">Products are registered and sold at one honest price. This slip is information only; follow your midwife’s advice.</div></div>
     <figcaption>Clinic & maternity · referral slip</figcaption></figure>
    <figure class="p5-mk" style="margin:0"><div class="p5-dash"><div class="hd"><b>Afya Kazini</b><span>Example company · October</span></div>
     <div class="tiles"><div><small>Staff kits</small><b>80</b></div><div><small>Delivered</small><b>78</b></div><div><small>Next check day</small><b>14 Nov</b></div></div>
     <div class="rows"><div><span>First-aid kits refilled</span><b>6 / 6</b></div><div><span>Invoice · one per month</span><b>Paid</b></div><div><span>Staff who swapped a brand</span><b>12</b></div></div></div>
     <figcaption>Employer · monthly wellness dashboard</figcaption></figure>
   </div>`],
  ['How business revenue is counted, with a worked example',`<div class="p5prose">
   <p>The model calculates business revenue as ${fm.pct(G.b2b_share)} on top of what the stores sell to households. Because the published yearly revenue already includes it, the business share of a year’s revenue is the total multiplied by ${fm.pct(G.b2b_share)} and divided by ${(1+G.b2b_share).toFixed(2)}.</p>
   <div class="p5x"><span>Worked example · year 5, base case</span><p>Total revenue in year 5 is ${fm.auto(B.years[4].revenue)} across ${B.years[4].stores} stores. Business revenue is ${fm.auto(B.years[4].revenue)} × ${G.b2b_share} ÷ ${(1+G.b2b_share).toFixed(2)} = ${fm.auto(b2b(5))}. At an average box of ${tz(A.members.avg_box)}, that equals about ${nf(b2b(5)/12/A.members.avg_box)} staff or patient boxes a month across the network, or roughly ${nf(b2b(5)/12/A.members.avg_box/B.years[4].stores)} per store. A single employer with 80 staff on the Afya Kazini service, or one maternity ward referring new mothers, would supply a large part of one store’s share.</p></div>
   <p>The partner types are not equal. Schools, hotels and employers decide quickly and order on a fixed rhythm (school terms, hotel rooms, staff numbers), so they are approached first. Insurers and large clinics take longer to sign but bring larger, steadier volumes. Diaspora associations bring households that pay from abroad, often for a parent’s box. The matrix below scores each type on how soon it brings revenue, how easy it is to win and how much it is worth.</p>
   <p>Two rules protect the business. No partner may exceed about one-fifth of business revenue, so the loss of one client cannot damage the network. And partners pay the same published price as households: what they gain is reliability, one invoice and delivery on a fixed day, not hidden discounts the customer-funded model could not carry.</p></div>`],
  ['Try it · the partner-value matrix',`
   <p class="s11lead">Partner value depends on the stage of the business. Select a priority and the ranking updates; select a partner row for detail. Each cell is our own score from 1 (weak) to 5 (strong), to be tested in real meetings.</p>
   <div class="p5-btns" id="p5pri">${PRI.map((x,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${x[0]}</button>`).join('')}</div>
   <div class="p5-mx"><div class="p5-mxt" role="table" aria-label="Partner value matrix">
    <div class="p5-mxr hd" role="row"><span role="columnheader">Partner</span>${PMXH.map(h=>`<span role="columnheader">${h}</span>`).join('')}</div>
    ${PARTNERS.map(x=>`<div class="p5-mxr" role="row" tabindex="0" data-k="${x.k}"><b role="cell">${x.n}</b>${PMX[x.k].map(v=>`<span class="p5-dot" role="cell" aria-label="${v} of 5"><i style="background:rgba(95,191,143,${(.06+v*.15).toFixed(2)});color:${v>=4?'#021510':'#effaf5'}">${v}</i></span>`).join('')}</div>`).join('')}
   </div>
   <div class="p5-mxd" id="p5mxd"></div></div>
   <p class="note">Speed = how soon first revenue arrives · Ease = how easy the partner is to win · our assessment, not data</p>`],
  ['The numbers · B2B revenue',`
   <p class="s11lead">The master model adds business-to-business sales of <b>${fm.pct(G.b2b_share)} on top of store revenue</b> from year 2 (year 1 is set at zero, so the first store must prove itself on household sales alone). Move the slider to see B2B revenue by year and an illustrative split by partner type.</p>
   <div class="p5-b2b">
    <div class="p5-yr"><div class="y"><b id="p5by">Year 5</b><span id="p5bs">10 stores</span></div><label for="p5b">Plan year<input type="range" id="p5b" min="2" max="12" value="5"></label>
     <div class="p5-btns" id="p5bsc" style="margin:14px 0 0">${['base','best','down'].map((k,i)=>`<button type="button" data-k="${k}" class="${i?'':'on'}">${MODEL.inputs.scenarios[k].label}</button>`).join('')}</div>
     <div class="p5-kp" style="margin-top:14px"><div><small>B2B revenue</small><b id="p5bv">–</b></div><div><small>Share of total</small><b id="p5bp">–</b></div><div><small>Staff boxes / month equiv.</small><b id="p5bb">–</b></div><div><small>Total revenue</small><b id="p5bt">–</b></div></div></div>
    <div class="p5-card"><span class="k">Illustrative split by partner type ${PE}</span><div class="p5-stack" id="p5stk">${PARTNERS.map((x,i)=>`<span style="flex:${MIX[x.k]};background:${['#d9b56e','#c9b8ff','#5fbf8f','#f2c96b','#ffb36b','#ff9b87'][i]}" title="${esc(x.n)}"></span>`).join('')}</div>
     <div class="p5-budl" id="p5stl" style="grid-template-columns:1fr 1fr"></div>
     <p class="p5-p" style="margin-top:14px;font-size:.86rem">“Staff boxes per month” converts the employer share into an equivalent number of ${tz(A.members.avg_box)} boxes, to make the scale tangible.</p></div>
   </div>
   <div class="nums" style="margin-top:16px">
    <div class="num"><b>${fm.pct(G.b2b_share)}</b><span>B2B on top of store revenue (model)</span></div>
    <div class="num"><b>${fm.m(b2b(2))}</b><span>B2B revenue in year 2 · base</span></div>
    <div class="num"><b>${fm.auto(b2b(5))}</b><span>B2B revenue in year 5 · base</span></div>
    <div class="num"><b>${fm.auto(b2b(12))}</b><span>B2B revenue in year 12 · base</span></div>
    <div class="num g"><b>0</b><span>agreements signed today</span></div>
   </div><p class="note">B2B revenue = MODEL years revenue × b2b_share ÷ (1 + b2b_share) · partner split is a planning estimate derived for this section</p>`],
  ['Risks and our answer',risks([
   ['Institutions decide slowly; a pilot can take months.','B2B is excluded from the year-1 figures. Pilots are small, run for 90 days and begin with the fastest buyers (schools, hotels, employers) while insurer discussions mature.'],
   ['Insurers and large clients may pay late, tying up cash.','Start with member-paid offers promoted by the partner. Invoiced clients get written payment days (for example 30 days), credit limits set in the system, and deliveries pause automatically when an invoice is overdue.'],
   ['Referral partnerships could look like inducements.','No payment per patient, no influence on prescribing, written consent for any data sharing, and a legal review of every agreement against Pharmacy Council and TMDA rules before signing.'],
   ['One big client could become too important.','Planning rule: no single partner above about one-fifth of B2B revenue, and B2B kept to a modest share of total sales in the model ('+fm.pct(G.b2b_share)+').']])]
  ],
  takeaway:'Partners let one store <b>serve whole communities at little extra marketing cost</b>. The model keeps B2B at a modest '+F().pct(I().growth.b2b_share)+' and <b>counts no partner as signed</b>, so every agreement won is upside.',
  doors:['s5-1','s3-7','s6-1','s7-3'],
  sources:srcList(['uhi','rem','uhis'])});}

function init52(){const A=I(),fm=F(),G=A.growth;
 const mxd=$('p5mxd');if(mxd){let pri=0,sel=null;const rows=[...document.querySelectorAll('.p5-mxr[data-k]')];
  const draw=()=>{const w=PRI[pri][1];const sc=PARTNERS.map(x=>({x,v:PMX[x.k].reduce((a,v,i)=>a+v*w[i],0)/w.reduce((a,b)=>a+b,0)})).sort((a,b)=>b.v-a.v);
   if(!sel)sel=sc[0].x.k;const P=PARTNERS.find(x=>x.k===sel);
   rows.forEach(r=>r.classList.toggle('on',r.dataset.k===sel));
   mxd.innerHTML=`<span class="hud g">Priority now · ${esc(PRI[pri][0])}</span><ol>${sc.map(o=>`<li class="${o.x.k===sel?'on':''}"><span>${o.x.n}</span><b>${o.v.toFixed(1)}</b></li>`).join('')}</ol>
    <h4 style="margin-top:18px">${P.n}</h4><p class="p5-p" style="margin:8px 0 0;font-size:.88rem"><b>Revenue model.</b> ${P.rev}</p><span class="p5-badge"><i></i>Target · no agreement yet</span>`};
  document.querySelectorAll('#p5pri button').forEach(b=>b.onclick=()=>{pri=+b.dataset.i;sel=null;document.querySelectorAll('#p5pri button').forEach(x=>x.classList.toggle('on',x===b));draw()});
  rows.forEach(r=>{r.onclick=()=>{sel=r.dataset.k;draw()};r.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();sel=r.dataset.k;draw()}}});draw()}
 const sl=$('p5b');if(!sl)return;let sc='base';const cols=['#d9b56e','#c9b8ff','#5fbf8f','#f2c96b','#ffb36b','#ff9b87'];
 const up=()=>{const y=+sl.value,Y=MODEL.get(sc).years[y-1];const b=Y.revenue*G.b2b_share/(1+G.b2b_share);
  $('p5by').textContent='Year '+y;$('p5bs').textContent=Y.stores+' stores · '+MODEL.inputs.scenarios[sc].label;
  $('p5bv').textContent=fm.auto(b);$('p5bp').textContent=fm.pct(b/Y.revenue);$('p5bt').textContent=fm.auto(Y.revenue);
  $('p5bb').textContent=nf(b*MIX.emp/12/A.members.avg_box);
  $('p5stl').innerHTML=PARTNERS.map((x,i)=>`<div><i style="background:${cols[i]}"></i>${x.sh} · <b>${fm.auto(b*MIX[x.k])}</b></div>`).join('')};
 sl.oninput=up;document.querySelectorAll('#p5bsc button').forEach(bt=>bt.onclick=()=>{sc=bt.dataset.k;document.querySelectorAll('#p5bsc button').forEach(x=>x.classList.toggle('on',x===bt));up()});up()}

/* ======================================================================
   5.3 COMPETITION AND OUR MOAT
   ====================================================================== */
const CRIT=['Speed','Trust','Price clarity','Advice','Membership','Delivery','Diaspora'];
const COMP=[
 {n:'Traditional pharmacies & ADDOs',s:[3,3,2,3,1,1,1],x:48,y:52,g:'Everywhere and close to home; trained dispensers; the habit of a lifetime.',w:'Queues at a small counter, prices that vary by shop, little room for advice, no plan for next month.'},
 {n:'Supermarket health aisles',s:[4,3,5,2,1,2,1],x:32,y:60,g:'Printed prices, card payment, one trip with the weekly shop.',w:'Narrow range, no one to ask which device fits, nothing for conditions or recovery.'},
 {n:'Informal sellers',s:[4,1,1,1,1,2,1],x:10,y:68,g:'On the street, at the bus stand, very cheap, will negotiate.',w:'Cannot prove registration or expiry; the riskiest place to buy health products.'},
 {n:'Online marketplaces & delivery apps',s:[3,2,4,1,1,4,2],x:24,y:82,g:'Order from the sofa, delivery to the door, prices on screen.',w:'Hard to know who the seller is, no advice or check, no relationship after the sale.'},
 {n:'Hospital pharmacies',s:[1,5,3,4,1,1,1],x:84,y:20,g:'High trust and qualified staff next to the doctor.',w:'Long queues, opening hours tied to the hospital, a trip across the city for a refill.'}];
const AFYA={n:'Afya Basics (target)',s:[5,5,5,4,5,4,5],x:86,y:86};
const SWITCH=()=>[
 ['The wrong product last time','A father bought strips that did not fit his meter. At Afya Basics the meter is recorded on his account and the correct strips arrive every month.'],
 ['A queue for a simple question','A mother waited 25 minutes to ask about her baby’s fever. Here the adviser is on the floor, not behind a counter, and the free check comes first.'],
 ['Not sure it is genuine',`About 1 in 10 medical products in low- and middle-income countries is substandard or falsified ${C('who_sf',3)}. “Registered products only” is a reason to switch.`],
 ['Running out at night','Strips or nappies run out on a Sunday night. Members do not reach that point: the box arrives first.'],
 ['Caring from far away','A son abroad cannot verify that his money became care. With Afya he pays for the box and receives the delivery photo.'],
 ['Price changes from shop to shop','One published price in store, in the app and on WhatsApp, with 4–5 brands in the same range, so the lower-cost choice is still a safe one.']];

function posSVG(){const W=560,H=400,px=x=>60+x/100*(W-90),py=y=>H-50-y/100*(H-80);
 const all=[...COMP.map((c,i)=>({...c,c:['#ff9b87','#d9b56e','#ff7b9c','#c9b8ff','#ffb36b'][i]})),{...AFYA,c:'#f2c96b'}];
 return `<svg class="p5-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Positioning map. Horizontal axis: advice and trust. Vertical axis: convenience, meaning speed, delivery and planning. Afya Basics aims for the top-right corner, high on both.">
 <defs><radialGradient id="p5pg"><stop offset="0" stop-color="rgba(242,201,107,.28)"/><stop offset="1" stop-color="rgba(242,201,107,0)"/></radialGradient></defs>
 <rect x="${px(50)}" y="${py(100)}" width="${px(100)-px(50)}" height="${py(50)-py(100)}" fill="rgba(95,191,143,.05)"/>
 <circle cx="${px(86)}" cy="${py(86)}" r="70" fill="url(#p5pg)"/>
 ${[0,25,50,75,100].map(v=>`<line x1="${px(0)}" x2="${px(100)}" y1="${py(v)}" y2="${py(v)}" stroke="rgba(169,196,184,.08)"/><line y1="${py(0)}" y2="${py(100)}" x1="${px(v)}" x2="${px(v)}" stroke="rgba(169,196,184,.08)"/>`).join('')}
 <line x1="${px(0)}" x2="${px(100)}" y1="${py(0)}" y2="${py(0)}" stroke="rgba(242,201,107,.5)"/><line x1="${px(0)}" x2="${px(0)}" y1="${py(0)}" y2="${py(100)}" stroke="rgba(242,201,107,.5)"/>
 <text x="${px(100)}" y="${py(0)+30}" text-anchor="end" fill="#f2c96b" style="font:500 10px var(--f-hud);letter-spacing:.14em">ADVICE &amp; TRUST →</text>
 <text transform="translate(${px(0)-34} ${py(0)}) rotate(-90)" fill="#f2c96b" style="font:500 10px var(--f-hud);letter-spacing:.14em">CONVENIENCE: SPEED · DELIVERY · PLANNING →</text>
 <text x="${px(98)}" y="${py(98)}" text-anchor="end" fill="rgba(95,191,143,.55)" style="font:500 9px var(--f-hud);letter-spacing:.14em">TARGET POSITION</text>
 ${all.map(c=>{const isA=c===all[all.length-1];const r=isA?16:11;const lx=isA?px(c.x)+r:c.x>70?px(c.x)-r-8:px(c.x)+r+8,anc=c.x>70?'end':'start';const ly=isA?py(c.y)+r+16:py(c.y)+4;
  return `<g><circle cx="${px(c.x)}" cy="${py(c.y)}" r="${r}" fill="${c.c}" fill-opacity="${isA?.95:.25}" stroke="${c.c}" stroke-width="${isA?2:1.5}"/>${isA?`<circle cx="${px(c.x)}" cy="${py(c.y)}" r="5" fill="#04140f"/>`:''}<text x="${lx}" y="${ly}" text-anchor="${anc}" fill="${isA?'#ffe7a8':'#effaf5'}" style="font:${isA?800:600} ${isA?12:11}px var(--f-display)">${esc(c.n)}</text></g>`}).join('')}
</svg>`}

function sec53(s,p,pv,nx){const A=I(),fm=F(),G=A.growth;
 return secShell({s,p,pv,nx,cls:'p5',img:'img/real-p-sold-out.webp',imgAlt:'Concept image of a small shop with half-empty shelves, the experience most families know today',
  h1:'Many outlets sell health products.',em:'None plans for the household.',
  lede:'Households buy health products from drug shops, supermarkets, street sellers, apps and hospital pharmacies. Each serves one need well. Afya Basics is designed to cover the full job: advise, sell at one published price, deliver and plan the next month.',
  mods:[
  ['In summary · where Afya Basics competes',`<div class="p5prose">
   <p class="p5sum">Tanzanian households already buy health products from more than 17,400 accredited drug shops, from pharmacies, supermarkets, street sellers, apps and hospital pharmacies. Each serves one need well. None plans the household’s health month by month. That is the position Afya Basics is built to hold.</p>
   <p>The market is large but split into thousands of single small outlets ${C('addo',1)}. Most are built for an acute need, such as a fever or a cough, not for the long-term care a family manages at home: the monthly test strips, nappies in the next size, a parent’s mobility aids. Afya Basics does not try to be the cheapest drug shop or the biggest supermarket. It competes on four things together: products that are provably registered, one published price in every channel, advice from trained advisers, and a plan that brings the household’s supplies before they run out.</p>
   <p>This section compares Afya Basics with five types of outlet, shows the position no one holds, explains the moments when households switch, and sets out the advantages that become harder to copy as the network grows.</p></div>`],
  ['The problem · a large market split into small outlets',`
   ${plain([['The market is crowded.',`Tanzania has more than 17,400 accredited drug dispensing outlets (ADDOs) ${C('addo',1)}, and research describes them as the principal source of medicines in the country ${C('plos',2)}. An older case study counted more than 600 retail pharmacies in Dar es Salaam alone ${C('gff',4)}.`],
     ['It is also fragmented.','Almost every outlet is a single small shop, and none is built to record what a household bought, plan the next month or deliver across the city.'],
     ['Most outlets are made for acute needs.',`ADDOs are designed to treat simple illness and refer complex cases; research found they can stock only a small part of the medicines used for long-term conditions such as hypertension ${C('plos',2)}. Households managing a long-term condition need a different model.`],
     ['Trust is uneven.',`About 1 in 10 medical products in low- and middle-income countries is substandard or falsified ${C('who_sf',3)}. A brand that can prove “registered only” has an opening.`]])}
   ${p5ed({f:'real-empty-shelf',alt:'an empty shelf in a small shop, the item a family came for is out of stock',cap:'today · the shelf is empty again',k:'What fragmentation feels like',h:'One family, <em>four shops</em>, one Saturday.',
     body:`<p>Take a mother in Kinondoni with a toddler and a father living with diabetes. On a normal Saturday she buys nappies and wipes at the supermarket, asks the drug shop on the corner about the child’s cough, crosses town to the hospital pharmacy for the test strips that fit her husband’s meter, and picks up soap and sanitary pads from a street seller on the way home.</p>
      <p>Each shop does its own job reasonably well. <b>None of them knows the whole household</b>: no one records the meter model, no one warns her that the strips will run out on the 20th, no one delivers. The cost is paid in bus fares, time and missed doses, and it falls mostly on women.</p>
      <p>This is the gap Afya Basics competes in. The aim is not to be a cheaper drug shop or a larger supermarket, but <b>the one place that plans a household’s health essentials</b>, in store, on WhatsApp and at the door.</p>`})}
   <p class="oneline" style="margin-top:30px">We do not need to beat every competitor on every measure. We need to own <b>the job no one does</b>: <b>planned, trusted health at home</b>.</p>`],
  ['Our answer · five competitor types',`
   <p class="s11lead">We compare against <b>types</b> of outlet, not named companies. Each has genuine strengths, and some households will always prefer them.</p>
   <div class="p5-ct">${COMP.map(c=>`<article class="p5-card"><h4>${c.n}</h4><span class="g">${c.g}</span><span class="w">${c.w}</span></article>`).join('')}</div>`],
  ['How it works · the positioning map',`
   <div class="p5-grid2" style="align-items:center">
    <div class="p5-map">${posSVG()}</div>
    <div><h3 class="p5-sub">The unoccupied position</h3><p class="p5-p">Each outlet type is placed on two questions households ask: <b>“Can I trust the advice and the product?”</b> and <b>“Is it convenient: fast, delivered, planned?”</b></p>
     <p class="p5-p">Hospital pharmacies score high on trust but low on convenience. Apps, supermarkets and street sellers score on convenience but low on trust and advice. Drug shops sit in the middle on both. <b>The position that is high on both is unoccupied.</b> Afya Basics is designed to hold it: an adviser and a free check for trust; scan-and-pay, same-day delivery and a self-planning box for convenience.</p>
     <p class="note">Positions are our assessment for planning, to be validated by mystery shopping in Dar es Salaam before launch</p></div>
   </div>`],
  ['The experience · the counter today, the Afya model',`
   <div class="duo">
    <figure class="shot"><img src="img/real-p-sold-out.webp" width="1680" height="944" loading="lazy" alt="Concept image of a small shop with gaps on the shelves"><figcaption>Today · a small shop, gaps on the shelves, no record of the household</figcaption></figure>
    <figure class="shot"><img src="img/interior.webp" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Basics store interior with open Care Zones and the Afya Check kiosk"><figcaption>Concept · open Care Zones, adviser on the floor, free check by the door</figcaption></figure>
   </div>
   <p class="p5-p" style="margin-top:6px">The difference is operational, not decorative. In the first picture the customer queues to ask a question. In the second she goes to her Care Zone, sees one price on a digital label, asks for advice if she wants it and pays by phone. <b>The layout is itself a competitive advantage</b>: it lets a small team serve many customers well.</p>`],
  ['Try it · the comparison matrix',`
   <p class="s11lead">Select a column to rank all outlet types on that criterion, or select a competitor type for a head-to-head comparison. Scores run from 1 (weak) to 5 (strong) and are our planning assessment; Afya Basics’ scores are <b>targets to be proven</b>, not results.</p>
   <div class="p5-tblw"><table class="p5-tbl p5-cm" id="p5cm"><thead><tr><th>Outlet type</th>${CRIT.map((c,i)=>`<th class="c" data-c="${i}"><button type="button">${c}</button></th>`).join('')}<th class="n">Total</th></tr></thead><tbody></tbody></table></div><span class="p5-scrollhint">Swipe the table sideways to see all seven criteria →</span>
   <div class="p5-h2h"><div><div class="p5-btns" id="p5h2b" style="margin:0">${COMP.map((c,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}">${c.n.split(' &')[0]}</button>`).join('')}</div>
     <p class="p5-p" id="p5h2t" style="margin-top:14px"></p></div>
    <div class="p5-h2hb" id="p5h2"></div></div>
   <p class="note">Our assessment · to be validated by field research and customer interviews · no specific company is scored</p>`],
  ['Proof from the region · a health chain that scaled',`<div class="p5prose">
   <p>The strongest evidence that organised health retail can grow in East Africa comes from Kenya. Goodlife Pharmacies had 19 stores when the investor LeapFrog joined in November 2016; by July 2025 it had 148 stores in Kenya and Uganda, employed 593 full-time staff and served more than three million customers ${C('gl',5)}. Its growth was financed by private equity together with development-finance lenders such as IFC and Proparco ${C('glp',6)}.</p>
   <div class="p5x"><span>What the comparison shows</span><p>Goodlife multiplied its network by 7.8 in under nine years. Afya Basics plans to go from 1 to ${G.stores_by_year[11]} stores in twelve years, a slower pace that starts from a single store and is gated at every stage. The comparison does not prove that Afya Basics will succeed; it shows that customers in the region do move from small independent outlets to an organised, trusted chain, and that investors and lenders finance that move.</p></div>
   <p>It also names a risk. A chain like Goodlife could enter Tanzania. Afya Basics’ answer is to be different, not only earlier: Goodlife is a pharmacy chain built around medicines, while Afya Basics is built around the household’s monthly plan, the free check, the Afya Box and delivery, with medicines supplied through a licensed partner. A pharmacy chain entering Tanzania could even become a partner pharmacy rather than a rival.</p></div>`],
  ['Why customers switch · six moments',`
   <p class="s11lead">People rarely change supplier because of an advertisement. They change after a poor experience. Afya Basics is designed around these moments. <span class="tagi">Illustrative</span></p>
   ${p5ed({f:'real-empty-shelf',alt:'an empty shelf where the infant formula should be',cap:'the moment a family is ready to switch',r:1,k:'Moment zero · “Hatuna, umeisha”',h:'“We don’t have it; it’s finished.” <em>That</em> is when households switch.',
     body:`<p>A mother queues with her baby to buy the infant formula her clinic recommended. At the counter she is told it is out of stock and is offered another brand that no one can explain. She leaves with nothing, or with a product she is unsure of.</p>
      <p>A single stock-out loses a customer faster than any competitor’s advertising. Afya Basics is designed to prevent it: the system monitors the top 100 items against a stock-out target below 2%, 4–5 registered brands in the same price range provide a safe alternative the adviser can explain, and members do not queue at all because the box arrives before supplies run out.</p>`,
     facts:[['4–5','registered brands per item, same price range'],['< 2%','stock-out target on the top 100 items'],['0','queues for members · the box comes home']]})}
   <div class="p5-sw">${SWITCH().map((x,i)=>`<div class="p5-card"><span class="k">Moment 0${i+1}</span><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div>`],
  ['Our moat · seven advantages that compound',`
   <p class="s11lead">Any shop can paint its walls green or add a blood-pressure machine. What is difficult to copy is the system underneath, and it strengthens as the network grows. Select a year to see how each element develops under the plan.</p>
   <div class="p5-btns" id="p5my">${[1,3,6,12].map((y,i)=>`<button type="button" data-y="${y}" class="${i?'':'on'}">Year ${y}</button>`).join('')}</div>
   <div class="p5-moat" id="p5moat"></div>
   <p class="note">Strength bars are an illustrative index computed from MODEL years (stores, members); not a forecast of market share</p>`],
  ['The numbers · the market and our position',`
   <div class="nums">
    <div class="num"><b>17,400+</b><span>accredited drug dispensing outlets in Tanzania ${C('addo',1)}</span></div>
    <div class="num"><b>1 in 3</b><span>acutely ill Tanzanians go to an ADDO first ${C('addo',1)}</span></div>
    <div class="num"><b>~${nf(A.product_families)}</b><span>Afya product families, ${A.brands_per_item} brands each</span></div>
    <div class="num"><b>${A.check.quick_seconds} s</b><span>free Afya Check at the door · not offered free by any outlet type</span></div>
    <div class="num g"><b>${nf(G.members_per_store_mature)}</b><span>members per mature store (model) · the data moat</span></div>
   </div><p class="note">Market facts cited · Afya figures from MODEL · planning estimates</p>`],
  ['Risks and our answer',risks([
   ['Existing pharmacies copy the free check or add delivery.','They can copy individual elements; replicating the whole system (membership, saved baskets, Afya Choice, packing hub, one price across channels) takes years and capital. Better service in the market is welcome; our advantage is the integrated system, not a single device.'],
   ['Informal sellers will always be cheaper.','We do not compete on the lowest price. We offer 4–5 registered brands in the same range so the cheaper choice is still safe, and we sell what informal sellers cannot: proof, advice and planning.'],
   ['A well-funded online platform enters health delivery.','Online alone cannot offer a free check, an adviser or a store households can visit. Physical stores lower delivery cost (stock is already nearby) and build trust that an app cannot.'],
   ['Competitors can sell medicines; Afya Basics does not.','Medicines reach Afya members through a licensed partner pharmacy under a written agreement (section 4.5): the pharmacist sells and dispenses, the sealed bag travels with the box. Members get one delivery; Afya keeps its licence simple and its site choice open.']])]
  ],
  takeaway:'The market is <b>large but fragmented into single shops</b>. Afya Basics targets the unoccupied position, <b>trusted and convenient</b>, and builds a moat of membership data and network density that grows with every store.',
  doors:['s1-2','s3-3','s4-5','s5-4'],
  sources:srcList(['addo','plos','who_sf','gff','gl','glp'])});}

function moatRows(y){const A=I(),G=A.growth,Y=MODEL.get('base').years[y-1];const st=Y.stores,mem=Y.members,cl=v=>Math.max(.06,Math.min(1,v));
 return [
  ['Membership data','Every box, swap and reading (with consent) shows what each household will need next. A new entrant starts with none of this data.',cl(mem/30000),nf(mem)+' member households'],
  ['One connected system','Till, stock, members, delivery, check station and finance on one platform. It lets a small team run a store; replicating it takes years of development.',cl(.35+y*.055),st>1?'Same system in all '+st+' stores':'Running in store #1'],
  ['Brand trust','“Registered products only, one published price, free check”, demonstrated month after month. Trust compounds and cannot be bought quickly.',cl(.15+y*.07),y<3?'Earning it in Dar es Salaam':y<6?'Known across Dar es Salaam':'A national name'],
  ['Curated range','About '+nf(A.product_families)+' product families, 4–5 registered brands each, selected by need. Purchasing power grows with every store.',cl(.3+st/60),st>1?st+' stores buying together':'One store’s purchasing power'],
  ['Free check station','Readings at the door attract customers before they know they need us, and give them a reason to return every month.',cl(.25+st/55),st+' check station'+(st>1?'s':'')],
  ['Packing hub','Central packing from locked choices makes delivery cheap and reliable, at a scale a single shop cannot afford.',y>=2?cl(.3+st/50):.08,y>=2?'Hub live from the second store':'Packed in store #1 until year 2'],
  ['Network density','More stores in one city mean shorter rider routes, faster delivery and stock closer to customers. Each new store strengthens the others.',cl(st/G.stores_by_year[11]),st+' of '+G.stores_by_year[11]+' planned stores']];}

function init53(){const tb=document.querySelector('#p5cm tbody');
 if(tb){let sortC=-1,sel=0;const rows=[...COMP.map((c,i)=>({...c,i})),{...AFYA,i:'a'}];
  const pips=(v,a)=>`<span class="p5-hc${a?' a':''}" aria-label="${v} of 5" style="--a:${(.05+v*.15).toFixed(2)}">${v}</span>`;
  const draw=()=>{const r=[...rows];if(sortC>=0)r.sort((a,b)=>b.s[sortC]-a.s[sortC]);
   tb.innerHTML=r.map(x=>`<tr class="${x.i==='a'?'afya':''}${x.i===sel?' sel':''}"><td>${esc(x.n)}</td>${x.s.map((v,k)=>`<td class="c${k===sortC?' on':''}">${pips(v,x.i==='a')}</td>`).join('')}<td class="n">${x.s.reduce((a,b)=>a+b,0)}</td></tr>`).join('');
   document.querySelectorAll('#p5cm th[data-c]').forEach(th=>th.classList.toggle('on',+th.dataset.c===sortC));
   const c=COMP[sel];$('p5h2').innerHTML=`<span class="hud g">Head to head</span>${CRIT.map((k,i)=>`<div class="p5-hb"><span>${k}</span><div class="bars"><span class="a" style="width:${AFYA.s[i]*20}%"></span><span class="c" style="width:${c.s[i]*20}%"></span></div></div>`).join('')}<div class="p5-legend"><span><i style="background:var(--gold)"></i>Afya Basics (target)</span><span><i style="background:rgba(217,181,110,.7)"></i>${esc(c.n)}</span></div>`;
   const gaps=CRIT.map((k,i)=>[k,AFYA.s[i]-c.s[i]]).sort((a,b)=>b[1]-a[1]);
   $('p5h2t').innerHTML=`<b>${esc(c.n)}.</b> Strong at: ${esc(c.g.toLowerCase())} <b>Biggest gaps we aim to close:</b> ${gaps.slice(0,3).map(g=>g[0].toLowerCase()).join(', ')}. ${gaps[gaps.length-1][1]<=0?`<b>Where they match or beat us:</b> ${gaps.filter(g=>g[1]<=0).map(g=>g[0].toLowerCase()).join(', ')}.`:''}`};
  document.querySelectorAll('#p5cm th[data-c] button').forEach(b=>b.onclick=()=>{const c=+b.parentElement.dataset.c;sortC=sortC===c?-1:c;draw()});
  document.querySelectorAll('#p5h2b button').forEach(b=>b.onclick=()=>{sel=+b.dataset.i;document.querySelectorAll('#p5h2b button').forEach(x=>x.classList.toggle('on',x===b));draw()});draw()}
 const m=$('p5moat');if(m){const draw=y=>{m.innerHTML=moatRows(y).map(r=>`<div class="p5-mt"><b>${r[0]}</b><p>${r[1]}</p><div><div class="bar"><i style="width:${Math.round(r[2]*100)}%"></i></div><small>Year ${y} · ${esc(r[3])}</small></div></div>`).join('')};
  document.querySelectorAll('#p5my button').forEach(b=>b.onclick=()=>{document.querySelectorAll('#p5my button').forEach(x=>x.classList.toggle('on',x===b));draw(+b.dataset.y)});draw(1)}}

/* ======================================================================
   5.4 THE ROAD TO TSH BILLIONS
   ====================================================================== */
const CITIES=[['Dar es Salaam',39.28,-6.82,1,4],['Arusha',36.68,-3.37,7,1.5],['Dodoma',35.75,-6.17,7,1.2],['Mwanza',32.90,-2.52,10,1.5],['Zanzibar',39.20,-6.16,10,1],['Mbeya',33.45,-8.90,14,1],['Tanga',39.10,-5.07,14,.8],['Morogoro',37.66,-6.82,14,.8],['Moshi',37.34,-3.35,14,.7],['Nairobi',36.82,-1.29,23,3],['Kampala',32.58,.35,23,2.2]];
const GATES=[
 ['Store #1 proves the model','Open store 2 + packing hub',[ 'Store #1 profitable (positive monthly profit) for 3 months in a row','150+ Afya Box members and churn at or below plan','Check-to-purchase and basket within 10% of the model','Daily 21:00 report and cash-up running without founders on site']],
 ['Two stores, one system','Build the Dar es Salaam network',['Store 2 reaches store #1’s month-6 sales in 6 months or less','Packing hub delivers 95%+ of boxes on the planned day','Head-office costs within plan; one system runs both stores','First B2B pilots completed']],
 ['A Dar network','Open Arusha & Dodoma',['All Dar stores EBITDA-positive after their ramp year','Store opening playbook written and tested (90 days, lease to opening)','A trained store lead ready for each new city','Regional supply and delivery partner checked']],
 ['National chain','All major Tanzanian cities',['Arusha, Dodoma, Mwanza and Zanzibar stores at plan within 2 years','Membership above plan in at least half of stores','Growth round raised for the next openings (6.3)','Board and reporting in place (7.2)']],
 ['East Africa','Nairobi & Kampala pilots',['Tanzanian network profitable after head office','Local licences and product registrations obtained in Kenya and Uganda','Local partner or manager with retail health experience','Pilot stores run 12 months before wider roll-out']]];

function road(sc){return MODEL.get(sc).years}
function stageFor(st){const R=I().growth.regions;let k=0;R.forEach((r,i)=>{if(st>=r[0])k=i});return k}
function alloc(st){const act=CITIES.filter(c=>st>=c[3]);let rem=st;const out=act.map(c=>({c,n:1}));rem-=out.length;if(rem<0){return out.slice(0,st)}
 const wsum=out.reduce((a,o)=>a+o.c[4],0);const share=out.map(o=>rem*o.c[4]/wsum);out.forEach((o,i)=>o.n+=Math.floor(share[i]));let left=st-out.reduce((a,o)=>a+o.n,0);
 const ord=share.map((v,i)=>[v-Math.floor(v),i]).sort((a,b)=>b[0]-a[0]);for(let k=0;k<left;k++)out[ord[k%ord.length][1]].n++;return out}

const LO={'Zanzibar':[12,-8],'Dar es Salaam':[12,16],'Arusha':[-18,4,'end'],'Moshi':[9,-6],'Morogoro':[-16,4,'end'],'Tanga':[10,4]};
const yrAt=n=>I().growth.stores_by_year.findIndex(v=>v>=n)+1;
const CTRY={Nairobi:'Kenya · pilot',Kampala:'Uganda · pilot',Zanzibar:'Tanzania · islands'};
function regHTML(){return `<div class="p5-reg" role="table" aria-label="Stores by city for the selected year">
 <div class="p5-regh" role="row"><span role="columnheader">City</span><span role="columnheader">First store</span><span role="columnheader">Stores open in the selected year</span></div>
 ${CITIES.map((c,i)=>`<div class="p5-regr" role="row" data-i="${i}"><b role="cell">${c[0]}<small>${CTRY[c[0]]||'Tanzania'}</small></b><span class="o" role="cell">Stage at ${c[3]} store${c[3]>1?'s':''}<small>base plan · year ${yrAt(c[3])}</small></span><span class="v" role="cell"><span class="bar"><i></i></span><em>–</em></span></div>`).join('')}
 <div class="p5-regt"><span>All cities</span><b id="p5regt">–</b></div></div>`}

function chartSVG(sc){const Y=road(sc),W=760,H=330,L=64,Rr=14,T=20,Bm=46;const mx=Math.max(...road('best').map(y=>y.revenue))*1.05,mn=Math.min(0,...road('down').map(y=>y.ebitda))*1.3;
 const yv=v=>T+(mx-v)/(mx-mn)*(H-T-Bm),bw=(W-L-Rr)/12;const ticks=[0,10e9,20e9,30e9,40e9,50e9,60e9,70e9,80e9,90e9,100e9].filter(t=>t<=mx);
 return `<svg class="p5-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(MODEL.inputs.scenarios[sc].label)} scenario: revenue and EBITDA for each of 12 years">
 ${ticks.map(t=>`<line x1="${L}" x2="${W-Rr}" y1="${yv(t).toFixed(1)}" y2="${yv(t).toFixed(1)}" stroke="rgba(169,196,184,${t?0.08:0.35})"/><text x="${L-8}" y="${(yv(t)+4).toFixed(1)}" text-anchor="end" fill="#6a8a7d" style="font:500 10px var(--f-hud)">${t?(t/1e9)+'B':'0'}</text>`).join('')}
 ${Y.map((y,i)=>{const x=L+i*bw,rv=yv(y.revenue),z=yv(0),e=yv(y.ebitda);
  return `<g><rect class="bar" x="${(x+bw*.12).toFixed(1)}" y="${rv.toFixed(1)}" width="${(bw*.46).toFixed(1)}" height="${(z-rv).toFixed(1)}" rx="3" fill="url(#p5rg)"/><rect class="bar" x="${(x+bw*.6).toFixed(1)}" y="${Math.min(e,z).toFixed(1)}" width="${(bw*.28).toFixed(1)}" height="${Math.max(1,Math.abs(z-e)).toFixed(1)}" rx="2" fill="${y.ebitda<0?'#ff9b87':'#f2c96b'}"/>
   <text x="${(x+bw*.35).toFixed(1)}" y="${(rv-6).toFixed(1)}" text-anchor="middle" fill="#a9c4b8" style="font:500 9px var(--f-hud)">${(y.revenue/1e9).toFixed(y.revenue<1e10?1:0)}</text>
   <text x="${(x+bw/2).toFixed(1)}" y="${H-26}" text-anchor="middle" fill="#effaf5" style="font:600 10px var(--f-body)">Y${y.year}</text><text x="${(x+bw/2).toFixed(1)}" y="${H-12}" text-anchor="middle" fill="#6a8a7d" style="font:500 9px var(--f-hud)">${y.stores} store${y.stores>1?'s':''}</text></g>`}).join('')}
 <defs><linearGradient id="p5rg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#b5dfc6"/><stop offset="1" stop-color="#0f7a52"/></linearGradient></defs>
</svg>`}

function stairsSVG(){const R=I().growth.regions,W=760,H=250,n=R.length,sw=(W-40)/n;const SH=['Flagship','2nd store + hub','Dar network','Arusha · Dodoma','Mwanza · Zanzibar','Major cities','Nairobi · Kampala','East Africa'];
 return `<svg class="p5-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Eight growth stages from one flagship store to an East African chain of ${R[n-1][0]} stores">
 <defs><linearGradient id="p5sg" x1="0" x2="1"><stop offset="0" stop-color="#0f7a52"/><stop offset="1" stop-color="#f2c96b"/></linearGradient></defs>
 ${R.map((r,i)=>{const h=30+Math.sqrt(r[0]/R[n-1][0])*160,x=20+i*sw,y=H-30-h;const yr=I().growth.stores_by_year.findIndex(v=>v>=r[0])+1;
  return `<g><rect x="${x+3}" y="${y}" width="${sw-6}" height="${h}" rx="8" fill="url(#p5sg)" fill-opacity="${.14+i*.06}" stroke="rgba(242,201,107,${.25+i*.07})"/>
   <text x="${x+sw/2}" y="${y+22}" text-anchor="middle" fill="#ffe7a8" style="font:500 16px var(--f-hud)">${r[0]}</text>
   <text x="${x+sw/2}" y="${y+36}" text-anchor="middle" fill="#a9c4b8" style="font:500 8px var(--f-hud);letter-spacing:.12em">STORE${r[0]>1?'S':''} · Y${yr}</text>
   <text x="${x+sw/2}" y="${H-12}" text-anchor="middle" fill="#effaf5" style="font:600 9.5px var(--f-body)">${esc(SH[i]||r[1])}</text></g>`}).join('')}
</svg>`}


function storeEcon(){const G=I().growth;const r=G.ramp.map(x=>x*G.mature_store_revenue),g=r.map(v=>v*G.store_gm),c=g.map(v=>v-G.store_opex_year);
 const cum=[];let t=-G.new_store_capex;for(let y=0;y<10;y++){t+=c[Math.min(y,2)];cum.push(t)}const pbI=cum.findIndex(v=>v>=0);
 const ord=['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];return {r,g,c,cum,pb:ord[pbI]||'tenth'}}
function cashCurves(){const o={};['base','best','down'].forEach(k=>{let t=0,min=0,minY=1;const c=MODEL.get(k).years.map(y=>{t+=y.ebitda-y.capex;if(t<min){min=t;minY=y.year}return t});o[k]={c,min,minY,need23:c[0]-c[2],need46:c[2]-c[5]}});return o}
function cashSVG(){const C=cashCurves(),W=860,H=300,L=70,R=110,T=20,Bm=40,lo=-3e9,hi=3e9;const x=i=>L+i*(W-L-R)/11,y=v=>T+(hi-Math.max(lo,Math.min(hi,v)))/(hi-lo)*(H-T-Bm);
 const col={base:'#f2c96b',best:'#5fbf8f',down:'#ff9b87'},lab={base:'Base',best:'Best',down:'Downside'};
 const ticks=[-3e9,-2e9,-1e9,0,1e9,2e9,3e9];
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Cumulative cash of the chain over twelve years in three scenarios">
 ${ticks.map(t=>`<line x1="${L}" x2="${W-R}" y1="${y(t)}" y2="${y(t)}" stroke="rgba(169,196,184,${t?0.1:0.45})"/><text x="${L-8}" y="${y(t)+4}" text-anchor="end" style="font:500 10px var(--f-hud);fill:#6a8a7d">${t?(t/1e9)+'B':'0'}</text>`).join('')}
 ${[...Array(12)].map((_,i)=>`<text x="${x(i)}" y="${H-14}" text-anchor="middle" style="font:500 10px var(--f-hud);fill:#a9c4b8">Y${i+1}</text>`).join('')}
 ${(()=>{const ys={};['best','base','down'].forEach(k=>ys[k]=y(C[k].c[11])+4);if(Math.abs(ys.best-ys.base)<16)ys.best=ys.base-16;return ['down','best','base'].map(k=>{const pts=C[k].c.map((v,i)=>x(i).toFixed(1)+','+y(v).toFixed(1)).join(' ');const last=C[k].c[11];return `<polyline points="${pts}" fill="none" stroke="${col[k]}" stroke-width="${k==='base'?3:2}"${k==='base'?'':' stroke-dasharray="6 5"'}/><text x="${W-R+8}" y="${ys[k]}" style="font:600 11px var(--f-body);fill:${col[k]}">${lab[k]}${last>hi?' ↑':last<lo?' ↓':''}</text>`}).join('')})()}
 <circle cx="${x(C.base.minY-1)}" cy="${y(C.base.min)}" r="5" fill="#f2c96b"/><text x="${x(C.base.minY-1)}" y="${y(C.base.min)+20}" text-anchor="middle" style="font:600 11px var(--f-body);fill:#f2c96b">deepest point · year ${C.base.minY}</text>
 </svg><p class="note" style="margin-top:8px">Scale limited to ±TSh 3B · the best case rises above it from year ${C.best.c.findIndex(v=>v>3e9)+1} and the downside falls below it from year ${C.down.c.findIndex(v=>v<-3e9)+1} · before tax, interest, working capital and lease advances</p>`}
function sec54(s,p,pv,nx){const A=I(),fm=F(),G=A.growth,B=road('base'),Bd=road('down'),Bb=road('best');
 const y12=B[11],firstB=B.find(y=>y.revenue>=1e9),capexT=B.reduce((a,y)=>a+y.capex,0);
 const posY=(B.find(y=>y.ebitda>0)||{year:13}).year,dPos=Bd.find(y=>y.ebitda>0);
 const SE=storeEcon(),CC=cashCurves();
 /* external capital estimate: worst cumulative (capex - EBITDA) from year 2 (year 1 is the seed) */
 const gap=sc=>{let c=0,w=0;road(sc).forEach((y,i)=>{if(i===0)return;c+=y.capex-y.ebitda;w=Math.max(w,c)});return w};
 const stg=G.regions.map((r,i)=>{const from=i?G.regions[i-1][0]:0;const yrs=B.filter(y=>y.stores>from&&y.stores<=r[0]);return {r,yrs,capex:yrs.reduce((a,y)=>a+y.capex,0),y0:yrs.length?yrs[0].year:null,y1:yrs.length?yrs[yrs.length-1].year:null}});
 const row=y=>`<tr><td>Year ${y.year}</td><td class="n">${y.stores}</td><td class="n">${y.new_stores}</td><td class="n">${fm.auto(y.revenue)}</td><td class="n${y.ebitda<0?' neg':''}">${fm.auto(y.ebitda)}</td><td class="n">${fm.pct(y.ebitda/y.revenue)}</td><td class="n">${fm.m(y.capex)}</td><td class="n">${nf(y.members)}</td></tr>`;
 return secShell({s,p,pv,nx,cls:'p5',img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics flagship at dusk, the template for every future store',
  h1:G.stores_by_year[11]+' stores in twelve years,',em:'each stage unlocked by evidence.',
  lede:'The twelve-year plan from the master model: one flagship in Dar es Salaam, growing to '+G.stores_by_year[11]+' stores across Tanzania and East Africa. Each stage opens only after the previous stage has met its targets. All figures are planning estimates.',
  mods:[
  ['In summary · how one store becomes a chain',`<div class="p5prose">
   <p class="p5sum">The plan grows Afya Basics from one flagship in Dar es Salaam to ${G.stores_by_year[11]} stores across Tanzania and East Africa in twelve years, reaching ${fm.b(y12.revenue)} of revenue in year 12 in the base case. Every new stage opens only when the stores already open have met written targets, so investors’ capital follows evidence rather than optimism.</p>
   <div class="p5stat"><div><b>${G.stores_by_year[11]}</b><span>stores by year 12, opened in ${G.regions.length} gated stages</span></div><div><b>${fm.b(y12.revenue)}</b><span>revenue in year 12, base case</span></div><div><b>Year ${posY}</b><span>first year the whole chain is profitable before interest and tax (EBITDA)</span></div><div><b>${fm.m(G.new_store_capex)}</b><span>capital to open each new store</span></div><div><b>${(1/(SE.c[2]/G.new_store_capex)).toFixed(1)} years</b><span>for a mature store’s yearly profit to repay its opening capital</span></div><div><b>${fm.auto(gap('base'))}</b><span>outside capital the chain needs after the seed, base case</span></div></div>
   <p>Three questions decide whether the plan is credible, and this section answers each with the numbers. Does one store make money once it is mature? How much capital does the chain need, and where does it come from? And what happens if customers buy less than planned? The answers are: yes, about ${fm.m(SE.c[2])} a year before head office; about ${fm.auto(gap('base'))} beyond the seed, raised in two later rounds and with development-finance debt; and if demand is lower, the gates stop the expansion so the loss is limited to what has already been invested.</p></div>`],
  ['The economics of one store',`<div class="p5prose">
   <p>Every store in the plan follows the same pattern. In its first year it reaches ${fm.pct(G.ramp[0])} of a mature store’s sales, in its second year ${fm.pct(G.ramp[1])}, and from its third year the full ${fm.auto(G.mature_store_revenue)} a year. Its gross profit is ${fm.pct(G.store_gm)} of sales, and its running costs are ${fm.m(G.store_opex_year)} a year, the same as the flagship, including the flagship’s prime-street rent.</p>
   <div class="p5-tblw"><table class="p5-tbl"><thead><tr><th>One new store</th><th class="n">Year 1</th><th class="n">Year 2</th><th class="n">Year 3 and after</th></tr></thead><tbody>
    <tr><td>Sales</td>${SE.r.map(v=>`<td class="n">${fm.auto(v)}</td>`).join('')}</tr>
    <tr><td>Gross profit at ${fm.pct(G.store_gm)}</td>${SE.g.map(v=>`<td class="n">${fm.auto(v)}</td>`).join('')}</tr>
    <tr><td>Running costs</td>${SE.g.map(()=>`<td class="n">− ${fm.m(G.store_opex_year)}</td>`).join('')}</tr>
    <tr><td><b>Store profit before head office</b></td>${SE.c.map(v=>`<td class="n${v<0?' neg':''}"><b>${fm.auto(v)}</b></td>`).join('')}</tr>
    <tr><td>Capital to open the store</td><td class="n">− ${fm.m(G.new_store_capex)}</td><td></td><td></td></tr>
    <tr><td>Cumulative cash from the store</td>${SE.cum.slice(0,3).map(v=>`<td class="n${v<0?' neg':''}">${fm.auto(v)}</td>`).join('')}</tr></tbody></table></div>
   <p>Read across the table: a new store loses money in its first year, makes a small profit in its second, and from its third year earns about ${fm.m(SE.c[2])} a year. It repays its opening capital and first-year loss during its ${SE.pb} year of trading. Once mature, each store returns about ${fm.pct(SE.c[2]/G.new_store_capex)} a year on the ${fm.m(G.new_store_capex)} invested in it.</p>
   <div class="p5x"><span>The most important lever · rent</span><p>The model charges every store the flagship’s rent of ${fm.m(A.opex_month.rent)} a month, ${fm.m(A.opex_month.rent*12)} a year. Most later stores will be neighbourhood stores on secondary streets. At the start-small estimate of about US$14 per m² a month, a 180 m² neighbourhood store would pay about ${fm.m(180*14*A.meta.fx_usd)} a month. That would add about ${fm.m((A.opex_month.rent-180*14*A.meta.fx_usd)*12)} a year to each mature store’s profit, raising it to about ${fm.m(SE.c[2]+(A.opex_month.rent-180*14*A.meta.fx_usd)*12)}. This saving is not in the model: it is upside, tested store by store before each lease is signed.</p></div></div>`],
  ['How the chain is funded',`<div class="p5prose">
   <p>A chain that opens stores faster than its existing stores earn will need outside capital until the earnings of the mature stores pay for the new ones. The chart shows the chain’s cumulative cash before tax, interest and working capital: the sum of each year’s EBITDA minus the capital spent on new stores.</p>
   <div class="p5vis"><div class="hd">Cumulative cash of the chain · base, best and downside</div>${cashSVG()}</div>
   <p>In the base case the cumulative figure falls until year ${CC.base.minY} and then rises, because from then on the mature stores earn more than the new openings cost. The deepest point is ${fm.auto(-CC.base.min)}, of which the first ${fm.auto(-CC.base.c[0])} is the flagship in year 1, covered by the seed. The capital needed after the seed is therefore about ${fm.auto(gap('base'))}. In the best case it falls to about ${fm.auto(gap('best'))}.</p>
   <div class="p5x"><span>How the money would be raised · planning outline</span><p>Seed, ${fm.m(A.seed.amount)}: the flagship, released in three tranches (section 6.3). Growth round 1, at gate 1 (about year 2): stores 2 to 4 and the packing hub, about ${fm.auto(CC.base.need23)} over years 2 and 3. Growth round 2 and development-finance debt, at gate 3 (about year 4): the national network, about ${fm.auto(CC.base.need46)} over years 4 to 6. From year 7 the chain funds its own openings. Regional pharmacy chains have financed exactly this phase with private equity and loans from development-finance institutions ${C('glp',2)}.</p></div>
   <p>These figures exclude corporate tax, interest, working capital and the lease advance of each new store, so the real requirement will be somewhat higher. They will be refined in each round’s financial model.</p></div>`],
  ['If customers buy less · how the gates limit the loss',`<div class="p5prose">
   <p>The downside scenario assumes demand 25% below plan and costs 5% above. In that case a mature store sells ${fm.auto(G.mature_store_revenue*0.75)} a year, earns ${fm.auto(G.mature_store_revenue*0.75*G.store_gm)} gross profit and has running costs of ${fm.auto(G.store_opex_year*1.05)}: it loses about ${fm.m(G.store_opex_year*1.05-G.mature_store_revenue*0.75*G.store_gm)} a year even when mature.</p>
   <p>The twelve-year table below still shows the downside network opening ${G.stores_by_year[11]} stores, so that the three scenarios can be compared on the same store count. In practice the gates would prevent it. Gate 1 requires the flagship to make a monthly profit for three months in a row before store 2 is funded. At downside demand the flagship would not pass that gate, the growth round would not be raised, and no second store would open.</p>
   <div class="p5x"><span>What that means for an investor</span><p>In the downside case the money at risk is the seed, not the twelve-year capital plan. The founders would then use the levers the gates are designed to trigger: move to a lower-rent format, cut costs in line with the cost-cut triggers in section 7.3, and widen the business services in section 5.2, before asking for more capital.</p></div></div>`],
  ['The problem · why most single shops remain single shops',`
   ${plain([['Retail expansion usually fails in three ways.','Cash runs out because new stores open before existing ones are profitable; standards fall because the founders cannot be everywhere; and systems break down because each shop operates differently.'],
     ['Expansion must be conditional.','Investor capital should fund store number five because stores one to four have met their targets, not because the founders are confident.'],
     ['Health retail depends on trust at every branch.','One poorly run branch with expired stock or poor service damages the name of every other store. Expansion must replicate the operating standard, not only the signage.'],
     ['The plan therefore grows in gated stages.','Each stage has written conditions that must be met before the next begins, and a defined capital requirement, so investors can see what their capital unlocks.']])}`],
  ['Our answer · eight stages, from flagship to East African chain',`
   <p class="s11lead">Store counts come directly from the master model (<code>growth.stores_by_year</code> and <code>growth.regions</code>). Each new store replicates a proven one and runs on the same system.</p>
   <div class="p5-stairs">${stairsSVG()}</div><span class="p5-scrollhint">Swipe sideways to see all stages →</span>
   <div class="p5-tblw" style="margin-top:16px"><table class="p5-tbl"><thead><tr><th>Stage</th><th>Where</th><th class="n">Stores by end</th><th class="n">Plan years</th><th class="n">Capital for new stores</th></tr></thead><tbody>
    ${stg.map((x,i)=>`<tr><td>Stage ${i+1}</td><td>${esc(x.r[1])}</td><td class="n">${x.r[0]}</td><td class="n">${x.y0?(x.y0===x.y1?'Y'+x.y0:'Y'+x.y0+'–Y'+x.y1):'–'}</td><td class="n">${i===0?fm.m(x.capex)+' · seed '+fm.m(A.seed.amount):x.capex?fm.auto(x.capex):'–'}</td></tr>`).join('')}
   </tbody></table></div>
   <p class="note">Capital = new stores × ${fm.m(G.new_store_capex)} per store (MODEL.inputs.growth.new_store_capex) · store #1 is funded by the ${fm.m(A.seed.amount)} flagship seed, which also covers the 6-month lease advance, operating losses to break-even and a cash reserve; the alternative Start Small option requires TSh 150M</p>
   ${p5ed({f:'hub',alt:'staff packing closed green Afya Boxes at a packing hub',cap:'stage 2 · the packing hub',k:'Why stage 2 matters most',h:'The second store is <em>a store plus a packing hub</em>.',
     body:`<p>Moving from one store to two is the riskiest step in any retail plan, because the founders can no longer be present in every shop. Stage 2 therefore opens a <b>second Dar es Salaam store together with a packing hub</b>, and the first gate requires three months of positive monthly profit, 150+ members and a daily 21:00 report that runs without the founders on site.</p>
      <p>The hub takes box packing out of the stores. Store staff concentrate on walk-in customers, while the hub packs every member’s box from locked choices on a fixed calendar. Each new Dar store adds members to the same hub, so the packing cost per box falls as the network grows.</p>`,
     facts:[[G.stores_by_year[1]+' stores','by the end of year 2 (model)'],[fm.m(G.new_store_capex),'planning capital per new store'],[fm.auto(G.mature_store_revenue),'a mature store’s yearly revenue (model)']]})}`],
  ['How it works · the stage gates',`
   <p class="s11lead">A gate is a short list of conditions, measured in the operating system, that must be met before capital is committed to the next stage. If a gate is not met, expansion pauses until the issue is resolved.</p>
   <div class="p5-gates">${GATES.map((g,i)=>`<div class="p5-gate"><div class="h"><b>Gate ${i+1} · ${g[0]}</b><span>unlocks: ${g[1]}</span></div><ul>${g[2].map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('')}
    <div class="p5-gate" style="border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.6))"><div class="h"><b>Why gates protect investors</b></div><p class="p5-p" style="margin:10px 0 0;font-size:.88rem">The seed already works this way: tranches of ${A.seed.tranches.map(t=>Math.round(t*100)+'%').join(' · ')} are released at milestones, the last only after three months of trading, 100 Afya Box members and a monthly loss below TSh 16M. The growth plan applies the same discipline to every later stage.</p></div>
   </div>`],
  ['The experience · every new store replicates a proven one',`
   <div class="p5-grid2" style="align-items:center">
    ${p5pho('exterior','the Afya Basics store at dusk','the flagship every store copies')}
    <div><h3 class="p5-sub">The 90-day store playbook</h3><p class="p5-p">A customer in Arusha or Mwanza should have the same experience as one in Dar es Salaam: the same glass store, the same Care Zones, the same price on the same label and the same free check at the door. That requires store openings to be routine.</p>
     <p class="p5-p">Each opening follows a written playbook: a standard fit-out pack, an opening stock list generated by the system, a store lead trained for one month in an existing store, and the launch calendar from 5.1. <b>Planning cost per store: ${fm.m(G.new_store_capex)}</b>; a mature store is planned at <b>${fm.auto(G.mature_store_revenue)} a year</b> after a ramp of ${G.ramp.map(r=>Math.round(r*100)+'%').join(' → ')} over its first years.</p></div>
   </div>
   <h3 class="p5-sub">Three things every new store copies</h3>
   ${p5pcs([{f:'interior',alt:'the store interior with Care Zones, video wall and the corner counter',cap:'the store',k:'01 · The store',h:'Same layout, same feeling',body:`<p>Six Care Zones in the same order, the corner counter under the menu screens, the free check at the door and one price on every digital label. A mother who knows the Dar store can find the Mama na Mtoto zone in Arusha without asking.</p>`},
     {f:'hub',alt:'Afya staff packing closed green Afya Boxes at the packing hub',cap:'the hub',k:'02 · The hub',h:'Packed centrally from stage 2',body:`<p>From the second store, boxes are packed at one hub from members’ locked choices (Afya Choice closes 12 days before month end). The box is charged at landed cost by size (S TSh 3,500 · M 5,000 · L 6,500) and delivery at TSh 3,500; central packing keeps both costs low.</p>`},
     {f:'rider',alt:'an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street',cap:'the delivery',k:'03 · The delivery',h:'Electric riders, same-day delivery',body:`<p>Two electric motorbikes per flagship-format store in the model, same-day delivery for orders before 15:00 and a delivery photo for diaspora senders. Each new store shortens rider routes for the stores around it.</p>`}])}
   <div class="flow p5-play" style="margin-top:18px">
    <div class="step"><span class="t">D−90</span><b>Site & lease</b><p>Site scored on passing traffic, nearby households and rider routes; lease signed after the gate is met.</p></div>
    <div class="step"><span class="t">D−60</span><b>Fit-out & licences</b><p>Standard fit-out pack; business licence and product registrations confirmed.</p></div>
    <div class="step"><span class="t">D−30</span><b>Team & stock</b><p>Store lead trained in an existing store; opening stock picked by the one system.</p></div>
    <div class="step"><span class="t">D0</span><b>Open & launch</b><p>Thirty days of free full checks, community talks and the first-year calendar.</p></div>
   </div>`],
  ['Try it · the store-opening slider',`
   <p class="s11lead">Move through the twelve years to see stores by city, and the stores, revenue, EBITDA and capital required in each year. Switch scenarios to see the plan under higher or lower demand.</p>
   <div class="p5-btns" id="p5rsc">${['base','best','down'].map((k,i)=>`<button type="button" data-k="${k}" class="${i?'':'on'}">${MODEL.inputs.scenarios[k].label}${k==='down'?' (demand −25%, costs +5%)':k==='best'?' (demand +20%, costs −3%)':''}</button>`).join('')}</div>
   <div class="p5-road"><div class="p5-roadm"><span class="hud g">Where the stores are · by city</span>${regHTML()}<p class="note" style="margin-top:10px">Store totals from the master model · the split between cities is an illustrative planning estimate, weighted by city size</p></div>
    <div class="p5-roadk"><div class="p5-yr"><div class="y"><b id="p5ry">Year 1</b><span id="p5rst">Stage 1</span></div><label for="p5r">Plan year<input type="range" id="p5r" min="1" max="12" value="1"></label><p id="p5rt"></p></div>
     <div class="p5-kp"><div><small>Stores open</small><b id="p5k1">–</b></div><div><small>New this year</small><b id="p5k2">–</b></div><div><small>Revenue</small><b id="p5k3">–</b></div><div><small>EBITDA</small><b id="p5k4">–</b></div><div><small>Capital for new stores</small><b id="p5k5">–</b></div><div><small>Members (model)</small><b id="p5k6">–</b></div><div><small>Cumulative capital Y2→</small><b id="p5k7">–</b></div><div><small>Cumulative EBITDA Y2→</small><b id="p5k8">–</b></div></div>
     ${p5pho('rider','an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street','every new city starts with riders on day one')}</div>
   </div><p class="note">Planning estimates from MODEL.get(scenario).years · EBITDA is before tax, interest, working capital and loan repayments</p>`,'p5road'],
  ['The numbers · twelve years, three scenarios',`
   <div class="p5-btns" id="p5csc">${['base','best','down'].map((k,i)=>`<button type="button" data-k="${k}" class="${i?'':'on'}">${MODEL.inputs.scenarios[k].label}</button>`).join('')}</div>
   <div class="p5-chart"><div id="p5chart">${chartSVG('base')}</div><span class="p5-scrollhint">Swipe sideways to see all twelve years →</span>
    <div class="p5-legend"><span><i style="background:#5fbf8f"></i>Revenue (TSh billions)</span><span><i style="background:#f2c96b"></i>EBITDA</span><span><i style="background:#ff9b87"></i>EBITDA below zero</span><span>Same scale in all scenarios</span></div></div>
   <div class="nums" style="margin-top:16px">
    <div class="num"><b>${G.stores_by_year[11]}</b><span>stores by year 12, in ${G.regions.length} stages</span></div>
    <div class="num"><b>Y${firstB.year}</b><span>first year above TSh 1B revenue · base</span></div>
    <div class="num g"><b>${fm.b(y12.revenue)}</b><span>year-12 revenue · base (best ${fm.b(Bb[11].revenue)}, downside ${fm.b(Bd[11].revenue)})</span></div>
    <div class="num"><b>${fm.b(y12.ebitda)}</b><span>year-12 EBITDA · base (downside ${fm.b(Bd[11].ebitda)})</span></div>
    <div class="num"><b>${fm.auto(capexT)}</b><span>capital for all ${G.stores_by_year[11]} stores over 12 years</span></div>
   </div>
   <div class="p5-tblw" style="margin-top:16px"><table class="p5-tbl" id="p5tbl"><thead><tr><th>Year</th><th class="n">Stores</th><th class="n">New</th><th class="n">Revenue</th><th class="n">EBITDA</th><th class="n">Margin</th><th class="n">Capital</th><th class="n">Members</th></tr></thead><tbody>${B.map(row).join('')}</tbody></table></div>
   <div class="p5-grid2" style="margin-top:16px">
    <div class="p5-card"><span class="k">Reading the base case</span><h4>EBITDA positive from year ${posY}</h4><p>Year-1 revenue (${fm.auto(B[0].revenue)}) comes from the detailed monthly model of the flagship. From year 2, head-office costs begin and new stores are still ramping, so EBITDA remains negative through year ${posY-1} (year 2: ${fm.auto(B[1].ebitda)}). From year ${posY} the network is EBITDA-positive, and margins widen as more stores reach maturity.</p></div>
    <div class="p5-card"><span class="k">Outside capital needed · derived ${PE}</span><h4>${fm.auto(gap('base'))} base · ${fm.auto(gap('down'))} downside</h4><p>The largest cumulative gap between new-store capital and EBITDA from year 2 onward. It indicates the scale of later funding rounds (detail in 6.3); actual cash needs also include working capital, tax and stock, so the true figure will be higher.</p></div>
   </div>
   <p class="note">All figures planning estimates from MODEL · outside-capital figure derived in this section</p>`],
  ['Risks and our answer',risks([
   [dPos?'In the downside case, EBITDA stays below zero until year '+dPos.year+'.':'In the downside case, the network does not reach positive EBITDA within twelve years.','The gates exist for this case: if stores trade at downside levels, openings slow until the gate conditions are met, which reduces capital needs and protects cash. The downside case is shown in full.'],
   ['New cities may not behave like Dar es Salaam.','Each new region starts with one or two stores and a full year of data before more are added; stores are sited where the check station and delivery can operate from day one.'],
   ['Kenya and Uganda have different rules, registrations and competitors.','Pilots only from stage 7 (about year 8), with local licences and product registrations obtained first and a local partner or manager. If the pilots fail their gate, the chain remains Tanzanian.'],
   ['Managing 40+ stores requires a different team from running one.','Head-office costs are in the model from year 2 (fixed '+fm.m(G.ho_fixed_year)+' a year plus '+fm.pct(G.ho_share)+' of revenue); the board and reporting in 7.2 grow with the chain; store leads are promoted from within.'],
   ['Imports from China and India get more expensive (exchange rate, duties).','Buying power grows with every store, more than one supplier per key item, and prices reviewed quarterly; the model’s cost scenario (+5% downside) tests this.']])]
  ],
  takeaway:'The path to <b>'+F().b(MODEL.get('base').years[11].revenue)+' of annual revenue in year 12</b> is built one proven store at a time, with <b>a gate before every stage</b>, so growth capital follows evidence.',
  doors:['s6-1','s6-3','s6-4','s7-3'],
  sources:srcList(['gl','glp'])});}

function init54(){const fm=F(),G=I().growth;
 /* chart toggle */
 const ch=$('p5chart');if(ch){const bs=[...document.querySelectorAll('#p5csc button')];bs.forEach(b=>b.onclick=()=>{bs.forEach(x=>x.classList.toggle('on',x===b));const sc=b.dataset.k;ch.innerHTML=chartSVG(sc);
  const Y=road(sc);document.querySelector('#p5tbl tbody').innerHTML=Y.map(y=>`<tr><td>Year ${y.year}</td><td class="n">${y.stores}</td><td class="n">${y.new_stores}</td><td class="n">${fm.auto(y.revenue)}</td><td class="n${y.ebitda<0?' neg':''}">${fm.auto(y.ebitda)}</td><td class="n">${fm.pct(y.ebitda/y.revenue)}</td><td class="n">${fm.m(y.capex)}</td><td class="n">${nf(y.members)}</td></tr>`).join('')})}
 /* slider + map */
 const sl=$('p5r');if(!sl)return;let sc='base';
 const rws=[...document.querySelectorAll('.p5-regr')];const mxN=Math.max(...alloc(G.stores_by_year[11]).map(o=>o.n),1);
 const up=()=>{const y=+sl.value,Y=road(sc),r=Y[y-1],st=r.stores,k=stageFor(st),R=G.regions;
  $('p5ry').textContent='Year '+y;$('p5rst').textContent='Stage '+(k+1)+' · '+R[k][1];
  const nxt=R[k+1];$('p5rt').innerHTML=nxt?`Next stage at <b>${nxt[0]} stores</b>: ${esc(nxt[1])}. It opens only after its gate is met.`:'Final stage of the twelve-year plan: an East African chain.';
  $('p5k1').textContent=st;$('p5k2').textContent=r.new_stores;$('p5k3').textContent=fm.auto(r.revenue);
  const e=$('p5k4');e.textContent=fm.auto(r.ebitda);e.className=r.ebitda<0?'neg':'pos';
  $('p5k5').textContent=fm.auto(r.capex);$('p5k6').textContent=nf(r.members);
  const cc=Y.slice(1,y).reduce((a,v)=>a+v.capex,0),ce=Y.slice(1,y).reduce((a,v)=>a+v.ebitda,0);$('p5k7').textContent=y>1?fm.auto(cc):'Seed';const c8=$('p5k8');c8.textContent=y>1?fm.auto(ce):'–';c8.className=ce<0?'neg':ce>0?'pos':'';
  const al=alloc(st);const on=new Map(al.map(o=>[o.c[0],o.n]));
  rws.forEach((row,i)=>{const n=on.get(CITIES[i][0])||0;row.classList.toggle('on',n>0);row.querySelector('.bar i').style.width=(n?Math.max(4,n/mxN*100):0)+'%';row.querySelector('em').textContent=n?n+' store'+(n>1?'s':''):'not yet'});
  $('p5regt').textContent=st+' store'+(st>1?'s':'')+' · '+al.length+' cit'+(al.length>1?'ies':'y')};
 sl.oninput=up;document.querySelectorAll('#p5rsc button').forEach(b=>b.onclick=()=>{sc=b.dataset.k;document.querySelectorAll('#p5rsc button').forEach(x=>x.classList.toggle('on',x===b));up()});up()}

/* ============================== register ============================== */
window.SECTIONS['s5-1']={render:sec51,init:init51};
window.SECTIONS['s5-2']={render:sec52,init:init52};
window.SECTIONS['s5-3']={render:sec53,init:init53};
window.SECTIONS['s5-4']={render:sec54,init:init54};
})();
