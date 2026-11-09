/* part6: Money — 6.1 Financials · 6.2 The customer-funded model · 6.3 Funding and use of funds · 6.4 Ownership and exit
   Every business number is read from MODEL (model.js). Numbers computed here from model inputs are labelled planning estimates. */
(function(){
const P6CSS=`
.p6-scbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:0 0 20px}
.p6-scbar>span{font:500 .62rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p6-sc{display:inline-flex;padding:4px;border-radius:999px;border:1px solid var(--edge);background:rgba(2,10,8,.6)}
.p6-sc button{padding:8px 16px;border-radius:999px;border:0;background:none;color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer;transition:all .2s}
.p6-sc button:hover{color:var(--ink)}
.p6-sc button.on{color:#021510;background:linear-gradient(135deg,var(--neon2),var(--neon));box-shadow:0 0 18px -4px rgba(95,191,143,.7)}
.p6-sc button[data-sc=best].on{background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204;box-shadow:0 0 18px -4px rgba(242,201,107,.7)}
.p6-sc button[data-sc=down].on{background:linear-gradient(135deg,#ffc7bb,#ff9b87);color:#2a0d06;box-shadow:0 0 18px -4px rgba(255,155,135,.7)}
.p6-scnote{font-size:.82rem;color:var(--ink3)}
.p6-kpis{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px}
.p6-kpi{position:relative;padding:20px 18px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0;overflow:hidden}
.p6-kpi::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:linear-gradient(90deg,transparent,var(--c,var(--neon)),transparent)}
.p6-kpi small{display:block;font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p6-kpi b{display:block;margin-top:8px;font:500 clamp(1.25rem,2vw,1.75rem)/1.1 var(--f-hud);color:var(--c,var(--ink));white-space:nowrap}
.p6-kpi span{display:block;margin-top:6px;font-size:.8rem;line-height:1.4;color:var(--ink2)}
.p6-panel{padding:22px 24px;border-radius:22px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.72));min-width:0}
.p6-panel h3{font:700 1.05rem var(--f-display);letter-spacing:-.01em}
.p6-panel>p{margin:6px 0 0;color:var(--ink2);font-size:.9rem}
.p6-chart{position:relative;margin-top:14px;min-height:240px}
.p6-chart svg{display:block;width:100%;height:auto;overflow:visible}
.p6-chart text{font-family:var(--f-hud);fill:var(--ink3)}
.p6-read{display:flex;flex-wrap:wrap;gap:6px 18px;min-height:44px;margin-top:10px;padding:10px 14px;border-radius:12px;background:rgba(2,10,8,.55);border:1px solid var(--edge);font:500 .76rem var(--f-hud);color:var(--ink2)}
.p6-read b{color:var(--ink);font-weight:500}
.p6-read i{display:inline-block;width:8px;height:8px;border-radius:2px;margin-right:6px;vertical-align:middle}
.p6-leg{display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font:500 .66rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--ink2)}
.p6-leg i{display:inline-block;width:10px;height:10px;border-radius:3px;margin-right:7px;vertical-align:-1px}
.p6-g2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p6-g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p6-tbl{overflow-x:auto;border-radius:18px;border:1px solid var(--edge);background:var(--panel);-webkit-overflow-scrolling:touch}
.p6-tbl table{width:100%;border-collapse:collapse;font:500 .76rem var(--f-hud);white-space:nowrap}
.p6-tbl th,.p6-tbl td{padding:9px 12px;text-align:right;border-bottom:1px solid rgba(95,191,143,.08)}
.p6-tbl th:first-child,.p6-tbl td:first-child{text-align:left;position:sticky;left:0;background:#06140f;z-index:1;font-family:var(--f-body);font-weight:600;color:var(--ink)}
.p6-tbl thead th{color:var(--gold);font-weight:500;letter-spacing:.08em;background:#071a13}
.p6-tbl thead th:first-child{background:#071a13}
.p6-tbl td{color:var(--ink2)}
.p6-tbl tr.tot td{color:var(--ink);border-top:1px solid var(--edge2)}
.p6-tbl tr.hl td{background:rgba(95,191,143,.06)}
.p6-tbl tr.hl td:first-child{background:#08241a}
.p6-tbl .neg{color:#ff9b87}.p6-tbl .pos{color:var(--neon)}
.p6-tbl td.be{box-shadow:inset 0 0 0 1px var(--gold)}
.p6-tbl tr.sub td:first-child{font-weight:400;color:var(--ink2);padding-left:24px}
.p6-tree{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;align-items:stretch;border-radius:22px;overflow:hidden;border:1px solid var(--edge)}
.p6-tc{position:relative;padding:20px 18px;background:var(--panel);min-width:0}
.p6-tc+.p6-tc{border-left:1px solid var(--edge)}
.p6-tc h4{margin:0;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p6-tc .row{margin-top:12px;padding:12px 14px;border-radius:14px;border:1px solid rgba(95,191,143,.14);background:rgba(2,10,8,.5)}
.p6-tc .row b{display:block;font:700 .9rem var(--f-display)}
.p6-tc .row code{display:block;margin-top:4px;font:500 .72rem var(--f-hud);color:var(--neon2);white-space:normal}
.p6-tc .row span{display:block;margin-top:4px;font-size:.8rem;color:var(--ink2);line-height:1.4}
.p6-tc:not(:last-child)::after{content:"";position:absolute;z-index:2;right:-9px;top:50%;width:16px;height:16px;transform:translateY(-50%) rotate(45deg);border-top:1px solid var(--edge2);border-right:1px solid var(--edge2);background:#061811}
.p6-tc.res{background:linear-gradient(160deg,rgba(242,201,107,.12),rgba(2,6,8,.6))}
.p6-costs{display:grid;gap:8px}
.p6-cost{display:grid;grid-template-columns:minmax(0,220px) minmax(0,1fr) 120px;align-items:center;gap:14px;padding:12px 16px;border-radius:14px;border:1px solid var(--edge);background:var(--panel)}
.p6-cost b{font:700 .88rem var(--f-display)}
.p6-cost small{display:block;font-size:.76rem;color:var(--ink3);line-height:1.35;margin-top:2px}
.p6-cost .bar{height:12px;border-radius:6px;background:rgba(255,255,255,.05);overflow:hidden}
.p6-cost .bar i{display:block;height:100%;border-radius:6px;background:linear-gradient(90deg,var(--c),color-mix(in srgb,var(--c) 55%,#fff));box-shadow:0 0 12px color-mix(in srgb,var(--c) 50%,transparent);transition:width .6s cubic-bezier(.2,.8,.2,1)}
.p6-cost .v{text-align:right;font:500 .86rem var(--f-hud);color:var(--ink)}
.p6-cost .v small{color:var(--ink3);font-family:var(--f-hud)}
.p6-cost.tot{border-color:var(--edge2);background:linear-gradient(90deg,rgba(242,201,107,.1),rgba(2,6,8,.4))}
.p6-sens{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:16px}
.p6-sens .cin label{grid-template-columns:minmax(0,1fr) 150px}
.p6-sens .cin label em{font-style:normal;color:var(--ink3);font-size:.76rem}
.p6-delta{font:500 .78rem var(--f-hud)}
.p6-delta.up{color:var(--neon)}.p6-delta.dn{color:#ff9b87}
.p6-mini{margin-top:6px}
.p6-btnrow{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.p6-btn{padding:9px 14px;border-radius:12px;border:1px solid var(--edge2);background:rgba(242,201,107,.06);color:var(--gold2);font:600 .82rem var(--f-body);cursor:pointer}
.p6-btn:hover{background:rgba(242,201,107,.14)}
.p6-callout{margin-top:16px;padding:18px 20px;border-radius:18px;border:1px solid rgba(255,155,135,.35);background:linear-gradient(140deg,rgba(255,123,107,.10),rgba(2,6,8,.4));color:var(--ink2);font-size:.92rem}
.p6-callout b{color:var(--ink)}
.p6-callout h4{margin:0 0 6px;font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:#ffb3a3}
.p6-callout.g{border-color:var(--edge2);background:linear-gradient(140deg,rgba(242,201,107,.10),rgba(2,6,8,.4))}
.p6-callout.g h4{color:var(--gold)}
.p6-callout.n{border-color:rgba(95,191,143,.3);background:linear-gradient(140deg,rgba(95,191,143,.08),rgba(2,6,8,.4))}
.p6-callout.n h4{color:var(--neon)}
.p6-steps{list-style:none;margin:14px 0 0;padding:0;display:grid;gap:10px;counter-reset:p6s}
.p6-steps li{position:relative;padding:14px 16px 14px 54px;border-radius:14px;border:1px solid var(--edge);background:rgba(2,10,8,.45);color:var(--ink2);font-size:.9rem;counter-increment:p6s}
.p6-steps li::before{content:counter(p6s);position:absolute;left:14px;top:13px;width:26px;height:26px;border-radius:50%;display:grid;place-items:center;border:1px solid var(--edge2);color:var(--gold2);font:600 .74rem var(--f-hud)}
.p6-steps li b{color:var(--ink)}
.p6-steps code{font:500 .78rem var(--f-hud);color:var(--neon2)}
/* 6.2 */
.p6-map{overflow-x:auto;border-radius:20px;border:1px solid var(--edge);background:var(--panel)}
.p6-map table{width:100%;min-width:760px;border-collapse:collapse}
.p6-map th,.p6-map td{padding:10px 8px;border-bottom:1px solid rgba(95,191,143,.08);text-align:center}
.p6-map thead th{font:500 .6rem/1.3 var(--f-hud);letter-spacing:.1em;text-transform:uppercase;color:var(--gold);vertical-align:bottom;background:#071a13}
.p6-map tbody th{text-align:left;font:600 .86rem var(--f-body);color:var(--ink);cursor:pointer;position:sticky;left:0;background:#06140f;z-index:1;min-width:190px}
.p6-map tbody th small{display:block;font:500 .68rem var(--f-hud);color:var(--ink3);margin-top:2px}
.p6-map td{cursor:pointer}
.p6-map td i{display:inline-block;width:14px;height:14px;border-radius:50%}
.p6-map td i.m{background:var(--neon);box-shadow:0 0 12px var(--neon)}
.p6-map td i.s{background:transparent;border:1.5px solid var(--gold)}
.p6-map tr.on th,.p6-map tr.on td{background:rgba(242,201,107,.10)}
.p6-map tr.on th{background:#1d2413}
.p6-maplist{display:none;gap:8px}
.p6-maplist button{display:grid;gap:8px;text-align:left;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);color:var(--ink);font:inherit;cursor:pointer}
.p6-maplist button b{font:700 .9rem var(--f-display)}
.p6-maplist button span{display:flex;flex-wrap:wrap;gap:6px}
.p6-maplist em{font-style:normal;font:500 .66rem var(--f-hud);padding:4px 9px;border-radius:999px}
.p6-maplist em.m{background:rgba(95,191,143,.16);color:var(--neon2);border:1px solid rgba(95,191,143,.4)}
.p6-maplist em.s{color:var(--gold2);border:1px solid var(--edge2)}
.p6-maplist button.on{border-color:var(--gold);background:linear-gradient(90deg,rgba(242,201,107,.12),rgba(2,6,8,.4))}
.p6-mapnote{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:16px;margin-top:14px}
.p6-shill{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;align-items:start}
.p6-stack{display:flex;height:64px;border-radius:16px;overflow:hidden;border:1px solid var(--edge2);margin-top:16px}
.p6-stack div{position:relative;min-width:0;display:grid;place-items:center;font:600 .68rem var(--f-hud);color:#021510;transition:flex-grow .5s cubic-bezier(.2,.8,.2,1);overflow:hidden;white-space:nowrap}
.p6-split{display:grid;gap:6px;margin-top:16px}
.p6-split div{display:grid;grid-template-columns:14px minmax(0,1fr) auto auto;gap:10px;align-items:center;padding:9px 12px;border-radius:12px;background:rgba(2,10,8,.5);border:1px solid rgba(95,191,143,.08);font-size:.86rem;color:var(--ink2)}
.p6-split div i{width:12px;height:12px;border-radius:3px}
.p6-split div b{font:500 .82rem var(--f-hud);color:var(--ink);text-align:right}
.p6-split div em{font-style:normal;font:500 .72rem var(--f-hud);color:var(--ink3);min-width:62px;text-align:right}
.p6-split div.gap{border-color:rgba(255,155,135,.35);background:rgba(255,123,107,.07)}
.p6-split div.pro{border-color:rgba(242,201,107,.35);background:rgba(242,201,107,.07)}
.p6-tabs{display:flex;flex-wrap:wrap;gap:8px}
.p6-tabs button{padding:10px 14px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .84rem var(--f-body);cursor:pointer;text-align:left}
.p6-tabs button small{display:block;font:500 .64rem var(--f-hud);color:var(--ink3);margin-top:2px}
.p6-tabs button.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p6-tabs button.on small{color:#4a3a14}
.p6-proof{display:grid;gap:14px}
.p6-pr h4{margin:0;font:700 .95rem var(--f-display)}
.p6-pr .pb{display:grid;grid-template-columns:110px minmax(0,1fr) 110px;gap:12px;align-items:center;margin-top:10px;font-size:.84rem;color:var(--ink2)}
.p6-pr .pb .bar{height:22px;border-radius:7px;background:rgba(255,255,255,.04);overflow:hidden}
.p6-pr .pb .bar i{display:block;height:100%;border-radius:7px}
.p6-pr .pb b{font:500 .84rem var(--f-hud);color:var(--ink);text-align:right}
.p6-two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p6-two .p6-panel h3 small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:6px}
.p6-li{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;padding:9px 0;border-bottom:1px solid rgba(95,191,143,.08);font-size:.88rem;color:var(--ink2)}
.p6-li b{font:500 .84rem var(--f-hud);color:var(--ink)}
.p6-li.t{border-bottom:0;border-top:1px solid var(--edge2);margin-top:4px;color:var(--ink);font-weight:700}
.p6-li.t b{color:var(--gold2)}
/* 6.3 */
.p6-time{position:relative;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px;padding-top:38px}
.p6-time::before{content:"";position:absolute;left:4%;right:4%;top:15px;height:2px;background:linear-gradient(90deg,var(--gold),var(--neon),var(--gold2));box-shadow:0 0 14px rgba(242,201,107,.5)}
.p6-gate{position:relative;padding:20px 18px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.72));min-width:0}
.p6-gate::before{content:"";position:absolute;top:-30px;left:22px;width:16px;height:16px;border-radius:50%;background:var(--void);border:2px solid var(--gold);box-shadow:0 0 0 5px rgba(242,201,107,.18)}
.p6-gate.t::before{background:var(--gold)}
.p6-gate small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p6-gate b{display:block;margin-top:6px;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p6-gate h4{margin:8px 0 0;font:700 .95rem var(--f-display)}
.p6-gate p{margin:6px 0 0;font-size:.84rem;line-height:1.5;color:var(--ink2)}
.p6-gate .when{margin-top:10px;padding-top:10px;border-top:1px solid var(--edge);font:500 .7rem var(--f-hud);color:var(--neon2)}
.p6-uof{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:16px;align-items:start}
.p6-ubars{display:grid;gap:8px}
.p6-ubar{display:grid;grid-template-columns:minmax(0,1fr);gap:6px;width:100%;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);background:var(--panel);color:var(--ink);text-align:left;cursor:pointer;font:inherit;transition:border-color .2s,background .2s}
.p6-ubar .top{display:flex;justify-content:space-between;gap:10px;font-size:.88rem;font-weight:600}
.p6-ubar .top b{font:500 .86rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.p6-ubar .bar{height:10px;border-radius:5px;background:rgba(255,255,255,.05);overflow:hidden}
.p6-ubar .bar i{display:block;height:100%;border-radius:5px;background:var(--c)}
.p6-ubar:hover{border-color:var(--edge2)}
.p6-ubar.on{border-color:var(--gold);background:linear-gradient(90deg,rgba(242,201,107,.14),rgba(2,6,8,.4))}
.p6-donut{display:grid;place-items:center;position:relative}
.p6-donut svg{width:min(260px,100%)}
.p6-donut .c{position:absolute;text-align:center}
.p6-donut .c b{display:block;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p6-donut .c small{font:500 .58rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p6-items{list-style:none;margin:12px 0 0;padding:0;display:grid;gap:6px}
.p6-items li{position:relative;padding:8px 0 8px 22px;border-bottom:1px solid rgba(95,191,143,.07);font-size:.88rem;color:var(--ink2)}
.p6-items li::before{content:"";position:absolute;left:2px;top:15px;width:8px;height:8px;border-radius:2px;background:var(--c,var(--gold));transform:rotate(45deg)}
.p6-pack{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:start}
.p6-doc{padding:20px;border-radius:16px;background:#f6faf7;color:#0b2219;box-shadow:0 30px 60px -20px rgba(0,0,0,.7);font-size:.8rem;transform:rotate(-1deg)}
.p6-doc .hd{display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:2px solid #0f7a52}
.p6-doc .hd b{font:800 .95rem var(--f-display);color:#0f7a52}
.p6-doc .hd span{font:500 .62rem var(--f-hud);color:#5b6f66;letter-spacing:.1em;text-transform:uppercase}
.p6-doc .kp{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:12px}
.p6-doc .kp div{padding:8px;border-radius:8px;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.08)}
.p6-doc .kp small{display:block;font-size:.56rem;color:#5b6f66;text-transform:uppercase;letter-spacing:.06em}
.p6-doc .kp b{font:700 .82rem var(--f-hud);color:#0b2219}
.p6-doc ol{margin:12px 0 0;padding-left:18px;display:grid;gap:4px;color:#24443a}
.p6-doc .ft{margin-top:12px;font-size:.62rem;color:#5b6f66}
.p6-opt{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:14px;margin-top:14px}
.p6-optc{padding:18px 20px;border-radius:18px;border:1px solid var(--edge);background:var(--panel);cursor:pointer;text-align:left;color:var(--ink);font:inherit;transition:border-color .2s,background .2s}
.p6-optc small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p6-optc h4{margin:6px 0 0;font:700 1rem var(--f-display)}
.p6-optc p{margin:6px 0 0;font-size:.86rem;color:var(--ink2)}
.p6-optc.on{border-color:var(--gold);background:linear-gradient(140deg,rgba(242,201,107,.14),rgba(2,6,8,.4))}
/* 6.4 */
.p6-cap{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:18px;align-items:center}
.p6-sim{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.5fr);gap:16px}
.p6-exit{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px}
.p6-seg{display:inline-flex;padding:4px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.6);margin-top:6px}
.p6-seg button{padding:7px 12px;border:0;border-radius:9px;background:none;color:var(--ink2);font:600 .8rem var(--f-body);cursor:pointer}
.p6-seg button.on{background:var(--gold);color:#1a1204}
.p6-chk{display:flex!important;align-items:center;gap:10px;margin-top:16px;font-size:.86rem;color:var(--ink2);cursor:pointer}
.p6-chk input{accent-color:var(--gold);width:18px;height:18px}
.p6-pay{display:grid;gap:8px;margin-top:6px}
.p6-pay div{display:grid;grid-template-columns:12px minmax(0,1fr) auto;gap:10px;align-items:center;padding:10px 12px;border-radius:12px;background:rgba(2,10,8,.45);font-size:.88rem;color:var(--ink2)}
.p6-pay div i{width:12px;height:12px;border-radius:3px}
.p6-pay div b{font:500 .9rem var(--f-hud);color:var(--ink)}
.p6-prot{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p6-prot article{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.72));min-width:0}
.p6-prot small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
.p6-prot h4{margin:6px 0 0;font:700 1rem var(--f-display)}
.p6-prot ul{margin:10px 0 0;padding-left:18px;display:grid;gap:6px;color:var(--ink2);font-size:.86rem}
.p6-law{display:flex;gap:16px;align-items:flex-start;margin-top:16px;padding:18px 20px;border-radius:18px;border:1px solid var(--gold);background:linear-gradient(140deg,rgba(242,201,107,.14),rgba(2,6,8,.5))}
.p6-law svg{flex:0 0 34px;width:34px;height:34px;color:var(--gold)}
.p6-law p{margin:0;color:var(--ink2);font-size:.9rem}
.p6-law b{color:var(--gold2)}
.p6-cap>*,.p6-sim>*,.p6-exit>*,.p6-uof>*,.p6-shill>*,.p6-pack>*,.p6-sens>*,.p6-two>*,.p6-g2>*,.p6-g3>*,.p6-mapnote>*{min-width:0}
@media (max-width:1150px){.p6-kpis{grid-template-columns:repeat(3,minmax(0,1fr))}.p6-tree{grid-template-columns:repeat(2,minmax(0,1fr))}.p6-tc:nth-child(3){border-left:0}.p6-tc:nth-child(n+3){border-top:1px solid var(--edge)}.p6-tc:nth-child(2)::after{display:none}.p6-sens,.p6-shill,.p6-uof,.p6-sim,.p6-exit,.p6-pack,.p6-cap{grid-template-columns:1fr}.p6-time{grid-template-columns:repeat(2,minmax(0,1fr))}.p6-prot{grid-template-columns:1fr 1fr}}
@media (max-width:820px){.p6-hm{display:none}.p6-split div{grid-template-columns:12px minmax(0,1fr) auto;gap:4px 10px}.p6-split div em{grid-column:2/-1;text-align:left;min-width:0}.p6-map{display:none}.p6-maplist{display:grid}.p6-kpis{grid-template-columns:1fr 1fr}.p6-g2,.p6-g3,.p6-two,.p6-mapnote,.p6-opt,.p6-prot{grid-template-columns:1fr}.p6-tree{grid-template-columns:1fr}.p6-tc+.p6-tc{border-left:0;border-top:1px solid var(--edge)}.p6-tc::after{display:none}.p6-cost{grid-template-columns:minmax(0,1fr) 96px}.p6-cost .bar{grid-column:1/-1;grid-row:2}.p6-time{grid-template-columns:1fr;padding-top:0;padding-left:30px}.p6-time::before{left:10px;right:auto;top:10px;bottom:10px;width:2px;height:auto}.p6-gate::before{top:22px;left:-27px}.p6-pr .pb{grid-template-columns:84px minmax(0,1fr) 84px}.p6-panel{padding:18px}.p6-sens .cin label{grid-template-columns:minmax(0,1fr) 120px}.p6-kpi b{font-size:1.15rem}.p6-doc{transform:none}.p6-law{flex-direction:column}}
/* ---- editorial photography (quality pass) ---- */
.p6-ed{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:clamp(20px,3.2vw,44px);align-items:center;margin:30px 0}
.p6-ed.r>figure{order:2}
.p6-ed.top{align-items:start}
.p6-ph{margin:0;position:relative;border-radius:22px;overflow:hidden;border:1px solid rgba(242,201,107,.22);background:#020608;box-shadow:0 30px 60px -32px rgba(0,0,0,.85);min-width:0}
.p6-ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.p6-ph:hover img{transform:scale(1.03)}
.p6-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(2,6,8,.6));pointer-events:none}
.p6-ph figcaption{position:absolute;left:14px;bottom:14px;right:14px;z-index:1;display:flex;gap:6px;flex-wrap:wrap;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}
.p6-ph figcaption span{padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08)}
.p6-ph figcaption span:first-child{color:var(--gold2)}
.p6-ph.tall img{aspect-ratio:4/5}
.p6-ph.wide img{aspect-ratio:21/9}
.p6-ed .t{min-width:0}
.p6-ed .t .k,.p6-pc .k,.p6-band .k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.p6-ed .t h3{font:800 clamp(1.3rem,2.2vw,1.95rem)/1.14 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p6-ed .t h3 em,.p6-band h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p6-ed .t p{color:var(--ink2);font-size:.95rem;line-height:1.72;margin:0 0 12px}
.p6-ed .t p b,.p6-pc p b,.p6-band p b{color:var(--ink)}
.p6-ed .t ul{margin:4px 0 12px;padding:0;list-style:none;display:grid;gap:8px}
.p6-ed .t li{position:relative;padding-left:20px;color:var(--ink2);font-size:.9rem;line-height:1.6}
.p6-ed .t li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p6-ed .t li b{color:var(--ink)}
.p6-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.p6-facts div{padding:12px 0 0;border-top:1px solid rgba(242,201,107,.35);min-width:0}
.p6-facts b{display:block;font:500 clamp(1rem,1.5vw,1.25rem) var(--f-hud);color:var(--gold2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p6-facts span{display:block;font-size:.76rem;color:var(--ink3);line-height:1.45;margin-top:4px}
.p6-pcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.p6-pcs.c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.p6-pcs.c4{grid-template-columns:repeat(4,minmax(0,1fr))}
.p6-pc{border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));display:flex;flex-direction:column;min-width:0}
.p6-pc>.p6-ph{border-radius:0;border:0;box-shadow:none}
.p6-pc>.p6-ph img{aspect-ratio:16/9}
.p6-pc .b{padding:18px 20px 20px;display:flex;flex-direction:column;gap:8px;flex:1}
.p6-pc h4{margin:0;font:700 1.05rem/1.25 var(--f-display);color:var(--ink)}
.p6-pc p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.6}
.p6-band{position:relative;border-radius:26px;overflow:hidden;border:1px solid rgba(242,201,107,.24);min-height:400px;display:flex;align-items:center;margin:30px 0;background:#020608}
.p6-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p6-band::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(2,6,8,.96) 0%,rgba(2,6,8,.9) 42%,rgba(2,6,8,.45) 70%,rgba(2,6,8,.08) 100%)}
.p6-band .in{position:relative;z-index:2;padding:clamp(24px,4vw,48px);max-width:600px}
.p6-band h3{font:800 clamp(1.4rem,2.6vw,2.2rem)/1.12 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p6-band p{color:var(--ink2);font-size:.95rem;line-height:1.7;margin:0 0 10px}
.p6-band .cap{position:absolute;right:16px;bottom:14px;z-index:2;padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
@media (max-width:1100px){.p6-pcs.c4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
 .p6-ed{grid-template-columns:1fr;gap:18px}.p6-ed.r>figure{order:0}
 .p6-pcs,.p6-pcs.c2,.p6-pcs.c4{grid-template-columns:1fr}
 .p6-facts{grid-template-columns:1fr 1fr}
 .p6-band{min-height:0;display:block}
 .p6-band>img{position:relative;height:auto;aspect-ratio:16/10}
 .p6-band::before{display:none}
 .p6-band .in{padding:20px 20px 24px}
 .p6-band .cap{top:12px;bottom:auto;right:12px}
 .p6-ph.tall img{aspect-ratio:16/11}
}

.p6-h3x{font:800 clamp(1.05rem,1.8vw,1.35rem)/1.25 var(--f-display);margin:30px 0 14px;display:flex;flex-wrap:wrap;gap:10px;align-items:center}
`;
let cssDone=false;const css=()=>{if(!cssDone&&typeof addCSS==='function'){addCSS('part6',P6CSS);cssDone=true}};

/* ---------- shared helpers ---------- */
const M=()=>{const m=window.MODEL;return m.cur?Object.assign(Object.create(m),{get:k=>m.cur.get(k)}):m}, I=()=>(window.MODEL.cur||window.MODEL).inputs, F=()=>window.MODEL.fmt;
const ISL=()=>!!(window.MODEL.isLean&&window.MODEL.isLean()),FW=()=>ISL()?'first store':'flagship',FWC=()=>ISL()?'First store':'Flagship';
const tz=n=>F().tsh(n), mm=n=>F().m(n), au=n=>F().auto(n), mm2=n=>'TSh '+(n/1e6).toFixed(2).replace(/\.?0+$/,'')+'M';
const sgn=(n,f)=>(n<0?'−':'')+(f||au)(Math.abs(n));
const pct=(n,d)=>{let t=(n*100).toFixed(d==null?1:d);if(t.indexOf('.')>=0)t=t.replace(/\.?0+$/,'');return t+'%'};
const sum=a=>a.reduce((x,y)=>x+y,0);
const nf=n=>Math.round(n).toLocaleString('en-US');
const C={walk:'#5fbf8f',box:'#f2c96b',onl:'#d9b56e',neg:'#ff9b87',cash:'#ffe7a8',ebit:'#5fbf8f',rev:'rgba(217,181,110,.55)'};
const OPEX_INFO={rent:['Rent','Street-front lease, about '+'%A%'+' m², prime benchmark'],staff:['Store staff','Salaries plus employer NSSF 10% and WCF 0.5%'],utilities_internet:['Utilities & internet','Power for screens, cooling, fibre & backup'],systems_software:['Systems & software','Till, stock, members, app, WhatsApp, accounting'],marketing:['Marketing','Social media, local campaigns, Afya Check days'],check_station:['Afya Check station','Kiosk upkeep, calibration, consumables'],insurance_licences:['Insurance & licences','Stock & premises cover, TMDA, business licences'],packaging_misc:['Packaging & other','Bags, Afya Box packing, sundries']};
const opexLabel=k=>{const o=OPEX_INFO[k]||[k,''];return [o[0],o[1].replace('%A%',I().store.area_m2)]};
let SC='base';const LISTEN=[];
const onLeave=fn=>LISTEN.push(fn);
window.addEventListener('afya:leave',()=>{while(LISTEN.length){try{LISTEN.pop()()}catch(e){}}});
const onResize=fn=>{let t;const h=()=>{clearTimeout(t);t=setTimeout(fn,120)};addEventListener('resize',h);onLeave(()=>removeEventListener('resize',h))};
const $=id=>document.getElementById(id);
const scBar=(id,note)=>`<div class="p6-scbar"><span>Scenario</span><div class="p6-sc" role="group" aria-label="Scenario" data-g="${id}">${M().scenarios.map(k=>`<button type="button" data-sc="${k}" class="${k===SC?'on':''}" aria-pressed="${k===SC}">${esc(I().scenarios[k].label)}</button>`).join('')}</div>${note?`<span class="p6-scnote">${note}</span>`:''}</div>`;
const scDesc=k=>{const s=I().scenarios[k];const d=Math.round((s.demand-1)*100),c=Math.round((s.cost-1)*100);return k==='base'?'Model inputs as set':`Demand ${d>0?'+':''}${d}% · costs ${c>0?'+':''}${c}%`};
const wireSc=(root,cb)=>{root.querySelectorAll('.p6-sc button').forEach(b=>b.onclick=()=>{SC=b.dataset.sc;root.querySelectorAll('.p6-sc button').forEach(x=>{const on=x.dataset.sc===SC;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on)});cb()})};

/* simulation: a line-for-line copy of model.js compute() for Year 1, with optional overrides for the sensitivity tool */
function sim(key,o){o=o||{};const A=I(),sc=A.scenarios[key]||A.scenarios.base,d=sc.demand,c=sc.cost,s=A.store,mb=A.members,on=A.online;
 const vEnd=o.vis!=null?o.vis:s.visitors_day_m12,vStart=s.visitors_day_start*(vEnd/s.visitors_day_m12);
 const conv=o.conv!=null?o.conv:s.conversion,bas=o.basket!=null?o.basket:s.basket,endM=o.members!=null?o.members:mb.end_y1;
 const ox=Object.assign({},A.opex_month);if(o.rent!=null)ox.rent=o.rent;
 const opex=sum(Object.values(ox))*c;const months=[];let mem=0,cum=0;
 for(let i=0;i<12;i++){const f=i/11;const vis=(vStart+(vEnd-vStart)*f)*d;const walk=vis*conv*bas*30;
  const target=endM*d*((i+1)/12)**1.3;mem=Math.max(mem*(1-mb.monthly_churn),target);const boxRev=mem*mb.avg_box;
  const ord=on.orders_day_m12*d*(0.25+0.75*f);const onRev=ord*30*(on.basket+on.delivery_fee);const rev=walk+boxRev+onRev;
  const gp=walk*s.retail_gm+(boxRev-mem*mb.packing_delivery_in_price)*mb.box_products_gm+mem*mb.packing_delivery_in_price*0.15+ord*30*(on.basket*s.retail_gm+(on.delivery_fee-on.rider_cost_per_order));
  const extra=o.extra?o.extra(i+1):0;const ox2=opex+extra;const profit=gp-ox2;cum+=profit;
  months.push({m:i+1,visitors_day:vis,walkin:walk,members:mem,boxes:boxRev,online:onRev,orders:ord*30,revenue:rev,gross_profit:gp,opex:ox2,profit,cum_profit:cum})}
 const y={revenue:sum(months.map(x=>x.revenue)),gross_profit:sum(months.map(x=>x.gross_profit)),opex:sum(months.map(x=>x.opex))};y.profit=y.gross_profit-y.opex;
 const be=months.find(x=>x.profit>0);return {months,y1:y,breakeven_month:be?be.m:null,opex_month:opex}}

/* cash: derived from profit, seed tranches and one-off build spend (planning estimate) */
function cashOf(r){const sd=I().seed,use=sd.use,isRes=u=>/working|operating losses/i.test(u[0]);const LA=I().lease_advance_months||0,rent=(I().opex_month.rent||0)*((I().scenarios[r.key]||{}).cost||1),leaseAdj=m=>LA?(rent-(m>LA-2&&(m-(LA-2)-1)%LA===0?LA*rent:0)):0;
 const build=sum(use.filter(u=>!isRes(u)).map(u=>u[1])),reserve=sum(use.filter(u=>/reserve/i.test(u[0])).map(u=>u[1]));
 const T=sd.tranches.map(t=>t*sd.amount);const ms=sd.milestones[2]||'';
 const openM=+((/open\s+(\d+)\s+months?/i.exec(ms)||[0,3])[1]),memT=+((/(\d+)\s+Afya Box members/i.exec(ms)||[0,150])[1]);
 const t3=r.months.find(x=>x.m>=openM&&x.members>=memT);const t3m=t3?t3.m:null;
 const staged=[T[0]+T[1]-build],upfront=[sd.amount-build];
 r.months.forEach(x=>{const f=x.profit+leaseAdj(x.m);staged.push(staged[staged.length-1]+f+(x.m===t3m?T[2]:0));upfront.push(upfront[upfront.length-1]+f)});
 const lo=a=>{let v=Infinity,i=0;a.forEach((x,k)=>{if(x<v){v=x;i=k}});return {v,i}};
 return {build,reserve,T,t3m,openM,memT,staged,upfront,lowS:lo(staged),lowU:lo(upfront),trough:Math.min(0,...r.months.map(x=>x.cum_profit))}}

/* ---------- inline SVG charts (drawn at the container's real width, so text stays readable on phones) ---------- */
const niceMax=v=>{if(v<=0)return 1;const p=Math.pow(10,Math.floor(Math.log10(v))),n=v/p;return (n<=1?1:n<=2?2:n<=2.5?2.5:n<=5?5:10)*p};
const axFmt=v=>{const a=Math.abs(v),t=x=>x.toFixed(1).replace(/\.0$/,'');return (v<0?'−':'')+(a>=1e9?t(a/1e9)+'B':a>=1e6?t(a/1e6)+'M':t(a))};
function chart(el,o){if(!el)return;const W=Math.max(300,el.clientWidth||700),H=o.h||(W<520?230:280),pl=W<520?40:54,pr=o.pr||14,pt=18,pb=34;
 const n=o.labels.length,cw=(W-pl-pr)/n;let vmax=-Infinity,vmin=0;
 (o.stack||[]).forEach(s=>s.vals.forEach((_,i)=>{const t=sum(o.stack.map(q=>q.vals[i]));vmax=Math.max(vmax,t)}));
 (o.bars||[]).forEach(s=>s.vals.forEach(v=>{vmax=Math.max(vmax,v);vmin=Math.min(vmin,v)}));
 (o.lines||[]).forEach(s=>s.vals.forEach(v=>{vmax=Math.max(vmax,v);vmin=Math.min(vmin,v)}));
 if(o.minY!=null)vmin=Math.min(vmin,o.minY);vmax=Math.max(vmax,1);const stp=niceMax((vmax-vmin)/4);vmax=Math.ceil(vmax/stp-1e-9)*stp;const rawMin=vmin;vmin=Math.floor(vmin/stp+1e-9)*stp;if(rawMin<0&&rawMin>-stp*0.12)vmin=-stp*0.14;
 const y=v=>pt+(H-pt-pb)*(vmax-v)/(vmax-vmin),x=i=>pl+cw*i+cw/2;
 let g='';for(let v0=Math.ceil(vmin/stp-1e-9)*stp;v0<=vmax+stp*1e-6;v0+=stp){const v=Math.abs(v0)<stp*1e-6?0:v0;g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(v)}" y2="${y(v)}" stroke="rgba(169,196,184,${Math.abs(v)<1e-6?.45:.09})" ${Math.abs(v)<1e-6?'':'stroke-dasharray="2 4"'}/><text x="${pl-8}" y="${y(v)+4}" text-anchor="end" font-size="10">${axFmt(v)}</text>`}
 if(vmin<0)g+=`<line x1="${pl}" x2="${W-pr}" y1="${y(0)}" y2="${y(0)}" stroke="rgba(242,201,107,.6)" stroke-width="1"/><text x="${pl+4}" y="${y(0)-5}" font-size="9" fill="#f2c96b">ZERO</text>`;
 const step=n>12&&W<520?2:1;o.labels.forEach((l,i)=>{if(i%step===0)g+=`<text x="${x(i)}" y="${H-12}" text-anchor="middle" font-size="10">${l}</text>`});
 (o.bands||[]).forEach(b=>{g+=`<rect x="${pl+cw*b.from}" y="${pt}" width="${cw*(b.to-b.from)}" height="${H-pt-pb}" fill="${b.fill}"/>`+(b.label?`<text x="${pl+cw*b.from+6}" y="${pt+12}" font-size="9" fill="${b.tc||'#a9c4b8'}">${b.label}</text>`:'')});
 const bw=Math.min(o.bw||34,cw*.64);
 if(o.stack){o.labels.forEach((_,i)=>{let acc=0;o.stack.forEach(s=>{const v=s.vals[i];g+=`<rect x="${x(i)-bw/2}" y="${y(acc+v)}" width="${bw}" height="${Math.max(0,y(acc)-y(acc+v))}" fill="${s.color}" rx="2"/>`;acc+=v})})}
 if(o.bars){const nb=o.bars.length,w=bw/nb;o.bars.forEach((s,j)=>s.vals.forEach((v,i)=>{const y0=y(Math.max(0,v)),h=Math.abs(y(v)-y(0));g+=`<rect x="${x(i)-bw/2+w*j}" y="${y0}" width="${w-1}" height="${Math.max(.5,h)}" fill="${typeof s.color==='function'?s.color(v,i):s.color}" rx="2"/>`}))}
 (o.lines||[]).forEach(s=>{const pts=s.vals.map((v,i)=>[x(i),y(v)]);if(s.area)g+=`<path d="M${pts[0][0]},${y(0)} ${pts.map(p=>'L'+p[0]+','+p[1]).join(' ')} L${pts[pts.length-1][0]},${y(0)}Z" fill="${s.area}"/>`;
  g+=`<path d="${pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}" fill="none" stroke="${s.color}" stroke-width="${s.w||2.4}" stroke-linejoin="round" ${s.dash?'stroke-dasharray="5 5"':''} style="filter:drop-shadow(0 0 6px ${s.color})"/>`;
  if(s.dots!==false)pts.forEach((p,i)=>{const v=s.vals[i];g+=`<circle cx="${p[0]}" cy="${p[1]}" r="${W<520?2.6:3.4}" fill="${s.dotc?s.dotc(v):s.color}" stroke="#020608" stroke-width="1.4"/>`})});
 (o.marks||[]).forEach(mk=>{const xx=x(mk.i),mw=mk.t.length*6.1+18,mh=mw/2;g+=`<line x1="${xx}" x2="${xx}" y1="${pt}" y2="${H-pb}" stroke="${mk.c||'#f2c96b'}" stroke-dasharray="3 4"/><rect x="${Math.min(W-pr-mw,Math.max(pl,xx-mh))}" y="${pt-2}" width="${mw}" height="18" rx="9" fill="#020608" stroke="${mk.c||'#f2c96b'}"/><text x="${Math.min(W-pr-mh,Math.max(pl+mh,xx))}" y="${pt+10.5}" text-anchor="middle" font-size="9.5" fill="${mk.c||'#f2c96b'}">${mk.t}</text>`});
 o.labels.forEach((_,i)=>{g+=`<rect class="hit" data-i="${i}" x="${pl+cw*i}" y="${pt}" width="${cw}" height="${H-pt-pb}" fill="transparent"/>`});
 el.innerHTML=`<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(o.aria||'Chart')}">${g}<rect class="p6-hov" x="0" y="${pt}" width="${cw}" height="${H-pt-pb}" fill="rgba(242,201,107,.08)" stroke="rgba(242,201,107,.35)" style="display:none;pointer-events:none"/></svg>`;
 const rd=o.read?$(o.read):null;const hov=el.querySelector('.p6-hov');
 const show=i=>{hov.style.display='';hov.setAttribute('x',pl+cw*i);if(rd&&o.tip)rd.innerHTML=o.tip(i)};
 el.querySelectorAll('.hit').forEach(h=>{h.onmouseenter=h.onclick=()=>show(+h.dataset.i)});
 if(o.def!=null)show(o.def);else if(rd&&o.tip)rd.innerHTML=o.tip(n-1)}
const dot=c=>`<i style="background:${c}"></i>`;
const plain=items=>`<div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>${items.map(x=>`<li><b>${x[0]}</b> ${x[1]}</li>`).join('')}</ol></div>`;
const risks=rs=>`<div class="risks">${rs.map(r=>`<div class="risk"><span class="q">${r[0]}</span><span class="ar">→</span><span class="a">${r[1]}</span></div>`).join('')}</div>`;

/* ---- editorial photography helpers (quality pass) ---- */
const p6pho=(f,alt,cap,cls)=>`<figure class="p6-ph${cls?' '+cls:''}"><img src="img/${f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(alt)}"><figcaption><span>Concept image</span>${cap?`<span>${cap}</span>`:''}</figcaption></figure>`;
const p6ed=(o)=>`<div class="p6-ed${o.r?' r':''}${o.top?' top':''}">${p6pho(o.f,o.alt,o.cap,o.cls)}<div class="t">${o.k?`<span class="k">${o.k}</span>`:''}${o.h?`<h3>${o.h}</h3>`:''}${o.body||''}${o.facts?p6facts(o.facts):''}</div></div>`;
const p6facts=a=>`<div class="p6-facts">${a.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`;
const p6pcs=(items,c)=>`<div class="p6-pcs${c?' c'+c:''}">${items.map(x=>`<article class="p6-pc">${p6pho(x.f,x.alt,x.cap)}<div class="b">${x.k?`<span class="k">${x.k}</span>`:''}<h4>${x.h}</h4>${x.body}</div></article>`).join('')}</div>`;
const p6band=(o)=>`<div class="p6-band"><img src="img/${o.f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(o.alt)}"><div class="in">${o.k?`<span class="k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body||''}${o.facts?p6facts(o.facts):''}</div><span class="cap">Concept image${o.cap?' · '+o.cap:''}</span></div>`;
const kpi=(l,v,s,c,id)=>`<div class="p6-kpi" style="--c:${c||'var(--ink)'}"><small>${l}</small><b ${id?`id="${id}"`:''}>${v}</b><span ${id?`id="${id}s"`:''}>${s||''}</span></div>`;
const SRC={tra:['Tanzania Revenue Authority, 2025/26: Taxes and Duties at a Glance (corporate tax 30%, VAT 18%, dividend withholding 10%)','https://www.tra.go.tz/images/uploads/pages/TAXES_AND_DUTIES_AT_A_GLANCE_2025_2026.pdf'],
 bot:['Bank of Tanzania, 3 July 2026: Monetary Policy Committee statement (Central Bank Rate 6.25% for the quarter to September 2026)','https://www.bot.go.tz/Adverts/PressRelease/en/2026070313025546.pdf'],
 ca:['United Republic of Tanzania: Companies Act, 2002 (Cap. 212), TanzLII consolidated text','https://tanzlii.org/en/akn/tz/act/2002/12/eng@2016-07-01']};
const cr=(k,n)=>cref(SRC[k][1],n,SRC[k][0]);
const MO=['M1','M2','M3','M4','M5','M6','M7','M8','M9','M10','M11','M12'];

/* =====================================================================================
   6.1 FINANCIALS
   ===================================================================================== */
window.SECTIONS['s6-1']={render(s,p,pv,nx){css();const A=I(),r=M().get(SC);const opexK=Object.keys(A.opex_month);
 return secShell({s,p,pv,nx,img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior: corner counter under digital menu screens, video wall and lit shelving',
  h1:'One store, modelled month by month.',em:'Three cases, every formula shown.',
  lede:'Every figure on this page comes from one master model: the first store month by month in year 1, then twelve years and 47 stores. Switch between the base, best and downside cases and every chart and table recalculates. All figures are planning estimates from the corrected November 2026 model, to be verified with supplier quotations and on-the-ground research.',
  heroExtra:`<div style="margin-top:22px">${scBar('hero')}</div>`,
  mods:[
  ['The problem it solves',`
   <p class="s11lead">Early-stage retail plans often fail on internal consistency: revenue that differs from one slide to the next, a profit line with no cash line behind it, and a single forecast with no downside. Each of these undermines confidence in the whole plan.</p>
   ${plain([['One source for every number.','Box prices, member counts and costs are read from the same master model on every page. A change is made once and appears everywhere.'],['Profit and cash are shown separately.','Fit-out, opening stock, the six-month lease advance and early losses are paid before profit arrives. A store can be profitable on paper and still short of cash, so module 07 derives the cash line month by month.'],['Three cases, not one.','The downside case cuts demand by 25% and raises costs by 5%; the best case adds 20% to demand and trims costs by 3%. The plan should be judged on the downside, not the best case.'],['The working is visible.','Each formula is written out (visitors × buying rate × basket, members × box price), and the sliders in module 09 test them.']])}`],
  ['Our answer · one model, three cases',`
   <p class="s11lead">Headline results for the selected case. <span id="p6-scd">${scDesc(SC)}</span> ${PE}</p>
   <div class="p6-kpis">
    ${kpi('Year 1 revenue','–','','#d9b56e','p6k1')}
    ${kpi('Year 1 profit','–','','#5fbf8f','p6k2')}
    ${kpi('Break-even month','–','','#f2c96b','p6k3')}
    ${kpi('Year 12 revenue','–','','#ffe7a8','p6k4')}
    ${kpi('Year 12 EBITDA','–','','#5fbf8f','p6k5')}
   </div>
   <p class="note">Year 12 assumes the store plan of ${A.growth.stores_by_year[11]} stores · EBITDA = earnings before interest, tax, depreciation and amortisation</p>
   ${p6ed({f:'exterior',alt:'the Afya Basics store at dusk with AFYA BASICS on the roof edge',cap:'the unit the model describes',k:'The unit being modelled',h:'Every figure starts with <em>'+(ISL()?'one first store':'one flagship store')+'</em>.',
     body:`<p>${ISL()?'The chain starts as one store: a start-small store of about':'The chain starts as one store: a street-front flagship of about'} <b>${A.store.area_m2} m²</b> ${ISL()?'on a good secondary Dar es Salaam street, open':'on a prime Dar es Salaam street, open'} <b>${esc(A.store.hours)}</b> and staffed by <b>${A.staff.reduce((a,x)=>a+x[1],0)} people</b> ${ISL()?'on one long shift.':'on two shifts.'} Year 1 is modelled month by month from activity inside that store: visitors, the share who buy, Afya Box members who join from store customers and Afya Check users, and online orders.</p>
      <p>From year 2 the model works in whole years and store counts. Each new store is assumed to reach <b>${au(A.growth.mature_store_revenue)} a year</b> at maturity, after a ramp of ${A.growth.ramp.map(x=>pct(x,0)).join(' → ')}. The first store therefore sets the template: <b>every later projection scales its results</b>.</p>`,
     facts:[[A.store.area_m2+' m²','store floor area'],[A.store.visitors_day_m12+' / day','walk-in visitors by month 12'],[mm(sum(Object.values(A.opex_month))),'monthly running costs, eight lines']]})}`],
  ['How it works · visitors to profit in four steps',`
   <p class="s11lead">The complete year-1 engine. Each box is a formula in the master model, shown with base-case inputs. <span class="tagi">Planning estimate</span></p>
   <div class="p6-tree">
    <div class="p6-tc"><h4>1 · Customers</h4>
     <div class="row"><b>Walk-in visitors</b><code>${A.store.visitors_day_start} → ${A.store.visitors_day_m12} a day</code><span>Rises in a straight line from opening to month 12.</span></div>
     <div class="row"><b>Afya Box members</b><code>0 → ${nf(M().get('base').months[11].members)} by month 12</code><span>Each month ${pct(A.members.join_rate,0)} of paying customers and ${pct(A.members.check_join_rate,0)} of Afya Check users who did not buy join; ${pct(A.members.monthly_churn,0)} of members leave.</span></div>
     <div class="row"><b>Online orders</b><code>up to ${A.online.orders_day_m12} a day</code><span>App and WhatsApp, starting at a quarter of that rate.</span></div></div>
    <div class="p6-tc"><h4>2 · Revenue</h4>
     <div class="row"><b>Walk-in</b><code>visitors × ${pct(A.store.conversion,0)} buy × ${tz(A.store.basket)} × 30</code><span>Net of ${pct(A.tax.vat,0)} VAT on taxable goods.</span></div>
     <div class="row"><b>Afya Boxes</b><code>members × ${tz(A.members.avg_box)}</code><span>Average 1-month box price, packing and delivery included.</span></div>
     <div class="row"><b>Online</b><code>orders × (${tz(A.online.basket)} + ${tz(A.online.delivery_fee)} fee)</code></div>
     <div class="row"><b>Care packs and Afya Kazini</b><span>Partner care packs added to boxes, and business kits. Smaller lines.</span></div></div>
    <div class="p6-tc"><h4>3 · Gross profit</h4>
     <div class="row"><b>Retail margin ${pct(A.store.retail_gm,0)}</b><span>On walk-in and online baskets.</span></div>
     <div class="row"><b>Box margin ${pct(A.members.box_products_gm,0)}</b><span>On box products, after the member saving of 3–9% by plan. The ${tz(A.members.packing_delivery_in_price)} packing and delivery element is charged at cost.</span></div>
     <div class="row"><b>Delivery margin</b><code>${tz(A.online.delivery_fee)} fee − ${tz(A.online.rider_cost_per_order)} per order</code><span>Rider salaries sit in staff costs; the per-order cost covers charging and maintenance.</span></div></div>
    <div class="p6-tc res"><h4>4 · Profit and cash</h4>
     <div class="row"><b>Running costs</b><code>${mm(sum(Object.values(A.opex_month)))} a month</code><span>Rent, staff, systems, marketing and four further lines.</span></div>
     <div class="row"><b>Profit</b><code>gross profit − running costs</code></div>
     <div class="row"><b>Cash</b><code>seed received − build costs + profit</code><span>Derived in module 07.</span></div></div>
   </div>
   <h3 class="p6-h3x">Revenue mix · base case, month 12 <span class="tagi">Planning estimate</span></h3>
   ${(()=>{const m=M().get('base').months[11],t=m.revenue,sh=v=>pct(v/t,0);return p6pcs([
    {f:'interior',alt:'the store interior with Care Zones and the corner counter',cap:'walk-in',k:'Walk-in sales · '+sh(m.walkin)+' of revenue',h:mm(m.walkin)+' a month',body:`<p>About ${Math.round(m.visitors_day)} visitors a day, ${pct(A.store.conversion,0)} of whom buy, at an average basket of ${tz(A.store.basket)}. A typical basket: a walking frame, incontinence pads and a pill organiser bought in one visit for an elderly relative, paid by mobile money.</p>`},
    {f:'boxdoor',alt:'a closed royal-green Afya Box handed over at a home doorstep',cap:'Afya Box',k:'Afya Box memberships · '+sh(m.boxes)+' of revenue',h:mm(m.boxes)+' a month',body:`<p>${nf(m.members)} members at an average of ${tz(A.members.avg_box)} a month, packing and delivery included. Boxes renew automatically, and the model removes ${pct(A.members.monthly_churn,0)} of members every month. This recurring line is the main indicator to track.</p>`},
    {f:'rider',alt:'an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street',cap:'online',k:'Online orders · '+sh(m.online)+' of revenue',h:mm(m.online)+' a month',body:`<p>About ${Math.round(A.online.orders_day_m12)} orders a day by app or WhatsApp at a ${tz(A.online.basket)} basket, plus a ${tz(A.online.delivery_fee)} delivery fee against ${tz(A.online.rider_cost_per_order)} per order in charging and maintenance. Each delivery adds margin rather than cost.</p>`}])+`<p class="note">The remaining ${pct((m.services+m.commission+m.kazini)/t,0)} of month-12 revenue comes from Afya Huduma care packs and Afya Kazini business kits</p>`})()}`],
  ['The experience · year 1, month by month',`
   ${scBar('m5','This switch controls every chart on the page.')}
   <div class="p6-g2">
    <div class="p6-panel"><h3>Monthly revenue by channel</h3><p>Walk-in, Afya Box and online revenue, stacked. Select a month for detail.</p>
     <div class="p6-chart" id="p6c-rev"></div><div class="p6-leg"><span>${dot(C.walk)}Walk-in</span><span>${dot(C.box)}Afya Boxes</span><span>${dot(C.onl)}Online</span></div><div class="p6-read" id="p6r-rev"></div></div>
    <div class="p6-panel"><h3>Monthly profit and break-even</h3><p>Red bars are loss months, green bars profit months. The dashed line is cumulative profit; the marker shows the break-even month.</p>
     <div class="p6-chart" id="p6c-pro"></div><div class="p6-leg"><span>${dot(C.neg)}Loss month</span><span>${dot(C.walk)}Profit month</span><span>${dot(C.cash)}Cumulative profit</span></div><div class="p6-read" id="p6r-pro"></div></div>
   </div>`],
  ['Profit and loss · year 1 and twelve years',`
   ${scBar('m6')}
   <div class="p6-tbl" id="p6t-pl"></div>
   <p class="note">TSh millions · month 1 is the first trading month · break-even month outlined in gold · ${esc(A.meta.status)}</p>
   <div class="p6-panel" style="margin-top:18px"><h3>Twelve-year revenue and EBITDA</h3><p>Bars show revenue; the green line shows EBITDA (earnings before interest, tax, depreciation and amortisation). Hover for the store count.</p>
    <div class="p6-chart" id="p6c-12"></div><div class="p6-leg"><span>${dot(C.rev)}Revenue</span><span>${dot(C.ebit)}EBITDA</span></div><div class="p6-read" id="p6r-12"></div></div>
   <div class="p6-tbl" id="p6t-12" style="margin-top:14px"></div>
   <p class="note">Year 1 = one store from the monthly model · from year 2: stores × mature revenue ${au(A.growth.mature_store_revenue)} with a ramp of ${A.growth.ramp.map(x=>pct(x,0)).join(' / ')} · head office ${au(A.growth.ho_fixed_year)} + ${pct(A.growth.ho_share,0)} of revenue · before corporate tax of 30% ${cr('tra',1)}</p>`],
  ['Cash flow · derivation and findings',`
   ${scBar('m7')}
   <p class="s11lead">The master model calculates profit, not cash. Cash is derived here from four model inputs: monthly profit, the seed tranches, the one-off build costs and the ${A.lease_advance_months}-month lease advance. ${PE}</p>
   <ol class="p6-steps">
    <li><b>Before opening (month 0).</b> Tranches 1 and 2 arrive (<span id="p6-t12">–</span>). The one-off build is paid: every use-of-funds line except the operating-loss provision and the working-capital reserve (<span id="p6-bld">–</span>). <code>cash₀ = T1 + T2 − build</code></li>
    <li><b>Each month after opening.</b> Cash moves by that month’s profit. <code>cashₘ = cashₘ₋₁ + profitₘ</code>. Rent is paid ${A.lease_advance_months} months in advance, so it leaves the bank in blocks: the first block is part of the build, later blocks fall due every ${A.lease_advance_months} months. Stock is replaced as it sells, so cash paid for goods equals the cost of goods in the profit line.</li>
    <li><b>Tranche 3.</b> Released in the first month the store has been open <span id="p6-om">3</span> months with <span id="p6-mt">150</span> Afya Box members. In this case that is <b id="p6-t3m">–</b>. <code>+ T3</code></li>
    <li><b>Comparison.</b> The dashed line shows cash if the full seed arrived on day one: <code>cash₀ = seed − build</code>.</li>
   </ol>
   <div class="p6-panel" style="margin-top:16px"><h3>Cash in the bank, months 0–12</h3><p>Solid line: tranches released at milestones. Dashed line: full seed on day one.</p>
    <div class="p6-chart" id="p6c-cash"></div><div class="p6-leg"><span>${dot(C.cash)}Cash · tranches at milestones</span><span>${dot('#d9b56e')}Cash · full seed on day one</span></div><div class="p6-read" id="p6r-cash"></div></div>
   <div class="p6-callout" id="p6-cashcall"></div>`],
  ['Running costs · eight monthly lines',`
   ${scBar('m8')}
   <p class="s11lead">The store’s running costs fall into eight lines. These are the costs customer prices must recover under the rule set out in section 6.2. <span class="tagi">Planning estimate</span></p>
   <div class="p6-costs" id="p6-costs"></div>
   <p class="note">Staff plan: ${A.staff.map(x=>x[1]+' × '+esc(x[0].split('(')[0].trim())).join(' · ')} · founders’ pay is excluded from running costs (see 6.4)</p>
   ${p6ed({f:'team',alt:'Afya Basics health advisers in royal green uniforms at the corner counter',cap:'the store team',r:1,k:'Second-largest cost · people',h:`${A.staff.reduce((a,x)=>a+x[1],0)} people, <em>${mm(A.opex_month.staff)}</em> a month.`,
     body:`<p>Staff are the largest cost after rent. ${ISL()?'The start-small store runs one long shift with a small, trained team.':'The flagship runs two shifts with a small, trained team.'} Monthly gross salaries are listed below; the cost line adds employer contributions of ${pct(A.staff_oncost,1)} (NSSF 10%, WCF 0.5%).</p>
      <ul>${A.staff.map(x=>`<li><b>${x[1]} × ${esc(x[0])}</b> · ${tz(x[2])} each · ${mm(x[1]*x[2])} a month</li>`).join('')}</ul>
      <p>One connected system handles counting, reordering and reporting, so staff time goes to customers: explaining a reading, fitting a blood-pressure monitor, packing boxes and delivering orders placed before 15:00 on the same day.</p>`})}`],
  ['Try it · sensitivity to key drivers',`
   <p class="s11lead">Move any driver to recalculate year-1 profit, the break-even month and the deepest cumulative loss. The tool uses a simplified form of the master-model formulas, with the selected case’s demand and cost factors applied on top; read results against the dashed model line rather than as exact figures. <span class="tagi">Planning estimate</span></p>
   <div class="p6-sens">
    <div class="cin">
     <label><span>Visitors a day by month 12 <em>· the opening level scales with it</em></span><input type="range" id="p6s-vis" min="40" max="200" step="5" value="${A.store.visitors_day_m12}"><output id="p6o-vis"></output></label>
     <label><span>Share of visitors who buy</span><input type="range" id="p6s-conv" min="0.2" max="0.8" step="0.01" value="${A.store.conversion}"><output id="p6o-conv"></output></label>
     <label><span>Average walk-in basket</span><input type="range" id="p6s-bas" min="10000" max="50000" step="500" value="${A.store.basket}"><output id="p6o-bas"></output></label>
     <label><span>Afya Box members by month 12</span><input type="range" id="p6s-mem" min="100" max="1500" step="10" value="${A.members.end_y1}"><output id="p6o-mem"></output></label>
     <label><span>Monthly rent</span><input type="range" id="p6s-rent" min="2000000" max="12000000" step="250000" value="${A.opex_month.rent}"><output id="p6o-rent"></output></label>
     <div class="p6-btnrow"><button class="p6-btn" type="button" id="p6s-reset">Reset to model</button><button class="p6-btn" type="button" id="p6s-stress">Stress test: −20% visitors, −20% members</button></div>
    </div>
    <div class="cout">
     <div><small>Year 1 profit</small><b id="p6x-pro">–</b><span class="p6-delta" id="p6x-prod"></span></div>
     <div><small>Break-even month</small><b id="p6x-be">–</b><span class="p6-delta" id="p6x-bed"></span></div>
     <div><small>Deepest cumulative loss (cash the plan must fund)</small><b id="p6x-tr">–</b><span class="p6-delta" id="p6x-trd"></span></div>
     <div class="p6-chart p6-mini" id="p6c-sens" style="min-height:150px"></div>
     <p id="p6x-txt"></p>
    </div>
   </div>`,'p6try'],
  ['The numbers · three cases compared',`
   <div class="p6-tbl" id="p6t-sc"></div>
   <p class="note">Values from the master model for each case · cash rows derived in module 07 · planning estimates, to be verified with supplier quotations</p>`],
  ['Risks and our answer',risks([
   ['Visitor numbers grow more slowly than planned.','The downside case already cuts demand by 25% and raises costs by 5%; in that case the '+FW()+' does not reach monthly profit in year 1. Three channels reach customers independently (the Afya Check at the door, WhatsApp ordering and the Afya Box), and module 09 shows how far visitors can fall before break-even moves.'],
   ['Cash runs short before break-even.','The '+mm(A.seed.amount)+' '+(ISL()?'start-small':'flagship')+' seed includes '+mm(sum(A.seed.use.filter(u=>/operating losses/i.test(u[0])).map(u=>u[1])))+' for operating losses and lease advances until break-even, plus a '+mm(sum(A.seed.use.filter(u=>/working/i.test(u[0])).map(u=>u[1])))+' working-capital reserve. Module 07 derives the cash line month by month and states any remaining gap.'],
   ['Some model items remain open.','The twelve-year table books store one’s capital spend at the standard new-store figure ('+au(A.growth.new_store_capex)+') rather than the seed build cost.'+(ISL()?' The secondary-street rent is an estimate, and every price remains':' Every price remains')+' a planning estimate until supplier quotations are in hand.'],
   ['Growth beyond store one needs more capital.','Each new store needs '+au(A.growth.new_store_capex)+' of capital spend. The twelve-year table shows EBITDA minus capex, which identifies the year the chain begins to fund itself; section 6.4 shows what later rounds mean for ownership.']])],
  ],
  takeaway:`In the base case the ${FW()} reaches <b>monthly profit in month ${M().get('base').breakeven_month}</b>; ${M().get('down').breakeven_month?'in the downside case, in month '+M().get('down').breakeven_month:'in the downside case it does not reach it within year 1'}. Every figure on this page can be <b>traced to the master model and tested</b>.`,
  doors:['s6-2','s6-3','s6-4','s5-4'],
  sources:[SRC.tra,SRC.bot]})},
 init(){css();const A=I();const root=document.querySelector('.sx');if(!root)return;
  const draw=()=>{const r=M().get(SC),cs=cashOf(r),be=r.breakeven_month,Y=r.years;
   $('p6-scd').textContent=r.label+' case · '+scDesc(SC)+'.';
   $('p6k1').textContent=au(r.y1.revenue);$('p6k1s').textContent='One store, first 12 months, net of VAT';
   $('p6k2').textContent=sgn(r.y1.profit);$('p6k2').style.color=r.y1.profit<0?C.neg:'';$('p6k2s').textContent=pct(r.y1.profit/r.y1.revenue)+' of revenue';
   $('p6k3').textContent=be?'Month '+be:'After Y1';$('p6k3s').textContent='First month with a profit';
   $('p6k4').textContent=au(Y[11].revenue);$('p6k4s').textContent=Y[11].stores+' stores';
   $('p6k5').textContent=sgn(Y[11].ebitda);$('p6k5s').textContent=pct(Y[11].ebitda/Y[11].revenue)+' margin';
   const ms=r.months;
   chart($('p6c-rev'),{labels:MO,stack:[{vals:ms.map(x=>x.walkin),color:C.walk},{vals:ms.map(x=>x.boxes),color:C.box},{vals:ms.map(x=>x.online),color:C.onl}],read:'p6r-rev',aria:'Monthly revenue by channel',
    tip:i=>{const x=ms[i];return `<span><b>Month ${x.m}</b></span><span>${dot(C.walk)}Walk-in <b>${mm(x.walkin)}</b></span><span>${dot(C.box)}Boxes <b>${mm(x.boxes)}</b> · ${Math.round(x.members)} members</span><span>${dot(C.onl)}Online <b>${mm(x.online)}</b></span><span>Total <b>${mm(x.revenue)}</b></span>`}});
   chart($('p6c-pro'),{labels:MO,bars:[{vals:ms.map(x=>x.profit),color:v=>v<0?C.neg:C.walk}],lines:[{vals:ms.map(x=>x.cum_profit),color:C.cash,w:1.8,dash:true}],read:'p6r-pro',aria:'Monthly profit',
    marks:be?[{i:be-1,t:'Break-even · M'+be}]:[],tip:i=>{const x=ms[i];return `<span><b>Month ${x.m}</b></span><span>Gross profit <b>${mm(x.gross_profit)}</b></span><span>Running costs <b>${mm(x.opex)}</b></span><span>Profit <b style="color:${x.profit<0?C.neg:C.walk}">${sgn(x.profit,mm)}</b></span><span>Cumulative <b>${sgn(x.cum_profit,mm)}</b></span>`}});
   // P&L table
   const m1=v=>(v/1e6).toFixed(1),cl=v=>v<0?'neg':'pos';
   const rows=[['Visitors a day',x=>Math.round(x.visitors_day),'sub',null],['Afya Box members',x=>Math.round(x.members),'sub',null],['Walk-in sales',x=>m1(x.walkin),'',r.months.reduce((a,x)=>a+x.walkin,0)],['Afya Box revenue',x=>m1(x.boxes),'',sum(ms.map(x=>x.boxes))],['Online revenue',x=>m1(x.online),'',sum(ms.map(x=>x.online))],['Revenue',x=>m1(x.revenue),'tot',r.y1.revenue],['Gross profit',x=>m1(x.gross_profit),'',r.y1.gross_profit],['Running costs',x=>'−'+m1(x.opex),'',-r.y1.opex],['Profit',x=>m1(x.profit),'tot hl',r.y1.profit],['Cumulative profit',x=>m1(x.cum_profit),'sub',null]];
   $('p6t-pl').innerHTML=`<table><thead><tr><th>${r.label} · TSh M</th>${ms.map(x=>`<th>M${x.m}</th>`).join('')}<th>Year 1</th></tr></thead><tbody>${rows.map(rw=>`<tr class="${rw[2]}"><td>${rw[0]}</td>${ms.map(x=>{const v=rw[1](x);const isP=rw[0].indexOf('rofit')>0&&rw[0]!=='Gross profit';return `<td class="${isP?cl(parseFloat(v)):''}${rw[0]==='Profit'&&x.m===be?' be':''}">${v}</td>`}).join('')}<td>${rw[3]==null?(rw[0]==='Afya Box members'?Math.round(ms[11].members):rw[0]==='Cumulative profit'?m1(ms[11].cum_profit):'—'):(rw[3]<0&&rw[0]==='Running costs'?'−'+m1(-rw[3]):m1(rw[3]))}</td></tr>`).join('')}</tbody></table>`;
   // 12-year
   chart($('p6c-12'),{labels:Y.map(y=>'Y'+y.year),bars:[{vals:Y.map(y=>y.revenue),color:C.rev}],lines:[{vals:Y.map(y=>y.ebitda),color:C.ebit,dotc:v=>v<0?C.neg:C.ebit}],read:'p6r-12',bw:30,aria:'Twelve-year revenue and EBITDA',
    tip:i=>{const y=Y[i];return `<span><b>Year ${y.year}</b> · ${y.stores} store${y.stores>1?'s':''} (+${y.new_stores})</span><span>Revenue <b>${au(y.revenue)}</b></span><span>EBITDA <b style="color:${y.ebitda<0?C.neg:C.ebit}">${sgn(y.ebitda)}</b></span><span>Members <b>${y.members.toLocaleString('en-US')}</b></span>`}});
   let cum=0;const b1=v=>(v/1e9).toFixed(2);
   $('p6t-12').innerHTML=`<table><thead><tr><th>${r.label} · TSh B</th>${Y.map(y=>`<th>Y${y.year}</th>`).join('')}</tr></thead><tbody>
    <tr class="sub"><td>Stores (new)</td>${Y.map(y=>`<td>${y.stores} (+${y.new_stores})</td>`).join('')}</tr>
    <tr class="tot"><td>Revenue</td>${Y.map(y=>`<td>${b1(y.revenue)}</td>`).join('')}</tr>
    <tr><td>Gross profit</td>${Y.map(y=>`<td>${b1(y.gross_profit)}</td>`).join('')}</tr>
    <tr><td>Store running costs</td>${Y.map(y=>`<td>−${b1(y.store_opex)}</td>`).join('')}</tr>
    <tr><td>Head office</td>${Y.map(y=>`<td>${y.head_office?'−'+b1(y.head_office):'0.00'}</td>`).join('')}</tr>
    <tr class="tot hl"><td>EBITDA</td>${Y.map(y=>`<td class="${cl(y.ebitda)}">${b1(y.ebitda)}</td>`).join('')}</tr>
    <tr><td>New-store capex</td>${Y.map(y=>`<td>−${b1(y.capex)}</td>`).join('')}</tr>
    <tr><td>EBITDA − capex</td>${Y.map(y=>`<td class="${cl(y.ebitda-y.capex)}">${b1(y.ebitda-y.capex)}</td>`).join('')}</tr>
    <tr class="sub"><td>Cumulative</td>${Y.map(y=>{cum+=y.ebitda-y.capex;return `<td class="${cl(cum)}">${b1(cum)}</td>`}).join('')}</tr></tbody></table>`;
   // cash
   $('p6-t12').textContent=mm(cs.T[0]+cs.T[1]);$('p6-bld').textContent=mm(cs.build);$('p6-om').textContent=cs.openM;$('p6-mt').textContent=cs.memT;
   $('p6-t3m').textContent=cs.t3m?'month '+cs.t3m:'not reached in Year 1';
   chart($('p6c-cash'),{labels:['M0'].concat(MO),lines:[{vals:cs.upfront,color:'#d9b56e',w:1.6,dash:true,dots:false},{vals:cs.staged,color:C.cash,dotc:v=>v<0?C.neg:C.cash}],read:'p6r-cash',aria:'Cash balance',
    marks:cs.t3m?[{i:cs.t3m,t:'Tranche 3 · '+mm(cs.T[2]),c:'#5fbf8f'}]:[],
    tip:i=>`<span><b>${i?'Month '+i:'Before opening'}</b></span><span>${dot(C.cash)}At milestones <b style="color:${cs.staged[i]<0?C.neg:''}">${sgn(cs.staged[i],mm)}</b></span><span>${dot('#d9b56e')}Day one <b style="color:${cs.upfront[i]<0?C.neg:''}">${sgn(cs.upfront[i],mm)}</b></span>${i?`<span>Profit <b>${sgn(r.months[i-1].profit,mm)}</b></span>`:''}`});
   const needS=Math.max(0,-cs.lowS.v),needU=Math.max(0,-cs.lowU.v);
   $('p6-cashcall').className='p6-callout'+(needU>0?'':' n');
   $('p6-cashcall').innerHTML=`<h4>${needU>0?'Cash finding · a gap to close':'Cash finding'}</h4>
    At their deepest, cumulative losses before break-even reach <b>${mm(-cs.trough)}</b>. After the build the seed also holds <b>${mm(cs.reserve)}</b> as a working-capital reserve. ${needU>0?`Even with the full ${mm(I().seed.amount)} on day one, cash would fall to <b>${sgn(cs.lowU.v,mm)}</b> in ${cs.lowU.i?'month '+cs.lowU.i:'month 0'}. With tranches released at milestones the low point is <b>${sgn(cs.lowS.v,mm)}</b> (${cs.lowS.i?'month '+cs.lowS.i:'before opening'})${cs.build>cs.T[0]+cs.T[1]?`, because the build (${mm(cs.build)}) exceeds tranches 1 and 2 (${mm(cs.T[0]+cs.T[1])})`:''}. <b>The gap to close is about ${mm(needU)} with the full seed up front, or ${mm(needS)} with tranches as now</b>, through a larger reserve, a different tranche shape, supplier credit on opening stock or founder pre-funding. The ${mm(I().seed.amount)} ask was recomputed in November 2026 from the corrected master model (VAT, box margins, churn, prime rent and lease advances).`:`In this case cash stays above zero with the full seed on day one (low point ${mm(cs.lowU.v)}). With tranches at milestones the low point is ${sgn(cs.lowS.v,mm)}${needS>0?`, so tranche timing needs about ${mm(needS)} of bridging, for example supplier credit on opening stock.`:'.'}`} <span class="tagi">Planning estimate</span>`;
   // costs
   const ox=A.opex_month,cf=A.scenarios[SC].cost,tot=sum(Object.values(ox))*cf,mx=Math.max(...Object.values(ox))*cf;const cols=['#5fbf8f','#d9b56e','#f2c96b','#b5dfc6','#ff9b87','#c9b8ff','#ffe7a8','#7fd1b0'];
   $('p6-costs').innerHTML=Object.keys(ox).sort((a,b)=>ox[b]-ox[a]).map((k,i)=>{const v=ox[k]*cf,l=opexLabel(k);return `<div class="p6-cost" style="--c:${cols[i%8]}"><div><b>${l[0]}</b><small>${l[1]}</small></div><div class="bar"><i style="width:${(v/mx*100).toFixed(1)}%"></i></div><div class="v">${mm(v)}<small> · ${pct(v/tot,0)}</small></div></div>`}).join('')+`<div class="p6-cost tot" style="--c:#f2c96b"><div><b>Total a month</b><small>${r.label} case · ×${cf} cost factor</small></div><div class="bar"><i style="width:100%"></i></div><div class="v">${mm(tot)}<small> · ${mm(tot*12)}/yr</small></div></div>`;
   // scenario comparison
   const all=M().scenarios.map(k=>{const q=M().get(k);return {k,q,c:cashOf(q)}});
   const rowsS=[['Year 1 revenue',o=>au(o.q.y1.revenue)],['Year 1 gross profit',o=>au(o.q.y1.gross_profit)],['Year 1 running costs',o=>au(o.q.y1.opex)],['Year 1 profit',o=>sgn(o.q.y1.profit)],['Break-even month',o=>o.q.breakeven_month?'Month '+o.q.breakeven_month:'After Y1'],['Members, month 12',o=>Math.round(o.q.months[11].members)],['Deepest cumulative loss',o=>sgn(o.c.trough,mm)],['Lowest cash · tranches at milestones',o=>sgn(o.c.lowS.v,mm)],['Year 5 revenue',o=>au(o.q.years[4].revenue)],['Year 12 revenue',o=>au(o.q.years[11].revenue)],['Year 12 EBITDA',o=>sgn(o.q.years[11].ebitda)]];
   $('p6t-sc').innerHTML=`<table><thead><tr><th>Measure</th>${all.map(o=>`<th style="${o.k===SC?'color:var(--neon)':''}">${esc(o.q.label)}</th>`).join('')}</tr></thead><tbody>${rowsS.map(rw=>`<tr><td>${rw[0]}</td>${all.map(o=>`<td style="${o.k===SC?'color:var(--ink);background:rgba(95,191,143,.06)':''}">${rw[1](o)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
   sens()};
  // sensitivity
  const g=$,ids=['vis','conv','bas','mem','rent'];
  const sens=()=>{const o={vis:+g('p6s-vis').value,conv:+g('p6s-conv').value,basket:+g('p6s-bas').value,members:+g('p6s-mem').value,rent:+g('p6s-rent').value};
   g('p6o-vis').textContent=o.vis+' / day';g('p6o-conv').textContent=pct(o.conv,0);g('p6o-bas').textContent=tz(o.basket);g('p6o-mem').textContent=o.members.toLocaleString('en-US');g('p6o-rent').textContent=mm(o.rent);
   const r=sim(SC,o),b=M().get(SC),dP=r.y1.profit-b.y1.profit;const tr=Math.min(0,...r.months.map(x=>x.cum_profit)),trb=Math.min(0,...b.months.map(x=>x.cum_profit));
   g('p6x-pro').textContent=sgn(r.y1.profit);g('p6x-pro').style.color=r.y1.profit<0?C.neg:'';
   g('p6x-prod').textContent=Math.abs(dP)<1?'Same as the model':(dP>0?'+':'−')+mm(Math.abs(dP))+' vs model ('+b.label+')';g('p6x-prod').className='p6-delta '+(dP>=0?'up':'dn');
   g('p6x-be').textContent=r.breakeven_month?'Month '+r.breakeven_month:'Not in Year 1';
   const db=(r.breakeven_month||13)-(b.breakeven_month||13);g('p6x-bed').textContent=db===0?'Same as the model':(db>0?db+' month'+(db>1?'s':'')+' later':(-db)+' month'+(db<-1?'s':'')+' earlier');g('p6x-bed').className='p6-delta '+(db<=0?'up':'dn');
   g('p6x-tr').textContent=sgn(tr,mm);const dt=tr-trb;g('p6x-trd').textContent=Math.abs(dt)<1?'Same as the model':(dt>0?'Smaller by ':'Deeper by ')+mm(Math.abs(dt));g('p6x-trd').className='p6-delta '+(dt>=0?'up':'dn');
   chart(g('p6c-sens'),{labels:MO,h:150,bars:[{vals:r.months.map(x=>x.profit),color:v=>v<0?C.neg:C.walk}],lines:[{vals:b.months.map(x=>x.profit),color:'rgba(255,231,168,.8)',w:1.4,dash:true,dots:false}],aria:'Monthly profit with your inputs'});
   g('p6x-txt').innerHTML=`Bars: monthly profit with your inputs. Dashed line: the ${esc(b.label.toLowerCase())} model. Year 1 revenue ${au(r.y1.revenue)}.`};
  ids.forEach(k=>g('p6s-'+k).oninput=sens);
  g('p6s-reset').onclick=()=>{g('p6s-vis').value=A.store.visitors_day_m12;g('p6s-conv').value=A.store.conversion;g('p6s-bas').value=A.store.basket;g('p6s-mem').value=A.members.end_y1;g('p6s-rent').value=A.opex_month.rent;sens()};
  g('p6s-stress').onclick=()=>{g('p6s-vis').value=Math.round(A.store.visitors_day_m12*.8/5)*5;g('p6s-mem').value=Math.round(A.members.end_y1*.8/10)*10;sens()};
  wireSc(root,draw);onResize(draw);draw()}};

/* =====================================================================================
   6.2 THE CUSTOMER-FUNDED MODEL
   ===================================================================================== */
const PRICE_EL=[['retail','Retail margin','on walk-in & online baskets'],['box','Box price','products + packing & delivery'],['fee','Delivery fee','on online orders'],['cards','Card fees','four paid membership cards'],['rent','Rental fees','equipment rental'],['royal','Royal premium','Afya Royal card & gifts']];
// m = main recovery, s = supporting recovery
const COVER=[
 ['rent','Rent',{retail:'m',box:'m'},'Rent is a fixed cost. It is recovered from the gross margin on every basket and every box: a '+'%RG%'+' retail margin and a '+'%BG%'+' margin on box products in the base model.'],
 ['staff','Store staff',{retail:'m',box:'m',fee:'s',cards:'s'},'The store lead and advisers are paid from basket and box margin. The two riders are salaried within staff costs; the online delivery fee and the delivery element of each box price recover their work.'],
 ['utilities_internet','Utilities & internet',{retail:'m',box:'s'},'Power and internet keep the till, screens and Afya Check running. They are recovered mainly from basket margin, with a contribution from boxes.'],
 ['systems_software','Systems & software',{retail:'m',box:'m',cards:'s'},'One connected system runs the till, members and boxes, so baskets and boxes both pay for it; card fees contribute towards member features.'],
 ['marketing','Marketing',{retail:'m',box:'s',royal:'s'},'Marketing brings visitors in, and their baskets repay it. The Afya Royal fee covers its own gift packaging and presentation.'],
 ['check_station','Afya Check station',{retail:'m',cards:'s'},'The Afya Check is free and carries no obligation to buy. It is funded by the margin on purchases that follow a check ('+'%CP%'+' of checks in the base model) and by the Afya Care card, which includes a monthly full check.'],
 ['insurance_licences','Insurance & licences',{retail:'m',box:'m'},'A fixed cost of trading legally, recovered from gross margin on baskets and boxes.'],
 ['packaging_misc','Packaging & other',{box:'m',fee:'s'},'Box packing materials are inside the box price; bags and sundries for online orders are inside the delivery fee and basket margin.'],
 ['rider','Rider cost per online order',{fee:'m'},'Each online delivery costs about '+'%RC%'+' in charging and maintenance; rider salaries sit in staff costs. The customer pays a '+'%DF%'+' fee, which recovers the cost in full with a margin.'],
 ['boxpack','Packing & delivery of each box',{box:'m'},'Every box price includes '+'%PD%'+' for the box at landed cost and delivery, charged to the member at cost.'],
 ['equip','Rental equipment upkeep',{rent:'m'},'Cleaning, servicing and replacing rental equipment (walking frames, wheelchairs) is recovered from the rental fee.'],
 ['premium','Premium packaging & personal adviser',{royal:'m'},'Gift packaging, premium brands and the personal adviser are reserved for Afya Royal members and paid for by the Royal fee.']];
window.SECTIONS['s6-2']={render(s,p,pv,nx){css();const A=I(),r=M().get('base');const ox=A.opex_month,tot=sum(Object.values(ox));
 const fill=t=>t.replace('%RG%',pct(A.store.retail_gm,0)).replace('%BG%',pct(A.members.box_products_gm,0)).replace('%CP%',pct(A.check.check_to_purchase,0)).replace('%RC%',tz(A.online.rider_cost_per_order)).replace('%DF%',tz(A.online.delivery_fee)).replace('%PD%',tz(A.members.packing_delivery_in_price));
 const pdCost=A.members.packing_delivery_in_price*(1-(A.members.pd_margin||0));
 const m12=r.months[11],ord12=A.online.orders_day_m12*30;
 const paidCards=A.cards.filter(c=>c.fee_year>0);
 return secShell({s,p,pv,nx,img:'img/boxdoor.webp),url(img/exterior.webp',imgAlt:'Concept image: a closed royal-green Afya Box handed over at a home doorstep',
  h1:'Customers fund the running costs.',em:'Investor capital funds the build.',
  lede:'Afya Basics operates on one financial rule: every recurring cost is recovered inside a price the customer chooses to pay. Delivery sits in the delivery fee and the box price, advice in the product margin, premium service in the Royal fee. Investor capital pays for the one-off build and the losses until break-even, not for running a mature store.',
  mods:[
  ['The problem it solves',`
   <p class="s11lead">Many new retail and delivery businesses grow through subsidy: free delivery, deep discounts and free services funded by investors. Each new customer then adds to losses, and the business survives only by raising more capital. When funding stops, the subsidies stop and customers leave.</p>
   ${plain([['A subsidy is a hidden running cost.','If each delivery costs '+tz(A.online.rider_cost_per_order)+' and the customer pays nothing, the business loses that amount on every order. Losses grow with sales.'],['Afya Basics prices every recurring cost.','Rent, staff, delivery, packing and the free health check are each built into a price the customer sees: a product price, a box price, a delivery fee or a card fee.'],['Free services are funded explicitly.','The Afya Check is free to the customer. It is funded by the margin on purchases that follow a check and by the Afya Care card, which includes a monthly full check.'],['The result for investors.','Capital builds the store, stock and systems once. Beyond break-even, each additional customer adds profit rather than loss.']])}`],
  ['Our answer · one pricing rule',`
   <p class="oneline">Every running cost is recovered <b>inside a price the customer chooses to pay</b>. Investor capital pays <b>for the build and the path to break-even</b>.</p>
   <div style="margin-top:26px">${p6pcs([
    {f:'rider',alt:'an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street',cap:'delivery',k:'Rule 1 · delivery',h:'Delivery is always priced',body:`<p>Online orders carry a ${tz(A.online.delivery_fee)} delivery fee against about ${tz(A.online.rider_cost_per_order)} per order in charging and maintenance. Each Afya Box price includes ${tz(A.members.packing_delivery_in_price)} for the box at landed cost and delivery, charged at cost. The Afya Family card’s free same-day delivery on boxes works because the box price already contains it.</p>`},
    {f:'check',alt:'the free Afya Check kiosk in use with an adviser explaining the reading',cap:'advice',k:'Rule 2 · advice',h:'Advice is inside the product price',body:`<p>Health advisers and the free Afya Check are funded by the ${pct(A.store.retail_gm,0)} retail margin: one price for everyone, no consultation fee and no obligation to buy. The model assumes ${pct(A.check.check_to_purchase,0)} of checks lead to a purchase; the margin on those purchases covers the station’s ${mm(A.opex_month.check_station)} monthly cost.</p>`},
    {f:'prod-senior',alt:'mobility and elderly-care essentials of the kind offered for rent and sale',cap:'extras',k:'Rule 3 · extras',h:'Extras carry their own cost',body:`<p>Premium service is paid for by the Afya Royal fee (${tz(A.cards.find(c=>c.key==='royal').fee_year)} a year), equipment upkeep by rental fees (for example, a walking frame rented for six weeks after a fall), and member features by card fees from ${tz(Math.min(...paidCards.map(c=>c.fee_year)))} a year.</p>`}])}</div>`],
  ['How it works · the cost-coverage map',`
   <p class="s11lead">Rows are recurring costs; columns are the price elements customers pay. A solid dot marks the main source of recovery, a ring a supporting source. Select a row to see how that cost is recovered.</p>
   <div class="p6-map"><table><thead><tr><th style="text-align:left">Running cost<br><span style="color:var(--ink3)">monthly · base</span></th>${PRICE_EL.map(e=>`<th>${e[1]}<br><span style="color:var(--ink3);letter-spacing:0;text-transform:none">${e[2]}</span></th>`).join('')}</tr></thead>
   <tbody>${COVER.map((c,i)=>`<tr data-i="${i}" class="${i?'':'on'}"><th scope="row">${c[1]}<small>${ox[c[0]]!=null?mm(ox[c[0]])+' · '+pct(ox[c[0]]/tot,0):c[0]==='rider'?tz(A.online.rider_cost_per_order)+' per order':c[0]==='boxpack'?'about '+tz(pdCost)+' per box':'paid per use'}</small></th>${PRICE_EL.map(e=>`<td>${c[2][e[0]]?`<i class="${c[2][e[0]]}" aria-label="${c[2][e[0]]==='m'?'main':'supporting'} recovery"></i>`:''}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
   <div class="p6-maplist">${COVER.map((c,i)=>`<button type="button" data-i="${i}" class="${i?'':'on'}"><b>${c[1]}</b><span>${PRICE_EL.filter(e=>c[2][e[0]]).map(e=>`<em class="${c[2][e[0]]}">${e[1]}</em>`).join('')}</span></button>`).join('')}</div>
   <div class="p6-mapnote"><div class="p6-leg" style="margin:0;align-content:start"><span><i style="background:var(--neon);border-radius:50%"></i>Main recovery</span><span><i style="border:1.5px solid var(--gold);border-radius:50%"></i>Supporting recovery</span></div>
    <div class="p6-callout g" id="p6-mapx" style="margin:0"></div></div>
   <p class="note">Card fees, rental fees and the Royal premium are not counted in the year-1 model; they are upside to the figures in 6.1</p>`],
  ['The experience · where each shilling goes',`
   <p class="s11lead">Choose a purchase and a month. The price splits into supplier cost, packing and delivery, and the contribution left for running costs. That contribution is allocated across the cost lines in proportion to the month’s base-case costs. <span class="tagi">Planning estimate</span></p>
   <div class="p6-tabs" id="p6-buy" role="tablist">
    <button type="button" class="on" data-b="box" role="tab"><span>One Afya Box</span><small>${tz(A.members.avg_box)} average</small></button>
    <button type="button" data-b="walk" role="tab"><span>One walk-in basket</span><small>${tz(A.store.basket)} average</small></button>
    <button type="button" data-b="onl" role="tab"><span>One online order</span><small>${tz(A.online.basket)} + ${tz(A.online.delivery_fee)} fee</small></button>
   </div>
   <div class="cin" style="margin-top:14px"><label style="margin-top:0"><span>Month after opening <em style="font-style:normal;color:var(--ink3)">· early months show the gap funded by the seed</em></span><input type="range" id="p6-wm" min="1" max="12" value="12"><output id="p6-wmo"></output></label></div>
   <div class="p6-shill">
    <div class="p6-panel"><h3 id="p6-wt">–</h3><p id="p6-ws">–</p><div class="p6-stack" id="p6-wstack"></div><div class="p6-split" id="p6-wsplit1"></div></div>
    <div class="p6-panel"><h3>Contribution to running costs, by line</h3><p id="p6-ws2">–</p><div class="p6-split" id="p6-wsplit2"></div></div>
   </div>`],
  ['Proof · delivery is fully paid for',`
   <div class="p6-two">
    <div class="p6-panel p6-proof">
     <div class="p6-pr"><h4>Online order delivery</h4>
      <div class="pb"><span>Customer pays</span><div class="bar"><i style="width:100%;background:${C.walk}"></i></div><b>${tz(A.online.delivery_fee)}</b></div>
      <div class="pb"><span>Cost per order</span><div class="bar"><i style="width:${(A.online.rider_cost_per_order/A.online.delivery_fee*100).toFixed(1)}%;background:${C.neg}"></i></div><b>${tz(A.online.rider_cost_per_order)}</b></div>
      <div class="pb"><span>Margin</span><div class="bar"><i style="width:${((A.online.delivery_fee-A.online.rider_cost_per_order)/A.online.delivery_fee*100).toFixed(1)}%;background:${C.box}"></i></div><b>${tz(A.online.delivery_fee-A.online.rider_cost_per_order)}</b></div></div>
     <div class="p6-pr"><h4>Afya Box packing & delivery</h4>
      <div class="pb"><span>Inside price</span><div class="bar"><i style="width:100%;background:${C.walk}"></i></div><b>${tz(A.members.packing_delivery_in_price)}</b></div>
      <div class="pb"><span>Cost to us</span><div class="bar"><i style="width:${(pdCost/A.members.packing_delivery_in_price*100).toFixed(1)}%;background:${C.neg}"></i></div><b>${tz(pdCost)}</b></div>
      <div class="pb"><span>Margin</span><div class="bar"><i style="width:${((1-pdCost/A.members.packing_delivery_in_price)*100).toFixed(1)}%;background:${C.box}"></i></div><b>${tz(A.members.packing_delivery_in_price-pdCost)}</b></div></div>
    </div>
    <div class="p6-panel"><h3><small>Month 12 · base case</small>Delivery cost is fully recovered</h3>
     <div class="p6-li"><span>${ord12.toLocaleString('en-US')} online orders × ${tz(A.online.delivery_fee)} fee</span><b>${mm(ord12*A.online.delivery_fee)}</b></div>
     <div class="p6-li"><span>Charging and maintenance, ${tz(A.online.rider_cost_per_order)} per order</span><b>−${mm(ord12*A.online.rider_cost_per_order)}</b></div>
     <div class="p6-li"><span>${Math.round(m12.members)} boxes × ${tz(A.members.packing_delivery_in_price)} packing & delivery</span><b>${mm(m12.members*A.members.packing_delivery_in_price)}</b></div>
     <div class="p6-li"><span>Packing & delivery cost, ${tz(pdCost)} per box</span><b>−${mm(m12.members*pdCost)}</b></div>
     <div class="p6-li t"><span>Delivery surplus in month 12</span><b>${mm(ord12*(A.online.delivery_fee-A.online.rider_cost_per_order)+m12.members*(A.members.packing_delivery_in_price-pdCost))}</b></div>
     <p style="margin:12px 0 0;font-size:.86rem;color:var(--ink2)">Example: a son abroad pays ${tz(A.members.avg_box)} for his mother’s monthly box. The ${tz(A.members.packing_delivery_in_price)} inside that price covers the box and the ride to her door, at cost. <span class="tagi">Illustrative</span></p></div>
   </div>
   ${p6ed({f:'hub',alt:'staff packing closed green Afya Boxes at the packing hub',cap:'where the packing element is spent',k:'Inside the box price',h:`How the <em>${tz(A.members.packing_delivery_in_price)}</em> in every box is spent.`,r:1,
     body:`<p>Every Afya Box price contains a fixed ${tz(A.members.packing_delivery_in_price)} element: the green box itself at landed cost (S TSh 3,500 · M TSh 5,000 · L TSh 6,500) and delivery at TSh 3,500. The member sees one price; for the business the cost is <b>paid before the box leaves the shelf</b>.</p>
      <ul><li><b>Picking and packing.</b> Member choices lock 12 days before month end, so boxes are packed to a schedule, sealed and labelled to the member.</li>
      <li><b>The ride.</b> Boxes are grouped by area so one electric-motorbike trip delivers several, which keeps the actual cost within the ${tz(pdCost)} charged.</li>
      <li><b>At cost.</b> The element is priced at cost: it earns no margin, and it cannot turn into a subsidy.</li></ul>`,
     facts:[[tz(A.members.packing_delivery_in_price),'packing & delivery inside each box'],[tz(pdCost),'cost per box'],[nf(m12.members),'boxes in month 12 · base']]})}
   <p class="note">Box at landed cost by size (S TSh 3,500 · M 5,000 · L 6,500) plus TSh 3,500 delivery, charged at cost · rider salaries (${A.staff.filter(x=>/rider/i.test(x[0])).map(x=>x[1]+' × '+mm(x[2])).join('')}) sit in staff costs; the per-order cost covers charging and maintenance only</p>`],
  ['Investor capital and customer revenue',`
   <div class="p6-two">
    <div class="p6-panel"><h3><small>Investor capital · one-off</small>Build and launch the store</h3>
     ${A.seed.use.map(u=>`<div class="p6-li"><span>${esc(u[0])}</span><b>${mm(u[1])}</b></div>`).join('')}
     <div class="p6-li t"><span>Seed round · ${ISL()?'start small':'flagship'}</span><b>${mm(A.seed.amount)}</b></div></div>
    <div class="p6-panel"><h3><small>Customer revenue · every month</small>Run the store</h3>
     ${Object.keys(ox).map(k=>`<div class="p6-li"><span>${opexLabel(k)[0]}</span><b>${mm(ox[k])}</b></div>`).join('')}
     <div class="p6-li t"><span>Running costs a month (base)</span><b>${mm(tot)}</b></div></div>
   </div>
   <div class="p6-callout" id="p6-honest"></div>`],
  ['The numbers · cost coverage',`
   <div class="p6-kpis" id="p6-cfk"></div>
   <p class="note">Coverage = gross profit ÷ running costs for the month · 100% means customers’ prices pay for every running cost</p>
   <div class="p6-panel" style="margin-top:16px"><h3>Running-cost coverage, month by month (base)</h3><p>Above the dashed gold line, customer prices cover every running cost.</p><div class="p6-chart" id="p6c-cov"></div><div class="p6-read" id="p6r-cov"></div></div>`],
  ['Risks and our answer',risks([
   ['Customers may resist a delivery fee.','The fee is shown upfront and is lower than a taxi or bodaboda trip to the store. Click and collect is free. Box members see no separate fee because delivery is inside the box price.'],
   ['Prices may look higher than informal sellers’.','Afya Basics competes on trust and time rather than lowest price: registered products only, 4–5 brands per item including an affordable option, and one price across all channels. The required margin is set out in 6.1.'],
   ['Costs are not covered in the early months.','Until break-even the shortfall is funded by the seed’s provision for operating losses and its working-capital reserve (6.1, module 07). The rule applies once the store trades at break-even or better.'],
   ['Costs rise: fuel, rent, imports.','Each cost sits inside a named price element, so the price to review is known when a cost moves. The downside case adds 5% to all costs.']])],
  ],
  takeaway:'Growth does not depend on subsidy: <b>each customer pays for the costs they create</b>, and investor capital builds the store once, then <b>earns a return from it every month</b> after break-even.',
  doors:['s6-1','s3-4','s4-3','s6-3'],sources:[SRC.tra]})},
 init(){css();const A=I(),root=document.querySelector('.sx');if(!root)return;const r=M().get('base'),ox=A.opex_month,tot=sum(Object.values(ox));
  const fill=t=>t.replace('%RG%',pct(A.store.retail_gm,0)).replace('%BG%',pct(A.members.box_products_gm,0)).replace('%CP%',pct(A.check.check_to_purchase,0)).replace('%RC%',tz(A.online.rider_cost_per_order)).replace('%DF%',tz(A.online.delivery_fee)).replace('%PD%',tz(A.members.packing_delivery_in_price));
  // map
  const rows=[...root.querySelectorAll('.p6-map tbody tr')],mrows=[...root.querySelectorAll('.p6-maplist button')];
  const pick=i=>{rows.forEach((t,k)=>t.classList.toggle('on',k===i));mrows.forEach((t,k)=>t.classList.toggle('on',k===i));const c=COVER[i];
   const mx=$('p6-mapx');if(matchMedia('(max-width:820px)').matches)mrows[i].after(mx);else if(mx.parentNode!==root.querySelector('.p6-mapnote'))root.querySelector('.p6-mapnote').appendChild(mx);
   mx.innerHTML=`<h4>${esc(c[1])} · recovered by ${PRICE_EL.filter(e=>c[2][e[0]]).map(e=>e[1]+(c[2][e[0]]==='m'?'':' (supporting)')).join(', ')}</h4>${fill(c[3])}`};
  rows.forEach((t,i)=>t.onclick=()=>pick(i));mrows.forEach((t,i)=>t.onclick=()=>pick(i));pick(0);
  // where your shilling goes
  let buy='box';const pdCost=A.members.packing_delivery_in_price*(1-(A.members.pd_margin||0));const cols=['#5fbf8f','#d9b56e','#f2c96b','#b5dfc6','#ff9b87','#c9b8ff','#ffe7a8','#7fd1b0'];
  const keys=Object.keys(ox).sort((a,b)=>ox[b]-ox[a]);
  const draw=()=>{const m=+$('p6-wm').value,x=r.months[m-1];$('p6-wmo').textContent='Month '+m;
   let price,parts,title,sub;
   if(buy==='box'){price=A.members.avg_box;const prod=price-A.members.packing_delivery_in_price,cost=prod*(1-A.members.box_products_gm);
    parts=[['Products · paid to suppliers',cost,'#4d6b60'],['Packing & delivery · paid out',pdCost,'#d9b56e'],['Left for running costs',price-cost-pdCost,'#5fbf8f']];
    title='One Afya Box · '+tz(price);sub='Product cost at a '+pct(A.members.box_products_gm,0)+' margin on '+tz(prod)+' of products; the '+tz(A.members.packing_delivery_in_price)+' packing and delivery element is charged at cost.'}
   else if(buy==='walk'){price=A.store.basket;const cost=price*(1-A.store.retail_gm);parts=[['Products · paid to suppliers',cost,'#4d6b60'],['Left for running costs',price-cost,'#5fbf8f']];
    title='One walk-in basket · '+tz(price);sub='At the '+pct(A.store.retail_gm,0)+' retail margin, with no delivery cost.'}
   else{price=A.online.basket+A.online.delivery_fee;const cost=A.online.basket*(1-A.store.retail_gm);parts=[['Products · paid to suppliers',cost,'#4d6b60'],['Delivery · paid out',A.online.rider_cost_per_order,'#d9b56e'],['Left for running costs',price-cost-A.online.rider_cost_per_order,'#5fbf8f']];
    title='One online order · '+tz(price);sub='Basket at the retail margin, plus a '+tz(A.online.delivery_fee)+' delivery fee against '+tz(A.online.rider_cost_per_order)+' per order in charging and maintenance.'}
   $('p6-wt').textContent=title;$('p6-ws').textContent=sub;
   $('p6-wstack').innerHTML=parts.map(q=>`<div style="flex:${q[1]} 1 0;background:${q[2]};${q[2]==='#4d6b60'?'color:#e7f3ee':''}" title="${esc(q[0])}">${q[1]/price>.12?pct(q[1]/price,0):''}</div>`).join('');
   $('p6-wsplit1').innerHTML=parts.map(q=>`<div><i style="background:${q[2]}"></i><span>${q[0]}</span><b>${tz(q[1])}</b><em>${Math.round(q[1]/price*1000)} / 1,000</em></div>`).join('');
   const contrib=parts[parts.length-1][1],cov=x.gross_profit/x.opex;
   const share=cov>=1?1/cov:1;// part of contribution that pays costs
   const lines=keys.map((k,i)=>[opexLabel(k)[0],contrib*share*ox[k]/tot,cols[i%8]]);
   let extra='';if(cov>=1)extra=`<div class="pro"><i style="background:var(--gold)"></i><span>Profit for the company</span><b>${tz(contrib*(1-share))}</b><em>${pct(1-share,0)}</em></div>`;
   else extra=`<div class="gap"><i style="background:${C.neg}"></i><span>Still uncovered this month, per ${buy==='walk'?'basket':buy==='box'?'box':'order'} (funded by the seed)</span><b>${tz(contrib*(1/cov-1))}</b><em>${pct(1/cov-1,0)}</em></div>`;
   $('p6-ws2').innerHTML=`In month ${m} the base model earns ${mm(x.gross_profit)} gross profit against ${mm(x.opex)} running costs: coverage <b style="color:${cov>=1?'var(--neon)':C.neg}">${pct(cov,0)}</b>. Of the ${tz(contrib)} this purchase leaves:`;
   $('p6-wsplit2').innerHTML=lines.map(q=>`<div><i style="background:${q[2]}"></i><span>${q[0]}</span><b>${tz(q[1])}</b><em>${pct(q[1]/contrib,0)}</em></div>`).join('')+extra};
  root.querySelectorAll('#p6-buy button').forEach(b=>b.onclick=()=>{buy=b.dataset.b;root.querySelectorAll('#p6-buy button').forEach(q=>q.classList.toggle('on',q===b));draw()});
  $('p6-wm').oninput=draw;draw();
  // honest note + numbers
  const cs=cashOf(r);const be=r.breakeven_month;
  $('p6-honest').innerHTML=`<h4>The exception before break-even</h4>Until break-even (month ${be} in the base case) gross profit does not cover running costs. Those early losses, <b>${mm(-cs.trough)}</b> at their deepest, are funded by the seed: ${mm(sum(A.seed.use.filter(u=>/operating losses/i.test(u[0])).map(u=>u[1])))} is set aside for operating losses and lease advances, with a further ${mm(cs.reserve)} working-capital reserve. From break-even onward the rule holds in full. ${PE}`;
  const ms=r.months,cov=ms.map(x=>x.gross_profit/x.opex),covY=r.y1.gross_profit/r.y1.opex;const firstFull=ms.find(x=>x.gross_profit>=x.opex);
  $('p6-cfk').innerHTML=kpi('Coverage · month 1',pct(cov[0],0),'Gross profit ÷ running costs','#ff9b87')+kpi('Coverage · month 12',pct(cov[11],0),'Gross profit above running costs','#5fbf8f')+kpi('Coverage · Year 1',pct(covY,0),'Across the whole first year','#f2c96b')+kpi('Fully covered from','Month '+(firstFull?firstFull.m:'–'),'First month the rule is met','#ffe7a8')+kpi('Delivery margin',pct((A.online.delivery_fee-A.online.rider_cost_per_order)/A.online.delivery_fee,0),'Of every delivery fee, after the rider','#d9b56e');
  const dc=()=>chart($('p6c-cov'),{labels:MO,bars:[{vals:cov.map(v=>v*100),color:v=>v<100?C.neg:C.walk}],lines:[{vals:cov.map(()=>100),color:'#f2c96b',w:1.2,dash:true,dots:false}],read:'p6r-cov',aria:'Running-cost coverage by month',
   tip:i=>`<span><b>Month ${i+1}</b></span><span>Gross profit <b>${mm(ms[i].gross_profit)}</b></span><span>Running costs <b>${mm(ms[i].opex)}</b></span><span>Coverage <b style="color:${cov[i]<1?C.neg:C.walk}">${pct(cov[i],0)}</b></span>`});
  onResize(dc);dc()}};

/* =====================================================================================
   6.3 FUNDING AND USE OF FUNDS
   ===================================================================================== */
const USE_ITEMS=[
 ['Street-front interior works and finishing','Lit display towers and Care Zone shelving','Corner service counter and lounge seating','AFYA BASICS exterior sign and door screen'],
 ['Six months of rent paid to the landlord before opening','Rent benchmarked at the Knight Frank prime rate of US$25 per m² a month','Dar es Salaam landlords commonly ask for 6–8 months up front'],
 ['First order across about 520 product families','4–5 registered brands per item, in the same price range','Stock for the first Afya Boxes','Safety stock of fast movers: nappies, test strips, dressings','Only TMDA-registered products where registration is required'],
 ['Till, stock and member system set-up (the one connected system)','Afya Check kiosk with its measuring devices','Digital menu screens, video wall and digital shelf labels','Staff handhelds for scan, pay and picking','App and WhatsApp ordering set-up'],
 ['Two electric delivery motorbikes','Insulated green Afya delivery boxes','Charging set-up at the store','Rider safety equipment'],
 ['Opening campaign on social media and WhatsApp','Free Afya Check days in the neighbourhood','Launch event at the store','Leaflets and local signage'],
 ['Recruiting the store lead, advisers, picker and packer, and riders','Training on products, the Afya Check, the system and written procedures'],
 ['Monthly operating losses until the store reaches break-even','Later lease advances that fall due before break-even','Drawn only as needed and reported monthly'],
 ['Three months of running costs, excluding rent','Cover for unexpected costs during the first months','Kept in a separate account and reported monthly']];
const UCOL=['#5fbf8f','#f2c96b','#d9b56e','#b5dfc6','#ff9b87','#c9b8ff'];
window.SECTIONS['s6-3']={render(s,p,pv,nx){css();const A=I(),sd=A.seed,T=sd.tranches.map(t=>t*sd.amount);const g=sd.phase0_gap,gap=g.research_setup_costs-g.phase0_budget;
 const post=sd.amount/A.ownership.seed_investor_share;
 return secShell({s,p,pv,nx,img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics store at dusk with AFYA BASICS on the roof edge',
  h1:ISL()?window.V3.L('Start small: store one for '+mm(sd.amount)+'.','Anza kidogo: duka la kwanza kwa '+mm(sd.amount)+'.'):window.V3.L('The flagship: store one for '+mm(sd.amount)+'.','Duka kuu: duka la kwanza kwa '+mm(sd.amount)+'.'),em:window.V3.L('Released in three verifiable tranches.','Unatolewa kwa awamu tatu zinazothibitishwa.'),
  lede:(()=>{const be=M().get('base').breakeven_month,tr=sd.tranches.map(t=>Math.round(t*100)+'%').join(', '),V=window.V3;return ISL()?V.L(`The start-small option opens store one as a ${A.store.area_m2} m² store on a good secondary street, with a five-person team on one long shift, partner riders paid per order and a manual check corner. It requires ${mm(sd.amount)} and reaches a monthly profit from about month ${be}. The amount covers the one-off build, the lease advance, opening stock, technology, launch, losses until break-even and a reserve, and is released in three tranches of ${tr}, each only when a verifiable milestone is met.`,`Chaguo la kuanza kidogo linafungua duka la kwanza kama duka la m² ${A.store.area_m2} katika barabara nzuri ya pili, likiwa na timu ya watu watano kwa zamu moja ndefu, wasafirishaji washirika wanaolipwa kwa kila oda na kona ya kupima ya kawaida. Linahitaji ${mm(sd.amount)} na linafikia faida ya mwezi kuanzia takriban mwezi wa ${be}. Kiasi hiki kinagharamia ujenzi wa mara moja, kodi ya mapema, bidhaa za kuanzia, teknolojia, uzinduzi, hasara hadi kufikia faida na akiba, na kinatolewa kwa awamu tatu za ${tr}, kila moja pale tu hatua inayothibitishwa inapofikiwa.`):V.L(`The flagship option opens store one as a ${A.store.area_m2} m² street-front store on a prime street, with two shifts, the Afya Check kiosk and two electric riders. It requires ${mm(sd.amount)} and reaches a monthly profit from about month ${be}. The amount covers the one-off build, the lease advance, opening stock, technology, launch, losses until break-even and a reserve, and is released in three tranches of ${tr}, each only when a verifiable milestone is met.`,`Chaguo la duka kuu linafungua duka la kwanza kama duka la m² ${A.store.area_m2} linalotazama barabara kuu, likiwa na zamu mbili, kibanda cha Afya Check na wasafirishaji wawili wa pikipiki za umeme. Linahitaji ${mm(sd.amount)} na linafikia faida ya mwezi kuanzia takriban mwezi wa ${be}. Kiasi hiki kinagharamia ujenzi wa mara moja, kodi ya mapema, bidhaa za kuanzia, teknolojia, uzinduzi, hasara hadi kufikia faida na akiba, na kinatolewa kwa awamu tatu za ${tr}, kila moja pale tu hatua inayothibitishwa inapofikiwa.`)})(),
  mods:[
  ['Two ways to start · TSh 150M or TSh 340M',(()=>{const MM=M(),L=MM.leanInputs(),F=MM.flag.inputs,sc=['base','down','best'];
   const run=(lean,k)=>lean?MM.lean(k):MM.flag.get(k);
   const cash=(lean,k)=>{const I2=lean?L:F,r=run(lean,k),sd=I2.seed,isR=u=>/working|operating losses/i.test(u[0]),LA=I2.lease_advance_months||6,rent=I2.opex_month.rent*((I2.scenarios[k]||{}).cost||1);let c=sd.amount-sd.use.filter(u=>!isR(u)).reduce((t,u)=>t+u[1],0),lo=c;r.months.forEach(x=>{c+=x.profit+rent-(x.m>LA-2&&(x.m-(LA-2)-1)%LA===0?LA*rent:0);lo=Math.min(lo,c)});return lo};
   const bo=x=>x?'Month '+x:'After year 1',deep=r=>Math.min(0,...r.months.map(x=>x.cum_profit));
   const col=lean=>{const I2=lean?L:F,b=run(lean,'base');return{I2,b,dn:run(lean,'down'),bt:run(lean,'best')}};const S=col(true),B=col(false);
   const row=(lab,f,note)=>`<tr><td><b>${lab}</b>${note?`<small>${note}</small>`:''}</td><td class="v">${f(S,true)}</td><td class="v">${f(B,false)}</td></tr>`;
   return `<p class="s11lead">The same business can open at two sizes. <b>Start small</b> opens a 100 m² store on a good secondary street, with three advisers on one long shift, partner riders paid per delivery and a manual check corner; the Afya Check kiosk and own electric riders are added later from the store’s own cash. <b>Flagship</b> opens the 180 m² prime street-front store with two shifts, the kiosk and two electric riders from day one. Products, boxes, prices, app and master model are identical; only the size of the first store differs.</p>
   <div class="p33wrap" style="margin-top:14px"><table class="p33tbl"><thead><tr><th></th><th>Start small · ${mm(L.seed.amount)}</th><th>Flagship · ${mm(F.seed.amount)}</th></tr></thead><tbody>
   ${row('Store',(c,l)=>l?'100 m², secondary street':'180 m², prime street-front')}
   ${row('Rent a month',c=>mm(c.I2.opex_month.rent),'flagship: Knight Frank prime benchmark; start small: estimate')}
   ${row('Team',(c,l)=>l?'5 people, one long shift':'8 people, two shifts')}
   ${row('Running costs a month',c=>mm(c.b.opex_month),'rent, staff with NSSF and WCF, utilities, systems, marketing')}
   ${row('Year-1 revenue, net of VAT',c=>mm(c.b.y1.revenue))}
   ${row('Year-1 store profit',c=>(c.b.y1.profit<0?'−':'')+mm(Math.abs(c.b.y1.profit)))}
   ${row('First month with a profit',c=>bo(c.b.breakeven_month),'base case')}
   ${row('Downside · best case',c=>bo(c.dn.breakeven_month)+' · '+bo(c.bt.breakeven_month),'demand −25% and costs +5% · demand +20%')}
   ${row('Deepest cumulative loss',c=>'−'+mm(Math.abs(deep(c.b))))}
   ${row('Afya Box members at month 12',c=>Math.round(c.b.months[11].members).toLocaleString('en-US'))}
   ${row('Lowest cash in year 1',(c,l)=>{const v=cash(l,'base');return (v<0?'−':'')+mm(Math.abs(v))},'after the seed, lease advances and losses · base case')}
   ${row('Lowest cash, downside',(c,l)=>{const v=cash(l,'down');return (v<0?'−':'')+mm(Math.abs(v))})}
   </tbody></table></div>
   <div class="p33split" style="margin-top:18px"><div><h4 style="margin:0 0 8px">Use of funds, side by side</h4><table class="p33tbl"><tbody>${(()=>{const w=x=>x.split(/[ :(·&,]/)[0],fm=u=>F.seed.use.find(f=>w(f[0])===w(u[0]));return L.seed.use.map(u=>`<tr><td>${esc(u[0])}</td><td class="v">${mm(u[1])}</td><td class="v">${mm((fm(u)||['',0])[1])}</td></tr>`).join('')+F.seed.use.filter(f=>!L.seed.use.some(u=>w(u[0])===w(f[0]))).map(f=>`<tr><td>${esc(f[0])}</td><td class="v">–</td><td class="v">${mm(f[1])}</td></tr>`).join('')})()}</tbody></table><p class="note">Left column: start small · right column: flagship, matched line by line. The flagship adds two electric motorbikes and carries the Afya Check kiosk in its technology line.</p></div>
   <div><h4 style="margin:0 0 8px">How to choose</h4><p><b>Start small</b> needs less than half the capital and reaches monthly profit about ${Math.max(0,(B.b.breakeven_month||13)-(S.b.breakeven_month||13))} months earlier${cash(true,'down')>=0?', with cash above zero even in the downside case':''}. It serves fewer customers and builds the brand more slowly, so it suits a seed round that must close quickly. <b>Flagship</b> earns more from year two and gives the brand its full first impression, but needs ${mm(F.seed.amount)} and carries a longer, deeper loss before profit. The founders’ preferred path: raise for start small, prove the numbers for six months, then open the second store at flagship size.</p><p class="note">Planning estimates from the same master model (model.js), recomputed for each option; the start-small rent is an estimate until quotations are in hand.</p></div></div>`})()],
  ['The problem it solves',`
   <p class="s11lead">A seed round carries two risks: capital spent before anything is built, and a company that runs out of money halfway. Both are addressed by the same mechanism: capital released in stages against milestones that can be verified.</p>
   ${plain([['The ask is fully allocated.','The '+(ISL()?'start-small':'flagship')+' ask is '+mm(sd.amount)+'. Every shilling is assigned to a use-of-funds line, and the open question on pre-launch costs is set out in module 08.'],['Capital follows progress.','Only '+Math.round(sd.tranches[0]*100)+'% is released at signing. The next '+Math.round(sd.tranches[1]*100)+'% follows completed fit-out and licences. The final '+Math.round(sd.tranches[2]*100)+'% follows three months of trading, 100 Afya Box members and a monthly loss below TSh 16M.'],['Capital builds; customers fund operations.','Under the customer-funded rule (6.2), the seed pays for the build and the losses until break-even. From break-even, customer revenue pays the running costs.'],['Spending is reported monthly.','A monthly investor pack shows spending against plan, cash in the bank and progress to the next milestone.']])}`],
  ['Our answer · the ask',`
   <div class="p6-kpis">
    ${kpi('Seed ask · '+(ISL()?'start small':'flagship'),mm(sd.amount),ISL()?'100 m² store, one long shift':'180 m² prime-street store','#ffe7a8')}
    ${kpi('Tranche 1 · signing',mm(T[0]),pct(sd.tranches[0],0)+' of the round','#f2c96b')}
    ${kpi('Tranche 2 · ready to open',mm(T[1]),pct(sd.tranches[1],0)+' of the round','#5fbf8f')}
    ${kpi('Tranche 3 · proven',mm(T[2]),pct(sd.tranches[2],0)+' of the round','#d9b56e')}
    ${kpi('Seed investor share',pct(A.ownership.seed_investor_share,0),'Illustrative · implies '+au(post)+' post-money','#c9b8ff')}
   </div>
   <p class="note">Implied valuation derived here: ${mm(sd.amount)} ÷ ${pct(A.ownership.seed_investor_share,0)} = ${au(post)} after the round (${au(post-sd.amount)} before) · planning estimate, not an offer</p>`],
  ['How it works · three milestones, three tranches',`
   <p class="s11lead">Each gate is verified with a document or a figure from the system.</p>
   <div class="p6-time" id="p6-time">
    <div class="p6-gate t"><small>Gate 0 · today</small><b>Round agreed</b><h4>Terms reviewed by lawyers</h4><p>Option and amount confirmed; investment documents drafted by a Tanzanian lawyer.</p><div class="when">Before any money moves</div></div>
    ${sd.milestones.map((m,i)=>{const parts=m.split(':'),tx=(parts.slice(1).join(':')||m).trim();return `<div class="p6-gate"><small>Tranche ${i+1} · ${pct(sd.tranches[i],0)}</small><b>${mm(T[i])}</b><h4>${['Signed and set up','Ready to open','Proven with customers'][i]||'Milestone '+(i+1)}</h4><p>${esc(tx.charAt(0).toUpperCase()+tx.slice(1))}.</p><div class="when" id="p6-gw${i}">${['On signing','Before opening day','–'][i]}</div></div>`}).join('')}
   </div>
   <p class="note" id="p6-gnote"></p>`],
  ['Use of funds',`
   <p class="s11lead">Select a line to see what it pays for. Amounts come from the master model; the items under each line are planning detail, to be priced with supplier quotations. <span class="tagi">Planning estimate</span></p>
   <div class="p6-uof">
    <div class="p6-ubars" id="p6-ubars">${sd.use.map((u,i)=>`<button type="button" class="p6-ubar${i?'':' on'}" data-i="${i}" style="--c:${UCOL[i%6]}"><span class="top"><span>${esc(u[0])}</span><b>${mm(u[1])}</b></span><span class="bar"><i style="width:${(u[1]/Math.max(...sd.use.map(x=>x[1]))*100).toFixed(1)}%"></i></span></button>`).join('')}</div>
    <div class="p6-panel"><div class="p6-donut" id="p6-donut"></div><h3 id="p6-uh" style="margin-top:14px">–</h3><p id="p6-us">–</p><ul class="p6-items" id="p6-ui"></ul></div>
   </div>
   <h3 class="p6-h3x">What the seed builds</h3>
   ${(()=>{const U=k=>(sd.use.find(u=>k.test(u[0]))||['',0])[1],sh=v=>pct(v/sd.amount,0);return p6pcs([
    {f:'exterior',alt:'the Afya Basics store at dusk',cap:'fit-out',k:mm(U(/fit-out/i))+' · '+sh(U(/fit-out/i))+' of the seed',h:ISL()?'The first store':'The flagship store',body:`<p>Interior works, lit display towers, the corner counter under the menu screens, lounge seating and exterior signage. The ${A.store.area_m2} m² street-front store is also the brand’s main advertisement. The six-month lease advance (${mm(U(/lease/i))}) is a separate line.</p>`},
    {f:'prod-baby',alt:'mother and baby essentials laid out: nappies, wipes, lotion and feeding items',cap:'opening stock',k:mm(U(/stock/i))+' · '+sh(U(/stock/i))+' of the seed',h:`Opening stock, about ${nf(A.product_families)} families`,body:`<p>About ${nf(A.product_families)} product families with ${esc(A.brands_per_item)} registered brands each, imported legally from China and India with TMDA registration where required, so every Care Zone is fully stocked on opening day.</p>`},
    {f:'check',alt:'the Afya Check kiosk in use with an adviser',cap:'technology',k:mm(U(/technology/i))+' · '+sh(U(/technology/i))+' of the seed',h:'Afya Check kiosk, screens, system',body:`<p>The free Afya Check kiosk (15 measurements in about four minutes), the video wall and screens, digital shelf labels and the connected system that runs the till, stock, members, delivery and the 21:00 report.</p>`},
    {f:'rider',alt:'an Afya rider on an electric motorbike with a closed insulated box',cap:'delivery',k:mm(U(/motorbike/i))+' · '+sh(U(/motorbike/i))+' of the seed',h:'Two electric motorbikes',body:`<p>Same-day delivery across Dar es Salaam for orders placed before 15:00, and every Afya Box to the door. The remaining lines cover launch marketing (${mm(U(/marketing/i))}), the pre-opening team (${mm(U(/pre-opening/i))}), operating losses until break-even (${mm(U(/operating losses/i))}) and the working-capital reserve (${mm(U(/working/i))}).</p>`}],4)})()}
   <p class="note">Amounts from the master model · item lists are planning detail until supplier quotations arrive</p>`],
  ['Try it · follow your investment',`
   <p class="s11lead">Choose an amount. The tool shows your share of the round and of the company, the use-of-funds lines it pays for, and when each part is released. <span class="tagi">Illustrative</span></p>
   <div class="calc">
    <div class="cin"><label style="margin-top:0"><span>Your investment</span><input type="range" id="p6-inv" min="5000000" max="${sd.amount}" step="2500000" value="${sd.amount/2}"><output id="p6-invo"></output></label>
     <div class="p6-split" id="p6-invsplit" style="margin-top:18px"></div></div>
    <div class="cout"><div><small>Your share of the round</small><b id="p6-ir1">–</b></div><div><small>Your share of the company (illustrative)</small><b id="p6-ir2">–</b></div><div><small>Released to the company</small><b id="p6-ir3" style="font-size:1.1rem;line-height:1.5">–</b></div><p>Same terms for every seed investor, pro-rata. Final share depends on the confirmed round size and the lawyer-drafted documents.</p></div>
   </div>`],
  ['Open question · the Phase 0 gap',`
   <p class="s11lead">Before the store opens, Phase 0 covers licences, registrations, on-the-ground research in Dar es Salaam and supplier visits. Those costs are estimated at <b style="color:var(--ink)">${mm2(g.research_setup_costs)}</b> against a Phase 0 budget of <b style="color:var(--ink)">${mm2(g.phase0_budget)}</b>, a gap of <b style="color:#ff9b87">${mm2(gap)}</b>. ${esc(g.note)}.</p>
   <div class="p6-opt" id="p6-opt">
    <button type="button" class="p6-optc on" data-o="a"><small>Option A</small><h4>Add it to the seed round</h4><p>The round rises to ${mm2(sd.amount+gap)}. Investors fund the setup and, at the same pre-money value, their share increases.</p></button>
    <button type="button" class="p6-optc" data-o="b"><small>Option B</small><h4>Founders pre-fund it</h4><p>The round stays at ${mm(sd.amount)}. The founders fund ${mm2(gap)} before the round and keep their ownership.</p></button>
   </div>
   <div class="p6-panel" style="margin-top:14px"><div class="p6-kpis" id="p6-optk" style="grid-template-columns:repeat(4,minmax(0,1fr))"></div><p id="p6-optt" style="margin-top:14px"></p></div>
   <div class="p6-callout"><h4>Cash timing</h4>Section 6.1 derives cash month by month from the model: tranches 1 and 2 (${mm(T[0]+T[1])}) against a build spend of ${mm(sd.use.filter(u=>!/working|operating losses/i.test(u[0])).reduce((a,u)=>a+u[1],0))} before opening, then monthly profit, later lease advances and tranche 3. The ask, tranche shape and reserve will be confirmed together with the Phase 0 decision. <a href="#s6-1" style="color:var(--gold2)">See the cash line in 6.1 →</a></div>`],
  ['Reporting · the monthly investor pack',`
   <div class="p6-pack">
    <div><p class="s11lead">Investors see the same figures the founders use. Reports are generated by the store’s connected system, so they arrive on schedule and match the operating data.</p>
     <ol class="p6-steps">
      <li><b>Daily, 21:00:</b> a report to the founders on WhatsApp covering sales, checks, new members, stock risks and issues.</li>
      <li><b>Monthly:</b> the investor pack, covering profit and loss against budget, cash and runway, members and churn, sales by channel, Afya Check volumes, stock and expiry, and progress to the next milestone.</li>
      <li><b>Each tranche:</b> evidence that the milestone was met: lease and licences, fit-out sign-off, then three months of trading and the member count from the system.</li>
      <li><b>Annually:</b> audited accounts and annual returns, as required of Tanzanian companies.</li>
     </ol>
     <p class="note">Proposed reporting · the final information rights are set in the investment documents</p></div>
    <div class="p6-doc" aria-label="Mock-up of a monthly investor pack page"><div class="hd"><b>Afya Basics · Investor pack</b><span>Month 6 · example</span></div>
     <div class="kp" id="p6-pk"></div>
     <ol><li>Profit and loss vs budget</li><li>Cash, runway and use of funds to date</li><li>Members, renewals and churn</li><li>Sales by channel: walk-in, boxes, online</li><li>Afya Check: checks and referrals</li><li>Stock, expiry and supplier issues</li><li>Milestones, risks and decisions needed</li></ol>
     <div class="ft">Mock-up · figures are base-case model values for month 6, not actual results</div></div>
   </div>`],
  ['The numbers',`
   <div class="p6-tbl"><table><thead><tr><th>Use of funds</th><th>Amount</th><th>Share</th><th>Per TSh 1,000 invested</th><th>Type</th></tr></thead><tbody>
    ${sd.use.map(u=>`<tr><td>${esc(u[0])}</td><td>${mm(u[1])}</td><td>${pct(u[1]/sd.amount,1)}</td><td>TSh ${Math.round(u[1]/sd.amount*1000)}</td><td>${/working/i.test(u[0])?'Reserve':'One-off build'}</td></tr>`).join('')}
    <tr class="tot"><td>Total seed</td><td>${mm(sum(sd.use.map(u=>u[1])))}</td><td>100%</td><td>TSh 1,000</td><td>${esc(sd.status)}</td></tr></tbody></table></div>`],
  ['Risks and our answer',risks([
   ['The ask was recomputed after a full audit.','A line-by-line audit of the model in November 2026 found VAT counted as revenue, box margins set too high, member churn not applied, rent below the prime benchmark and no lease advance. With those corrected, the '+(ISL()?'start-small option':'flagship')+' needs '+mm(sd.amount)+'. The Phase 0 gap is shown separately.'],
   ['Fit-out or stock costs more than planned.','Each line will be replaced by a supplier quotation before signing. Tranche 2 is released only after fit-out is complete, so any overrun is visible before further capital moves.'],
   ['A milestone is missed.','Each milestone and its evidence are agreed in advance. If the tranche-3 member target takes longer, the monthly pack shows why, and the release waits for the evidence.'],
   ['Funds are spent outside the plan.','Use of funds is fixed in the plan and reported monthly. Changes above an agreed limit would require investor consent (proposal, to be set in the investment documents).']])],
  ],
  takeaway:`${mm(sd.amount)} builds store one in the ${ISL()?'start-small':'flagship'} option, released in <b>three verifiable tranches</b>, with <b>monthly reporting</b> from the system that runs the store.`,
  doors:['s6-1','s6-4','s7-1','s7-2'],sources:[SRC.ca,SRC.tra]})},
 init(){css();const A=I(),sd=A.seed,root=document.querySelector('.sx');if(!root)return;const T=sd.tranches.map(t=>t*sd.amount);
  const cs={};M().scenarios.forEach(k=>cs[k]=cashOf(M().get(k)));
  $('p6-gw2').textContent='Projected: month '+(cs.base.t3m||'–')+' after opening (base)';
  $('p6-gnote').textContent='Projected tranche-3 month from the model’s member curve: base month '+(cs.base.t3m||'—')+' · best month '+(cs.best.t3m||'—')+' · downside month '+(cs.down.t3m||'—')+' · planning estimate';
  // use of funds
  const tot=sum(sd.use.map(u=>u[1]));
  const donut=sel=>{const R=90,r0=62,cx=110,cy=110;let a=-Math.PI/2,h='';sd.use.forEach((u,i)=>{const da=u[1]/tot*Math.PI*2,a2=a+da,big=da>Math.PI?1:0,on=i===sel,RR=on?R+6:R;
    const p=(rr,an)=>[cx+rr*Math.cos(an),cy+rr*Math.sin(an)];const [x1,y1]=p(RR,a+.012),[x2,y2]=p(RR,a2-.012),[x3,y3]=p(r0,a2-.012),[x4,y4]=p(r0,a+.012);
    h+=`<path d="M${x1},${y1} A${RR},${RR} 0 ${big} 1 ${x2},${y2} L${x3},${y3} A${r0},${r0} 0 ${big} 0 ${x4},${y4}Z" fill="${UCOL[i%6]}" opacity="${on?1:.38}" data-i="${i}" style="cursor:pointer;transition:opacity .3s"/>`;a=a2});
   return `<svg viewBox="0 0 220 220" role="img" aria-label="Use of funds ring">${h}</svg><div class="c"><b>${pct(sd.use[sel][1]/tot,0)}</b><small>of the seed</small></div>`};
  const pick=i=>{root.querySelectorAll('.p6-ubar').forEach((b,k)=>b.classList.toggle('on',k===i));const u=sd.use[i];
   $('p6-donut').innerHTML=donut(i);$('p6-donut').querySelectorAll('path').forEach(pp=>pp.onclick=()=>pick(+pp.dataset.i));
   $('p6-uh').textContent=u[0]+' · '+mm(u[1]);$('p6-us').textContent='TSh '+Math.round(u[1]/tot*1000)+' of every TSh 1,000 invested · '+(/working/i.test(u[0])?'held as a reserve, not spent on the build':'one-off build cost');
   $('p6-ui').innerHTML=(USE_ITEMS[i]||[]).map(t=>`<li style="--c:${UCOL[i%6]}">${esc(t)}</li>`).join('')};
  root.querySelectorAll('.p6-ubar').forEach(b=>b.onclick=()=>pick(+b.dataset.i));pick(0);
  // investment follow-through
  const inv=()=>{const v=+$('p6-inv').value,sh=v/sd.amount;$('p6-invo').textContent=mm(v);
   $('p6-ir1').textContent=pct(sh,1);$('p6-ir2').textContent=pct(sh*A.ownership.seed_investor_share,2);
   $('p6-ir3').innerHTML=T.map((t,i)=>`T${i+1} ${mm(v*sd.tranches[i])}`).join(' · ');
   $('p6-invsplit').innerHTML=sd.use.map((u,i)=>`<div><i style="background:${UCOL[i%6]}"></i><span>${esc(u[0])}</span><b>${mm(v*u[1]/tot)}</b><em>${pct(u[1]/tot,0)}</em></div>`).join('')};
  $('p6-inv').oninput=inv;inv();
  // phase 0 options
  const g=sd.phase0_gap,gap=g.research_setup_costs-g.phase0_budget,post=sd.amount/A.ownership.seed_investor_share,pre=post-sd.amount;
  const opt=o=>{root.querySelectorAll('.p6-optc').forEach(b=>b.classList.toggle('on',b.dataset.o===o));
   if(o==='a'){const rnd=sd.amount+gap,inv=rnd/(pre+rnd),f=A.ownership.founders_after_seed*(1-inv)/(1-A.ownership.seed_investor_share),pool=A.ownership.option_pool*(1-inv)/(1-A.ownership.seed_investor_share);
    $('p6-optk').innerHTML=kpi('Round size',mm2(rnd),'+'+mm2(gap)+' for Phase 0','#ffe7a8')+kpi('Seed investor share',pct(inv,1),'was '+pct(A.ownership.seed_investor_share,0),'#c9b8ff')+kpi('Founders after seed',pct(f,1),'was '+pct(A.ownership.founders_after_seed,0),'#5fbf8f')+kpi('Option pool',pct(pool,1),'was '+pct(A.ownership.option_pool,0),'#d9b56e');
    $('p6-optt').innerHTML=`Assumes the pre-money value implied today (${au(pre)}), with founders and pool diluted in proportion. It preserves founder cash, but part of every investor shilling then funds research and travel rather than the store. <span class="tagi">Illustrative</span>`}
   else{$('p6-optk').innerHTML=kpi('Round size',mm(sd.amount),'Unchanged','#ffe7a8')+kpi('Seed investor share',pct(A.ownership.seed_investor_share,0),'Unchanged','#c9b8ff')+kpi('Founders after seed',pct(A.ownership.founders_after_seed,0),'Unchanged','#5fbf8f')+kpi('Founders pre-fund',mm2(gap),'Before the round','#ff9b87');
    $('p6-optt').innerHTML=`Keeps investor capital for the store only, the closest fit with the customer-funded rule, and demonstrates founder commitment. It requires ${mm2(gap)} of founder cash before the round, which may not be available. Whether it is recorded as a founder loan or as shares is for the lawyer and accountant to decide. <span class="tagi">Illustrative</span>`}};
  root.querySelectorAll('.p6-optc').forEach(b=>b.onclick=()=>opt(b.dataset.o));opt('a');
  // pack mock-up kpis (month 6, base)
  const r=M().get('base'),m6=r.months[5];
  $('p6-pk').innerHTML=`<div><small>Revenue M6</small><b>${mm(m6.revenue)}</b></div><div><small>Profit M6</small><b>${sgn(m6.profit,mm)}</b></div><div><small>Members</small><b>${Math.round(m6.members)}</b></div>`}};

/* =====================================================================================
   6.4 OWNERSHIP AND EXIT
   ===================================================================================== */
const OCOL={f:'#5fbf8f',s:'#f2c96b',p:'#d9b56e',n:['#c9b8ff','#ff9b87','#ffe7a8','#b5dfc6']};
function dilute(rounds,d){const O=I().ownership;let h={f:O.founders_after_seed,s:O.seed_investor_share,p:O.option_pool,n:[]};let fu=O.founders_after_seed;const steps=[JSON.parse(JSON.stringify(h))];const unp=[fu];let fired=false;
 for(let k=0;k<rounds;k++){const nh={f:h.f*(1-d),s:h.s*(1-d),p:h.p*(1-d),n:h.n.map(x=>x*(1-d)).concat([d])};fu*=(1-d);
  if(nh.f<O.founders_floor){const def=O.founders_floor-nh.f,others=nh.s+nh.p+sum(nh.n),sc=(others-def)/others;nh.f=O.founders_floor;nh.s*=sc;nh.p*=sc;nh.n=nh.n.map(x=>x*sc);fired=true}
  h=nh;steps.push(JSON.parse(JSON.stringify(h)));unp.push(fu)}
 return {steps,unp,fired}}
window.SECTIONS['s6-4']={render(s,p,pv,nx){css();const A=I(),O=A.ownership,sd=A.seed;const post=sd.amount/O.seed_investor_share;
 return secShell({s,p,pv,nx,img:'img/team.webp),url(img/interior.webp',imgAlt:'Concept image: Afya Basics health advisers in royal green uniforms at the corner counter',
  h1:'Shared upside, protected founders.',em:`A ${pct(O.founders_floor,0)} founder floor for life.`,
  lede:`After the seed round the founders would hold ${pct(O.founders_after_seed,0)}, the seed investor ${pct(O.seed_investor_share,0)} and an option pool for key staff ${pct(O.option_pool,0)}. Through later rounds the founders intend to keep at least ${pct(O.founders_floor,0)}, protected in the articles of association and the shareholders’ agreement. All terms are illustrative until reviewed by a lawyer.`,
  mods:[
  ['The problem it solves',`
   <p class="s11lead">Two questions determine whether a seed deal is fair: what the money buys today, and what happens to that stake later. Founders are concerned that successive rounds will reduce them to minor shareholders in the company they built. Investors need to know how, and at what value, they can realise a return.</p>
   ${plain([['Today.','The cap table after the seed round has three holders: the founders, the seed investor and the option pool.'],['Later rounds dilute everyone.','When new shares are issued, every existing holder’s percentage falls, even as the company’s value rises. The simulator quantifies the effect.'],['The founders’ floor.','The founders keep at least '+pct(O.founders_floor,0)+' for life. If dilution would take them lower, the other holders absorb the difference. That is a real cost to investors, and the simulator shows it.'],['The exit.','On a sale, proceeds are shared by ownership. The calculator converts a sale price, or a multiple of model EBITDA, into each holder’s payout.']])}`],
  ['Our answer · the post-seed cap table',`
   <div class="p6-cap"><div class="p6-donut" id="p6-capd"></div>
    <div><div class="p6-tbl"><table><thead><tr><th>Holder</th><th>Share</th><th>Value at seed price</th><th class="p6-hm">Notes</th></tr></thead><tbody>
     <tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${OCOL.f};margin-right:8px"></i>Founders</td><td>${pct(O.founders_after_seed,0)}</td><td>${au(post*O.founders_after_seed)}</td><td class="p6-hm" style="white-space:normal;min-width:180px">Fahmy Abbas Cothema and Cecilia · split between them still open</td></tr>
     <tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${OCOL.s};margin-right:8px"></i>Seed investor(s)</td><td>${pct(O.seed_investor_share,0)}</td><td>${au(sd.amount)}</td><td class="p6-hm" style="white-space:normal">For ${mm(sd.amount)}, ${ISL()?'start-small':'flagship'} option</td></tr>
     <tr><td><i style="display:inline-block;width:10px;height:10px;border-radius:3px;background:${OCOL.p};margin-right:8px"></i>Option pool</td><td>${pct(O.option_pool,0)}</td><td>${au(post*O.option_pool)}</td><td class="p6-hm" style="white-space:normal">Reserved to reward key staff such as the store lead</td></tr>
     <tr class="tot"><td>Total</td><td>100%</td><td>${au(post)}</td><td class="p6-hm" style="white-space:normal">Implied post-money value, derived</td></tr></tbody></table></div>
     <p class="note">${esc(O.note)} · implied value = ${mm(sd.amount)} ÷ ${pct(O.seed_investor_share,0)} · planning estimate, not a valuation</p></div></div>
   ${p6ed({f:'team',alt:'Afya Basics health advisers in royal green uniforms at the corner counter',cap:'the people the option pool is for',k:`The ${pct(O.option_pool,0)} option pool`,h:'Equity for the people <em>who run the stores</em>.',
     body:`<p>Growth from one store to ${A.growth.stores_by_year[11]} depends on retaining strong store leads. The option pool (${pct(O.option_pool,0)}, about ${au(post*O.option_pool)} at the seed price) gives them an equity stake in addition to salary.</p>
      <ul><li><b>Who.</b> The first store lead (preferably a physiotherapy graduate), then the leads who open new cities and the staff who build the hub and the system.</li>
      <li><b>How.</b> Options vest over time and on milestones (for example, a store reaching its gate numbers), under rules the board approves and a lawyer drafts.</li>
      <li><b>Why investors benefit.</b> A store lead with equity has a direct interest in protecting the brand at every branch, the risk described in 5.4.</li></ul>`})}`],
  ['How it works · dilution and the founder floor',`
   <p class="s11lead">Set the number of future rounds and the share sold in each. The founders’ holding never falls below the ${pct(O.founders_floor,0)} floor; the faint dashed line shows their holding without it. <span class="tagi">Illustrative</span></p>
   <div class="p6-sim">
    <div class="cin"><label style="margin-top:0"><span>Future funding rounds after the seed</span><input type="range" id="p6-dr" min="0" max="4" step="1" value="3"><output id="p6-dro"></output></label>
     <label><span>Share sold to each new round</span><input type="range" id="p6-dd" min="0.05" max="0.4" step="0.01" value="0.2"><output id="p6-ddo"></output></label>
     <div class="p6-split" id="p6-dsplit" style="margin-top:18px"></div>
     <div class="p6-callout g" id="p6-dnote" style="font-size:.86rem"></div></div>
    <div class="p6-panel"><h3>Ownership after each round</h3><p>Stacked to 100% · gold dashed line = founders’ floor.</p><div class="p6-chart" id="p6c-dil"></div>
     <div class="p6-leg"><span>${dot(OCOL.f)}Founders</span><span>${dot(OCOL.s)}Seed investor</span><span>${dot(OCOL.p)}Option pool</span><span>${dot(OCOL.n[0])}Later investors</span></div><div class="p6-read" id="p6r-dil"></div></div>
   </div>
   ${p6ed({f:'boxdoor',alt:'a closed royal-green Afya Box handed over at a home doorstep',cap:'what a buyer pays for',r:1,k:'What gives the company its value',h:'A buyer pays for <em>members who renew</em>, not for shelves.',
     body:`<p>Shelves, screens and stock are easy to replicate. A base of households that receive an Afya Box every month and renew automatically is not. By year 12 the base plan counts about <b>${nf(M().get('base').years[11].members)} member households</b> across ${A.growth.stores_by_year[11]} stores, each with saved baskets and, with consent, health readings.</p>
      <p>That recurring revenue is what a future investor or acquirer would value, and it is why the founders’ ${pct(O.founders_floor,0)} floor matters: the people who built those relationships keep a meaningful stake. <b>No buyer has been identified</b>; the calculator shows ranges, not forecasts.</p>`})}
   <p class="note">Later rounds may be needed: the twelve-year plan opens ${A.growth.stores_by_year[11]-1} further stores at ${au(A.growth.new_store_capex)} each; 6.1 shows EBITDA minus capex by year</p>`],
  ['Try it · the sale calculator',`
   <p class="s11lead">Enter a sale price directly, or value the company as a multiple of model EBITDA in a chosen year and case. Proceeds are split by ownership. <span class="tagi">Illustrative</span></p>
   <div class="p6-exit">
    <div class="cin">
     <div><span style="font-size:.88rem;color:var(--ink2)">Value the company by</span><br><div class="p6-seg" id="p6-em"><button type="button" class="on" data-m="mult">EBITDA × multiple</button><button type="button" data-m="val">Sale price</button></div></div>
     <div id="p6-emult">
      ${scBar('ex')}
      <label><span>Year of sale</span><input type="range" id="p6-ey" min="3" max="12" step="1" value="7"><output id="p6-eyo"></output></label>
      <label><span>EV / EBITDA multiple</span><input type="range" id="p6-ex" min="2" max="15" step="0.5" value="6"><output id="p6-exo"></output></label></div>
     <div id="p6-eval" hidden><label><span>Sale price (equity value)</span><input type="range" id="p6-ev" min="0.5" max="80" step="0.5" value="10"><output id="p6-evo"></output></label>
      <label><span>Year of sale</span><input type="range" id="p6-ey2" min="1" max="12" step="1" value="7"><output id="p6-ey2o"></output></label></div>
     <label class="p6-chk"><input type="checkbox" id="p6-eu" checked> Apply the later rounds from the dilution simulator</label>
    </div>
    <div class="cout">
     <div><small>Company value at sale</small><b id="p6-eo1">–</b><p id="p6-eo1s"></p></div>
     <div class="p6-pay" id="p6-epay"></div>
     <div class="p6-g2" style="gap:12px"><div><small>Seed investor multiple</small><b id="p6-eo2">–</b></div><div><small>Seed investor IRR</small><b id="p6-eo3">–</b></div></div>
     <p id="p6-eot"></p>
    </div>
   </div>
   <p class="note">IRR = multiple^(1 ÷ years) − 1, with the whole seed treated as invested at year 0 and repaid in the sale year · before tax · no debt or preference terms assumed · for reference, the Bank of Tanzania’s Central Bank Rate is 6.25% ${cr('bot',1)}</p>`,'p6exit'],
  ['Founders’ pay policy · a proposal',`
   <p class="s11lead">The founders propose to take <b style="color:var(--ink)">no salary, or only a modest one, until the store reaches break-even</b>, and to set any later pay with the board. Founders’ pay is excluded from the model’s running costs, so the tool shows the effect of a salary on year 1. <span class="tagi">Proposal</span></p>
   <div class="calc">
    <div class="cin"><label style="margin-top:0"><span>Pay per founder per month (two founders)</span><input type="range" id="p6-fp" min="0" max="3000000" step="100000" value="500000"><output id="p6-fpo"></output></label>
     <div><span style="font-size:.88rem;color:var(--ink2)">Pay starts</span><br><div class="p6-seg" id="p6-fs"><button type="button" class="on" data-s="be">After break-even</button><button type="button" data-s="m1">From month 1</button></div></div>
     <p style="margin:16px 0 0;font-size:.86rem;color:var(--ink2)">Base case. Proposal: no pay or a small living allowance until break-even; after break-even, a modest salary approved by the board. The founders’ main reward is their equity, not salaries that draw down early cash.</p></div>
    <div class="cout"><div><small>Year 1 profit after founders’ pay</small><b id="p6-fr1">–</b></div><div><small>Break-even month</small><b id="p6-fr2">–</b></div><div><small>Deepest cumulative loss</small><b id="p6-fr3">–</b></div><p id="p6-frt"></p></div>
   </div>`],
  ['Protections · floor, board, information',`
   <div class="p6-prot">
    <article><small>For the founders</small><h4>The ${pct(O.founders_floor,0)} floor for life</h4><ul><li>Founders keep at least ${pct(O.founders_floor,0)} of the company through every later round.</li><li>The mechanism (for example a special share class or a top-up right) is for the lawyer to design under the Companies Act, 2002 ${cr('ca',1)}.</li><li>Changing class rights would need the protections that Act gives to holders of a class (s.73) ${cr('ca',1)}.</li><li>The split between Fahmy and Cecilia is still open.</li></ul></article>
    <article><small>For investors</small><h4>A seat at the table</h4><ul><li>Proposed board: two founder seats and one seed-investor seat.</li><li>Proposed matters needing investor consent: new shares, selling the company, large borrowing, changing the business, deals with related parties.</li><li>Pre-emption: the right to buy into later rounds to limit dilution (proposal).</li><li>Fair treatment at exit: a sale offer made to the founders is offered to all holders on the same terms (proposal).</li></ul></article>
    <article><small>For everyone</small><h4>Information rights</h4><ul><li>The monthly investor pack (see 6.3) and the daily 21:00 report for the board.</li><li>Tranche evidence for each milestone.</li><li>Annual audited accounts and returns.</li><li>Articles of association can only be changed by special resolution (s.13) ${cr('ca',1)}.</li></ul></article>
   </div>
   <div class="p6-law"><p><b>A lawyer must review all of this.</b> Nothing on this page is a legal agreement or an offer of shares. The share percentages, the founders’ floor, board seats, consent rights and exit terms are proposals that a qualified Tanzanian lawyer will draft and review in the shareholders’ agreement and the articles of association before any money is invested.</p></div>`],
  ['The numbers',`<div class="p6-kpis" id="p6-onk"></div><p class="note">Derived from the master model’s ownership and seed inputs · company value uses model EBITDA for the selected case · illustrative</p>`],
  ['Risks and our answer',risks([
   ['A lifetime founder floor may deter later investors.','It is disclosed upfront and its cost is shown in the simulator. With moderate rounds the floor is not reached; it binds only after heavy dilution. The lawyer will design a mechanism later investors can understand and price.'],
   ['Sale value depends on future profit.','The calculator uses model EBITDA, a planning estimate, and can be switched to the downside case. The multiple is an input, not a forecast.'],
   ['The founders’ split is not decided.','It does not change the investor’s share. It will be agreed between the founders and written into the shareholders’ agreement before the round closes.'],
   ['Taxes reduce what holders receive.','Payouts here are before tax. Tanzanian corporate tax is 30% and dividends from unlisted companies carry 10% withholding tax '+cr('tra',2)+'; sale proceeds will need professional tax advice.']])],
  ],
  takeaway:`For ${mm(sd.amount)} (${ISL()?'start-small':'flagship'} option) the seed investor would own <b>${pct(O.seed_investor_share,0)} of a company planned to grow to ${A.growth.stores_by_year[11]} stores</b>, alongside founders who <b>retain at least ${pct(O.founders_floor,0)} for life</b>. All terms are subject to legal review.`,
  doors:['s6-3','s6-1','s7-2','s5-4'],sources:[SRC.ca,SRC.tra,SRC.bot]})},
 init(){css();const A=I(),O=A.ownership,sd=A.seed,root=document.querySelector('.sx');if(!root)return;const post=sd.amount/O.seed_investor_share;
  // cap donut
  const segs=[[O.founders_after_seed,OCOL.f,'Founders'],[O.seed_investor_share,OCOL.s,'Seed investor'],[O.option_pool,OCOL.p,'Option pool']];
  let a=-Math.PI/2,h='';const R=92,r0=60,cx=110,cy=110;segs.forEach(sg=>{const da=sg[0]*Math.PI*2,a2=a+da,big=da>Math.PI?1:0,pp=(rr,an)=>[cx+rr*Math.cos(an),cy+rr*Math.sin(an)];
   const [x1,y1]=pp(R,a+.015),[x2,y2]=pp(R,a2-.015),[x3,y3]=pp(r0,a2-.015),[x4,y4]=pp(r0,a+.015);h+=`<path d="M${x1},${y1} A${R},${R} 0 ${big} 1 ${x2},${y2} L${x3},${y3} A${r0},${r0} 0 ${big} 0 ${x4},${y4}Z" fill="${sg[1]}"><title>${sg[2]} ${pct(sg[0],0)}</title></path>`;a=a2});
  const fa=-Math.PI/2+O.founders_floor*Math.PI*2,[fx1,fy1]=[cx+(r0-6)*Math.cos(fa),cy+(r0-6)*Math.sin(fa)],[fx2,fy2]=[cx+(R+8)*Math.cos(fa),cy+(R+8)*Math.sin(fa)];
  h+=`<line x1="${fx1}" y1="${fy1}" x2="${fx2}" y2="${fy2}" stroke="#ffe7a8" stroke-width="2" stroke-dasharray="3 2"/>`;
  $('p6-capd').innerHTML=`<svg viewBox="0 0 220 220" role="img" aria-label="Cap table after seed">${h}</svg><div class="c"><b>${pct(O.founders_after_seed,0)}</b><small>founders<br>floor ${pct(O.founders_floor,0)}</small></div>`;
  // dilution
  let lastDil=null;
  const dil=()=>{const n=+$('p6-dr').value,d=+$('p6-dd').value;$('p6-dro').textContent=n+(n===1?' round':' rounds');$('p6-ddo').textContent=pct(d,0);
   const res=dilute(n,d);lastDil=res;const st=res.steps,labels=['Seed'].concat(st.slice(1).map((_,i)=>'Round '+String.fromCharCode(65+i)));
   const nl=Math.max(0,...st.map(x=>x.n.length));const stack=[{vals:st.map(x=>x.f*100),color:OCOL.f},{vals:st.map(x=>x.s*100),color:OCOL.s},{vals:st.map(x=>x.p*100),color:OCOL.p}];
   for(let k=0;k<nl;k++)stack.push({vals:st.map(x=>(x.n[k]||0)*100),color:OCOL.n[k%4]});
   chart($('p6c-dil'),{labels,stack,bw:70,lines:[{vals:st.map(()=>O.founders_floor*100),color:'#ffe7a8',w:1.4,dash:true,dots:false},{vals:res.unp.map(v=>v*100),color:'rgba(95,191,143,.5)',w:1.2,dash:true}],read:'p6r-dil',aria:'Ownership after each round',
    tip:i=>{const x=st[i];return `<span><b>${labels[i]}</b></span><span>${dot(OCOL.f)}Founders <b>${pct(x.f,1)}</b>${res.unp[i]<x.f-1e-9?` (would be ${pct(res.unp[i],1)})`:''}</span><span>${dot(OCOL.s)}Seed <b>${pct(x.s,1)}</b></span><span>${dot(OCOL.p)}Pool <b>${pct(x.p,1)}</b></span>${x.n.length?`<span>${dot(OCOL.n[0])}Later <b>${pct(sum(x.n),1)}</b></span>`:''}`},def:st.length-1});
   const L=st[st.length-1];
   $('p6-dsplit').innerHTML=`<div><i style="background:${OCOL.f}"></i><span>Founders</span><b>${pct(L.f,1)}</b><em>${pct(res.unp[res.unp.length-1],1)} unprotected</em></div><div><i style="background:${OCOL.s}"></i><span>Seed investor</span><b>${pct(L.s,1)}</b><em>${pct(L.s/O.seed_investor_share,0)} of start</em></div><div><i style="background:${OCOL.p}"></i><span>Option pool</span><b>${pct(L.p,1)}</b><em></em></div>${L.n.map((v,k)=>`<div><i style="background:${OCOL.n[k%4]}"></i><span>Round ${String.fromCharCode(65+k)} investor</span><b>${pct(v,1)}</b><em></em></div>`).join('')}`;
   const unpL=res.unp[res.unp.length-1];
   $('p6-dnote').innerHTML=res.fired?`<h4>The floor is working</h4>Without protection the founders would hold <b>${pct(unpL,1)}</b>. The floor keeps them at <b>${pct(O.founders_floor,0)}</b>; the extra <b>${pct(O.founders_floor-unpL,1)}</b> is absorbed by the other holders in proportion to their stakes, which is the cost of the protection.`:`<h4>Floor not reached</h4>Founders end at <b>${pct(L.f,1)}</b>, above the ${pct(O.founders_floor,0)} floor, so the protection costs other holders nothing in this case. Try more rounds or a larger share per round.`;
   exit()};
  ['p6-dr','p6-dd'].forEach(k=>$(k).oninput=dil);
  // exit
  let mode='mult';
  const exit=()=>{const useR=$('p6-eu').checked&&lastDil;const cap=useR?lastDil.steps[lastDil.steps.length-1]:{f:O.founders_after_seed,s:O.seed_investor_share,p:O.option_pool,n:[]};
   let val,yr,sub;
   if(mode==='mult'){yr=+$('p6-ey').value;const mx=+$('p6-ex').value,r=M().get(SC),y=r.years[yr-1];$('p6-eyo').textContent='Year '+yr;$('p6-exo').textContent=mx.toFixed(1)+'×';
    val=Math.max(0,y.ebitda*mx);sub=`${mx.toFixed(1)}× year-${yr} EBITDA of ${sgn(y.ebitda)} (${r.label}, ${y.stores} stores)${y.ebitda<=0?' · EBITDA is not positive, so no value from this method':''}`}
   else{yr=+$('p6-ey2').value;val=+$('p6-ev').value*1e9;$('p6-evo').textContent=au(val);$('p6-ey2o').textContent='Year '+yr;sub='Sale price you entered'}
   $('p6-eo1').textContent=au(val);$('p6-eo1s').textContent=sub;
   const rows=[['Founders (both, split open)',cap.f,OCOL.f],['Seed investor',cap.s,OCOL.s],['Option pool',cap.p,OCOL.p]];if(cap.n.length)rows.push(['Later investors',sum(cap.n),OCOL.n[0]]);
   $('p6-epay').innerHTML=rows.map(q=>`<div><i style="background:${q[2]}"></i><span>${q[0]} · ${pct(q[1],1)}</span><b>${au(val*q[1])}</b></div>`).join('');
   const mult=val*cap.s/sd.amount,irr=mult>0?Math.pow(mult,1/yr)-1:-1;
   $('p6-eo2').textContent=mult.toFixed(1)+'×';$('p6-eo3').textContent=mult>0?pct(irr,1):'—';$('p6-eo3').style.color=irr<0?C.neg:'';
   $('p6-eot').innerHTML=`Example: the seed investor’s ${mm(sd.amount)} becomes ${au(val*cap.s)} after ${yr} year${yr>1?'s':''}${useR?', after the later rounds in the simulator':', with no later dilution (optimistic if new stores need new rounds)'}.`};
  root.querySelectorAll('#p6-em button').forEach(b=>b.onclick=()=>{mode=b.dataset.m;root.querySelectorAll('#p6-em button').forEach(q=>q.classList.toggle('on',q===b));$('p6-emult').hidden=mode!=='mult';$('p6-eval').hidden=mode==='mult';exit()});
  ['p6-ey','p6-ex','p6-ev','p6-ey2','p6-eu'].forEach(k=>$(k).oninput=$(k).onchange=exit);
  wireSc(root,()=>{exit();nums()});
  // founders' pay
  let fs='be';const base=M().get('base');
  const pay=()=>{const v=+$('p6-fp').value;$('p6-fpo').textContent=v?tz(v):'None';const be0=base.breakeven_month||13;
   const r=sim('base',{extra:m=>(fs==='m1'||m>=be0)?2*v:0});
   $('p6-fr1').textContent=sgn(r.y1.profit);$('p6-fr1').style.color=r.y1.profit<0?C.neg:'';
   $('p6-fr2').textContent=r.breakeven_month?'Month '+r.breakeven_month:'Not in Year 1';
   const tr=Math.min(0,...r.months.map(x=>x.cum_profit)),tr0=Math.min(0,...base.months.map(x=>x.cum_profit));$('p6-fr3').textContent=sgn(tr,mm);
   $('p6-frt').innerHTML=`Cost to the company in Year 1: <b>${mm(base.y1.profit-r.y1.profit)}</b>. ${fs==='m1'&&v>0?`Paying from month 1 deepens the early losses by ${mm(tr0-tr)} and needs more seed money; this is why the proposal waits for break-even.`:`Paying only after break-even (month ${base.breakeven_month}) leaves the early cash need unchanged.`}`};
  $('p6-fp').oninput=pay;root.querySelectorAll('#p6-fs button').forEach(b=>b.onclick=()=>{fs=b.dataset.s;root.querySelectorAll('#p6-fs button').forEach(q=>q.classList.toggle('on',q===b));pay()});
  const nums=()=>{const r=M().get(SC),y7=r.years[6];$('p6-onk').innerHTML=kpi('Implied post-money',au(post),mm(sd.amount)+' ÷ '+pct(O.seed_investor_share,0),'#ffe7a8')+kpi('Founders after seed',pct(O.founders_after_seed,0),'Floor '+pct(O.founders_floor,0)+' for life','#5fbf8f')+kpi('Option pool',pct(O.option_pool,0),'For key staff','#d9b56e')+kpi('Year 7 EBITDA · '+r.label,sgn(y7.ebitda),y7.stores+' stores','#f2c96b')+kpi('Seed stake at 6× Y7',au(Math.max(0,y7.ebitda*6)*O.seed_investor_share),'No later dilution · illustrative','#c9b8ff')};
  dil();pay();nums();onResize(dil)}};
})();
