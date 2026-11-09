/* ==========================================================================
   PART 7 · TRUST — sections 7.1 to 7.5
   Setup & licences · Governance & reporting · Risks · Social impact · Proof pack
   All business numbers come from MODEL (planning estimates). Facts are cited
   from pages opened during research (Oct–Nov 2026).
   ========================================================================== */
(function(){
'use strict';
const P7CSS = `
.p7 .p7lead{color:var(--ink2);font-size:1rem;margin:0 0 18px;max-width:72ch}
.p7 .p7lead b{color:var(--ink)}
.p7 h3.p7h{font:700 clamp(1.1rem,1.8vw,1.4rem)/1.2 var(--f-display);letter-spacing:-.01em;margin:34px 0 12px}
.p7 h3.p7h:first-child{margin-top:0}
.p7 .p7sub{font:500 .62rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--neon);margin:0 0 8px;display:block}
.p7 .p7box{padding:24px;border-radius:20px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p7 .p7box.g{border-color:var(--edge2);background:linear-gradient(150deg,rgba(242,201,107,.10),rgba(2,6,8,.55))}
.p7 .p7box p{margin:8px 0 0;color:var(--ink2);font-size:.92rem}
.p7 .p7grid2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
.p7 .p7grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p7 .p7grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px}
.p7 .p7btns{display:flex;flex-wrap:wrap;gap:8px}
.p7 .p7b{padding:9px 14px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);font:600 .82rem var(--f-body);cursor:pointer;transition:all .2s}
.p7 .p7b:hover{border-color:var(--edge2);color:var(--ink)}
.p7 .p7b.on{border-color:transparent;background:linear-gradient(135deg,var(--gold2),var(--gold));color:#1a1204}
.p7 .p7b small{font:500 .62rem var(--f-hud);margin-left:6px;opacity:.75}
.p7 .p7chip{display:inline-flex;align-items:center;gap:6px;padding:3px 9px;border-radius:999px;font:500 .62rem var(--f-hud);letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--edge);color:var(--ink2);white-space:nowrap}
.p7 .p7chip i{width:7px;height:7px;border-radius:50%;background:var(--c,var(--neon))}
.p7 .p7tbl{width:100%;border-collapse:separate;border-spacing:0;font-size:.86rem}
.p7 .p7tbl th{position:sticky;top:0;text-align:left;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold);padding:12px 12px;border-bottom:1px solid var(--edge2);background:#04110d}
.p7 .p7tbl td{padding:12px;border-bottom:1px solid var(--edge);color:var(--ink2);vertical-align:top}
.p7 .p7tbl td b{color:var(--ink)}
.p7 .p7tblw{border-radius:18px;border:1px solid var(--edge);background:var(--panel);overflow:auto;max-width:100%}
.p7 .p7search{width:100%;padding:13px 16px;border-radius:14px;border:1px solid var(--edge2);background:rgba(2,10,8,.7);color:var(--ink);font:500 .95rem var(--f-body)}
.p7 .p7search::placeholder{color:var(--ink3)}
.p7 .p7stat{display:grid;gap:4px}
.p7 .p7stat small{font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--ink3)}
.p7 .p7stat b{font:500 clamp(1.3rem,2.3vw,1.9rem) var(--f-hud);color:var(--gold2)}
.p7 .p7stat span{font-size:.84rem;color:var(--ink2)}
.p7 .p7evg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
.p7 .p7evg .evc b{white-space:normal}
.p7 .p7note2{font-size:.82rem;color:var(--ink3);margin:10px 0 0}
.p7 .p7svg{width:100%;height:auto;display:block}
.p7 .p7svg text{font-family:var(--f-hud)}
.p7 .p7ok{color:var(--neon)} .p7 .p7warn{color:#ffb36b} .p7 .p7bad{color:#ff8f7d}

/* --- 7.1 regulator map --- */
.p7 .p7reg{display:grid;gap:10px}
.p7 .p7regr{display:grid;grid-template-columns:minmax(0,1.1fr) 40px minmax(0,1fr) minmax(0,1.4fr);align-items:center;gap:12px;padding:16px 20px;border-radius:16px;border:1px solid var(--edge);background:var(--panel)}
.p7 .p7regr .what b{display:block;font:700 .95rem var(--f-display);color:var(--ink)}
.p7 .p7regr .what span{font-size:.8rem;color:var(--ink3)}
.p7 .p7regr .ar{height:1px;background:linear-gradient(90deg,var(--edge2),var(--gold));position:relative}
.p7 .p7regr .ar::after{content:"";position:absolute;right:0;top:-4px;width:8px;height:8px;border-top:1px solid var(--gold);border-right:1px solid var(--gold);transform:rotate(45deg)}
.p7 .p7regr .who{font:700 .92rem var(--f-display);color:var(--neon2)}
.p7 .p7regr .who small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.14em;color:var(--ink3);text-transform:uppercase;margin-top:3px}
.p7 .p7regr .rule{font-size:.86rem;color:var(--ink2)}
/* --- 7.1 timeline --- */
.p7 .p7tlwrap{overflow-x:auto;scrollbar-width:thin}.p7 .p7swipe{display:none;font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin:0 0 8px}
.p7 .p7tl{position:relative;padding:8px 0 0}
.p7 .p7tlsvg{min-width:0}
.p7 .p7lanes{display:grid;gap:8px}
.p7 .p7lane{display:grid;grid-template-columns:150px minmax(0,1fr);gap:12px;align-items:center}
.p7 .p7lane>span{font:600 .82rem var(--f-display);color:var(--ink)}
.p7 .p7track{position:relative;height:34px;border-radius:10px;background:repeating-linear-gradient(90deg,rgba(95,191,143,.05) 0 calc(100%/8 - 1px),rgba(95,191,143,.14) calc(100%/8 - 1px) calc(100%/8))}
.p7 .p7bar{position:absolute;top:5px;bottom:5px;border-radius:8px;display:flex;align-items:center;padding:0 10px;font:500 .62rem var(--f-hud);letter-spacing:.06em;color:#021510;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;background:linear-gradient(90deg,var(--neon2),var(--neon));box-shadow:0 0 18px -6px var(--neon)}
.p7 .p7bar.g{background:linear-gradient(90deg,var(--gold2),var(--gold));box-shadow:0 0 18px -6px var(--gold)}
.p7 .p7bar.c{background:linear-gradient(90deg,#c9b8ff,#9f8cff);box-shadow:0 0 18px -6px #9f8cff}
.p7 .p7months{display:grid;grid-template-columns:150px minmax(0,1fr);gap:12px;margin-bottom:6px}
.p7 .p7months div{display:grid;grid-template-columns:repeat(8,1fr);font:500 .6rem var(--f-hud);letter-spacing:.1em;color:var(--ink3)}
.p7 .p7months div span{padding-left:6px}
.p7 .p7ms{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:22px}
.p7 .p7msc{position:relative;padding:20px 20px 18px;border-radius:18px;border:1px solid var(--edge2);background:linear-gradient(160deg,rgba(242,201,107,.10),rgba(2,6,8,.6))}
.p7 .p7msc b{display:block;font:500 1.5rem var(--f-hud);color:var(--gold2)}
.p7 .p7msc small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.18em;color:var(--neon);text-transform:uppercase;margin-bottom:6px}
.p7 .p7msc p{margin:8px 0 0;font-size:.86rem;color:var(--ink2)}
/* --- 7.1 tracker --- */
.p7 .p7trk{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:16px;align-items:start}
.p7 .p7steps{display:grid;gap:8px}
.p7 .p7st{border-radius:16px;border:1px solid var(--edge);background:var(--panel);overflow:hidden;transition:border-color .2s}
.p7 .p7st.done{border-color:rgba(95,191,143,.45);background:linear-gradient(90deg,rgba(95,191,143,.08),var(--panel))}
.p7 .p7st.prog{border-color:rgba(242,201,107,.45)}
.p7 .p7sth{display:grid;grid-template-columns:38px minmax(0,1fr) auto;gap:12px;align-items:center;padding:12px 16px}
.p7 .p7stbtn{width:34px;height:34px;border-radius:50%;border:1px solid var(--edge2);background:rgba(2,10,8,.6);color:var(--gold2);font:500 .72rem var(--f-hud);cursor:pointer;display:grid;place-items:center}
.p7 .p7st.done .p7stbtn{background:var(--neon);color:#021510;border-color:var(--neon)}
.p7 .p7st.prog .p7stbtn{background:rgba(242,201,107,.2);border-color:var(--gold)}
.p7 .p7stt b{display:block;font:700 .92rem/1.3 var(--f-display);color:var(--ink)}
.p7 .p7stt>span{display:block;margin-top:3px;font-size:.78rem;color:var(--ink3)}
.p7 .p7stc{text-align:right;font:500 .78rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.p7 .p7stc small{display:block;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p7 .p7st details{border-top:1px solid var(--edge)}
.p7 .p7st summary{cursor:pointer;padding:9px 16px 9px 66px;font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--neon);list-style:none}
.p7 .p7st summary::-webkit-details-marker{display:none}
.p7 .p7st summary::after{content:" +"}
.p7 .p7st details[open] summary::after{content:" −"}
.p7 .p7std{padding:0 16px 14px 66px;font-size:.88rem;color:var(--ink2);line-height:1.6}
.p7 .p7std dl{display:grid;grid-template-columns:110px minmax(0,1fr);gap:4px 12px;margin:8px 0 0}
.p7 .p7std dt{font:500 .6rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);padding-top:4px}
.p7 .p7std dd{margin:0}
.p7 .p7side{position:sticky;top:20px;display:grid;gap:12px}
.p7 .p7ring{display:grid;place-items:center;position:relative}
.p7 .p7ring b{position:absolute;font:500 1.6rem var(--f-hud);color:var(--ink)}
.p7 .p7ring b small{display:block;text-align:center;font-size:.55rem;letter-spacing:.18em;color:var(--ink3);text-transform:uppercase}
/* --- 7.1 trips --- */
.p7 .p7trip{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
.p7 .p7tc{padding:22px;border-radius:20px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0;display:flex;flex-direction:column;gap:10px}
.p7 .p7tc.off{opacity:.45}
.p7 .p7tch{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.p7 .p7tch h4{margin:0;font:700 1.05rem/1.2 var(--f-display)}
.p7 .p7tch small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.18em;text-transform:uppercase;color:var(--neon);margin-bottom:4px}
.p7 .p7tc ul{margin:0;padding-left:18px;color:var(--ink2);font-size:.86rem;display:grid;gap:4px}
.p7 .p7tc label{display:grid;grid-template-columns:minmax(0,1fr) 70px;gap:4px 10px;align-items:center;font-size:.8rem;color:var(--ink2)}
.p7 .p7tc label span{grid-column:1/-1}
.p7 .p7tc input[type=range]{width:100%;accent-color:var(--gold)}
.p7 .p7tc output{font:500 .8rem var(--f-hud);color:var(--gold2);text-align:right}
.p7 .p7tct{margin-top:auto;padding-top:12px;border-top:1px solid var(--edge);display:flex;justify-content:space-between;align-items:baseline;font:500 .62rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}
.p7 .p7tct b{font-size:1.1rem;letter-spacing:0;color:var(--gold2);text-transform:none}
.p7 .p7sw{position:relative;width:44px;height:24px;flex:0 0 44px;border-radius:999px;border:1px solid var(--edge2);background:rgba(2,10,8,.7);cursor:pointer}
.p7 .p7sw::after{content:"";position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:var(--ink3);transition:all .2s}
.p7 .p7sw[aria-checked=true]{background:rgba(95,191,143,.2);border-color:var(--neon)}
.p7 .p7sw[aria-checked=true]::after{left:23px;background:var(--neon)}
/* --- 7.1 location scoring --- */
.p7 .p7loc{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:16px}
.p7 .p7crit{display:grid;gap:10px;margin-top:14px}
.p7 .p7cr{display:grid;grid-template-columns:minmax(0,1fr) 64px 120px;gap:10px;align-items:center;font-size:.86rem;color:var(--ink2)}
.p7 .p7cr b{display:block;color:var(--ink);font-weight:600}
.p7 .p7cr small{display:block;font-size:.74rem;color:var(--ink3);line-height:1.35}
.p7 .p7cr .wt{font:500 .7rem var(--f-hud);color:var(--ink3);text-align:center}
.p7 .p7dots{display:flex;gap:4px}
.p7 .p7dots button{flex:1;height:26px;border-radius:7px;border:1px solid var(--edge);background:rgba(2,10,8,.6);color:var(--ink3);font:500 .66rem var(--f-hud);cursor:pointer;padding:0}
.p7 .p7dots button.on{background:var(--neon);border-color:var(--neon);color:#021510}
.p7 .p7dots button.lo{background:#ff8f7d;border-color:#ff8f7d;color:#2a0a05}
.p7 .p7res{display:grid;gap:12px;align-content:start}
.p7 .p7sbar{display:grid;grid-template-columns:70px minmax(0,1fr) 56px;gap:10px;align-items:center;font:500 .8rem var(--f-hud);color:var(--ink2)}
.p7 .p7sbar i{display:block;height:14px;border-radius:7px;background:rgba(95,191,143,.1);overflow:hidden}
.p7 .p7sbar em{display:block;height:100%;border-radius:7px;background:linear-gradient(90deg,var(--neon),var(--gold));transition:width .4s}
.p7 .p7sbar b{color:var(--gold2);text-align:right}
/* --- 7.1 gap --- */
.p7 .p7gap{display:grid;gap:14px}
.p7 .p7gbar{display:grid;grid-template-columns:170px minmax(0,1fr) 110px;gap:12px;align-items:center;font-size:.86rem;color:var(--ink2)}
.p7 .p7gbar i{display:block;height:22px;border-radius:8px;background:rgba(255,255,255,.04);overflow:hidden;position:relative}
.p7 .p7gbar em{position:absolute;inset:0 auto 0 0;border-radius:8px}
.p7 .p7gbar b{font:500 .9rem var(--f-hud);color:var(--ink);text-align:right}
.p7 .p7opt{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:6px}
.p7 .p7opt button{text-align:left;padding:16px;border-radius:16px;border:1px solid var(--edge);background:rgba(2,10,8,.5);color:var(--ink2);cursor:pointer;font:inherit}
.p7 .p7opt button b{display:block;font:700 .95rem var(--f-display);color:var(--ink)}
.p7 .p7opt button span{display:block;font-size:.8rem;margin-top:4px}
.p7 .p7opt button.on{border-color:var(--gold);background:linear-gradient(150deg,rgba(242,201,107,.16),rgba(2,6,8,.6))}
.p7 .p7optout{margin-top:12px;padding:18px 20px;border-radius:16px;border:1px solid var(--edge2);background:rgba(242,201,107,.05);color:var(--ink2);font-size:.92rem}
.p7 .p7optout b{color:var(--gold2)}

/* --- 7.2 board --- */
.p7 .p7board{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:18px;align-items:center}
.p7 .p7seat{cursor:pointer}
.p7 .p7seat circle.o{transition:all .2s}
.p7 .p7seat:hover circle.o,.p7 .p7seat.on circle.o{stroke:#ffe7a8;stroke-width:2.5}
.p7 .p7seatinfo{min-height:200px}
.p7 .p7board{align-items:start}
.p7-bright{display:grid;gap:16px;min-width:0}
.p7-pcnote{background:linear-gradient(150deg,rgba(242,201,107,.13),rgba(2,6,8,.6))!important;border-color:var(--edge2)!important;justify-content:center}
.p7-pcnote .b{justify-content:center}
.p7-seats{display:grid;gap:8px;margin-top:14px}
.p7-seatr{display:grid;grid-template-columns:32px minmax(0,1fr) auto;gap:12px;align-items:center;width:100%;text-align:left;padding:12px 14px;border-radius:14px;border:1px solid var(--edge);border-left:2px solid var(--c);background:rgba(2,10,8,.5);color:var(--ink);font:inherit;cursor:pointer;transition:all .2s}
.p7-seatr:hover{background:rgba(95,191,143,.05)}
.p7-seatr.on{border-color:var(--c);background:linear-gradient(90deg,rgba(242,201,107,.10),rgba(2,10,8,.4))}
.p7-seatr .n{font:500 .66rem var(--f-hud);letter-spacing:.14em;color:var(--ink3)}
.p7-seatr b{display:block;font:700 .92rem var(--f-display)}
.p7-seatr small{display:block;margin-top:2px;font-size:.78rem;color:var(--ink2)}
.p7-seatr .v{font:500 .58rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;padding:4px 9px;border-radius:999px;border:1px solid var(--c);color:var(--c);white-space:nowrap}
.p7-seatr .v.nv{border-style:dashed;color:var(--ink3);border-color:var(--ink3)}
.p7-tally{display:flex;gap:3px;height:10px;border-radius:6px;overflow:hidden;margin-top:16px}
.p7-tallyl{display:flex;flex-wrap:wrap;gap:6px 16px;margin-top:8px;font:500 .58rem var(--f-hud);letter-spacing:.12em;text-transform:uppercase;color:var(--ink3)}
.p7 .p7seatinfo h4{margin:0;font:700 1.2rem var(--f-display)}
.p7 .p7seatinfo ul{margin:10px 0 0;padding-left:18px;color:var(--ink2);font-size:.9rem;display:grid;gap:5px}
.p7 .p7res2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:14px}
.p7 .p7res2 div{padding:12px 14px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.45);font-size:.84rem;color:var(--ink2)}
.p7 .p7res2 b{display:block;color:var(--ink);font-size:.88rem}
/* --- 7.2 DoA --- */
.p7 .p7doa td.lv{text-align:center;font:500 .72rem var(--f-hud)}
.p7 .p7doa td.lv span{display:inline-block;min-width:26px;padding:4px 8px;border-radius:8px}
.p7 .p7doa .A span{background:rgba(95,191,143,.18);color:var(--neon2)}
.p7 .p7doa .R span{background:rgba(242,201,107,.16);color:var(--gold2)}
.p7 .p7doa .C span{background:rgba(201,184,255,.16);color:#d9cdff}
.p7 .p7doa .I span{color:var(--ink3)}
.p7 .p7router{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:16px;margin-top:18px}
.p7 .p7router select{width:100%;padding:12px 14px;border-radius:12px;border:1px solid var(--edge2);background:#04110d;color:var(--ink);font:500 .9rem var(--f-body)}
.p7 .p7router input[type=range]{width:100%;accent-color:var(--gold)}
.p7 .p7chain{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:12px}
.p7 .p7chain span{padding:10px 14px;border-radius:12px;border:1px solid var(--edge);background:rgba(2,10,8,.5);font:600 .84rem var(--f-body);color:var(--ink3)}
.p7 .p7chain span.on{border-color:var(--neon);color:#021510;background:var(--neon);box-shadow:0 0 20px -6px var(--neon)}
.p7 .p7chain span.cs{border-color:#c9b8ff;color:#140d2a;background:#c9b8ff}
.p7 .p7chain i{color:var(--gold);font-style:normal}
/* --- 7.2 investor pack --- */
.p7 .p7pack{border-radius:24px;border:1px solid var(--edge2);background:linear-gradient(160deg,#f7faf8,#e9f2ed);color:#0b2219;padding:22px;box-shadow:0 40px 90px -40px rgba(95,191,143,.45)}
.p7 .p7packh{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding-bottom:14px;border-bottom:1px solid #cfe0d7}
.p7 .p7packh b{font:800 1.05rem var(--f-display);color:#0f7a52}
.p7 .p7packh span{font:500 .62rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:#5b6f66}
.p7 .p7packc{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.p7 .p7packc button{padding:6px 11px;border-radius:9px;border:1px solid #cfe0d7;background:#fff;color:#0b2219;font:600 .76rem var(--f-body);cursor:pointer}
.p7 .p7packc button.on{background:#0f7a52;color:#fff;border-color:#0f7a52}
.p7 .p7packc input{accent-color:#0f7a52;width:150px}
.p7 .p7packc output{font:500 .74rem var(--f-hud);color:#0f7a52;min-width:70px}
.p7 .p7lay{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.p7 .p7layc{border-radius:16px;background:#fff;padding:16px;box-shadow:0 1px 3px rgba(0,0,0,.06);min-width:0}
.p7 .p7layc h5{margin:0 0 10px;font:700 .82rem var(--f-display);color:#0f7a52;display:flex;justify-content:space-between;gap:8px}
.p7 .p7layc h5 span{font:500 .56rem var(--f-hud);letter-spacing:.14em;color:#8aa196;text-transform:uppercase}
.p7 .p7kpi{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:2px 10px;padding:7px 0;border-top:1px solid #eef3f0;font-size:.78rem;color:#40574d}
.p7 .p7kpi b{font:500 .82rem var(--f-hud);color:#0b2219;text-align:right}
.p7 .p7kpi small{grid-column:1/-1;font-size:.66rem;color:#8aa196}
.p7 .p7kpi .t{color:#b07b12}
.p7 .p7spark{margin-top:14px;border-radius:16px;background:#fff;padding:14px 16px;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.p7 .p7spark svg text{font-family:var(--f-hud)}
/* --- 7.2 phone report --- */
.p7 .p7rep{display:grid;grid-template-columns:300px minmax(0,1fr);gap:26px;align-items:center}
.p7 .p7ph{width:280px;max-width:100%;margin:0 auto;border-radius:38px;padding:10px;background:linear-gradient(160deg,#2a332f,#0b0f0d);box-shadow:0 40px 70px -20px rgba(0,0,0,.8),inset 0 0 0 1px rgba(255,255,255,.08)}
.p7 .p7phs{border-radius:30px;overflow:hidden;background:#e9e4dc;min-height:470px;display:flex;flex-direction:column}
.p7 .p7phh{display:flex;align-items:center;gap:10px;padding:16px 14px 12px;background:#0f7a52;color:#fff}
.p7 .p7phh i{width:30px;height:30px;border-radius:50%;background:#fff;display:grid;place-items:center}
.p7 .p7phh b{display:block;font:700 .8rem var(--f-body)}
.p7 .p7phh small{font-size:.62rem;opacity:.8}
.p7 .p7msg{margin:12px 12px 0 30px;padding:10px 12px 8px;border-radius:12px 4px 12px 12px;background:#fff;color:#0b2219;font:400 .72rem/1.45 var(--f-body);box-shadow:0 1px 1px rgba(0,0,0,.08)}
.p7 .p7msg b{font-weight:700}
.p7 .p7msg .r{display:flex;justify-content:space-between;gap:8px}
.p7 .p7msg .r span:last-child{font-family:var(--f-hud);font-size:.64rem;white-space:nowrap}.p7 .p7msg .r b:last-child{white-space:nowrap}
.p7 .p7msg hr{border:0;border-top:1px dashed #d4dcd7;margin:6px 0}
.p7 .p7msg time{display:block;text-align:right;font-size:.56rem;color:#8aa196;margin-top:4px}
.p7 .p7msg .al{color:#b2401f}
/* --- 7.2 calendar --- */
.p7 .p7cal{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));gap:6px}
.p7 .p7calm{border-radius:12px;border:1px solid var(--edge);background:var(--panel);padding:10px 6px;min-height:150px;display:flex;flex-direction:column;gap:5px;min-width:0}
.p7 .p7calm>b{font:500 .62rem var(--f-hud);letter-spacing:.12em;color:var(--gold);text-align:center}
.p7 .p7ev{display:block;padding:4px 5px;border-radius:6px;font:600 .6rem/1.25 var(--f-body);color:#021510;background:var(--c);overflow-wrap:anywhere}
.p7 .p7legend{display:flex;flex-wrap:wrap;gap:8px 16px;margin-top:14px}
.p7 .p7legend span{display:inline-flex;align-items:center;gap:7px;font-size:.8rem;color:var(--ink2)}
.p7 .p7legend i{width:12px;height:12px;border-radius:4px;background:var(--c)}
/* --- 7.2 access --- */
.p7 .p7acc td.lv{font:500 .7rem var(--f-hud);letter-spacing:.06em}
.p7 .p7acc .full{color:var(--neon2)} .p7 .p7acc .read{color:var(--gold2)} .p7 .p7acc .own{color:#d9cdff} .p7 .p7acc .agg{color:#9fd3ff} .p7 .p7acc .none{color:var(--ink3)}
.p7 .p7acc tr.hi td{background:rgba(242,201,107,.06)}
.p7 .p7acc th.hi{color:var(--neon)}
.p7 .p7acc td.hi{background:rgba(95,191,143,.07)}

/* --- 7.3 heat map & register --- */
.p7 .p7heat{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:22px;align-items:center}
.p7 .p7heat .p7box svg{max-width:440px;margin:0 auto}
.p7 .p7cell{cursor:pointer}
.p7 .p7cell rect{transition:stroke .2s,opacity .2s}
.p7 .p7cell:hover rect,.p7 .p7cell.on rect{stroke:#fff;stroke-width:2.5}
.p7 .p7cell.dim rect{opacity:.35}
.p7 .p7rtools{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:center;margin-bottom:12px}
.p7 .p7rtbl th button{all:unset;cursor:pointer;white-space:nowrap}
.p7 .p7rtbl th button::after{content:" ↕";opacity:.5}
.p7 .p7rtbl th button.asc::after{content:" ↑";opacity:1}
.p7 .p7rtbl th button.desc::after{content:" ↓";opacity:1}
.p7 .p7sc{display:inline-grid;place-items:center;min-width:34px;height:28px;border-radius:8px;font:500 .8rem var(--f-hud);color:#021510}
.p7 .p7rtbl td.rk b{display:block;font:700 .9rem/1.3 var(--f-display);color:var(--ink)}
.p7 .p7rtbl td.rk a{font:500 .6rem var(--f-hud);letter-spacing:.14em;color:var(--neon);text-decoration:none}
.p7 .p7rcount{font:500 .66rem var(--f-hud);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-top:10px}
.p7 .p7top{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.p7 .p7topc{padding:16px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p7 .p7topc .p7sc{margin-bottom:8px}
.p7 .p7topc b{display:block;font:700 .86rem/1.3 var(--f-display)}
.p7 .p7topc p{margin:6px 0 0;font-size:.78rem;color:var(--ink2)}
.p7 .p7cmp{display:grid;gap:10px}
.p7 .p7cmpr{display:grid;grid-template-columns:170px minmax(0,1fr);gap:12px;align-items:center;font-size:.86rem;color:var(--ink2)}
.p7 .p7cmpr .bars{display:grid;gap:4px}
.p7 .p7cmpr .bars div{display:grid;grid-template-columns:minmax(0,1fr) 120px;gap:8px;align-items:center;font:500 .72rem var(--f-hud)}
.p7 .p7cmpr .bars i{display:block;height:12px;border-radius:6px}
.p7 .p7cmpr .bars span{text-align:right;color:var(--ink)}

/* --- 7.4 impact --- */
.p7 .p7toc{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-radius:22px;overflow:hidden;border:1px solid var(--edge)}
.p7 .p7tocc{padding:20px 18px;background:var(--panel);border-right:1px solid var(--edge);min-width:0}
.p7 .p7tocc:last-child{border-right:0}
.p7 .p7tocc>small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.p7 .p7tocc div{padding:9px 11px;border-radius:10px;background:rgba(2,10,8,.5);border:1px solid var(--edge);font-size:.8rem;color:var(--ink2);margin-bottom:6px;line-height:1.4}
.p7 .p7tocc div b{color:var(--ink)}
.p7 .p7tocc.o{background:linear-gradient(170deg,rgba(95,191,143,.10),var(--panel))}
.p7 .p7path{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:10px}
.p7 .p7pth{padding:18px;border-radius:18px;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.7));min-width:0;position:relative;overflow:hidden}
.p7 .p7pth::before{content:"";position:absolute;inset:0 0 auto;height:2px;background:var(--c)}
.p7 .p7pth svg{width:26px;height:26px;color:var(--c)}
.p7 .p7pth b{display:block;margin-top:8px;font:700 .95rem var(--f-display)}
.p7 .p7pth p{margin:6px 0 0;font-size:.82rem;color:var(--ink2);line-height:1.5}
.p7 .p7sdg{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.p7 .p7sdgc{border-radius:18px;overflow:hidden;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p7 .p7sdgh{display:flex;align-items:center;gap:12px;padding:16px 18px;background:var(--c);color:#fff}
.p7 .p7sdgh b{font:900 2rem/1 var(--f-display)}
.p7 .p7sdgh span{font:700 .82rem/1.25 var(--f-display)}
.p7 .p7sdgb{padding:16px 18px;font-size:.86rem;color:var(--ink2)}
.p7 .p7sdgb q{quotes:none;display:block;font-style:italic;color:var(--ink3);font-size:.8rem;margin-bottom:8px}
.p7 .p7sdgb b{color:var(--ink)}
.p7 .p7imp td.m b{display:block;font:700 .88rem var(--f-display);color:var(--ink)}
.p7 .p7imp td.v{font:500 .9rem var(--f-hud);color:var(--gold2);white-space:nowrap}
.p7 .p7case{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:18px;align-items:center}
.p7 .p7case .shot{margin:0}
.p7 .p7case ol{margin:0;padding-left:20px;display:grid;gap:8px;color:var(--ink2);font-size:.9rem}
.p7 .p7case ol b{color:var(--ink)}

/* --- 7.5 Q&A & data room --- */
.p7 .p7qa{display:grid;gap:8px;margin-top:14px}
.p7 .p7q{border-radius:16px;border:1px solid var(--edge);background:var(--panel);overflow:hidden}
.p7 .p7q[hidden]{display:none}
.p7 .p7q button{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:44px minmax(0,1fr) 24px;gap:10px;align-items:center;padding:15px 18px;cursor:pointer}
.p7 .p7q button:focus-visible{outline:2px solid var(--neon);outline-offset:-2px;border-radius:16px}
.p7 .p7q button small{font:500 .66rem var(--f-hud);color:var(--gold)}
.p7 .p7q button b{font:700 .95rem/1.35 var(--f-display);color:var(--ink)}
.p7 .p7q button i{font-style:normal;color:var(--neon);font:500 1.1rem var(--f-hud);text-align:center;transition:transform .2s}
.p7 .p7q.open button i{transform:rotate(45deg)}
.p7 .p7qa .p7a{display:none;padding:0 18px 18px 72px;color:var(--ink2);font-size:.92rem;line-height:1.65}
.p7 .p7q.open .p7a{display:block}
.p7 .p7a p{margin:0 0 8px}
.p7 .p7a .p7chip{margin-top:4px}
.p7 .p7dr td.st span{display:inline-block;padding:4px 9px;border-radius:999px;font:500 .6rem var(--f-hud);letter-spacing:.1em;text-transform:uppercase;white-space:nowrap}
.p7 .p7dr .ex span{background:rgba(95,191,143,.16);color:var(--neon2)}
.p7 .p7dr .pr span{background:rgba(242,201,107,.16);color:var(--gold2)}
.p7 .p7dr .af span{background:rgba(201,184,255,.14);color:#d9cdff}
.p7 .p7oq{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
.p7 .p7oqc{padding:18px 20px;border-radius:16px;border:1px solid var(--edge);background:var(--panel);min-width:0}
.p7 .p7oqc small{display:block;font:500 .6rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--c,var(--gold))}
.p7 .p7oqc b{display:block;margin-top:6px;font:700 .95rem/1.35 var(--f-display);color:var(--ink)}
.p7 .p7oqc p{margin:6px 0 0;font-size:.84rem;color:var(--ink2)}
.p7 .p7srcl{margin:12px 0 0;padding-left:26px;display:grid;gap:8px;color:var(--ink3);font-size:.86rem}
.p7 .p7srcl a{color:var(--ink2);overflow-wrap:anywhere}
.p7 .p7srcl a:hover{color:var(--neon2)}
.p7 .p7srcl li span{display:inline-block;margin-left:6px;font:500 .58rem var(--f-hud);letter-spacing:.1em;color:var(--neon);text-transform:uppercase}

@media (max-width:1150px){
 .p7 .p7trk{grid-template-columns:1fr}.p7 .p7side{position:static;grid-template-columns:repeat(2,minmax(0,1fr))}
 .p7 .p7trip,.p7 .p7grid3,.p7 .p7sdg{grid-template-columns:1fr}
 .p7 .p7loc,.p7 .p7board,.p7 .p7heat,.p7 .p7router,.p7 .p7case{grid-template-columns:1fr}
 .p7 .p7lay{grid-template-columns:1fr}
 .p7 .p7cal{grid-template-columns:repeat(6,minmax(0,1fr))}
 .p7 .p7top{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p7 .p7path{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p7 .p7toc{grid-template-columns:repeat(2,minmax(0,1fr))}.p7 .p7tocc:nth-child(2){border-right:0}.p7 .p7tocc:nth-child(-n+2){border-bottom:1px solid var(--edge)}
 .p7 .p7grid4{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p7 .p7evg{grid-template-columns:repeat(2,minmax(0,1fr))}
 .p7 .p7rep{grid-template-columns:1fr}
}
@media (max-width:820px){
 .p7 .p7grid2,.p7 .p7opt,.p7 .p7ms,.p7 .p7oq,.p7 .p7evg,.p7 .p7res2{grid-template-columns:1fr}
 .p7 .p7side{grid-template-columns:1fr}
 .p7 .p7regr{grid-template-columns:1fr;gap:6px}.p7 .p7regr .ar{display:none}
 .p7 .p7tlin{min-width:680px}.p7 .p7lane,.p7 .p7months{grid-template-columns:110px minmax(0,1fr)}.p7 .p7lane>span{font-size:.74rem}.p7 .p7swipe{display:block}
 .p7 .p7bar{font-size:.56rem;padding:0 6px}
 .p7 .p7cr{grid-template-columns:minmax(0,1fr) 44px;}.p7 .p7cr .p7dots{grid-column:1/-1}
 .p7 .p7gbar{grid-template-columns:1fr 90px}.p7 .p7gbar i{grid-column:1/-1;grid-row:2}
 .p7 .p7cal{grid-template-columns:repeat(3,minmax(0,1fr))}
 .p7 .p7top,.p7 .p7path,.p7 .p7toc,.p7 .p7grid4{grid-template-columns:1fr}.p7 .p7tocc{border-right:0;border-bottom:1px solid var(--edge)}
 .p7 .p7cmpr{grid-template-columns:1fr;gap:4px}
 .p7 .p7sth{grid-template-columns:38px minmax(0,1fr);}.p7 .p7stc{grid-column:2;text-align:left}
 .p7 .p7st summary{padding-left:16px}.p7 .p7std{padding-left:16px}.p7 .p7std dl{grid-template-columns:1fr}
 .p7 .p7qa .p7a{padding-left:18px}.p7 .p7q button{grid-template-columns:34px minmax(0,1fr) 20px}
 .p7 .p7rtools{grid-template-columns:1fr}
 /* tables become cards */
 .p7 .p7cards thead{display:none}
 .p7 .p7cards,.p7 .p7cards tbody,.p7 .p7cards tr,.p7 .p7cards td{display:block;width:100%}
 .p7 .p7cards tr{padding:12px 4px;border-bottom:1px solid var(--edge2)}
 .p7 .p7cards td{border:0;padding:4px 12px}
 .p7 .p7cards td[data-l]::before{content:attr(data-l);display:block;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3);margin-bottom:2px}
 .p7 .p7cards td.lv{display:flex;justify-content:space-between;align-items:center;gap:10px;text-align:left}.p7 .p7cards td.lv::before{margin:0}
 .p7 .p7cards td.sm{display:inline-block;width:auto;margin-right:10px;vertical-align:top}.p7 .p7rtbl td.rk{order:-1}
 .p7 .p7tblw{overflow:visible}
 .p7 .p7tbl th{position:static}
}

/* ---- editorial photography (quality pass) ---- */
.p7-ed{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(0,1fr);gap:clamp(20px,3.2vw,44px);align-items:center;margin:30px 0}
.p7-ed.r>figure{order:2}
.p7-ed.top{align-items:start}
.p7-ph{margin:0;position:relative;border-radius:22px;overflow:hidden;border:1px solid rgba(242,201,107,.22);background:#020608;box-shadow:0 30px 60px -32px rgba(0,0,0,.85);min-width:0}
.p7-ph img{display:block;width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.p7-ph:hover img{transform:scale(1.03)}
.p7-ph::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 58%,rgba(2,6,8,.6));pointer-events:none}
.p7-ph figcaption{position:absolute;left:14px;bottom:14px;right:14px;z-index:1;display:flex;gap:6px;flex-wrap:wrap;font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--ink)}
.p7-ph figcaption span{padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.08)}
.p7-ph figcaption span:first-child{color:var(--gold2)}
.p7-ph.tall img{aspect-ratio:4/5}
.p7-ph.wide img{aspect-ratio:21/9}
.p7-ed .t{min-width:0}
.p7-ed .t .k,.p7-pc .k,.p7-band .k{display:block;font:500 .6rem var(--f-hud);letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.p7-ed .t h3{font:800 clamp(1.3rem,2.2vw,1.95rem)/1.14 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p7-ed .t h3 em,.p7-band h3 em{font-style:normal;background:linear-gradient(90deg,var(--neon),var(--gold2));-webkit-background-clip:text;background-clip:text;color:transparent}
.p7-ed .t p{color:var(--ink2);font-size:.95rem;line-height:1.72;margin:0 0 12px}
.p7-ed .t p b,.p7-pc p b,.p7-band p b{color:var(--ink)}
.p7-ed .t ul{margin:4px 0 12px;padding:0;list-style:none;display:grid;gap:8px}
.p7-ed .t li{position:relative;padding-left:20px;color:var(--ink2);font-size:.9rem;line-height:1.6}
.p7-ed .t li::before{content:"";position:absolute;left:0;top:.62em;width:10px;height:1px;background:var(--gold)}
.p7-ed .t li b{color:var(--ink)}
.p7-facts{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:16px}
.p7-facts div{padding:12px 0 0;border-top:1px solid rgba(242,201,107,.35);min-width:0}
.p7-facts b{display:block;font:500 clamp(1rem,1.5vw,1.25rem) var(--f-hud);color:var(--gold2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.p7-facts span{display:block;font-size:.76rem;color:var(--ink3);line-height:1.45;margin-top:4px}
.p7-pcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.p7-pcs.c2{grid-template-columns:repeat(2,minmax(0,1fr))}
.p7-pcs.c4{grid-template-columns:repeat(4,minmax(0,1fr))}
.p7-pc{border-radius:20px;overflow:hidden;border:1px solid var(--edge);background:linear-gradient(170deg,var(--panel2),rgba(2,6,8,.6));display:flex;flex-direction:column;min-width:0}
.p7-pc>.p7-ph{border-radius:0;border:0;box-shadow:none}
.p7-pc>.p7-ph img{aspect-ratio:16/9}
.p7-pc .b{padding:18px 20px 20px;display:flex;flex-direction:column;gap:8px;flex:1}
.p7-pc h4{margin:0;font:700 1.05rem/1.25 var(--f-display);color:var(--ink)}
.p7-pc p{margin:0;color:var(--ink2);font-size:.88rem;line-height:1.6}
.p7-band{position:relative;border-radius:26px;overflow:hidden;border:1px solid rgba(242,201,107,.24);min-height:400px;display:flex;align-items:center;margin:30px 0;background:#020608}
.p7-band>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.p7-band::before{content:"";position:absolute;inset:0;z-index:1;background:linear-gradient(90deg,rgba(2,6,8,.96) 0%,rgba(2,6,8,.9) 42%,rgba(2,6,8,.45) 70%,rgba(2,6,8,.08) 100%)}
.p7-band .in{position:relative;z-index:2;padding:clamp(24px,4vw,48px);max-width:600px}
.p7-band h3{font:800 clamp(1.4rem,2.6vw,2.2rem)/1.12 var(--f-display);letter-spacing:-.02em;margin:10px 0 14px;color:var(--ink)}
.p7-band p{color:var(--ink2);font-size:.95rem;line-height:1.7;margin:0 0 10px}
.p7-band .cap{position:absolute;right:16px;bottom:14px;z-index:2;padding:5px 10px;border-radius:999px;background:rgba(2,6,8,.74);font:500 .56rem var(--f-hud);letter-spacing:.16em;text-transform:uppercase;color:var(--gold2)}
@media (max-width:1100px){.p7-pcs.c4{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media (max-width:860px){
 .p7-ed{grid-template-columns:1fr;gap:18px}.p7-ed.r>figure{order:0}
 .p7-pcs,.p7-pcs.c2,.p7-pcs.c4{grid-template-columns:1fr}
 .p7-facts{grid-template-columns:1fr 1fr}
 .p7-band{min-height:0;display:block}
 .p7-band>img{position:relative;height:auto;aspect-ratio:16/10}
 .p7-band::before{display:none}
 .p7-band .in{padding:20px 20px 24px}
 .p7-band .cap{top:12px;bottom:auto;right:12px}
 .p7-ph.tall img{aspect-ratio:16/11}
}
`;
function css7(){try{if(document.getElementById('css-part7'))return;const st=document.createElement('style');st.id='css-part7';st.textContent=P7CSS;(document.head||document.documentElement).appendChild(st)}catch(e){}}
css7();

/* ---------- shared helpers ---------- */
const $=id=>document.getElementById(id);
const M=()=>{const m=window.MODEL;return m.cur?Object.assign(Object.create(m),{get:k=>m.cur.get(k),inputs:m.cur.inputs}):m};
const ISL=()=>!!(window.MODEL.isLean&&window.MODEL.isLean()),FW=()=>ISL()?'start-small store':'flagship';
const F=()=>window.MODEL.fmt;
const tz=n=>'TSh '+Math.round(n).toLocaleString('en-US');
const nf=n=>Math.round(n).toLocaleString('en-US');
const store=(k,v)=>{try{if(v===undefined){const x=localStorage.getItem('afya.p7.'+k);return x?JSON.parse(x):null}localStorage.setItem('afya.p7.'+k,JSON.stringify(v))}catch(e){return null}};
const pe=()=>(typeof PE!=='undefined'?PE:'<span class="tagi">Planning estimate</span>');
const ti=t=>(typeof tagi==='function'?tagi(t):`<span class="tagi">${t}</span>`);

/* ---- editorial photography helpers (quality pass) ---- */
const p7pho=(f,alt,cap,cls)=>`<figure class="p7-ph${cls?' '+cls:''}"><img src="img/${f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(alt)}"><figcaption><span>Concept image</span>${cap?`<span>${cap}</span>`:''}</figcaption></figure>`;
const p7ed=(o)=>`<div class="p7-ed${o.r?' r':''}${o.top?' top':''}">${p7pho(o.f,o.alt,o.cap,o.cls)}<div class="t">${o.k?`<span class="k">${o.k}</span>`:''}${o.h?`<h3>${o.h}</h3>`:''}${o.body||''}${o.facts?p7facts(o.facts):''}</div></div>`;
const p7facts=a=>`<div class="p7-facts">${a.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div>`;
const p7pcs=(items,c)=>`<div class="p7-pcs${c?' c'+c:''}">${items.map(x=>`<article class="p7-pc">${p7pho(x.f,x.alt,x.cap)}<div class="b">${x.k?`<span class="k">${x.k}</span>`:''}<h4>${x.h}</h4>${x.body}</div></article>`).join('')}</div>`;
const p7band=(o)=>`<div class="p7-band"><img src="img/${o.f}.webp" width="1680" height="944" loading="lazy" alt="Concept image: ${esc(o.alt)}"><div class="in">${o.k?`<span class="k">${o.k}</span>`:''}<h3>${o.h}</h3>${o.body||''}${o.facts?p7facts(o.facts):''}</div><span class="cap">Concept image${o.cap?' · '+o.cap:''}</span></div>`;

/* ---------- sources opened during research ---------- */
const S7={
 brela:['Daily News (Tanzania), 28 May 2026: BRELA rolls out an upgraded online system (BRELA Online Service) to speed up company registration','https://dailynews.co.tz/brela-rolls-out-an-upgraded-online-system-to-speed-up-company-registration/'],
 tin:['TanzaniaInvest, updated 26 Sep 2025: Tanzania Tax Identification Number (TIN), all you need to know','https://tanzaniainvest.com/economy/tax-identification-number-tin'],
 lic:['Tanzania National Business Portal (business.go.tz): Obtain a business licence','https://business.go.tz/obtain-a-business-license'],
 tmda:['TMDA, Tanzania Medicines and Medical Devices Authority: home page and e-services (IMIS portal, public registers)','https://www.tmda.go.tz/'],
 tmdaprem:['TMDA: Registration and licensing of premises dealing in medical devices','https://www.tmda.go.tz/pages/registration-and-licensing-of-premises-1'],
 tmdaimp:['TMDA: Import and export control of medical devices (permits, shelf-life rules, ports of entry)','https://www.tmda.go.tz/pages/import-and-export-control-of-medical-devices'],
 cap219:['Tanzania Medicines and Medical Devices Act, Cap. 219 (Revised Edition 2023), published by the Ministry of Health','https://www.moh.go.tz/storage/app/uploads/public/696/8aa/deb/6968aadeb40f7274958612.pdf'],
 pharm:['Pharmacy Act, 2011 (Act No. 1 of 2011), sections 34–44, via TanzLII','https://tanzlii.org/akn/tz/act/2011/1/eng@2011-12-31/source'],
 tfda08:['TFDA, December 2008: Guidelines for registration of premises and licensing of pharmaceutical business, 2nd edition (historic rules; check the current Pharmacy Council rules)','https://pharmexcil.com/docs/DRProcedures/TANZANIA/Hguidelinesforregistrationofpremisesandlicensingofpharmaceuticalbusiness_tanzania.pdf'],
 tbs:['Tanzania Bureau of Standards: Product and premise registration (food and cosmetics)','https://www.tbs.go.tz/pages/registration'],
 clyde:['Clyde & Co, 31 January 2025: Tanzania Business 101, what you need to know','https://clydeco.com/en/insights/2025/01/tanzania-business-101-what-you-need-to-know'],
 rsm:['RSM Tanzania: Compliance when operating a company in Tanzania (TIN, VAT threshold, OSHA, WCF, fire certificate)','https://www.rsm.global/tanzania/insights/consulting-insights/compliance-when-operating-company-tanzania'],
 wcf:['Lenvica (HR adviser), updated June 2023: Workers Compensation Fund (WCF) Tanzania','https://lenvica.com/workers-compensation-fund-wcf-tanzania/'],
 nssf:['Lenvica (HR adviser), updated May 2022: National Social Security Fund (NSSF) in Tanzania','https://lenvica.com/national-social-security-fund-nssf-in-tanzania/'],
 pdpr:['Bowmans, 23 June 2023: Tanzania regulations made under the Personal Data Protection Act 2022','https://bowmanslaw.com/insights/tanzania-regulations-made-under-the-personal-data-protection-act-2022/'],
 pdpc:['DLA Piper Africa (IMMMA Advocates), 10 April 2025: Registration with the Personal Data Protection Commission in Tanzania','https://www.dlapiperafrica.com/en/tanzania/insights/2025/legal-article-a28156-registration-with-the-ersonal-data-protection-commission-in-tanzania-flyer-v2'],
 noncit:['Clyde & Co, July 2025: Practical implications of the Business Licensing (Prohibition of Business Activities for Non-Citizens) Order, 2025 (GN 487A)','https://www.clydeco.com/en/insights/2025/07/practical-implications-of-the-business-licensing'],
 canton:['ExamineChina: Canton Fair Phase 3, product categories and typical session dates','https://www.examinechina.com/canton-fair-phase-3/'],
 whoht:['WHO fact sheet, 25 September 2025: Hypertension','https://www.who.int/news-room/fact-sheets/detail/hypertension'],
 whotz:['WHO, United Republic of Tanzania hypertension profile (2012 STEPS survey data)','https://cdn.who.int/media/docs/default-source/country-profiles/hypertension/tza_en.pdf'],
 idf:['IDF Diabetes Atlas: United Republic of Tanzania country data (2024 estimates)','https://diabetesatlas.org/data-by-location/country/united-republic-of-tanzania/'],
 nbsg:['National Bureau of Statistics, January 2023: Gender dimensions of Tanzania’s labour market (analysis of the 2020/21 Integrated Labour Force Survey)','https://www.nbs.go.tz/uploads/statistics/documents/en-1741873478-GENDER%20DIMENSIONS%20of%20TANZANIA%E2%80%99S%20LABOUR%20MARKET.pdf'],
 adh:['WHO news release, 1 July 2003: Failure to take prescribed medicine for chronic diseases is a massive, world-wide problem','https://www.who.int/news/item/01-07-2003-failure-to-take-prescribed-medicine-for-chronic-diseases-is-a-massive-world-wide-problem'],
 whosf:['WHO news release, 28 November 2017: 1 in 10 medical products in developing countries is substandard or falsified','https://www.who.int/news/item/28-11-2017-1-in-10-medical-products-in-developing-countries-is-substandard-or-falsified'],
 rem:['The Citizen, 27 May 2026: Diaspora remittances hit Sh3.3 trillion (2024/25 financial year)','https://www.thecitizen.co.tz/tanzania/diaspora/diaspora-remittances-hit-sh3-3-trillion-as-tanzania-deepens-global-engagement-5473984'],
 sdg3:['United Nations, Department of Economic and Social Affairs: Sustainable Development Goal 3, targets','https://sdgs.un.org/goals/goal3'],
 sdg5:['United Nations, Department of Economic and Social Affairs: Sustainable Development Goal 5, targets','https://sdgs.un.org/goals/goal5'],
 sdg8:['United Nations, Department of Economic and Social Affairs: Sustainable Development Goal 8, targets','https://sdgs.un.org/goals/goal8']
};
window.AFYA_P7_SOURCES=S7;
/* per-section citer: numbers follow the order of the key list */
function citer(keys){const c=k=>{const i=keys.indexOf(k);if(i<0)return '';return cref(S7[k][1],i+1,S7[k][0])};return {c,src:keys.map(k=>S7[k])}}

/* small SVG icons local to part 7 */
const I7={
 doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5M10 13h6M10 17h6"/>',
 users:'<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5.4 6-5.4s5.4 2 6 5.4"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.6c2.6.2 4.4 2 5 4.8"/>',
 heart:'<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/><path d="M5 12h3l1.5-2.5 2 5 1.5-2.5H19"/>',
 box:'<path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/>',
 shield:'<path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/>',
 brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>'
};
const ic7=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I7[k]}</svg>`;

/* ==========================================================================
   7.1 SETUP, LICENCES, RESEARCH AND TRAVEL
   ========================================================================== */
const K71=['brela','tin','lic','tmda','tmdaprem','tmdaimp','cap219','pharm','tfda08','tbs','clyde','rsm','wcf','nssf','pdpr','pdpc','noncit','canton'];
const STEPS71=[
 // [phase, title, who, when (month vs opening), cost TSh (planning estimate), funded by, conditional?, detail html(fn c), sources]
 ['Form','Clear the name and incorporate the company with BRELA','Founders + company lawyer','M−6',1200000,'Phase 0',0,c=>`BRELA’s new <b>BRELA Online Service</b> replaced the old ORS in May 2026. It adds a name-clearance check before filing, takes directors’ and shareholders’ details once, and notifies every person linked to the company when something is filed ${c('brela')}. Mainland Tanzania needs at least two shareholders and has no minimum capital ${c('clyde')}. The beneficial-owner (UBO) declaration is filed in BRELA’s UBO registry at the same time ${c('clyde')}. <b>Output:</b> certificate of incorporation and constitution (MEMARTS) for the data room.`],
 ['Form','Shareholders’ agreement, founders’ 25% protection and the ownership check','Company lawyer + founders + seed investor','M−6',3000000,'Phase 0',0,c=>`One agreement sets the share split, the founders’ 25% floor for life, the investor’s reserved matters (section 7.2) and the tranche conditions. The lawyer also checks the <b>Business Licensing (Prohibition of Business Activities for Non-Citizens) Order, 2025</b>. It reserves retail and wholesale trade for citizens, but excludes “supermarkets and specialised product outlets” ${c('noncit')}. Fahmy is Tanzanian. A written opinion must confirm that Afya Basics, a specialised health-essentials outlet, is fine with a foreign investor on the cap table.`],
 ['Form','TIN, VAT plan and receipt system with TRA','Accountant','M−5',300000,'Phase 0',0,c=>`A company must apply for its TIN within <b>15 days of starting business</b>. It applies on the TRA taxpayer portal, and the TIN is usually issued within 24 hours ${c('tin')}. VAT registration becomes compulsory once taxable sales are expected to pass <b>TSh 100 million in 12 months</b> ${c('rsm')}. The model’s Year 1 revenue is <b>${F().m(M().get('base').y1.revenue)}</b> net of VAT, far above the threshold, so Afya Basics registers for VAT before opening. Shelf prices are VAT-inclusive, the model removes the 18% VAT from revenue, and the till issues TRA receipts by SMS or WhatsApp.`],
 ['Form','Corporate bank account and bookkeeping set-up','Founders + accountant','M−5',200000,'Phase 0',0,c=>`The account is opened with the certificate of incorporation, MEMARTS, the TIN and the directors’ IDs. Seed tranches go only into this account. The cloud accounting ledger opens on the same day, so every Phase 0 payment is recorded with a receipt the investor can inspect.`],
 ['Permit','Regulatory scoping: what we sell decides who licenses us','Regulatory consultant + founders','M−5',1500000,'Phase 0',0,c=>`The draft range of about ${M().inputs.product_families} product families is mapped line by line. Medical devices go to TMDA. Any medicinal product, even an over-the-counter one, goes to the Pharmacy Council. Cosmetics and food supplements go to TBS. Each brand is checked against TMDA’s public registers of registered and notified devices in IMIS ${c('tmda')}. A brand with no registration or notification is either dropped or its supplier registers it before we import. <b>Output:</b> a signed range-to-regulator map and the decision on medicines (see step 9).`],
 ['Place','Location shortlist, scoring and lease negotiation','Founders + property agent + lawyer','M−4',1500000,'Phase 0',0,c=>`Sites are scored with the location tool below, and no address is committed before the founders visit in person. The flagship budget is <b>${F().tsh(M().inputs.opex_month.rent)}</b> a month for about ${M().inputs.store.area_m2} m², the Knight Frank prime rate of about US$25 per m². The 6-month lease advance is paid from the seed’s lease-advance line (${F().m((M().inputs.seed.use.find(x=>/lease advance/i.test(x[0]))||[0,0])[1])}), not from Phase 0. The lease must include landlord consent for the glass frontage, the roof-edge AFYA BASICS sign and the fit-out works.`],
 ['Place','Fit-out, building and signage permits','Fit-out contractor + store lead','M−3',1500000,'Seed T1',0,c=>`The municipal council approves the renovation and signage. Landlord drawings and the contractor’s method statement are filed with the application. The fit-out must also meet the premises rules of each regulator in step 5. TMDA inspects premises against a checklist before it issues a permit ${c('tmdaprem')}.`],
 ['Permit','TMDA premises registration and business permit (medical devices)','Superintendent (person in charge) + founders','M−3',1500000,'Seed T1',0,c=>`Under Cap. 219, regulated products may only be sold, supplied or stored in <b>registered premises</b>, and dealing in devices needs product registration plus a licence or permit ${c('cap219')}. TMDA asks for the BRELA registration, the TIN, a contract with the superintendent or person in charge and that person’s professional registration certificate. It also asks for a premises sketch and the MEMARTS. The application is made online, then TMDA inspects. Business permits <b>expire every 30 June</b> and must be renewed ${c('tmdaprem')}. For importing, premises must be registered before an import permit is requested ${c('tmdaimp')}.`],
 ['Permit','Partner pharmacy agreement signed; its premises permit and pharmacist registration checked','Founders + regulatory lawyer','M−3',500000,'Seed T1',0,c=>`Afya Basics sells no medicines. The Pharmacy Act says no one may <b>sell, dispense or supply medicinal products except in registered premises</b>, with a permit, and the fine for breaking this is up to TSh 10 million ${c('pharm')}. Medicines therefore come from a <b>licensed partner pharmacy</b> near the store, run by its own registered pharmacist ${c('pharm')}. This step signs the written agreement (see section 4.5): the pharmacy sells, dispenses and takes payment; the sealed, labelled bag travels with the member’s box; copies of its premises permit and pharmacist registration are filed every June. A regulatory lawyer drafts the agreement and confirms the courier step with the Pharmacy Council. The TSh 500,000 is a legal-fee estimate.`],

 ['Permit','TBS registration for cosmetics and food supplements','Regulatory consultant','M−3',1000000,'Seed T1',0,c=>`Cosmetics (personal care, women’s beauty boxes) and food products (supplements, baby food) fall under the Tanzania Bureau of Standards. TBS runs product and premises registration ${c('tbs')}. The TBS pages we opened do not list the retail requirements, so the consultant confirms the exact scope, fees and timing with TBS in writing.`],
 ['Permit','General business licence (after the sector permits)','Founders','M−2',500000,'Seed T1',0,c=>`Under the Business Licensing Act, Class A licences are issued by BRELA and Class B licences by the local council. The order is fixed. Get the premises, the BRELA registration and the TIN, then the sector permit, then the licence ${c('lic')}. A tax clearance certificate is needed with renewals ${c('rsm')}. Category A, Part A usually takes 14–20 working days ${c('clyde')}.`],
 ['People','Fire safety certificate and OSHA workplace registration','Store lead + contractor','M−1',800000,'Seed T2',0,c=>`OSHA registers a workplace <b>before operations start</b>, after an inspection, and then issues a yearly compliance licence. The Fire and Rescue Force issues a fire safety certificate after its own inspection ${c('rsm')}. These “Part B” registrations typically take 3–6 months because of the inspections ${c('clyde')}, so they are filed as soon as the fit-out allows.`],
 ['People','Employer registrations: NSSF, WCF and payroll taxes','Accountant','M−1',300000,'Seed T2',0,c=>`WCF registration is due within <b>30 days of recruiting the first employee</b> ${c('rsm')}. Our adviser source gives the private-sector rate as 0.5–0.6% of payroll, to be confirmed with WCF ${c('wcf')}. NSSF contributions total <b>20% of wages</b>, normally split 10% employer and 10% employee ${c('nssf')}. PAYE is filed monthly with TRA. Staff health cover (NHIF or private) is confirmed with the accountant. The model’s staff line (${F().tsh(M().inputs.opex_month.staff)} a month) already includes the employer costs: NSSF at 10% and WCF at 0.5% of wages.`],
 ['People','Data protection registration with the PDPC','Founders + lawyer','M−2',800000,'Seed T1',0,c=>`Anyone who collects personal data must register with the Personal Data Protection Commission ${c('pdpc')}. The certificate is valid for <b>five years</b>, and the fee depends on the number of employees ${c('pdpr')}. Afya Check readings are health data, so the registration comes with a written consent screen, a privacy notice in English and Kiswahili, and the access levels in section 7.2.`],
 ['Money','Payments and insurance: mobile money, card, cover','Founders + accountant','M−1',1000000,'Seed T2',0,c=>`We open merchant accounts with the main mobile-money operators (no single operator is a partner) and a card-acquiring account, and test them with the till. Stock, fire, public liability, electric-motorbike and goods-in-transit insurance are placed with a licensed insurer. The running cost then sits in the model’s insurance and licences line (${F().tsh(M().inputs.opex_month.insurance_licences)} a month).`]
];
const TRIPS=[
 {k:'dar',t:'Dar es Salaam ground research',sub:'Trip 1 · Months −6 to −5',days:21,dmin:10,dmax:35,ppl:2,pmax:3,
  goals:['Price survey of the top 150 product families in 30 outlets: pharmacies, supermarkets, market stalls and online sellers','Check each shortlisted brand against TMDA’s public register in IMIS','Visit and score 6–10 candidate sites, and meet landlords','40 interviews with mothers, carers, people with diabetes and diaspora families','Meet a regulatory consultant, lawyer, accountant and fit-out contractors for quotes'],
  rates:{flight:2600000,stay:100000,local:50000,assist:50000,samples:1200000}},
 {k:'ind',t:'India supplier visits',sub:'Trip 2 · Months −5 to −4',days:6,dmin:3,dmax:14,ppl:2,pmax:3,
  goals:['The founders are based in India, so domestic travel only','Visit 6–8 shortlisted manufacturers of devices, first-aid, hygiene and mother & baby lines','Collect quality certificates and registration files, and send samples for testing','Negotiate the first-order MOQ, price in USD, payment terms and lead time'],
  rates:{flight:350000,stay:70000,local:30000,assist:0,samples:1000000}},
 {k:'chn',t:'China sourcing trip',sub:'Trip 3 · around the spring fair',days:7,dmin:4,dmax:14,ppl:1,pmax:2,
  goals:['Phase 3 of the Canton Fair (Guangzhou) covers medical devices, health and rehabilitation equipment, home-care products and personal care. The spring session is typically in early May','Visit 3–4 factories in person and audit them before any order','Sample pack for TMDA registration and supplier comparison'],
  rates:{flight:1800000,stay:150000,local:60000,assist:0,samples:1200000,visa:300000}}
];
const CRIT=[
 ['Footfall and visibility','People walking or driving past every hour; the store must be seen',20],
 ['Target households nearby','Families with children, older parents and steady incomes within 3 km',15],
 ['Rent fits the model','Rent at or under the model’s monthly budget for about 180 m²',15],
 ['Clinics and hospitals nearby','Referrals both ways and health-minded footfall',10],
 ['Delivery reach','Share of Dar es Salaam reachable for same-day delivery before 15:00',10],
 ['Access and parking','Parking, daladala/BRT stops, safe entrance for older people',10],
 ['Store-build feasibility','Frontage, landlord consent, roof-edge sign, power for the screens',10],
 ['Power, water, security','Backup power, reliable water, night security',5],
 ['Regulatory fit','Zoning, and a licensed partner pharmacy within reach of the store',5]
];
function cost71(i,withMed){const s=STEPS71[i];return (s[6]&&!withMed)?0:s[4]}
function tripCost(t,days,ppl){const r=t.rates;return ppl*(r.flight+(r.visa||0))+days*ppl*r.stay*(t.k==='dar'?0.5:1)+days*r.local+days*r.assist+r.samples}

window.SECTIONS['s7-1']={
 render(s,p,pv,nx){const {c,src}=citer(K71);const md=M(),f=F(),A=md.inputs,g=A.seed.phase0_gap,base=md.get('base');
  const gap=g.research_setup_costs-g.phase0_budget;const fm=n=>(n<1e8&&Math.round(n/1e4)%10)?'TSh '+(n/1e6).toFixed(2)+'M':f.m(n);
  const lanes=[['Form the company',[[0,1.45,'Incorporate · agreement',''],[1.5,1.1,'TIN · bank','']]],
   ['Research & travel',[[0,1.35,'Dar es Salaam','g'],[1.4,0.85,'India','g'],[2.3,1.1,'China','g']]],
   ['Location & lease',[[1.4,1.6,'Score sites · sign lease','']]],
   ['Permits',[[1,1.2,'Scope regulators',''],[3,2.6,'TMDA · Pharmacy Council · TBS · licence','c']]],
   ['Fit-out & systems',[[3,2.8,'Fit-out · screens · till · kiosk','']]],
   ['People, data & money',[[4,1,'PDPC · insurance',''],[5.05,1.9,'Hire · NSSF · WCF · OSHA','c']]],
   ['Launch',[[6,0.95,'Soft opening','g'],[7,1,'Grand opening','g']]]];
  const months=['M−6','M−5','M−4','M−3','M−2','M−1','Open','M+1'];
  return secShell({s,p,pv,nx,cls:'p7',img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics store at dusk, with AFYA BASICS on the roof edge',
   h1:'Open legally, on time,',em:'with every step costed.',
   lede:'Before opening, Afya Basics needs a registered company, a tax number, permits from the health regulators, a signed lease, insured premises, employer registrations and a data-protection certificate. This section sets out the fifteen steps in order, with the owner, timing and estimated cost of each, followed by the research trips and the Phase 0 funding gap that remains open.',
   mods:[
    ['The problem it solves · six regulators, one strict order',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>A health store is not an ordinary shop.</b> Selling a blood-pressure monitor, a pregnancy test or a baby cream puts us under health and standards regulators as well as the usual company and tax rules.</li>
      <li><b>The order is fixed.</b> The general business licence cannot be issued until the sector permit is in hand, and the sector permit needs registered premises, which needs a lease ${c('lic')}. One late step holds up all the rest.</li>
      <li><b>Some steps take months.</b> Inspection-based registrations such as OSHA and fire typically take 3–6 months ${c('clyde')}. Starting late delays opening and means paying rent on an empty store.</li>
      <li><b>Mistakes are expensive.</b> Selling medicines from unregistered premises can bring a fine of up to TSh 10 million ${c('pharm')}. Non-citizens breaking the 2025 reserved-business order face at least TSh 10 million ${c('noncit')}.</li></ol></div>
     <div class="p7evg">
      <article class="evc" style="--c:#5fbf8f"><b>15 days</b><p>to apply for a TIN after starting business ${c('tin')}.</p></article>
      <article class="evc" style="--c:#f2c96b"><b>TSh 100M</b><p>expected taxable sales in 12 months that make VAT registration compulsory ${c('rsm')}.</p></article>
      <article class="evc" style="--c:#c9b8ff"><b>30 June</b><p>the date every TMDA premises business permit expires, every year ${c('tmdaprem')}.</p></article>
      <article class="evc" style="--c:#ff9b87"><b>30 days</b><p>to register with the Workers Compensation Fund after hiring the first employee ${c('rsm')}.</p></article>
      <article class="evc" style="--c:#d9b56e"><b>5 years</b><p>validity of a Personal Data Protection Commission registration certificate ${c('pdpr')}.</p></article>
      <article class="evc" style="--c:#ffb36b"><b>6 weeks</b><p>before shipment: when TMDA advises applying for a device import permit ${c('tmdaimp')}.</p></article>
     </div>`],
    ['Our answer · what we sell decides who licenses us',`
     <p class="p7lead">The product range determines the licences. Every product family is assigned to its regulator before a lease is signed. The table below is the working map, which the regulatory consultant confirms in writing during Phase 0.</p>
     <div class="p7reg">
      <div class="p7regr"><div class="what"><b>Every business</b><span>company, tax, licence, people</span></div><span class="ar" aria-hidden="true"></span><div class="who">BRELA · TRA · council<small>Company, TIN, VAT, licence</small></div><div class="rule">Incorporation and the UBO declaration ${c('brela')}, TIN within 15 days ${c('tin')}, then the Class A or B business licence once sector permits are in hand ${c('lic')}.</div></div>
      <div class="p7regr"><div class="what"><b>Medical devices</b><span>BP monitors, glucometers and strips, thermometers, mobility aids, dressings</span></div><span class="ar" aria-hidden="true"></span><div class="who">TMDA<small>Premises, product registration, import permits</small></div><div class="rule">Registered premises, a contracted superintendent, an inspection, and a permit renewed every 30 June ${c('tmdaprem')}. Products registered or notified, and imported under a permit through authorised ports ${c('tmdaimp')}.</div></div>
      <div class="p7regr"><div class="what"><b>Medicines (even over the counter)</b><span>pain relief, oral rehydration salts, iron &amp; folic acid</span></div><span class="ar" aria-hidden="true"></span><div class="who">Pharmacy Council<small>Premises + permit + pharmacist</small></div><div class="rule">Only in registered premises, with a permit and a registered pharmacist as superintendent ${c('pharm')}. <b>Decided:</b> Afya sells no medicines; a licensed partner pharmacy sells them under its own permit and pharmacist (section 4.5).</div></div>
      <div class="p7regr"><div class="what"><b>Cosmetics &amp; food products</b><span>baby lotion, skincare, supplements, baby food</span></div><span class="ar" aria-hidden="true"></span><div class="who">TBS<small>Product &amp; premise registration</small></div><div class="rule">TBS runs product and premise registration ${c('tbs')}. We confirm the exact retail scope with TBS in writing.</div></div>
      <div class="p7regr"><div class="what"><b>Personal data</b><span>members, Afya Check readings, staff</span></div><span class="ar" aria-hidden="true"></span><div class="who">PDPC<small>Data controller registration</small></div><div class="rule">Compulsory registration ${c('pdpc')}. The certificate lasts five years ${c('pdpr')}. Health readings are only collected with written consent.</div></div>
     </div>
     <div class="p7grid2" style="margin-top:16px">
      <div class="p7box"><span class="p7sub">What Afya sells</span><b style="font-family:var(--f-display)">Health essentials, no medicines</b><p>Devices, first aid, mother &amp; baby, personal care, seniors and mobility. Regulators: TMDA, TBS, PDPC. No pharmacist is needed, so the model’s staff line is unchanged.</p></div>
      <div class="p7box g"><span class="p7sub" style="color:var(--gold)">How members get medicines</span><b style="font-family:var(--f-display)">A licensed partner pharmacy</b><p>The partner pharmacy sells and dispenses under its own Pharmacy Council permit and pharmacist, on its own receipt. The sealed bag travels with the member’s box. Afya pays no pharmacist salary and takes no medicine revenue.</p></div>
     </div>
     ${p7ed({f:'interior',alt:'the store interior with Care Zones, the corner counter and the Afya Check kiosk by the glass',cap:'what an inspector will walk through',k:'Premises first · what the inspector checks',h:'The fit-out is designed <em>to pass inspection</em>.',
       body:`<p>A medical-device licence requires a site inspection. TMDA registers the <b>premises</b> and a responsible person before devices can be sold there, and the business permit lapses every 30 June ${c('tmdaprem')}. The fit-out drawings are therefore prepared to meet the inspector’s checklist as well as the customer’s needs.</p>
        <ul><li><b>Clear zones.</b> Devices, personal care and food-supplement products sit in separate Care Zones, which matches how TMDA and TBS split responsibility ${c('tbs')}.</li>
        <li><b>Controlled storage.</b> A back-of-store stock room with shelving off the floor, temperature monitoring and batch records in the store system, so any product can be traced.</li>
        <li><b>A named superintendent.</b> The store lead (preferably a physiotherapy graduate) or a contracted professional is the person in charge whose name is on the permit.</li></ul>`})}`],
    ['How it works · eight months from company to opening day',`
     <p class="p7lead">The plan runs from six months before opening (M−6) to the first month of trading. Research and the lease come first because every other step depends on them; licence applications start early because they take the longest. ${ti('Planning estimate')}</p>
     <div class="p7box" style="padding:20px"><span class="p7swipe">Swipe sideways to see all months →</span><div class="p7tlwrap"><div class="p7tlin">
      <div class="p7months"><span></span><div>${months.map(m=>`<span>${m}</span>`).join('')}</div></div>
      <div class="p7lanes">${lanes.map(l=>`<div class="p7lane"><span>${l[0]}</span><div class="p7track">${l[1].map(b=>`<i class="p7bar ${b[3]}" style="left:${b[0]/8*100}%;width:${b[1]/8*100}%" title="${esc(b[2])}">${esc(b[2])}</i>`).join('')}</div></div>`).join('')}</div>
     </div></div></div>
     <h3 class="p7h">Seed released in three tranches against milestones</h3>
     <div class="p7ms">${A.seed.milestones.map((m,i)=>{const parts=m.split(':');return `<div class="p7msc"><small>Tranche ${i+1} · ${f.pct(A.seed.tranches[i])}</small><b>${f.m(A.seed.amount*A.seed.tranches[i])}</b><p>${(t=>esc(t.charAt(0).toUpperCase()+t.slice(1)))(parts.slice(1).join(':').trim())}</p></div>`}).join('')}</div>
     <p class="note">Tranche amounts = seed ${f.m(A.seed.amount)} × split ${A.seed.tranches.map(x=>x*100+'%').join(' · ')} · ${esc(A.seed.status)}</p>`],
    ['The experience · the research and travel plan',`
     <p class="p7lead">Three trips replace planning estimates with verified prices, suppliers and sites. Each has defined outputs that go into the data room. Switch a trip off, or change its days and travellers, to see the effect on the budget. All rates are ${pe()}</p>
     <div class="p7trip" id="p7trips">${TRIPS.map(t=>`<article class="p7tc" data-k="${t.k}"><div class="p7tch"><div><small>${esc(t.sub)}</small><h4>${esc(t.t)}</h4></div><button class="p7sw" type="button" role="switch" aria-checked="true" aria-label="Include ${esc(t.t)}" data-sw="${t.k}"></button></div>
      <ul>${t.goals.map(x=>`<li>${esc(x)}${x.indexOf('Canton')>=0?' '+c('canton'):''}${x.indexOf('IMIS')>=0?' '+c('tmda'):''}</li>`).join('')}</ul>
      <label><span>Days</span><input type="range" min="${t.dmin}" max="${t.dmax}" value="${t.days}" data-d="${t.k}"><output data-od="${t.k}"></output></label>
      <label><span>Travellers</span><input type="range" min="1" max="${t.pmax}" value="${t.ppl}" data-p="${t.k}"><output data-op="${t.k}"></output></label>
      <div class="p7tct"><span>Trip budget</span><b data-tt="${t.k}">–</b></div></article>`).join('')}</div>
     <div class="p7grid4" style="margin-top:14px">
      <div class="p7box p7stat"><small>Research &amp; travel total</small><b id="p7travT">–</b><span>Live from the three trips above</span></div>
      <div class="p7box p7stat"><small>Most important output</small><b style="font-size:1.05rem;font-family:var(--f-display)">Real prices</b><span>A price and registration database that replaces every price estimate in the model</span></div>
      <div class="p7box p7stat"><small>Deliverable to investors</small><b style="font-size:1.05rem;font-family:var(--f-display)">Research report</b><span>Prices, brands, rents and interviews, with photos and receipts, in the data room</span></div>
      <div class="p7box p7stat"><small>Rule</small><b style="font-size:1.05rem;font-family:var(--f-display)">No order before audit</b><span>No supplier is paid before samples are tested and the factory is visited or audited</span></div>
     </div>
     <p class="note">Rates: flights Delhi–Dar ${tz(TRIPS[0].rates.flight)} and Delhi–Guangzhou ${tz(TRIPS[2].rates.flight)} return per person; Dar stay is a shared flat (two people per unit) · all planning estimates</p>
     ${p7ed({f:'today3',alt:'a crowded pharmacy counter in Dar es Salaam, the kind of outlet the price survey will visit',cap:'trip 1 · the Dar es Salaam price survey',r:1,k:'Trip 1 in practice',h:'Twenty-one days of <em>price and site evidence</em>.',
       body:`<p>The Dar es Salaam trip is the most important of the three because it tests the model’s two largest assumptions: what families pay today and what a street-front store costs to rent. The founders and a local research assistant visit pharmacies, ADDOs, supermarkets and market stalls across several districts, buy or price the top 150 product families, and photograph every shelf label.</p>
        <p>Each receipt and photo goes into the data room. If the survey shows that test strips or nappies sell for less than the model assumes, the basket and margin inputs are revised <b>before</b> the investor signs. The same trip shortlists six to ten candidate sites and scores them with the tool below.</p>`})}`],
    ['Tool · the 15-step setup tracker',`
     <p class="p7lead">Tap the number on each step to move it from <b>to do</b> to <b>in progress</b> to <b>done</b>. Open “Details” for the work involved and the source of each rule. Progress is saved in this browser only. Costs are ${pe()}</p>
     <div class="p7btns" id="p7phase" style="margin-bottom:12px">${['All','Form','Place','Permit','People','Money'].map((x,i)=>`<button type="button" class="p7b${i?'':' on'}" data-ph="${x}">${x}</button>`).join('')}<button type="button" class="p7b" id="p7med" aria-pressed="false" hidden>Medicines</button></div>
     <div class="p7trk"><div class="p7steps" id="p7steps">${STEPS71.map((st,i)=>`<div class="p7st" data-i="${i}" data-ph="${st[0]}"><div class="p7sth"><button class="p7stbtn" type="button" data-i="${i}" aria-label="Change status of step ${i+1}">${i+1}</button><div class="p7stt"><b>${esc(st[1])}${st[6]?' '+ti('Option B only'):''}</b><span>${esc(st[2])} · ${st[3]} · ${st[0]}</span></div><div class="p7stc"><small>${st[5]}</small><span data-cost="${i}">${tz(st[4])}</span></div></div><details><summary>Details and sources</summary><div class="p7std">${st[7](c)}<dl><dt>Who</dt><dd>${esc(st[2])}</dd><dt>When</dt><dd>${st[3]} (months before opening)</dd><dt>Funded by</dt><dd>${st[5]}</dd></dl></div></details></div>`).join('')}</div>
      <aside class="p7side">
       <div class="p7box p7ring"><svg viewBox="0 0 120 120" width="150" height="150" aria-hidden="true"><circle cx="60" cy="60" r="50" fill="none" stroke="rgba(95,191,143,.12)" stroke-width="10"/><circle id="p7ringc" cx="60" cy="60" r="50" fill="none" stroke="url(#p7rg)" stroke-width="10" stroke-linecap="round" stroke-dasharray="314.16" stroke-dashoffset="314.16" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset .5s"/><defs><linearGradient id="p7rg"><stop offset="0" stop-color="#5fbf8f"/><stop offset="1" stop-color="#f2c96b"/></linearGradient></defs></svg><b id="p7ringt">0/15<small>steps done</small></b></div>
       <div class="p7box p7stat"><small>Setup cost, all steps</small><b id="p7setT">–</b><span id="p7setS">–</span></div>
       <div class="p7box p7stat"><small>Spent so far (done steps)</small><b id="p7setD">–</b><span>Remaining <span id="p7setR">–</span></span></div>
       <button type="button" class="p7b" id="p7reset">Reset tracker</button>
      </aside></div>`,'p7-tracker'],
    ['Tool · location scoring',`
     <p class="p7lead">The location is <b>not yet chosen</b>. This tool sets out <b>how</b> it will be chosen. Compare up to three candidate sites (no real addresses yet) and score each criterion from 1 (poor) to 5 (excellent). A score of 1 on any criterion is flagged as a possible deal-breaker. The weights reflect a store that depends on footfall, free checks and same-day delivery.</p>
     ${p7ed({f:'rider',alt:'an Afya rider on an electric motorbike with a closed insulated box on a Dar es Salaam street',cap:'delivery reach is a site criterion',k:'Why the site is scored',h:'The site must serve walkers, drivers <em>and riders</em>.',
       body:`<p>The store has three jobs: be visible, since the frontage is the main advertisement; be easy to reach, with parking, daladala and BRT stops and a safe entrance for older people; and be a workable base for same-day delivery before the 15:00 cut-off. A quiet side street fails the first test; a busy junction with poor road access fails the third.</p>
        <p>Rent must also fit the model: <b>${f.m(A.opex_month.rent)} a month</b> for the ${ISL()?'start-small store on a secondary street':'flagship'}. Any criterion scored 1 is treated as a deal-breaker, whatever the total.</p>`})}
     <div class="p7loc"><div class="p7box">
       <div class="p7btns" id="p7sites">${['Site A','Site B','Site C'].map((x,i)=>`<button type="button" class="p7b${i?'':' on'}" data-s="${i}">${x}</button>`).join('')}</div>
       <div class="p7crit" id="p7crit">${CRIT.map((k,i)=>`<div class="p7cr"><div><b>${esc(k[0])}</b><small>${esc(k[1])}${i===2?` (model: ${tz(A.opex_month.rent)}/month, about ${tz(A.opex_month.rent/A.store.area_m2)} per m²)`:''}</small></div><span class="wt">${k[2]}%</span><div class="p7dots" data-c="${i}">${[1,2,3,4,5].map(v=>`<button type="button" data-v="${v}" aria-label="${esc(k[0])}: ${v} of 5">${v}</button>`).join('')}</div></div>`).join('')}</div></div>
      <div class="p7box g p7res"><span class="p7sub" style="color:var(--gold)">Weighted score out of 100</span><div id="p7scores"></div><div id="p7verdict" class="p7optout" style="margin-top:4px"></div><p class="p7note2">Example scores only. Real scores come from site visits during the Dar es Salaam trip, with photos and footfall counts at three times of day.</p></div></div>`,'p7-location'],
    ['The numbers · the open Phase 0 gap',`
     <p class="p7lead">One funding item is unresolved. Research, travel and setup are estimated at <b>${f.m(g.research_setup_costs)}</b>, against a Phase 0 budget of <b>${fm(g.phase0_budget)}</b>. The ${ISL()?'start-small':'flagship'} seed (${f.m(A.seed.amount)}) does not cover these costs: it funds the store build, lease advance, stock, launch, losses to break-even and a reserve. The gap below is measured against that seed.</p>
     <div class="p7box p7gap">
      <div class="p7gbar"><span>Phase 0 budget (model)</span><i><em style="width:${g.phase0_budget/g.research_setup_costs*100}%;background:var(--neon)"></em></i><b>${fm(g.phase0_budget)}</b></div>
      <div class="p7gbar"><span>Needed (model estimate)</span><i><em style="width:100%;background:linear-gradient(90deg,var(--neon) ${g.phase0_budget/g.research_setup_costs*100}%,#ff8f7d ${g.phase0_budget/g.research_setup_costs*100}%)"></em></i><b>${f.m(g.research_setup_costs)}</b></div>
      <div class="p7gbar"><span>Itemised on this page</span><i><em id="p7itemBar" style="width:0;background:linear-gradient(90deg,var(--gold2),var(--gold))"></em></i><b id="p7itemT">–</b></div>
      <div class="p7grid4" style="margin-top:4px">
       <div class="p7stat"><small>Gap</small><b style="color:#ff8f7d">${fm(gap)}</b><span>needed minus budget</span></div>
       <div class="p7stat"><small>Gap vs seed</small><b>${f.pct(gap/A.seed.amount)}</b><span>of the ${f.m(A.seed.amount)} ask</span></div>
       <div class="p7stat"><small>Itemised vs model</small><b id="p7itemD">–</b><span>difference, to be settled with quotations</span></div>
       <div class="p7stat"><small>Status</small><b style="font-size:1rem;font-family:var(--f-display);color:var(--gold2)">Open question</b><span>${esc(g.note)}</span></div>
      </div></div>
     <h3 class="p7h">Three ways to close the gap</h3>
     <div class="p7opt" id="p7opt">
      <button type="button" class="on" data-o="0"><b>1 · Grow the seed round</b><span>Add the gap to the ask.</span></button>
      <button type="button" data-o="1"><b>2 · Founders pre-fund Phase 0</b><span>Founders pay, credited later.</span></button>
      <button type="button" data-o="2"><b>3 · Lean Phase 0</b><span>Cut the China trip and shorten the other trips.</span></button></div>
     <div class="p7optout" id="p7optout"></div>
     <p class="note">Illustrative ownership effect uses the model’s seed share (${f.pct(A.ownership.seed_investor_share)} for ${f.m(A.seed.amount)}) held at the same pre-money value · ${esc(A.ownership.note)}</p>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">A sector permit is slower than planned and the store pays rent while empty.</span><span class="ar">→</span><span class="a">Scoping starts at M−5, a consultant files early, and rent-free fit-out months are negotiated into the lease. Tranche 2 (stock) is released only when the licences are in hand, so investor money is not tied up in idle goods.</span></div>
      <div class="risk"><span class="q">A shortlisted brand turns out not to be registered with TMDA.</span><span class="ar">→</span><span class="a">Every brand is checked against TMDA’s public register before ordering, with 4–5 brands per item. Losing one brand never empties a shelf.</span></div>
      <div class="risk"><span class="q">The reserved-business order is read against a foreign investor.</span><span class="ar">→</span><span class="a">A written legal opinion before closing, covering the specialised-outlet exclusion and the share structure. The company is Tanzanian-founded and led.</span></div>
      <div class="risk"><span class="q">The Phase 0 gap is never formally closed.</span><span class="ar">→</span><span class="a">It is an open question to settle before the term sheet. Every Phase 0 payment is recorded with a receipt in the data room, whoever pays it.</span></div>
      <div class="risk"><span class="q">The chosen site’s rent is above the model budget.</span><span class="ar">→</span><span class="a">Rent is 15% of the score and a deal-breaker at 1. A site that breaks the rent budget is rejected.</span></div>
     </div>`]
   ],
   takeaway:`The business is designed to be <b>fully licensed on opening day</b>. Fifteen steps are sequenced and costed, each research trip has defined outputs, and tranche 2 is released only when the <b>licences are issued</b>.`,
   doors:['s4-5','s6-3','s7-3','s4-2'],sources:src})},
 init(){const A=M().inputs,g=A.seed.phase0_gap;
  let st=store('steps')||STEPS71.map(()=>0);if(st.length!==STEPS71.length)st=STEPS71.map(()=>0);
  let med=false;let filt='All';
  const trip={};TRIPS.forEach(t=>trip[t.k]=Object.assign({on:true,days:t.days,ppl:t.ppl},(store('trip')||{})[t.k]||{}));
  const setupTot=()=>STEPS71.reduce((a,_,i)=>a+cost71(i,med),0);
  const travTot=()=>TRIPS.reduce((a,t)=>a+(trip[t.k].on?tripCost(t,trip[t.k].days,trip[t.k].ppl):0),0);
  const paint=()=>{
   document.querySelectorAll('#p7steps .p7st').forEach(el=>{const i=+el.dataset.i;el.classList.toggle('done',st[i]===2);el.classList.toggle('prog',st[i]===1);
    el.querySelector('.p7stbtn').textContent=st[i]===2?'✓':(i+1);el.querySelector('.p7stbtn').setAttribute('aria-label',`Step ${i+1}: ${['to do','in progress','done'][st[i]]}. Tap to change.`);
    el.style.display=(filt==='All'||el.dataset.ph===filt)?'':'none';
    const cc=el.querySelector('[data-cost]');cc.textContent=(STEPS71[i][6]&&!med)?'not in plan':tz(STEPS71[i][4])});
   const done=st.filter(x=>x===2).length;$('p7ringt').innerHTML=`${done}/15<small>steps done</small>`;$('p7ringc').style.strokeDashoffset=314.16*(1-done/15);
   const T=setupTot(),D=STEPS71.reduce((a,_,i)=>a+(st[i]===2?cost71(i,med):0),0);
   $('p7setT').textContent=F().m(T);$('p7setS').textContent=`Phase 0 steps ${tz(STEPS71.reduce((a,s,i)=>a+(s[5]==='Phase 0'?cost71(i,med):0),0))} · seed-time steps ${tz(STEPS71.reduce((a,s,i)=>a+(s[5]!=='Phase 0'?cost71(i,med):0),0))}`;
   $('p7setD').textContent=F().m(D);$('p7setR').textContent=tz(T-D);
   $('p7med').classList.toggle('on',med);$('p7med').setAttribute('aria-pressed',String(med));
   TRIPS.forEach(t=>{const o=trip[t.k];const card=document.querySelector(`.p7tc[data-k="${t.k}"]`);card.classList.toggle('off',!o.on);
    card.querySelector('[data-sw]').setAttribute('aria-checked',String(o.on));card.querySelector('[data-d]').value=o.days;card.querySelector('[data-p]').value=o.ppl;
    card.querySelector('[data-od]').textContent=o.days+' d';card.querySelector('[data-op]').textContent=o.ppl;
    card.querySelector('[data-tt]').textContent=o.on?F().m(tripCost(t,o.days,o.ppl)):'off'});
   const TT=travTot();$('p7travT').textContent=F().m(TT);
   const item=T+TT;$('p7itemT').textContent=F().m(item);$('p7itemBar').style.width=Math.min(100,item/g.research_setup_costs*100)+'%';
   const dif=item-g.research_setup_costs;$('p7itemD').textContent=(dif>=0?'+':'−')+F().m(Math.abs(dif));
   paintOpt(item)};
  let opt=0;
  const paintOpt=(item)=>{const sh=A.ownership.seed_investor_share,seed=A.seed.amount,pre=seed/sh-seed,gap=g.research_setup_costs-g.phase0_budget;let h='';
   if(opt===0){const ns=seed+gap,share=ns/(pre+ns);h=`The seed becomes <b>${F().m(ns)}</b> (${F().m(seed)} + ${F().m(gap)}). At the same pre-money value (${F().m(pre)}, implied by ${F().pct(sh)} for ${F().m(seed)}), the investor would hold about <b>${(share*100).toFixed(1)}%</b> instead of ${F().pct(sh)}. Founders and option pool shrink to match, and the founders’ 25% floor is still respected. <b>Trade-off:</b> a larger ask, but everything is funded in one round. ${ti('Illustrative')}`}
   else if(opt===1){h=`The founders pay about <b>${F().m(gap)}</b> before the round, as a documented founder loan or as share capital. The seed stays at <b>${F().m(seed)}</b>. <b>Trade-off:</b> no extra dilution for anyone, but it depends on the founders’ own cash, and the treatment (repaid, or converted at the seed price) must be written into the shareholders’ agreement. ${ti('Illustrative')}`}
   else {const lean=item-(trip.chn.on?tripCost(TRIPS[2],trip.chn.days,trip.chn.ppl):0)-0-(trip.dar.on?tripCost(TRIPS[0],trip.dar.days,trip.dar.ppl)-tripCost(TRIPS[0],12,1):0);
    h=`Drop the China trip (use video audits, sample orders and an inspection agent), and send one founder to Dar es Salaam for 12 days. The itemised cost falls to about <b>${F().m(lean)}</b>, a gap of <b>${F().m(Math.max(0,lean-g.phase0_budget))}</b> over the ${F().m(g.phase0_budget)} budget. <b>Trade-off:</b> cheaper, but supplier risk rises (section 7.3) and the research is thinner. ${ti('Planning estimate')}`}
   $('p7optout').innerHTML=h;document.querySelectorAll('#p7opt button').forEach(b=>b.classList.toggle('on',+b.dataset.o===opt))};
  document.querySelectorAll('#p7opt button').forEach(b=>b.onclick=()=>{opt=+b.dataset.o;paint()});
  document.querySelectorAll('.p7stbtn').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;st[i]=(st[i]+1)%3;store('steps',st);paint()});
  document.querySelectorAll('#p7phase [data-ph]').forEach(b=>b.onclick=()=>{filt=b.dataset.ph;document.querySelectorAll('#p7phase [data-ph]').forEach(x=>x.classList.toggle('on',x===b));paint()});
  
  $('p7reset').onclick=()=>{st=STEPS71.map(()=>0);store('steps',st);paint()};
  const saveTrip=()=>store('trip',trip);
  document.querySelectorAll('[data-sw]').forEach(b=>b.onclick=()=>{trip[b.dataset.sw].on=!trip[b.dataset.sw].on;saveTrip();paint()});
  document.querySelectorAll('.p7tc input[data-d]').forEach(r=>r.oninput=()=>{trip[r.dataset.d].days=+r.value;saveTrip();paint()});
  document.querySelectorAll('.p7tc input[data-p]').forEach(r=>r.oninput=()=>{trip[r.dataset.p].ppl=+r.value;saveTrip();paint()});
  paint();
  /* location scoring */
  const ex=[[5,4,2,4,4,3,4,3,4],[3,4,4,3,3,4,3,4,4],[4,3,5,2,3,2,1,3,4]];let sc=store('loc')||ex;let site=0;
  const tot=k=>CRIT.reduce((a,cr,i)=>a+sc[k][i]/5*cr[2],0);
  const pl=()=>{document.querySelectorAll('#p7crit .p7dots').forEach(d=>{const ci=+d.dataset.c;d.querySelectorAll('button').forEach(b=>{const v=+b.dataset.v;b.classList.toggle('on',v<=sc[site][ci]&&sc[site][ci]>1);b.classList.toggle('lo',sc[site][ci]===1&&v===1);b.setAttribute('aria-pressed',String(v===sc[site][ci]))})});
   document.querySelectorAll('#p7sites button').forEach(b=>b.classList.toggle('on',+b.dataset.s===site));
   const ts=[0,1,2].map(tot);const best=ts.indexOf(Math.max(...ts));
   $('p7scores').innerHTML=ts.map((t,k)=>`<div class="p7sbar"><span>Site ${'ABC'[k]}</span><i><em style="width:${t}%"></em></i><b>${t.toFixed(0)}</b></div>`).join('');
   const flags=[0,1,2].map(k=>CRIT.filter((_,i)=>sc[k][i]===1).map(cr=>cr[0]));
   $('p7verdict').innerHTML=`<b>Site ${'ABC'[best]}</b> leads with ${ts[best].toFixed(0)}/100.`+[0,1,2].map(k=>flags[k].length?` <br><span class="p7bad">Site ${'ABC'[k]}: deal-breaker check on ${flags[k].map(esc).join(', ')}.</span>`:'').join('')+(flags[best].length?' <br>The leader has a red flag, so the founders must resolve it before negotiating.':' <br>Next step: a footfall count, a landlord meeting and lawyer review of the draft lease.')};
  document.querySelectorAll('#p7sites button').forEach(b=>b.onclick=()=>{site=+b.dataset.s;pl()});
  document.querySelectorAll('#p7crit .p7dots button').forEach(b=>b.onclick=()=>{const ci=+b.parentNode.dataset.c;sc[site][ci]=+b.dataset.v;store('loc',sc);pl()});
  pl();
 }
};

/* ==========================================================================
   7.2 GOVERNANCE AND REPORTING
   ========================================================================== */
const K72=['brela','clyde','pdpc','pdpr','tmdaprem','rsm','tin','noncit'];
const SEATS=[
 {k:'f1',n:'Founder director',who:'Fahmy Abbas Cothema',c:'#5fbf8f',vote:true,role:['Sets strategy, sourcing and the investor relationship','Signs off the monthly investor pack','Holds founder-reserved rights linked to the 25% floor (legal review)']},
 {k:'f2',n:'Founder director',who:'Cecilia',c:'#5fbf8f',vote:true,role:['Leads customers, members and the store standard (to be confirmed between the founders)','Co-approves spending between the founders’ thresholds','Chairs the monthly operations review with the store lead']},
 {k:'inv',n:'Investor director',who:'Seed investor’s nominee',c:'#f2c96b',vote:true,role:['One seat for the seed investor','Must consent to the reserved matters (right-hand list)','Receives the full investor pack, bank statements and board papers']},
 {k:'ind',n:'Independent adviser',who:'To be appointed (health retail or finance)',c:'#c9b8ff',vote:true,role:['A seat for a pharmacist, retail-health operator or chartered accountant with no stake in either side','Proposed chair of the board, which balances founders and investor','Leads the audit and risk review each quarter']},
 {k:'sec',n:'Company secretary & accountant',who:'Outside firm (attends, no vote)',c:'#d9b56e',vote:false,role:['Minutes, statutory filings and annual returns with BRELA','Monthly management accounts and tax calendar','Prepares the numbers in the monthly pack from the one system']}
];
const RESERVED=[['New shares or options','Any issue that changes ownership'],['Debt above TSh 20M','Loans, overdrafts, guarantees'],['Annual budget & plan','Approved before each financial year'],['New store or city','Each new store costs '+'MODEL'],['Sale, merger or listing','Any change of control'],['Related-party deals','Any contract with a founder or a founder’s family'],['Founders’ pay changes','Salaries and bonuses of directors'],['Change of business','Leaving health essentials, or a new country']];
/* delegation of authority — proposal */
const ROLES=['Store lead','One founder','Both founders','Board','Investor consent'];
const DOA=[
 // [decision, thresholds per role as max TSh approve, or code]  levels: A approve, R recommend, C consent, I informed
 ['Day-to-day purchases & petty cash',[[300000,'A'],[2000000,'A'],[10000000,'A'],[0,'I'],[0,'I']],'Within the monthly budget'],
 ['Stock reorders (system-drafted POs)',[[1500000,'A'],[8000000,'A'],[25000000,'A'],[0,'I'],[0,'I']],'Only from approved suppliers at approved cost'],
 ['New supplier or new brand',[[0,'R'],[0,'R'],[1,'A'],[0,'I'],[0,'I']],'Needs TMDA/TBS registration evidence on file'],
 ['Price changes',[[0,'R'],[0,'R'],[1,'A'],[0,'I'],[0,'I']],'One price in store, app and WhatsApp'],
 ['Hiring & pay within budget',[[0,'R'],[1,'A'],[0,'I'],[0,'I'],[0,'I']],'Store lead recommends advisers, riders and packers'],
 ['Capital spend outside budget',[[0,'—'],[0,'R'],[5000000,'A'],[50000000,'A'],[1,'C']],'Above TSh 50M or any new store needs investor consent'],
 ['Contracts & leases',[[0,'—'],[0,'R'],[10000000,'A'],[1,'A'],[1,'C']],'Above TSh 10M over the term, and all leases, go to the board; leases over 3 years need investor consent'],
 ['Borrowing',[[0,'—'],[0,'—'],[0,'R'],[20000000,'A'],[1,'C']],'Above TSh 20M is a reserved matter'],
 ['Issue shares / options',[[0,'—'],[0,'—'],[0,'R'],[0,'R'],[1,'C']],'Always investor consent, and protects the founders’ 25% floor'],
 ['Annual budget & business plan',[[0,'—'],[0,'R'],[0,'R'],[1,'A'],[1,'C']],'Adopted before each financial year']
];
const DOA_TYPES=[['Purchase within budget',[[300000,'Store lead'],[2000000,'One founder'],[10000000,'Both founders'],[Infinity,'Board']]],
 ['Stock reorder (approved supplier)',[[1500000,'Store lead'],[8000000,'One founder'],[25000000,'Both founders'],[Infinity,'Board']]],
 ['Capital spend outside budget',[[5000000,'Both founders'],[50000000,'Board'],[Infinity,'Board + investor consent']]],
 ['Borrowing / loan',[[20000000,'Board'],[Infinity,'Board + investor consent']]],
 ['Contract or lease (value over term)',[[10000000,'Both founders'],[Infinity,'Board']]]];
const ACC_ROLES=['Founders','Store lead','Health adviser','Picker & rider','Accountant','Investor'];
const ACC=[ // data, per role level
 ['Sales, stock & daily dashboard',['full','full','read','none','read','agg']],
 ['Member names, phones & addresses',['full','full','own','own','none','none']],
 ['Afya Check readings (health data)',['agg','agg','own','none','none','none']],
 ['Payroll & staff records',['full','own','own','own','full','none']],
 ['Bank, mobile-money & cash-up',['full','read','none','none','full','read']],
 ['Board papers & investor pack',['full','none','none','none','read','full']],
 ['Prices, suppliers & landed cost',['full','read','none','none','read','agg']],
 ['System settings & user rights',['full','none','none','none','none','none']]];
const ACC_L={full:'Full',read:'Read',own:'Own records',agg:'Totals only',none:'No access'};

window.SECTIONS['s7-2']={
 render(s,p,pv,nx){const {c,src}=citer(K72);const md=M(),f=F(),A=md.inputs,base=md.get('base');
  RESERVED[3][1]='Each new store is budgeted at '+f.m(A.growth.new_store_capex);
  const cx=210,cy=222,R=168;const pos=SEATS.map((st,i)=>{const a=Math.PI*(1+i/(SEATS.length-1));return [cx+R*Math.cos(a),cy+R*Math.sin(a)*0.9]});
  const svg=`<span class="p7sub">The proposed board · five seats, four votes</span>
   <div class="p7-seats" role="list" aria-label="Proposed board seats">${SEATS.map((st,i)=>`<button type="button" role="listitem" class="p7seat p7-seatr${i===0?' on':''}" data-i="${i}" style="--c:${st.c}"><span class="n">0${i+1}</span><span class="t"><b>${esc(st.n)}</b><small>${esc(st.who)}</small></span><span class="v${st.vote?'':' nv'}">${st.vote?'1 vote':'No vote'}</span></button>`).join('')}</div>
   <div class="p7-tally" aria-label="Four votes: two founders, one investor, one independent chair"><i style="flex:2;background:#5fbf8f"></i><i style="flex:1;background:#f2c96b"></i><i style="flex:1;background:#c9b8ff"></i></div>
   <div class="p7-tallyl"><span>Founders · 2</span><span>Investor · 1</span><span>Independent chair · 1</span><span>Quorum 3, investor included</span></div>`;
  const lvl=x=>({A:'Approve',R:'Recommend',C:'Consent',I:'Informed','—':'—'}[x]);
  const doaRows=DOA.map(r=>`<tr><td data-l="Decision"><b>${esc(r[0])}</b><br><span style="font-size:.78rem">${esc(r[2])}</span></td>${r[1].map((v,i)=>`<td class="lv ${v[1]==='—'?'I':v[1]}" data-l="${ROLES[i]}"><span>${lvl(v[1])}${v[1]==='A'&&v[0]>1?' ≤ '+f.auto(v[0]).replace('TSh ',''):''}</span></td>`).join('')}</tr>`).join('');
  const m12=base.months[11];const m150=base.months.findIndex(x=>x.members>=100)+1,m150d=md.get('down').months.findIndex(x=>x.members>=100)+1;
  return secShell({s,p,pv,nx,cls:'p7',img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior with the corner counter under digital menu screens',
   h1:'Clear authority, monthly reporting,',em:'full visibility for investors.',
   lede:'This section proposes the board, the spending limits, the monthly investor pack, the nightly 21:00 report and the data-access rules. Together they show who decides what, how money is approved and how performance is reported. All of it is to be adopted in the shareholders’ agreement after legal review.',
   mods:[
    ['The problem it solves · trust needs structure',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Small companies often rely on informal trust.</b> When one person can spend, sign and report, errors and disputes go unseen until they are large. Investors price that risk in.</li>
      <li><b>The founders manage partly from India.</b> Remote management works only if approvals, cash and performance are visible without being in the store.</li>
      <li><b>Health data raises the stakes.</b> Members’ names, addresses and Afya Check readings are personal data, and a company that holds them must register with the Personal Data Protection Commission ${c('pdpc')}. Not every employee should see everything.</li>
      <li><b>Licences expire.</b> TMDA business permits lapse every 30 June ${c('tmdaprem')}, and a company must keep its BRELA records current ${c('brela')}. A missed date can close the store, so the compliance calendar is part of governance.</li></ol></div>`],
    ['Our answer · a small board with balanced seats',`
     <p class="p7lead">A four-vote board meets quarterly: two founder directors, one investor director and an independent adviser as chair. A company secretary and accountant attend without a vote. Tap a seat to see its role. The design is balanced: the founders cannot outvote the investor on matters that protect its capital, and the investor cannot run the company from the board. ${ti('Proposal')}</p>
     <div class="p7board"><div class="p7box">${svg}</div>
      <div class="p7-bright"><div class="p7box p7seatinfo" id="p7seat"></div>${p7pho('team','Afya Basics health advisers in royal green uniforms at the corner counter','the people the board answers for')}</div></div>
     <h3 class="p7h">Reserved matters · the investor must consent</h3>
     <div class="p7res2">${RESERVED.map(r=>`<div><b>${esc(r[0])}</b>${esc(r[1])}</div>`).join('')}</div>
     <p class="p7note2">The founders hold two of the four votes, consistent with their 25% floor for life, and the investor holds a veto on matters that could impair its capital. The independent chair breaks deadlocks on ordinary business. If a foreign investor joins, the share structure is reviewed against the 2025 reserved-business order ${c('noncit')}.</p>`],
    ['How it works · who can approve what, up to how much',`
     <p class="p7lead">A delegation-of-authority matrix lets the store operate without founder sign-off on routine spending, while large or unusual decisions are escalated. The amounts are a proposal sized against the model: monthly running costs are <b>${f.m(base.opex_month)}</b> and a new store is <b>${f.m(A.growth.new_store_capex)}</b>. ${ti('Proposal')}</p>
     <div class="p7tblw"><table class="p7tbl p7doa p7cards"><thead><tr><th>Decision</th>${ROLES.map(r=>`<th>${r}</th>`).join('')}</tr></thead><tbody>${doaRows}</tbody></table></div>
     <div class="p7router"><div class="p7box"><span class="p7sub">Approval finder</span>
       <label style="display:block;font-size:.84rem;color:var(--ink2)">Decision type<select id="p7dt" style="margin-top:6px">${DOA_TYPES.map((d,i)=>`<option value="${i}">${esc(d[0])}</option>`).join('')}</select></label>
       <label style="display:block;margin-top:14px;font-size:.84rem;color:var(--ink2)">Amount: <b id="p7amtO" style="font-family:var(--f-hud);color:var(--gold2)"></b><input type="range" id="p7amt" min="0" max="100" value="38" style="margin-top:8px"></label></div>
      <div class="p7box g"><span class="p7sub" style="color:var(--gold)">Approval path</span><div class="p7chain" id="p7chain"></div><p id="p7chainT" style="margin-top:12px"></p></div></div>`],
    ['The experience · the monthly investor pack',`
     <p class="p7lead">By the 10th of each month the investor receives a one-page report generated from the store system and organised in three layers: <b>Experience</b> (repeat demand), <b>Engine</b> (operating simplicity) and <b>Economics</b> (profitability). This mock-up shows the planned figures from the master model. Move the month and switch the scenario. ${ti('Mock-up · planning estimates')}</p>
     <div class="p7pack" id="p7pack">
      <div class="p7packh"><div><b>Afya Basics · Investor pack</b><br><span id="p7packM">Month 12 · Base</span></div>
       <div class="p7packc"><span style="display:flex;gap:6px" id="p7sc">${md.scenarios.map((k,i)=>`<button type="button" data-k="${k}" class="${i?'':'on'}">${A.scenarios[k].label}</button>`).join('')}</span><input type="range" id="p7mon" min="1" max="12" value="12" aria-label="Month"><output id="p7monO">M12</output></div></div>
      <div class="p7lay" id="p7lay"></div>
      <div class="p7spark"><div style="display:flex;justify-content:space-between;font:600 .74rem var(--f-body);color:#40574d"><span>Monthly revenue and profit, year 1 (model)</span><span id="p7sparkL" style="font-family:var(--f-hud)"></span></div><div id="p7sparkS"></div></div>
     </div>
     <p class="note">KPIs marked “target” are framework speed targets, measured by the system once trading. All other figures are model planning estimates, not results.</p>`],
    ['The experience · the daily 21:00 report',`
     <div class="p7rep"><div class="p7ph" aria-label="Mock-up of the daily WhatsApp report"><div class="p7phs">
       <div class="p7phh"><i><svg viewBox="0 0 48 48" width="22" height="22"><path d="M20 9h8v11h11v8H28v11h-8V28H9v-8h11z" fill="#0f7a52"/></svg></i><div><b>Afya Basics · Daily report</b><small>automated · founders &amp; board</small></div></div>
       <div class="p7msg" id="p7msg"></div></div></div>
      <div><p class="p7lead">Every night at 21:00, after closing and the two-person cash-up, the system sends the founders a WhatsApp summary of sales, checks, new members, stock risks and issues. It is generated automatically from the till records, not written by hand.</p>
       <div class="p7btns" id="p7day">${[1,3,6,9,12].map((m,i)=>`<button type="button" class="p7b${i===4?' on':''}" data-m="${m}">A day in month ${m}</button>`).join('')}</div>
       <p class="p7note2">The day’s figures are 1/30 of the model’s month (base case), so they show a typical planned day. ${ti('Illustrative')}. Stock alerts and issue lines are examples of what the system flags.</p>
       <div class="p7grid2" style="margin-top:14px"><div class="p7box"><span class="p7sub">Weekly</span><p style="margin:0">Monday 09:00: one-page week summary plus the open-issues list to both founders and the store lead.</p></div><div class="p7box"><span class="p7sub">Alerts, instantly</span><p style="margin:0">A cash-up mismatch, a payment failure, a licence due within 60 days, a referral flag not followed up, or a stock-out on a top item.</p></div></div></div></div>
     ${p7ed({f:'exterior',alt:'the Afya Basics store lit at dusk',cap:'21:00 · the store closes, the report goes out',r:1,k:'Why 21:00',h:'Store closes, <em>the daily report goes out</em>.',
       body:`<p>The flagship trades ${esc(A.store.hours)}. At closing, the two-person cash-up reconciles the till, mobile-money statements and cash in the drawer. Minutes later the founders, and the board in summary, receive the day’s figures on WhatsApp, whether they are in Dar es Salaam, in India or visiting a supplier.</p>
        <p>Because the report is generated by the system, it cannot be edited before it is sent. A cash-up mismatch, a stock-out on a top item or a licence date within 60 days appears as a red line automatically. More than 360 daily reports a year underpin the figures in the monthly investor pack.</p>`})}`],
    ['How it works · the meeting and compliance calendar',`
     <p class="p7lead">Twelve months of governance on one strip, counted from opening (M1). Licence and tax items follow the dates in the cited rules. Board and pack dates are a proposal.</p>
     <div class="p7cal" id="p7cal"></div>
     <div class="p7legend"><span style="--c:#5fbf8f"><i></i>Monthly investor pack</span><span style="--c:#f2c96b"><i></i>Board meeting</span><span style="--c:#c9b8ff"><i></i>Licence &amp; compliance</span><span style="--c:#d9b56e"><i></i>Tax &amp; accounts</span><span style="--c:#ff9b87"><i></i>Milestone</span></div>
     <p class="p7note2">Fixed dates from the rules: TMDA business permits expire on 30 June every year ${c('tmdaprem')}. OSHA issues a yearly compliance licence ${c('rsm')}. The PDPC certificate is renewed every five years, up to three months before expiry ${c('pdpr')}. A tax clearance certificate is needed to renew the business licence ${c('rsm')}. The month that holds 30 June depends on the opening date, shown here as M8 for illustration.</p>
     <div class="p7optout"><b>Tranche 3 timing:</b> the store must be open 3 months, <b>and</b> have 100 Afya Box members, <b>and</b> run a monthly loss below TSh 16M. The base model reaches 100 members in <b>month ${m150}</b> (downside: month ${m150d}). The cash plan assumes tranche 3 is released no earlier than month ${Math.max(3,m150)}.</div>`],
    ['How it works · access levels',`
     <p class="p7lead">All staff work in one system, but each role sees only the data its job requires. Health readings are the most protected: an adviser sees a member’s reading only while serving that member, and founders see totals, not names. Tap a role to highlight its access. ${ti('Proposal')}</p>
     <div class="p7btns" id="p7accR" style="margin-bottom:12px">${ACC_ROLES.map((r,i)=>`<button type="button" class="p7b" data-r="${i}">${r}</button>`).join('')}</div>
     <div class="p7tblw"><table class="p7tbl p7acc p7cards" id="p7acc"><thead><tr><th>Data</th>${ACC_ROLES.map((r,i)=>`<th data-r="${i}">${r}</th>`).join('')}</tr></thead><tbody>${ACC.map(a=>`<tr><td data-l="Data"><b>${esc(a[0])}</b></td>${a[1].map((l,i)=>`<td class="lv ${l}" data-r="${i}" data-l="${ACC_ROLES[i]}">${ACC_L[l]}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
     <p class="p7note2">Every view of a health reading is logged. Access is removed on the day someone leaves. Two-factor sign-in is required for founders, the accountant and the investor. These are the safeguards the PDPC registration describes ${c('pdpc')}.</p>`],
    ['The numbers · what governance reports, live from the model',`
     <div class="nums">
      <div class="num g"><b>${f.m(base.y1.revenue)}</b><span>Year 1 revenue, base case ${pe()}</span></div>
      <div class="num"><b>M${base.breakeven_month}</b><span>first month with a store profit (base). Best M${md.get('best').breakeven_month}, downside ${md.get('down').breakeven_month?'M'+md.get('down').breakeven_month:'not within year 1'}</span></div>
      <div class="num"><b>${nf(m12.members)}</b><span>Afya Box members by month 12 (base)</span></div>
      <div class="num"><b>${f.m(base.opex_month)}</b><span>running costs per month, the yardstick for the spending limits</span></div>
      <div class="num g"><b>${A.seed.tranches.map(t=>f.m(A.seed.amount*t).replace('TSh ','')).join(' · ')}</b><span>tranches (TSh) released only against milestones reported in the pack</span></div>
     </div>
     <p class="p7note2">Cost of governance, ${pe()}: the independent adviser’s sitting fee and the outside accountant are not yet separate lines in the model. They are expected to sit within the ${f.m(A.growth.ho_fixed_year)} head-office budget from year 2.</p>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">Founders and investor deadlock on a big decision.</span><span class="ar">→</span><span class="a">An independent chair, written reserved matters and a deadlock clause (mediation, then an agreed expert) in the shareholders’ agreement.</span></div>
      <div class="risk"><span class="q">Limits are ignored in a busy week.</span><span class="ar">→</span><span class="a">The limits are built into the system. A purchase order above the role’s limit cannot be released, and every override is shown in the next investor pack.</span></div>
      <div class="risk"><span class="q">Reports are favourable because the founders prepare them.</span><span class="ar">→</span><span class="a">The pack is generated from the till, stock and bank records, the accountant reconciles it, and the investor has read access to the totals at any time.</span></div>
      <div class="risk"><span class="q">Too much process slows a small store team.</span><span class="ar">→</span><span class="a">Daily decisions sit with the store lead. Only large or unusual items are escalated, and routine approvals take a single tap on the handheld.</span></div>
     </div>`]
   ],
   takeaway:`The investor receives a <b>board seat, a veto on reserved matters</b>, a monthly pack generated from the system and a nightly report: <b>continuous visibility</b> of how its capital is used.`,
   doors:['s6-3','s6-4','s4-1','s7-3'],sources:src})},
 init(){const md=M(),f=F(),A=md.inputs;
  /* seats */
  const showSeat=i=>{const st=SEATS[i];$('p7seat').innerHTML=`<span class="p7sub" style="color:${st.c}">${st.vote?'Voting seat':'Attends · no vote'}</span><h4>${esc(st.n)}</h4><p style="margin:4px 0 0;color:var(--ink2)">${esc(st.who)}</p><ul>${st.role.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>`;document.querySelectorAll('.p7seat').forEach((g,k)=>g.classList.toggle('on',k===i))};
  document.querySelectorAll('.p7seat').forEach(g=>{const i=+g.dataset.i;g.onclick=()=>showSeat(i);g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();showSeat(i)}}});showSeat(0);
  /* DoA router: log slider 50k .. 200M */
  const amt=v=>{const lo=Math.log(50000),hi=Math.log(200000000);const x=Math.exp(lo+(hi-lo)*v/100);const mag=Math.pow(10,Math.floor(Math.log10(x))-1);return Math.round(x/mag)*mag};
  const chainUp=()=>{const t=DOA_TYPES[+$('p7dt').value],a=amt(+$('p7amt').value);$('p7amtO').textContent=tz(a);
   const hit=t[1].find(x=>a<=x[0]);const names=t[1].map(x=>x[1]);
   $('p7chain').innerHTML=names.map((n,i)=>`${i?'<i>›</i>':''}<span class="${n===hit[1]?(n.indexOf('investor')>=0?'cs':'on'):''}">${esc(n)}</span>`).join('');
   const lim=t[1].map(x=>x[0]);const idx=t[1].indexOf(hit);
   $('p7chainT').innerHTML=`<b>${esc(hit[1])}</b> approves ${tz(a)} for “${esc(t[0])}”.${idx>0?` Anything at or below ${tz(lim[idx-1])} stays with ${esc(t[1][idx-1][1])}.`:''}${hit[1].indexOf('investor')>=0?' This is a reserved matter, so the investor director must consent in writing.':''}`};
  $('p7dt').onchange=chainUp;$('p7amt').oninput=chainUp;chainUp();
  /* investor pack */
  let sk='base',mo=12;
  const packUp=()=>{const r=md.get(sk),m=r.months[mo-1],pm=mo>1?r.months[mo-2]:null;
   const churn=A.members.monthly_churn,gm=m.gross_profit/m.revenue;
   const kpi=(l,v,n,t)=>`<div class="p7kpi"><span>${l}</span><b class="${t?'t':''}">${v}</b>${n?`<small>${n}</small>`:''}</div>`;
   const cashToDate=r.months.slice(0,mo).reduce((a,x)=>a+x.profit,0);
   $('p7lay').innerHTML=`<div class="p7layc"><h5>Experience <span>repeat demand</span></h5>
     ${kpi('Visitors per day',nf(m.visitors_day),'model ramp from '+A.store.visitors_day_start+' to '+A.store.visitors_day_m12)}
     ${kpi('Afya Checks per day',nf(A.check.checks_day_m12*m.visitors_day/(A.store.visitors_day_m12*r.inputs.scenarios[sk].demand)),'scaled with visitors · '+F().pct(A.check.check_to_purchase)+' check-to-purchase')}
     ${kpi('Average basket',tz(A.store.basket),'walk-in, model input')}
     ${kpi('Afya Box members',nf(m.members),pm?'+'+nf(m.members-pm.members)+' vs last month':'first month')}
     ${kpi('Monthly churn',F().pct(churn),'model assumption')}
     ${kpi('Satisfaction (NPS)','target ≥ 60','measured by SMS survey after each visit',1)}</div>
    <div class="p7layc"><h5>Engine <span>operating simplicity</span></h5>
     ${kpi('Find & pay in store','target < 3 min','timed by the till, door to receipt',1)}
     ${kpi('Payment time','target < 30 s','mobile-money push to receipt',1)}
     ${kpi('Same-day delivery','orders before 15:00','on-time share reported weekly',1)}
     ${kpi('Stock-outs, top 100 items','target < 2%','live stock by shelf',1)}
     ${kpi('Staff in store',String(A.staff.reduce((a,x)=>a+x[1],0)),'model staff plan')}
     ${kpi('Rider cost per order',tz(A.online.rider_cost_per_order),'vs delivery fee '+tz(A.online.delivery_fee))}</div>
    <div class="p7layc"><h5>Economics <span>profitability</span></h5>
     ${kpi('Revenue this month',F().m(m.revenue),pm?((m.revenue/pm.revenue-1)*100).toFixed(1)+'% vs last month':'opening month')}
     ${kpi('Gross margin',(gm*100).toFixed(1)+'%','blended store, box and online')}
     ${kpi('Running costs',F().m(m.opex),'rent, staff, systems, marketing and more')}
     ${kpi('Store profit this month',(m.profit<0?'−':'')+F().m(Math.abs(m.profit)),m.profit<0?'below break-even':'above break-even')}
     ${kpi('Cumulative profit to date',(cashToDate<0?'−':'')+F().m(Math.abs(cashToDate)),'before head office & tax')}
     ${kpi('Founders’ share',F().pct(A.ownership.founders_after_seed),'after seed, illustrative · floor '+F().pct(A.ownership.founders_floor))}</div>`;
   $('p7packM').textContent=`Month ${mo} · ${A.scenarios[sk].label} case · planning estimates`;$('p7monO').textContent='M'+mo;
   /* spark */
   const W=640,H=120,P=24,mx=Math.max(...r.months.map(x=>x.revenue)),mnP=Math.min(0,...r.months.map(x=>x.profit));
   const xs=i=>P+i*(W-2*P)/11,ys=v=>H-P-(v-mnP)/(mx-mnP)*(H-2*P);
   const line=k=>r.months.map((x,i)=>(i?'L':'M')+xs(i).toFixed(1)+' '+ys(x[k]).toFixed(1)).join(' ');
   $('p7sparkS').innerHTML=`<svg class="p7svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Monthly revenue and profit line chart"><line x1="${P}" x2="${W-P}" y1="${ys(0)}" y2="${ys(0)}" stroke="#cfe0d7" stroke-dasharray="3 3"/><path d="${line('revenue')}" fill="none" stroke="#0f7a52" stroke-width="2.4"/><path d="${line('profit')}" fill="none" stroke="#c99a2e" stroke-width="2"/>${r.months.map((x,i)=>`<text x="${xs(i)}" y="${H-6}" font-size="9" fill="#8aa196" text-anchor="middle">${i+1}</text>`).join('')}<circle cx="${xs(mo-1)}" cy="${ys(m.revenue)}" r="5" fill="#0f7a52" stroke="#fff" stroke-width="2"/><circle cx="${xs(mo-1)}" cy="${ys(m.profit)}" r="4.5" fill="#c99a2e" stroke="#fff" stroke-width="2"/></svg>`;
   $('p7sparkL').innerHTML=`<span style="color:#0f7a52">— revenue</span> &nbsp;<span style="color:#b07b12">— profit</span>`;
   document.querySelectorAll('#p7sc button').forEach(b=>b.classList.toggle('on',b.dataset.k===sk))};
  document.querySelectorAll('#p7sc button').forEach(b=>b.onclick=()=>{sk=b.dataset.k;packUp()});$('p7mon').oninput=e=>{mo=+e.target.value;packUp()};packUp();
  /* daily report */
  const rep=mm=>{const r=md.get('base'),m=r.months[mm-1],d=30;const walk=m.walkin/d,box=m.boxes/d,on=m.online/d;
   const checks=A.check.checks_day_m12*m.visitors_day/A.store.visitors_day_m12;const newMem=Math.max(0,(m.members-(mm>1?r.months[mm-2].members:0))/d);
   $('p7msg').innerHTML=`<b>Afya Basics · Store #1 · Day report</b><br>Month ${mm}, a typical day <hr>
    <div class="r"><span>Walk-in sales</span><span>${tz(walk)}</span></div><div class="r"><span>Afya Box revenue (1/30)</span><span>${tz(box)}</span></div><div class="r"><span>Online &amp; WhatsApp</span><span>${tz(on)}</span></div><div class="r"><b>Total</b><b>${tz(walk+box+on)}</b></div><hr>
    <div class="r"><span>Visitors</span><span>${nf(m.visitors_day)}</span></div><div class="r"><span>Afya Checks</span><span>${nf(checks)}</span></div><div class="r"><span>New members (avg)</span><span>${newMem.toFixed(1)}</span></div><div class="r"><span>Cash-up</span><span>matched ✓</span></div><hr>
    <span class="al">Stock risk: 2 items below reorder point, POs drafted for approval</span><br>Issue: 1 delivery late (rain), customer called back<br><span class="al">Licence: TMDA permit renewal due in 54 days</span><time>21:00 ✓✓</time>`;
   document.querySelectorAll('#p7day button').forEach(b=>b.classList.toggle('on',+b.dataset.m===mm))};
  document.querySelectorAll('#p7day button').forEach(b=>b.onclick=()=>rep(+b.dataset.m));rep(12);
  /* calendar */
  const EV={1:[['Opening','#ff9b87'],['Pack #1','#5fbf8f']],2:[['Pack','#5fbf8f'],['Monthly PAYE/NSSF/WCF','#d9b56e']],3:[['Pack','#5fbf8f'],['Board Q1','#f2c96b'],['Open 3 months (tranche 3 test)','#ff9b87']],4:[['Pack','#5fbf8f'],['Risk review','#c9b8ff']],5:[['Pack','#5fbf8f'],['TMDA renewal filed','#c9b8ff']],6:[['Pack','#5fbf8f'],['Board Q2','#f2c96b']],7:[['Pack','#5fbf8f'],['Budget draft','#d9b56e']],8:[['Pack','#5fbf8f'],['30 June permit expiry','#c9b8ff']],9:[['Pack','#5fbf8f'],['Board Q3','#f2c96b'],['Mystery shop','#c9b8ff']],10:[['Pack','#5fbf8f'],['Audit planning','#d9b56e']],11:[['Pack','#5fbf8f'],['Next-year budget','#d9b56e']],12:[['Pack','#5fbf8f'],['Board Q4 + AGM prep','#f2c96b'],['OSHA renewal','#c9b8ff'],['Year-1 report','#ff9b87']]};
  const m150=md.get('base').months.findIndex(x=>x.members>=100)+1;if(m150>0){(EV[m150]=EV[m150]||[]).push(['Model: 100 members','#ff9b87'])}
  $('p7cal').innerHTML=Array.from({length:12},(_,i)=>`<div class="p7calm"><b>M${i+1}</b>${(EV[i+1]||[]).map(e=>`<span class="p7ev" style="--c:${e[1]}">${esc(e[0])}</span>`).join('')}${i>0&&i!==1?'<span class="p7ev" style="--c:#d9b56e">Payroll filings</span>':''}</div>`).join('');
  /* access */
  let ar=-1;document.querySelectorAll('#p7accR button').forEach(b=>b.onclick=()=>{const r=+b.dataset.r;ar=ar===r?-1:r;document.querySelectorAll('#p7accR button').forEach(x=>x.classList.toggle('on',+x.dataset.r===ar));
   document.querySelectorAll('#p7acc [data-r]').forEach(cell=>cell.classList.toggle('hi',+cell.dataset.r===ar));});
 }
};

/* ==========================================================================
   7.3 RISKS
   ========================================================================== */
const K73=['tmdaprem','tmdaimp','cap219','pharm','noncit','whosf','pdpc','clyde','whoht','rsm'];
const RCAT={Market:'#ff9b87',Regulatory:'#c9b8ff','Supply & import':'#ffb36b',FX:'#f2c96b',Operations:'#d9b56e','Technology & data':'#9fd3ff',People:'#5fbf8f',Finance:'#ffe7a8',Reputation:'#ff7b9c',Competition:'#b5f27a'};
/* [category, risk, L 1-5, I 1-5, owner, early warning, our answer, door, cite keys] */
const RISKS=c=>{const md=M(),f=F(),A=md.inputs,b=md.get('base'),d=md.get('down');return [
 ['Market','Families join the Afya Box more slowly than planned',3,4,'Commercial founder','Fewer than '+Math.round(b.months[2].members)+' members by month 3 (the model path); a low check-to-member conversion','Every free Afya Check ends with a box offer, without sales pressure. One-off kits come first, then a plan. Tranche 3 is tied to 100 members, so a shortfall is visible early and shared with the investor.','s3-4'],
 ['Market','Walk-in visitors grow more slowly than the model ramp ('+A.store.visitors_day_start+' to '+A.store.visitors_day_m12+' a day)',3,4,'Store lead','Daily visitor count below plan for 4 weeks in a row in the 21:00 report','Launch marketing ('+f.m((A.seed.use.find(x=>/marketing/i.test(x[0]))||[0,0])[1])+'), clinic referral partners, a WhatsApp catalogue, and moving spend to the channels that bring visitors in. '+(d.breakeven_month?'The downside case (demand −25%) still reaches monthly profit in month '+d.breakeven_month+'.':'In the downside case (demand −25%) the store does not reach monthly profit in Year 1, so the cost triggers in the Finance risks apply.'),'s5-1'],
 ['Regulatory','A sector permit (TMDA, Pharmacy Council or TBS) is delayed',3,5,'Operations founder','No inspection date 6 weeks after filing; repeated requests for documents','Scoping starts at M−5 with a consultant. Tranche 2 (stock) is released only when licences are in hand. Rent-free fit-out months are negotiated. TMDA requires premises to be registered and inspected first '+c('tmdaprem')+'.','s7-1'],
 ['Regulatory','A product line turns out not to be registered or notified, so it cannot be imported',3,4,'Buyer (founder)','The supplier cannot show a TMDA registration or notification number for the exact model','Each brand is checked in TMDA’s registers before ordering. 4–5 brands per item mean one gap never empties a shelf. Import permits are applied for 6+ weeks before shipment '+c('tmdaimp')+'.','s4-2'],
 ['Regulatory','A medicine is sold or handled by Afya instead of the partner pharmacy',2,5,'Operations founder','Any medicine appears in the Afya catalogue or on an Afya receipt','Afya’s catalogue has no medicine categories at all; medicine requests go only to the partner pharmacy, which sells on its own receipt. The Pharmacy Act fine can reach TSh 10 million '+c('pharm')+'. The partner agreement is suspended the day its licence lapses.','s4-5'],
 ['Regulatory','Ownership structure is challenged under the 2025 non-citizen business order',2,4,'Board + lawyer','A foreign investor’s share is questioned by the licensing office','A written legal opinion before closing. Retail is reserved for citizens, but supermarkets and specialised product outlets are excluded '+c('noncit')+'. The company stays Tanzanian-founded and led.','s6-4'],
 ['Supply & import','A shipment from China or India is late or held at clearance',4,3,'Buyer (founder)','Supplier misses its ship date; permit not issued 7 days after applying','Six weeks of safety stock on the top 100 items, a second supplier for each, and a local wholesaler as back-up for urgent lines. Shelf-life rules (at least 60% or 80% remaining) are checked before goods leave the factory '+c('tmdaimp')+'.','s4-2'],
 ['Supply & import','A substandard or falsified product enters our supply chain',2,5,'Buyer (founder)','Packaging differences, unusually low prices, customer complaints about a batch','Only registered products from audited suppliers, batch records in the system, and a recall procedure. WHO estimates 1 in 10 medical products in developing countries is substandard or falsified '+c('whosf')+', which is why “registered only” is our promise.','s4-5'],
 ['FX','The shilling weakens against the dollar, yuan or rupee, and landed costs rise',4,3,'Operations founder','Exchange rate moves 5% or more from the model rate (TSh '+A.meta.fx_usd.toLocaleString('en-US')+' per USD)','Price review every quarter, with 4–5 brands per item so customers can trade down at the same price point. Larger orders are hedged by paying part in advance. The downside case already includes costs +5%.','s6-2'],
 ['Operations','Top items run out, or stock expires on the shelf',3,3,'Store lead','Stock-outs on the top 100 items above 2%; expiry within 90 days on more than 1% of stock','Live stock by shelf, automatic reorder points, first-expiry-first-out picking, and expiry alerts 90 days ahead. Box demand is known in advance because members lock their choices 12 days before month end.','s4-3'],
 ['Operations','Same-day delivery promises are missed (traffic, rain, rider absence)',3,3,'Store lead','On-time share below 90% for a week','Zones by rider, an order cut-off at 15:00, two riders plus a partner courier on standby, and live tracking so customers are told before they have to ask.','s4-3'],
 ['Technology & data','Members’ data or health readings are leaked or misused',2,5,'Operations founder','Unusual log-ins, bulk exports, staff looking up records they are not serving','PDPC registration '+c('pdpc')+', role-based access (section 7.2), every view of a reading logged, two-factor sign-in, encrypted backups and a breach-response plan.','s4-1'],
 ['Technology & data','The system or internet goes down during trading',3,3,'Store lead','Payment or sync failures in the daily report','The till keeps selling offline and syncs later, with a backup 4G router and cash and mobile-money fallback. Proven ready-made tools are used for the till and payments.','s4-1'],
 ['People','The store lead or a key adviser leaves, or a physiotherapy graduate is hard to hire',3,3,'Founders','Overtime rising, sick days, a recruitment advert open longer than 6 weeks','Written procedures and training in the system so a new person learns fast, fair pay and a bonus tied to store results, and a second adviser trained to step up.','s4-4'],
 ['People','The founders run the business partly from India: key-person and distance risk',3,4,'Board','Approvals waiting more than 24 hours; founders absent from the monthly review','Delegation of authority, the 21:00 report, a deputy with signing power in Dar, quarterly founder visits, and key-person insurance to consider.','s7-2'],
 ['Finance','The Phase 0 gap ('+f.m(A.seed.phase0_gap.research_setup_costs-A.seed.phase0_gap.phase0_budget)+') is not funded, and the seed falls short',4,4,'Founders + investor','Phase 0 spending without an agreed funding source','Settle it before the term sheet: enlarge the seed, have the founders pre-fund it, or run a lean Phase 0 (section 7.1). Every payment is recorded with a receipt.','s6-3'],
 ['Finance','The downside year uses almost all of the loss budget and reserve',3,4,'Board','Two months below the downside revenue path','The downside Year 1 result is '+(d.y1.profit<0?'a loss of ':'a profit of ')+f.m(Math.abs(d.y1.profit))+' against '+f.m((A.seed.use.find(x=>/operating losses/i.test(x[0]))||[0,0])[1])+' set aside for early losses and a '+f.m((A.seed.use.find(x=>/reserve/i.test(x[0]))||[0,0])[1])+' reserve. Triggers in the monthly pack: cut marketing, delay hiring and agree a founder or investor bridge in advance.','s6-1'],
 ['Finance','Cash or mobile-money takings go missing',2,3,'Accountant','A cash-up mismatch above TSh 20,000; refunds without receipts','Two-person cash-up, mobile money first (fewer notes), daily reconciliation against the system, and every refund approved and logged.','s7-2'],
 ['Reputation','An Afya Check reading is misread, or an adviser oversteps into diagnosis',2,5,'Store lead','Complaints, customers saying “the store told me I am fine”','Scripts say a check is not a diagnosis, high readings are always referred to a clinic, devices are calibrated on a log, and professional liability cover is in place. WHO notes that only a health professional’s measurement can detect hypertension '+c('whoht')+', so we refer.','s3-3'],
 ['Reputation','A device fails at home and a customer is harmed or upset',2,4,'Operations founder','Warranty returns above 2% for any model','Registered brands only, a written warranty, a 7-day swap, an aftercare line on WhatsApp, and a product recall procedure with the supplier.','s4-5'],
 ['Competition','Pharmacies or supermarkets copy curated zones or undercut prices',4,3,'Commercial founder','A competitor launches a similar health-essentials area or a monthly box','The moat is the combination: membership, free checks, speed and one honest price. Members lock in through Afya Choice and saved baskets, and the customer-funded model means we never need to win a price war.','s5-3'],
 ['Competition','Online marketplaces deliver some items cheaper',3,2,'Commercial founder','Members asking for price matches on specific items','Compete on trust (registered only), advice and a planned box, not on the price of every single item. One price on every channel.','s5-3']
]};

window.SECTIONS['s7-3']={
 render(s,p,pv,nx){const {c,src}=citer(K73);const md=M(),f=F(),A=md.inputs,b=md.get('base'),d=md.get('down'),bt=md.get('best');
  const R=RISKS(c);window.__p7R=R;
  const counts={};R.forEach(r=>{const k=r[2]+'-'+r[3];counts[k]=(counts[k]||0)+1});
  const col=(l,i)=>{const sc=l*i;return sc>=15?'#ff6f61':sc>=10?'#ff9b5a':sc>=6?'#f2c96b':sc>=3?'#7fd8a8':'#5fbf8f'};
  const cs=56,ox=58,oy=12;
  const heat=`<svg class="p7svg" viewBox="0 0 360 360" role="img" aria-label="Risk heat map: likelihood (rows) by impact (columns); click a cell to filter the register">
   ${[5,4,3,2,1].map((l,ri)=>[1,2,3,4,5].map((i,ci)=>{const n=counts[l+'-'+i]||0;return `<g class="p7cell" data-l="${l}" data-i="${i}" tabindex="${n?0:-1}" role="button" aria-label="Likelihood ${l}, impact ${i}: ${n} risks"><rect x="${ox+ci*cs}" y="${oy+ri*cs}" width="${cs-4}" height="${cs-4}" rx="9" fill="${col(l,i)}" fill-opacity="${n?0.9:0.18}"/>${n?`<text x="${ox+ci*cs+(cs-4)/2}" y="${oy+ri*cs+(cs-4)/2+6}" text-anchor="middle" font-size="17" font-weight="700" fill="#021510">${n}</text>`:''}</g>`}).join('')).join('')}
   ${[5,4,3,2,1].map((l,ri)=>`<text x="${ox-10}" y="${oy+ri*cs+32}" text-anchor="end" font-size="11" fill="#a9c4b8">${l}</text>`).join('')}
   ${[1,2,3,4,5].map((i,ci)=>`<text x="${ox+ci*cs+26}" y="${oy+5*cs+16}" text-anchor="middle" font-size="11" fill="#a9c4b8">${i}</text>`).join('')}
   <text x="${ox+2.5*cs}" y="352" text-anchor="middle" font-size="10" letter-spacing="2" fill="#f2c96b">IMPACT →</text>
   <text x="14" y="${oy+2.5*cs}" text-anchor="middle" font-size="10" letter-spacing="2" fill="#f2c96b" transform="rotate(-90 14 ${oy+2.5*cs})">LIKELIHOOD →</text></svg>`;
  const top=R.map((r,i)=>[r,i]).sort((a,b2)=>b2[0][2]*b2[0][3]-a[0][2]*a[0][3]||b2[0][3]-a[0][3]).slice(0,5);
  const cats=Object.keys(RCAT);
  const byCat=cats.map(k=>[k,R.filter(r=>r[0]===k).length]);
  return secShell({s,p,pv,nx,cls:'p7',img:'img/today3.webp',imgAlt:'Concept image of a crowded pharmacy queue, the kind of experience and risk Afya Basics is designed to avoid',
   h1:'Every risk named,',em:'owned and mitigated.',
   lede:`The register lists ${R.length} risks across ten areas. Each is scored for likelihood and impact and has a named owner, an early warning sign and a planned response. Click the heat map, filter by area or sort the table.`,
   mods:[
    ['The problem it solves · hidden risks cost the most',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Every new store has risks.</b> A health store adds more: licences that expire ${c('tmdaprem')}, imported goods that need permits ${c('tmdaimp')}, and products that can harm people if they are fake ${c('whosf')}.</li>
      <li><b>Unowned risks go unmonitored.</b> In a small team, shared responsibility often means no responsibility. Each risk here has a named owner role.</li>
      <li><b>Warning signs precede losses.</b> Most failures show early signals, such as visitors below plan, a missed supplier date or a cash-up mismatch. Each signal is defined so the system can flag it.</li>
      <li><b>Investors need the full picture.</b> A register shared openly and updated in every monthly pack is more useful than an assurance that nothing will go wrong.</li></ol></div>`],
    ['Our answer · one scored register with owners',`
     <p class="p7lead">Each risk is scored 1–5 for <b>likelihood</b> and 1–5 for <b>impact</b>. The product (1–25) sets its colour and priority. Scores are the founders’ planning judgement before launch and will be re-scored each quarter by the board. ${ti('Founder estimate')}</p>
     <div class="p7heat"><div class="p7box">${heat}</div>
      <div><div class="p7grid2">${byCat.map(x=>`<div class="p7box" style="padding:14px 16px"><span class="p7chip" style="--c:${RCAT[x[0]]}"><i></i>${esc(x[0])}</span><b style="display:block;margin-top:6px;font:500 1.3rem var(--f-hud)">${x[1]}</b></div>`).join('')}</div>
      <p class="p7note2">Colour bands: 15–25 red (act now), 10–14 orange (active plan), 6–9 gold (watch), 1–5 green (accept and monitor).</p></div></div>`],
    ['How it works · from warning sign to board action',`
     <div class="flow">
      <div class="step"><span class="t">01</span><b>Spot</b><p>The early warning sign is built into the system as an alert. For example, visitors below plan for 4 weeks shows up in the 21:00 report.</p></div>
      <div class="step"><span class="t">02</span><b>Own</b><p>The named owner gets the alert and has 48 hours to confirm the cause and start the planned answer.</p></div>
      <div class="step"><span class="t">03</span><b>Act</b><p>The answer written in the register is carried out, and any spending follows the delegation-of-authority limits.</p></div>
      <div class="step"><span class="t">04</span><b>Report</b><p>Every red or orange risk appears in the monthly investor pack, and the board re-scores the whole register each quarter.</p></div>
     </div>
     <h3 class="p7h">Top five risks by score</h3>
     <div class="p7top">${top.map(([r,i])=>`<div class="p7topc"><span class="p7sc" style="background:${col(r[2],r[3])}">${r[2]*r[3]}</span><b>${esc(r[1])}</b><p>${esc(r[4])}</p></div>`).join('')}</div>
     ${p7ed({f:'hub',alt:'staff packing closed green Afya Boxes at the packing hub',cap:'where operational risks show first',k:'A worked example · supply and operations',h:'A late China shipment, <em>flagged three weeks early</em>.',
       body:`<p>A supplier in Guangzhou informs the buyer that a shipment of glucose strips and blood-pressure cuffs will miss its ship date. In the register that is a <b>Supply & import</b> risk with a named owner (the buyer) and a written answer: six weeks of safety stock on the top 100 items, a second supplier for each, and a local wholesaler as back-up for urgent lines.</p>
        <ul><li><b>Spot.</b> The supplier’s delay is logged; the system projects when shelf stock and members’ boxes will run short.</li>
        <li><b>Own.</b> Within 48 hours the buyer confirms the gap and places a bridging order locally, at a higher cost but with registered brands.</li>
        <li><b>Act and report.</b> Members’ boxes still ship on the 1st; the extra cost and the cause appear in the monthly pack, and the board re-scores the risk at the next quarter.</li></ul>`})}
     ${p7ed({f:'rider',alt:'an Afya rider on an electric motorbike in Dar es Salaam traffic',cap:'delivery promises in the rainy season',r:1,k:'A worked example · delivery',h:'April rains: <em>same-day delivery under pressure</em>.',
       body:`<p>In the rainy months traffic slows and some streets flood. The warning sign is on-time deliveries below 90% for a week. The planned response is to move box deliveries earlier in the day, group them by area, notify customers in advance when a slot is at risk, and offer click-and-collect (under 2 hours) as the fallback.</p>
        <p>The main cost of a late delivery is lost customer trust, not fuel. That is why delivery is in the register and why the 21:00 report shows late deliveries every night rather than once a month.</p>`})}`],
    ['Tool · the full risk register',`
     <div class="p7rtools"><input class="p7search" id="p7rq" type="search" placeholder="Search risks, owners or answers (e.g. TMDA, cash, delivery)" aria-label="Search the risk register"><div class="p7btns"><select id="p7rsort" class="p7b" aria-label="Sort risks by"><option value="s">Sort: highest score</option><option value="l">Sort: likelihood</option><option value="i">Sort: impact</option><option value="o">Sort: owner</option><option value="n">Sort: register number</option></select><button type="button" class="p7b" id="p7rclear">Clear filters</button></div></div>
     <div class="p7btns" id="p7rcat" style="margin-bottom:12px"><button type="button" class="p7b on" data-c="">All areas</button>${cats.map(k=>`<button type="button" class="p7b" data-c="${esc(k)}"><span class="p7chip" style="--c:${RCAT[k]};border:0;padding:0"><i></i></span> ${esc(k)}</button>`).join('')}</div>
     <div class="p7tblw"><table class="p7tbl p7rtbl p7cards"><thead><tr><th><button type="button" data-s="n">#</button></th><th><button type="button" data-s="r">Risk</button></th><th><button type="button" data-s="l">L</button></th><th><button type="button" data-s="i">I</button></th><th><button type="button" data-s="s" class="desc">Score</button></th><th><button type="button" data-s="o">Owner</button></th><th>Early warning</th><th>Our answer</th></tr></thead><tbody id="p7rbody"></tbody></table></div>
     <p class="p7rcount" id="p7rcount"></p>`,'p7-register'],
    ['The experience · when risks combine',`
     <p class="p7lead">Risks tend to arrive together. A slow licence, weak demand and a weaker shilling combined resemble the model’s <b>downside case</b> (demand −25%, costs +5%). The three scenarios compare as follows in Year 1. ${pe()}</p>
     <div class="p7box p7cmp">${[['Year 1 revenue','revenue'],['Year 1 gross profit','gross_profit'],['Year 1 store profit','profit']].map(row=>{const vals=[['Best',bt.y1[row[1]],'#5fbf8f'],['Base',b.y1[row[1]],'#f2c96b'],['Downside',d.y1[row[1]],'#ff8f7d']];const mx=Math.max(...vals.map(v=>Math.abs(v[1])));
       return `<div class="p7cmpr"><b style="color:var(--ink);font-family:var(--f-display);font-size:.9rem">${row[0]}</b><div class="bars">${vals.map(v=>`<div><i style="width:${Math.abs(v[1])/mx*100}%;background:${v[2]};${v[1]<0?'background:repeating-linear-gradient(45deg,#ff8f7d 0 6px,#a8483b 6px 12px)':''}"></i><span>${v[0]} · ${v[1]<0?'−':''}${f.m(Math.abs(v[1]))}</span></div>`).join('')}</div></div>`}).join('')}
      <div class="p7cmpr"><b style="color:var(--ink);font-family:var(--f-display);font-size:.9rem">First profitable month</b><div class="bars">${[['Best',bt.breakeven_month,'#5fbf8f'],['Base',b.breakeven_month,'#f2c96b'],['Downside',d.breakeven_month,'#ff8f7d']].map(v=>`<div><i style="width:${v[1]/12*100}%;background:${v[2]}"></i><span>${v[0]} · ${v[1]?'month '+v[1]:'not in Year 1'}</span></div>`).join('')}</div></div>
     </div>
     <p class="p7note2">Striped bar = a loss. The downside case loses about ${f.m(Math.abs(d.y1.profit))} in Year 1 (store level, before head office and tax). The seed sets aside ${f.m((A.seed.use.find(x=>/operating losses/i.test(x[0]))||[0,0])[1])} for early losses plus a ${f.m((A.seed.use.find(x=>/reserve/i.test(x[0]))||[0,0])[1])} reserve, ${Math.abs(d.y1.profit)<=((A.seed.use.find(x=>/operating losses/i.test(x[0]))||[0,0])[1]+(A.seed.use.find(x=>/reserve/i.test(x[0]))||[0,0])[1])?'so this case is covered with little to spare':'so this case would exhaust them by about '+f.m(Math.abs(d.y1.profit)-((A.seed.use.find(x=>/operating losses/i.test(x[0]))||[0,0])[1]+(A.seed.use.find(x=>/reserve/i.test(x[0]))||[0,0])[1]))}. That is why the cost-cut triggers and a pre-agreed bridge sit in the register above.</p>`],
    ['The numbers · the register at a glance',`
     <div class="nums">
      <div class="num"><b>${R.length}</b><span>risks registered across ${cats.length} areas</span></div>
      <div class="num g"><b>${R.filter(r=>r[2]*r[3]>=15).length}</b><span>red (score 15+): act now</span></div>
      <div class="num"><b>${R.filter(r=>{const x=r[2]*r[3];return x>=10&&x<15}).length}</b><span>orange (10–14): active plan</span></div>
      <div class="num"><b>${(R.reduce((a,r)=>a+r[2]*r[3],0)/R.length).toFixed(1)}</b><span>average score out of 25</span></div>
      <div class="num"><b>${new Set(R.map(r=>r[4])).size}</b><span>owner roles: no risk without an owner</span></div>
     </div>`],
    ['Risks and our answer · about the register itself',`
     <div class="risks">
      <div class="risk"><span class="q">The scores are judgement, not data.</span><span class="ar">→</span><span class="a">Correct. They are founder estimates before launch. The board re-scores each quarter with actual figures from the system, and changes are shown in the pack.</span></div>
      <div class="risk"><span class="q">A risk that is not yet in the register.</span><span class="ar">→</span><span class="a">The independent adviser and investor director add risks at every board meeting, and staff can report an issue from the handheld in two taps.</span></div>
      <div class="risk"><span class="q">The register becomes a document nobody reads.</span><span class="ar">→</span><span class="a">Early warnings are system alerts, not paragraphs. Red risks appear at the top of every monthly pack.</span></div>
     </div>`]
   ],
   takeaway:`<b>${R.length} risks</b> are registered, each with an owner, a warning sign and a planned response, and the downside case is <b>already in the model</b>.`,
   doors:['s6-1','s7-2','s4-5','s5-3'],sources:src})},
 init(){const R=window.__p7R||[];const col=(l,i)=>{const sc=l*i;return sc>=15?'#ff6f61':sc>=10?'#ff9b5a':sc>=6?'#f2c96b':sc>=3?'#7fd8a8':'#5fbf8f'};
  let cat='',cell=null,q='',sk='s',dir=-1;
  const draw=()=>{let rows=R.map((r,i)=>({r,n:i+1}));
   rows=rows.filter(x=>(!cat||x.r[0]===cat)&&(!cell||(x.r[2]===cell[0]&&x.r[3]===cell[1]))&&(!q||(x.r.slice(0,7).join(' ').replace(/<[^>]+>/g,'').toLowerCase().indexOf(q)>=0)));
   const key={n:x=>x.n,r:x=>x.r[1],l:x=>x.r[2],i:x=>x.r[3],s:x=>x.r[2]*x.r[3]*10+x.r[3],o:x=>x.r[4]}[sk];
   rows.sort((a,b)=>{const A=key(a),B=key(b);return (A>B?1:A<B?-1:0)*dir});
   const t=x=>{const t2=ALL.find(z=>z.id===x);return t2?`<a href="#${x}">${t2.no} ${esc(t2.title)} →</a>`:''};
   $('p7rbody').innerHTML=rows.map(x=>`<tr><td class="sm" data-l="#">${x.n}</td><td class="rk" data-l="Risk"><span class="p7chip" style="--c:${RCAT[x.r[0]]}"><i></i>${esc(x.r[0])}</span><b style="margin-top:6px">${esc(x.r[1])}</b>${t(x.r[7])}</td><td class="sm" data-l="Likelihood">${x.r[2]}</td><td class="sm" data-l="Impact">${x.r[3]}</td><td class="sm" data-l="Score"><span class="p7sc" style="background:${col(x.r[2],x.r[3])}">${x.r[2]*x.r[3]}</span></td><td data-l="Owner">${esc(x.r[4])}</td><td data-l="Early warning">${esc(x.r[5])}</td><td data-l="Our answer">${x.r[6]}</td></tr>`).join('')||'<tr><td colspan="8">No risks match these filters.</td></tr>';
   $('p7rcount').textContent=`Showing ${rows.length} of ${R.length} risks`+(cat?` · ${cat}`:'')+(cell?` · likelihood ${cell[0]} × impact ${cell[1]}`:'')+(q?` · “${q}”`:'');
   document.querySelectorAll('.p7cell').forEach(g=>{const on=cell&&+g.dataset.l===cell[0]&&+g.dataset.i===cell[1];g.classList.toggle('on',!!on);g.classList.toggle('dim',!!cell&&!on)});
   document.querySelectorAll('#p7rcat button').forEach(b=>b.classList.toggle('on',b.dataset.c===cat));
   $('p7rsort').value=sk;document.querySelectorAll('.p7rtbl th button').forEach(b=>{b.classList.toggle('asc',b.dataset.s===sk&&dir===1);b.classList.toggle('desc',b.dataset.s===sk&&dir===-1)})};
  document.querySelectorAll('.p7cell').forEach(g=>{const fn=()=>{const l=+g.dataset.l,i=+g.dataset.i;cell=(cell&&cell[0]===l&&cell[1]===i)?null:[l,i];draw();const reg=document.getElementById('p7-register');if(reg&&cell)reg.scrollIntoView({behavior:'smooth',block:'start'})};g.onclick=fn;g.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}}});
  document.querySelectorAll('#p7rcat button').forEach(b=>b.onclick=()=>{cat=b.dataset.c;draw()});
  $('p7rq').oninput=e=>{q=e.target.value.trim().toLowerCase();draw()};
  $('p7rclear').onclick=()=>{cat='';cell=null;q='';$('p7rq').value='';draw()};
  document.querySelectorAll('.p7rtbl th button').forEach(b=>b.onclick=()=>{if(sk===b.dataset.s)dir=-dir;else{sk=b.dataset.s;dir=(sk==='r'||sk==='o'||sk==='n')?1:-1}draw()});
  $('p7rsort').onchange=e=>{sk=e.target.value;dir=(sk==='o'||sk==='n')?1:-1;draw()};
  draw()}
};

/* ==========================================================================
   7.4 SOCIAL IMPACT
   ========================================================================== */
const K74=['whotz','whoht','idf','adh','whosf','nbsg','rem','sdg3','sdg5','sdg8','nssf','pdpc'];
/* derived impact figures from the model (planning estimates) */
function impactYears(key){const md=M(),A=md.inputs,r=md.get(key),G=A.growth,d=A.scenarios[key].demand;
 const staff=A.staff.reduce((a,x)=>a+x[1],0);
 return r.years.map((y,i)=>{let checks,boxes;
  if(i===0){checks=r.months.reduce((a,m)=>a+A.check.checks_day_m12*m.visitors_day/(A.store.visitors_day_m12*d)*d*30,0);boxes=r.months.reduce((a,m)=>a+m.members,0)}
  else{const eq=y.revenue/(1+G.b2b_share)/(G.mature_store_revenue*d);checks=eq*A.check.checks_day_m12*d*365;boxes=(r.years[i-1].members+y.members)/2*12}
  return {year:y.year,stores:y.stores,jobs:y.stores*staff,checks,members:y.members,boxes}})}

window.SECTIONS['s7-4']={
 render(s,p,pv,nx){const {c,src}=citer(K74);const md=M(),f=F(),A=md.inputs;const Y=impactYears('base');
  const staff=A.staff.reduce((a,x)=>a+x[1],0);
  const undx=0.257*(1-0.176);const womenShare=4.6/(4.6+1.2);
  const jobsSvg=(()=>{const W=720,H=230,P=34,mx=Y[11].jobs;const bw=(W-2*P)/12;
   return `<svg class="p7svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Direct store jobs by year, from ${Y[0].jobs} in year 1 to ${Y[11].jobs} in year 12">
    ${[0,0.5,1].map(t=>`<line x1="${P}" x2="${W-P}" y1="${H-P-(H-2*P)*t}" y2="${H-P-(H-2*P)*t}" stroke="rgba(95,191,143,.1)"/><text x="${P-6}" y="${H-P-(H-2*P)*t+4}" font-size="10" text-anchor="end" fill="#6a8a7d">${Math.round(mx*t)}</text>`).join('')}
    ${Y.map((y,i)=>{const h=(H-2*P)*y.jobs/mx;return `<rect x="${P+i*bw+6}" y="${H-P-h}" width="${bw-12}" height="${h}" rx="5" fill="url(#p7jg)"/><text x="${P+i*bw+bw/2}" y="${H-P-h-6}" font-size="10" text-anchor="middle" fill="#ffe7a8">${y.jobs}</text><text x="${P+i*bw+bw/2}" y="${H-P+16}" font-size="10" text-anchor="middle" fill="#a9c4b8">Y${y.year}</text>`}).join('')}
    <defs><linearGradient id="p7jg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2c96b"/><stop offset="1" stop-color="#5fbf8f" stop-opacity=".55"/></linearGradient></defs></svg>`})();
  const rowsImp=[
   ['Free Afya Checks done','Every check is logged by the kiosk (with consent)',nf(Y[0].checks),nf(Y[2].checks),'SDG 3.4'],
   ['Readings referred to a clinic','Referral flag in the system when a reading is above the adviser protocol','~'+nf(Y[0].checks*0.15),'~'+nf(Y[2].checks*0.15),'SDG 3.4'],
   ['Referred people who confirm a clinic visit','Follow-up SMS after 14 days (opt-in)','≥ 50%','≥ 60%','SDG 3.4'],
   ['Condition-care members with no missed month','Renewal and delivery records: box arrived before the last one ran out','≥ 90%','≥ 95%','SDG 3.8'],
   ['Share of products registered and verified','The catalogue blocks a product without a registration record; quarterly audit','100%','100%','SDG 3.8'],
   ['Direct store jobs','Payroll records (staff plan '+staff+' per store)',String(Y[0].jobs),String(Y[2].jobs),'SDG 8.5'],
   ['Staff on formal contracts with NSSF','Payroll and NSSF registration','100%','100%','SDG 8.5'],
   ['Women in the workforce and in leadership','Payroll; store lead and adviser roles','≥ 50%','≥ 50%','SDG 5.5'],
   ['Carer hours saved per year','Member survey twice a year: trips and hours before and after joining','see calculator','see calculator','SDG 5.4'],
   ['Boxes paid from abroad','Payment origin (international card) on each box','tracked','tracked','SDG 3.8']];
  return secShell({s,p,pv,nx,cls:'p7',img:'img/exterior.webp',imgAlt:'Concept image of the Afya Basics store at dusk',
   h1:'Healthier households,',em:'measured, not assumed.',
   lede:'Afya Basics creates impact through its normal operations. Free checks find raised readings early, planned boxes support daily treatment, registered-only products keep falsified goods off the shelf, and home delivery returns time to carers, most of whom are women. Each pathway has a target and a measurement method.',
   mods:[
    ['The problem it solves · the evidence',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>Most high blood pressure is hidden.</b> In Tanzania about 1 in 4 adults aged 25–64 has raised blood pressure, but only 17.6% of them know it, and 2.2% have it under control ${c('whotz')}. Worldwide, WHO says the only way to detect it is to measure it ${c('whoht')}.</li>
      <li><b>Diabetes is rising fast and mostly undiagnosed.</b> About 2.9 million Tanzanian adults lived with diabetes in 2024 (9.8%), and 60.2% of them did not know ${c('idf')}.</li>
      <li><b>Treatment fails when supplies run out.</b> WHO found that adherence to long-term treatment averages only 50% even in high-income countries, and is lower in developing ones ${c('adh')}. A household that runs out of strips or tablets on a Sunday night misses doses.</li>
      <li><b>Care falls on women.</b> Tanzanian women spend about 4.6 hours a day on unpaid domestic and care work, against 1.2 hours for men ${c('nbsg')}. Every extra trip to a shop for a parent’s supplies comes out of that time.</li></ol></div>
     <div class="p7evg">
      <article class="evc" style="--c:#ff9b87"><b>17.6%</b><p>of Tanzanian adults with high blood pressure know they have it ${c('whotz')}.</p></article>
      <article class="evc" style="--c:#ffb36b"><b>60.2%</b><p>of adults with diabetes in Tanzania are undiagnosed (2024) ${c('idf')}.</p></article>
      <article class="evc" style="--c:#f2c96b"><b>~50%</b><p>average adherence to long-term treatment, even in developed countries ${c('adh')}.</p></article>
      <article class="evc" style="--c:#ff7b9c"><b>1 in 10</b><p>medical products in developing countries is substandard or falsified ${c('whosf')}.</p></article>
      <article class="evc" style="--c:#c9b8ff"><b>4.6 h / day</b><p>unpaid care and domestic work by women, against 1.2 h by men (2020/21) ${c('nbsg')}.</p></article>
      <article class="evc" style="--c:#d9b56e"><b>TSh 3.3T</b><p>sent home by Tanzanians abroad in 2024/25 ${c('rem')}.</p></article>
     </div>`],
    ['Our answer · five impact pathways',`
     ${p7pcs([
      {f:'interior',alt:'the store interior with the free Afya Check kiosk by the glass',cap:'detection',k:'Pathway 1',h:'Earlier detection',body:`<p>A free ${A.check.quick_seconds}-second check at the door (blood pressure, pulse and oxygen), and a full Afya Check of 15 measurements in about 4 minutes. Raised readings are explained and referred to a clinic, with no sales offer at that point. Most Tanzanian adults with high blood pressure do not know they have it.</p>`},
      {f:'prod-heart',alt:'heart and diabetes care essentials: monitor, meter and strips',cap:'adherence',k:'Pathway 2',h:'Continuous supply',body:`<p>Condition-care boxes arrive before supplies end, with reminders and one-tap reorders, so doses are not missed for lack of strips or needles.</p>`},
      {f:'prod-care',alt:'registered personal-care products laid out on a clean surface',cap:'quality',k:'Pathway 3',h:'Fewer falsified products',body:`<p>Only registered, quality-checked brands from audited suppliers, with batch records. With ${esc(A.brands_per_item)} brands per item in the same price range, the cheapest option is still a safe one.</p>`},
      {f:'today2',alt:'a mother walking between shops in Dar es Salaam with her child',cap:'time',k:'Pathway 4',h:'Carers’ time back',body:`<p>Same-day delivery and monthly boxes replace trips across town. That time belongs mostly to women carers, such as a granddaughter caring for her grandmother or a mother with a toddler and a newborn.</p>`},
      {f:'boxdoor',alt:'a closed Afya Box handed over at a parent’s doorstep',cap:'diaspora',k:'Pathway 5',h:'Diaspora care',body:`<p>A son or daughter abroad pays for a parent’s box directly and receives a delivery photo. The remittance is converted into care that the sender can verify.</p>`}]).replace(/<\/div>$/,`<article class="p7-pc p7-pcnote"><div class="b"><span class="k">What we do not claim</span><h4>Measured outputs only</h4><p>Afya Basics does not diagnose or treat, and cannot attribute lives saved. It counts what it controls: checks, referrals, on-time boxes, registered products and jobs. With consent, it surveys members on what changed for them.</p></div></article></div>`)}
`],
    ['How it works · from shelf to outcome',`
     <p class="p7lead">A chain of cause and effect in which each claim can be tested. Outputs are counted by the system; outcomes are measured through follow-up and surveys, with consent.</p>
     <div class="p7toc">
      <div class="p7tocc"><small>Inputs</small><div><b>Afya Check kiosk</b> and trained advisers</div><div><b>Registered range</b> of about ${A.product_families} families</div><div><b>Box membership</b> and delivery riders</div></div>
      <div class="p7tocc"><small>Activities</small><div>Free checks with a referral protocol</div><div>Supplier audits and batch tracking</div><div>Monthly boxes with Afya Choice swaps</div></div>
      <div class="p7tocc"><small>Outputs (counted)</small><div>Checks done, readings referred</div><div>Boxes delivered on time</div><div>Share of products verified</div></div>
      <div class="p7tocc o"><small>Outcomes (measured)</small><div><b>Earlier care:</b> referred people who see a clinic</div><div><b>Adherence:</b> no missed months on condition boxes</div><div><b>Time:</b> carer hours saved</div></div>
     </div>`],
    ['The experience · one referral, step by step',`
     <div class="p7case"><figure class="shot"><img src="img/check.webp" onerror="this.onerror=null;this.src='img/interior.webp'" width="1680" height="944" loading="lazy" alt="Concept image of the Afya Check kiosk in use inside the store"><figcaption>Concept image · Afya Check</figcaption></figure>
      <div><span class="p7sub">Illustrative · a father, 52, passing on his way home</span><ol>
       <li><b>${A.check.quick_seconds} seconds.</b> He takes the free quick check. His blood pressure reads high, and the screen suggests he speak to an adviser.</li>
       <li><b>Explained, not sold.</b> The adviser explains the reading in Kiswahili and recommends seeing a clinic within days. No product is offered at this point.</li>
       <li><b>Referred.</b> With his consent, he gets the reading by SMS and a list of nearby clinics. The system sets a follow-up.</li>
       <li><b>Followed up.</b> After 14 days an SMS asks if he saw a clinic. If he did and was prescribed a monitor, he can choose from 4–5 registered brands and a Heart &amp; Diabetes box.</li></ol></div></div>`],
    ['Tool · impact calculator',`
     <div class="calc"><div class="cin">
       <p class="s11lead" style="margin:0 0 6px">Select a year and scenario. Checks, members and jobs come from the master model; the behaviour assumptions can be adjusted. ${pe()}</p>
       <div class="p7btns" id="p7isc" style="margin-top:10px">${md.scenarios.map((k,i)=>`<button type="button" class="p7b${i?'':' on'}" data-k="${k}">${A.scenarios[k].label}</button>`).join('')}</div>
       <label><span>Plan year</span><input type="range" id="p7iy" min="1" max="12" value="3"><output id="p7iyO"></output></label>
       <label><span>Share of people checked whose reading needs a clinic</span><input type="range" id="p7ir" min="5" max="30" value="15"><output id="p7irO"></output></label>
       <label><span>Health-shopping trips saved per member household per month</span><input type="range" id="p7it" min="0" max="6" step="0.5" value="2"><output id="p7itO"></output></label>
       <label><span>Hours per trip</span><input type="range" id="p7ih" min="0.5" max="4" step="0.5" value="1.5"><output id="p7ihO"></output></label>
       <label><span>Share of boxes paid from abroad</span><input type="range" id="p7id" min="0" max="30" value="10"><output id="p7idO"></output></label>
      </div>
      <div class="cout">
       <div><small>Free Afya Checks in the year</small><b id="p7o1">–</b></div>
       <div><small>Readings referred to a clinic</small><b id="p7o2">–</b></div>
       <div><small>Carer hours saved</small><b id="p7o3">–</b><p id="p7o3n"></p></div>
       <div><small>Direct store jobs</small><b id="p7o4">–</b></div>
       <div><small>Boxes paid from abroad</small><b id="p7o5">–</b></div>
      </div></div>
     <p class="note">If the people checked matched national averages, about ${(undx*100).toFixed(0)}% would have high blood pressure they do not know about (25.7% × 82.4%). Our customers are not a random sample, so the default referral share is a more cautious 15%.</p>`],
    ['The numbers · jobs created, store by store',`
     <p class="p7lead">Each store employs <b>${staff} people</b> in the model: ${A.staff.map(x=>x[1]+' '+x[0].toLowerCase()).join(', ')}. Opening ${A.growth.stores_by_year[11]} stores by year 12 means about <b>${Y[11].jobs} direct store jobs</b>, all formal, with NSSF contributions ${c('nssf')}. The packing hub, head office and supplier jobs come on top and are not counted here. ${pe()}</p>
     <div class="p7box">${jobsSvg}</div>
     <h3 class="p7h">Impact dashboard · targets and how each is measured</h3>
     <div class="p7tblw"><table class="p7tbl p7imp p7cards"><thead><tr><th>Measure</th><th>Year 1 target</th><th>Year 3 target</th><th>How it is measured</th><th>SDG</th></tr></thead><tbody>${rowsImp.map(r=>`<tr><td class="m" data-l="Measure"><b>${esc(r[0])}</b></td><td class="v" data-l="Year 1">${r[2]}</td><td class="v" data-l="Year 3">${r[3]}</td><td data-l="How measured">${esc(r[1])}</td><td data-l="SDG"><span class="p7chip">${r[4]}</span></td></tr>`).join('')}</tbody></table></div>
     <p class="note">Checks, referrals and jobs are computed from the model (base case). Rates marked ≥ are planning targets. Referrals assume 15% of checks · all planning estimates</p>`],
    ['Alignment · UN Sustainable Development Goals 3, 5 and 8',`
     <div class="p7sdg">
      <div class="p7sdgc"><div class="p7sdgh" style="--c:#4c9f38"><b>3</b><span>Good health and well-being</span></div><div class="p7sdgb"><q>Target 3.4: by 2030, reduce by one third premature mortality from non-communicable diseases through prevention and treatment ${c('sdg3')}</q><b>Our part:</b> free checks and referrals for blood pressure and other readings, and planned condition-care boxes that support daily treatment. Target 3.8 (access to safe, quality medicines and products) is served by registered-only stock.</div></div>
      <div class="p7sdgc"><div class="p7sdgh" style="--c:#ff3a21"><b>5</b><span>Gender equality</span></div><div class="p7sdgb"><q>Target 5.4: recognise and value unpaid care and domestic work ${c('sdg5')}</q><b>Our part:</b> home delivery and planned boxes cut the shopping trips that fall mostly on women carers. Target 5.5 (women in leadership) is reflected in our aim that at least half of advisers and store leads are women.</div></div>
      <div class="p7sdgc"><div class="p7sdgh" style="--c:#a21942"><b>8</b><span>Decent work and economic growth</span></div><div class="p7sdgb"><q>Target 8.5: full and productive employment and decent work for all women and men ${c('sdg8')}</q><b>Our part:</b> formal jobs with contracts and social security, a career path from adviser to store lead, and riders on electric motorbikes. Target 8.3 encourages small enterprises to formalise and grow, which is our own path.</div></div>
     </div>`],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">Impact claims exceed what can be proven.</span><span class="ar">→</span><span class="a">Only counted outputs and measured outcomes are reported, each with its method, and no claim is made of diagnoses or lives saved.</span></div>
      <div class="risk"><span class="q">Free checks worry people or lead to over-referral.</span><span class="ar">→</span><span class="a">A calm, scripted explanation, protocol thresholds agreed with a clinical adviser, and referral advice rather than alarm.</span></div>
      <div class="risk"><span class="q">Using health readings for marketing would break trust.</span><span class="ar">→</span><span class="a">Readings are used only with consent and never sold or shared. The access rules in section 7.2 and our PDPC registration apply ${c('pdpc')}.</span></div>
      <div class="risk"><span class="q">Carer time saved is overstated.</span><span class="ar">→</span><span class="a">The calculator is an estimate. The real figure comes from a member survey twice a year, reported in the investor pack.</span></div>
     </div>`]
   ],
   takeaway:`Impact and profit come from the <b>same activities</b>: checks attract customers, boxes retain them and registered products build trust. As the business grows, its <b>measured impact grows with it</b>.`,
   doors:['s3-3','s3-5','s1-2','s4-4'],sources:src})},
 init(){const md=M(),f=F(),A=md.inputs;let sk='base';
  const up=()=>{const Y=impactYears(sk);const y=+$('p7iy').value,r=+$('p7ir').value/100,t=+$('p7it').value,h=+$('p7ih').value,d=+$('p7id').value/100;const Yr=Y[y-1];
   $('p7iyO').textContent='Year '+y;$('p7irO').textContent=Math.round(r*100)+'%';$('p7itO').textContent=t;$('p7ihO').textContent=h+' h';$('p7idO').textContent=Math.round(d*100)+'%';
   const memYears=Yr.boxes/12;const hrs=memYears*12*t*h;const ws=4.6/5.8;
   $('p7o1').textContent=nf(Yr.checks);$('p7o2').textContent=nf(Yr.checks*r);$('p7o3').textContent=nf(hrs)+' h';
   $('p7o3n').innerHTML=`about ${nf(hrs*ws)} h of it women’s time, if shared like national unpaid care (4.6 h vs 1.2 h a day, so 79%).`;
   $('p7o4').textContent=`${Yr.jobs} · ${Yr.stores} store${Yr.stores>1?'s':''}`;$('p7o5').textContent=nf(Yr.boxes*d);
   document.querySelectorAll('#p7isc button').forEach(b=>b.classList.toggle('on',b.dataset.k===sk))};
  document.querySelectorAll('#p7isc button').forEach(b=>b.onclick=()=>{sk=b.dataset.k;up()});
  ['p7iy','p7ir','p7it','p7ih','p7id'].forEach(k=>$(k).oninput=up);up()}
};

/* ==========================================================================
   7.5 PROOF PACK, Q&A AND SOURCES
   ========================================================================== */
const K75=['tmdaprem','tmdaimp','pharm','noncit','rsm','pdpc','pdpr','whosf','whoht','nssf','wcf','brela'];
function QA(c){const md=M(),f=F(),A=md.inputs,b=md.get('base'),bt=md.get('best'),d=md.get('down'),g=A.seed.phase0_gap;
 const m150=b.months.findIndex(x=>x.members>=100)+1;const y1=b.y1;const boxShare=b.months.reduce((a,x)=>a+x.boxes,0)/y1.revenue;
 const staff=A.staff.reduce((a,x)=>a+x[1],0);const pre=A.seed.amount/A.ownership.seed_investor_share-A.seed.amount;
 return [
 ['Numbers','How reliable are the numbers on this site?',`<p>Every business number comes from one master model (${esc(A.meta.version)}). Today every input is a <b>planning estimate</b>: ${esc(A.meta.status.toLowerCase())}. Facts about Tanzania (disease, regulation, remittances) are cited from the pages we opened. Revenue is shown net of 18% VAT, staff costs include employer NSSF (10%) and WCF (0.5%), and the flagship rent is the Knight Frank prime rate. The model is reconciled in Step 2 of the framework and exported as a spreadsheet for investors’ accountants.</p>`],
 ['Numbers','When does the store become profitable?',`<p>In the base case the store makes its first monthly profit in <b>month ${b.breakeven_month}</b> (best case ${bt.breakeven_month?'month '+bt.breakeven_month:'after Year 1'}, downside ${d.breakeven_month?'month '+d.breakeven_month:'after Year 1'}). That is store level: gross profit minus the ${f.m(b.opex_month)} of monthly running costs, before head office, interest and tax.</p>`],
 ['Numbers','What revenue do you expect in year 1, and from what?',`<p>Base case Year 1 revenue for the ${FW()} is <b>${f.m(y1.revenue)}</b>, net of VAT. About <b>${f.pct(boxShare)}</b> comes from Afya Box memberships (${nf(b.months[11].members)} members by month 12, average box ${tz(A.members.avg_box)}), and the rest from walk-in sales (${A.store.visitors_day_start}→${A.store.visitors_day_m12} visitors a day, ${f.pct(A.store.conversion)} buy, basket ${tz(A.store.basket)}) and online orders.</p>`],
 ['Numbers','What happens in the downside case?',`<p>With demand 25% lower and costs 5% higher, Year 1 revenue is ${f.m(d.y1.revenue)} and the store <b>loses about ${f.m(Math.abs(d.y1.profit))}</b> in Year 1, ${d.breakeven_month?`breaking even in month ${d.breakeven_month}`:'without reaching monthly profit within Year 1'}. That loss is larger than the ${f.m((A.seed.use.find(x=>/reserve/i.test(x[0]))||[0,0])[1])} working-capital reserve. In that case costs would be cut early (marketing, hiring) or a pre-agreed bridge drawn. The trigger points are in the risk register (7.3).</p>`],
 ['Numbers','When does the company turn EBITDA positive?',`<p>In the base model EBITDA turns positive in <b>Year ${b.years.findIndex(y=>y.ebitda>0)+1}</b>. Year 2 is the low point at <b>${b.years[1].ebitda<0?'−':''}${f.m(Math.abs(b.years[1].ebitda))}</b>, because the second store opens (ramping at ${f.pct(A.growth.ramp[0])} of a mature store) and head-office costs start (${f.m(A.growth.ho_fixed_year)} a year plus ${f.pct(A.growth.ho_share)} of revenue). The loss narrows to ${b.years[2].ebitda<0?'−':''}${f.m(Math.abs(b.years[2].ebitda))} in Year 3 as the network grows. Store #2 is funded by a later round, not by this seed.</p>`],
 ['Money & ownership','How is the seed amount calculated?',`<p>The ${ISL()?'start-small':'flagship'} seed is <b>${f.m(A.seed.amount)}</b>: ${esc(A.seed.status)}. It reflects VAT removed from revenue, box margins after member discounts, ${f.pct(A.members.monthly_churn)} monthly member churn, a ${ISL()?'secondary-street':'prime'} rent of ${f.m(A.opex_month.rent)} a month and the 6-month lease advance Dar es Salaam landlords require. It is released in three tranches. The remaining open item is the Phase 0 gap: research, travel and setup are estimated at ${f.m(g.research_setup_costs)} against a Phase 0 budget of ${tz(g.phase0_budget)}. The gap is either added to the round, pre-funded by the founders, or reduced by a lean Phase 0 (section 7.1).</p>`],
 ['Money & ownership','What exactly does the seed money buy?',`<p>${A.seed.use.map(u=>`${esc(u[0])}: <b>${f.m(u[1])}</b>`).join('; ')}. It does not yet include licence, legal and research costs (the Phase 0 gap).</p>`],
 ['Money & ownership','How and when is the money released?',`<p>In three tranches: ${A.seed.milestones.map((m,i)=>`<b>${f.m(A.seed.amount*A.seed.tranches[i])}</b>, ${esc(m.split(':').slice(1).join(':').trim())}`).join('; ')}. The base model reaches 100 members in month ${m150}, so tranche 3 is planned for no earlier than month ${Math.max(3,m150)}.</p>`],
 ['Money & ownership','What share do I get?',`<p>Illustrative only: <b>${f.pct(A.ownership.seed_investor_share)}</b> for the full ${f.m(A.seed.amount)}, which implies a pre-money value of about ${f.m(pre)}. The founders hold ${f.pct(A.ownership.founders_after_seed)} after the seed, with a ${f.pct(A.ownership.option_pool)} option pool. ${esc(A.ownership.note)}.</p>`],
 ['Money & ownership','Will the founders’ 25%-for-life rule put off later investors?',`<p>It is a real constraint. A floor on the founders’ share limits how much can be sold in later rounds. It has to be built carefully, for example as a class of shares or a protected allotment, so that future investors know the terms upfront. It needs legal review before the term sheet, and it is listed as an open item.</p>`],
 ['Money & ownership','What is the exit?',`<p>No buyer has been identified. The routes are a sale to a larger retailer or investor once the chain is proven, a later-round buy-out of seed shares, or dividends from a profitable chain. Section 6.4 has the illustrative sale calculator.</p>`],
 ['Regulation','Is selling health products regulated in Tanzania?',`<p>Yes. Medical devices need registered premises, a contracted superintendent, an inspection and a business permit renewed every 30 June ${c('tmdaprem')}, and imports need permits ${c('tmdaimp')}. Medicines need Pharmacy Council registered premises, a permit and a registered pharmacist ${c('pharm')}. Cosmetics and food products fall under TBS. The 15-step plan in section 7.1 covers all of them.</p>`],
 ['Regulation','Do you need a pharmacist?',`<p>No, because Afya Basics does not sell medicines. The Pharmacy Act requires registered premises, a permit and a pharmacist superintendent for any business that sells them ${c('pharm')}. Medicines reach Afya customers through a <b>licensed partner pharmacy</b>: its pharmacist sells and dispenses, the customer pays the pharmacy directly, and the sealed bag can travel with the monthly box. This keeps the payroll at 8, the site choice free of pharmacy location rules and every medicine sale under a pharmacist’s licence. Section 4.5 sets out the agreement.</p>`],
 ['Regulation','Can a foreign investor own shares?',`<p>Generally yes, but the Business Licensing (Prohibition of Business Activities for Non-Citizens) Order, 2025 reserves retail and wholesale trade for citizens, while excluding “supermarkets and specialised product outlets” ${c('noncit')}. Afya Basics is founded and led by Tanzanians and is a specialised health outlet. A written legal opinion on the structure is a condition before closing.</p>`],
 ['Regulation','What about VAT and tax?',`<p>VAT registration is compulsory once taxable sales are expected to pass TSh 100 million in 12 months ${c('rsm')}. Base Year 1 revenue is ${f.m(y1.revenue)} net of VAT, so Afya Basics registers from the start. Shelf prices are VAT-inclusive, and the model removes the 18% VAT before reporting revenue. Corporate income tax is 30%.</p>`],
 ['Operations','Who runs the store day to day if the founders are often in India?',`<p>A store lead (preferably a physiotherapy graduate) with ${staff-1} colleagues: ${A.staff.slice(1).map(x=>x[1]+' '+x[0].toLowerCase()).join(', ')}. The one system runs the till, stock, members and delivery. The founders receive the 21:00 report every night and approve purchases above the store lead’s limit from their phones (section 7.2).</p>`],
 ['Operations','How do you stop fake or expired products?',`<p>Registered-only brands checked against TMDA’s public registers, audited suppliers, batch records, first-expiry-first-out picking and expiry alerts. Imports must meet TMDA shelf-life rules (at least 60% or 80% of shelf life left) ${c('tmdaimp')}. WHO estimates 1 in 10 medical products in developing countries is substandard or falsified ${c('whosf')}, which is why this is a selling point and not only a rule.</p>`],
 ['Operations','Does delivery lose money?',`<p>No, by design. Online orders pay a ${tz(A.online.delivery_fee)} delivery fee against a rider cost of ${tz(A.online.rider_cost_per_order)} per order. For boxes, ${tz(A.members.packing_delivery_in_price)} for packing and delivery is built into the box price, so the customer pays it. This is the customer-funded rule.</p>`],
 ['Operations','What if the Afya Check gives a wrong or alarming reading?',`<p>The check is a screening service, not a diagnosis. Advisers follow a script, refer high readings to a clinic, and never sell at that moment. Devices are calibrated on a log. WHO notes that confirming hypertension needs a health professional’s measurement ${c('whoht')}, which is why high readings are referred. Professional liability cover is part of step 15.</p>`],
 ['Operations','How do you protect members’ health data?',`<p>Registration with the Personal Data Protection Commission ${c('pdpc')} (the certificate lasts five years ${c('pdpr')}). We take written consent for readings, use role-based access (advisers see a reading only while serving that member, founders see totals), log every view, and require two-factor sign-in.</p>`],
 ['Business','Why would families pay for a box instead of buying item by item?',`<p>Because the needs repeat every month (nappies, strips, needles, pads) and running out is costly and stressful. Delivery is inside the price, brands can be swapped up to 12 days before month end, and longer plans cost less (6-month factor ${A.members.plans.m6}, 12-month factor ${A.members.plans.m12}). <b>Untested:</b> demand has not yet been validated in Dar es Salaam. Phase 0 interviews test it, and tranche 3 depends on reaching 100 members.</p>`],
 ['Business','How will you get the first members?',`<p>From the store: about ${A.check.checks_day_m12} free checks a day by month 12 with a ${f.pct(A.check.check_to_purchase)} check-to-purchase rate, every check ending with a no-pressure box offer; launch marketing (${f.m((A.seed.use.find(x=>/marketing/i.test(x[0]))||[0,0])[1])}); clinic referral partners; and diaspora families paying for parents. Members join from store customers and Afya Check users, with ${f.pct(A.members.monthly_churn)} leaving each month. The base model reaches ${nf(b.months[11].members)} members by month 12.</p>`],
 ['Business','What stops pharmacies or supermarkets from copying you?',`<p>Any single feature can be copied. The combination is harder to copy: a membership that plans each month, free checks with advice, very fast payment, one honest price on every channel, and registered-only curation. Members are locked in by saved baskets, swaps and reminders rather than by discounts.</p>`],
 ['Business','Is the flagship store worth its cost?',`<p>The flagship is the brand’s showroom and the entrance to the free check, so visibility drives visitors. Fit-out and signage are budgeted at ${f.m((A.seed.use.find(x=>/fit-out/i.test(x[0]))||[0,0])[1])} and the 6-month lease advance at ${f.m((A.seed.use.find(x=>/lease advance/i.test(x[0]))||[0,0])[1])}, both planning estimates. Phase 0 quotations will confirm or change the design before tranche 1 is spent.${ISL()?'':' Investors who prefer lower risk can select the start-small option with the switch in the menu.'}</p>`],
 ['Business','How does the plan reach 47 stores?',`<p>Store by store: ${A.growth.stores_by_year.join(', ')} stores in years 1–12, each new store costing about ${f.m(A.growth.new_store_capex)}. The base model reaches about ${f.b(b.years[11].revenue)} revenue in Year 12, with EBITDA positive from Year ${b.years.findIndex(y=>y.ebitda>0)+1}. Growth beyond Store #1 needs later funding rounds and is <b>not</b> paid for by this seed.</p>`],
 ['Team','Are staff costs complete?',`<p>The flagship model carries ${tz(A.opex_month.staff)} a month for ${staff} people, including employer on-costs: NSSF at 10% of wages (the employer half of the 20% total ${c('nssf')}) and WCF at 0.5% ${c('wcf')}. Not yet included: a pharmacist (option B only) and governance costs (independent adviser, accountant).</p>`],
 ['Team','Who are the founders and how do they split ownership?',`<p>Fahmy Abbas Cothema and Cecilia. Together they keep at least 25% for life. The split between them is an <b>open question</b> to be agreed and written into the shareholders’ agreement before closing.</p>`],
 ['Team','Is the company registered yet?',`<p>The data room lists the certificate of incorporation as <b>to be provided</b>. The founders will confirm the registration status of Afya Basics Simple Solution Ltd. If it is not yet incorporated, step 1 of the setup plan does it through BRELA’s online service ${c('brela')}.</p>`],
 ['Risk','What is the biggest risk?',`<p>The three highest-priority items in the register are an unfunded Phase 0 gap, a delayed sector permit, and slower-than-planned box membership. Each has an owner, an early warning sign and an answer in section 7.3, and the tranche structure means investor money is released only as these risks are retired.</p>`],
 ['Risk','What can I verify myself today?',`<p>Every cited source (master list below), the master model numbers (they update across the site), and the regulatory steps on official pages. During Phase 0, investors may join the Dar es Salaam research, review the price survey, meet the lawyer and visit candidate sites.</p>`]
]}
const DROOM=[
 ['About the business','Investor showroom (this website)','ex','Draft, ready for the founders’ review'],
 ['About the business','Master framework (vision, section map, decisions)','ex','Dated 31 October 2026, approved by Fahmy'],
 ['About the business','Master model, corrected November 2026 (planning estimates)','ex','Live in this site; spreadsheet export to be prepared'],
 ['About the business','Concept image library','ex','Labelled “concept”; not real photos'],
 ['About the business','Earlier 60-chapter lab (archive)','ex','Kept online until replaced'],
 ['Company & legal','Certificate of incorporation, MEMARTS, UBO filing','pr','Status to be confirmed by the founders'],
 ['Company & legal','TIN certificate and VAT registration','pr','After incorporation'],
 ['Company & legal','Shareholders’ agreement incl. founders’ 25% floor and reserved matters','pr','Lawyer draft before the term sheet'],
 ['Company & legal','Legal opinion: regulatory pathway and 2025 non-citizen order','pr','Condition before closing'],
 ['Company & legal','Founders’ CVs and IDs','pr','Founders to supply'],
 ['Research & numbers','Phase 0 research report (prices, brands, rents, interviews)','pr','Output of the Dar es Salaam trip'],
 ['Research & numbers','Reconciled master model spreadsheet (Step 2)','pr','Including the Phase 0 gap decision'],
 ['Research & numbers','Supplier shortlist with quotations and TMDA registration status','pr','India and China trips'],
 ['Research & numbers','Fit-out, technology and insurance quotations','pr','Replaces planning estimates'],
 ['Research & numbers','Location shortlist with scores and photos','pr','No lease signed; no address chosen'],
 ['Governance','Board charter, delegation of authority, access policy','pr','Proposal in section 7.2, to be adopted'],
 ['Governance','Risk register (export of section 7.3)','pr','Re-scored quarterly by the board'],
 ['Governance','Data protection policy and consent forms','pr','For PDPC registration'],
 ['After funding','Signed lease','af','Tranche 1'],
 ['After funding','TMDA premises registration and business permit','af','Before tranche 2'],
 ['After funding','Business licence, fire certificate, OSHA registration','af','Before opening'],
 ['After funding','NSSF, WCF and PDPC certificates','af','On hiring and before collecting data'],
 ['After funding','Bank and payment merchant agreements','af','Before opening'],
 ['After funding','Monthly investor packs and the 21:00 reports','af','From month 1']
];
const OPENQ=[
 ['Framework','#f2c96b','Canva Business payment confirmed, so Step 1 (brand) can start','Settled at Step 1 · brand foundation'],
 ['Framework','#f2c96b','Seed amount after pre-launch costs, lease advances and losses to break-even','Settled in the corrected master model (Nov 2026): one seed amount for each store option, selected with the switch in the menu'],
 ['Framework','#f2c96b','Phase 0 costs: added to the seed round, or pre-funded by the founders?','Settled before the term sheet (section 7.1 shows three options)'],
 ['Framework','#f2c96b','Share split between Fahmy and Cecilia within the founders’ 25%+','Settled in the shareholders’ agreement'],
 ['Framework','#f2c96b','Flagship location shortlist in Dar es Salaam','Settled after the Dar es Salaam research trip (scoring tool in 7.1)'],
 ['Framework','#f2c96b','Who checks the Kiswahili text','Settled before launch'],
 ['Found in Part 7','#5fbf8f','Launch with or without a medicines counter, and the pharmacist salary','Settled (Nov 2026): no medicines counter; medicines come from a licensed partner pharmacy (section 4.5), so no pharmacist salary is needed'],
 ['Found in Part 7','#5fbf8f','Employer on-costs (NSSF employer share, WCF) in the staff line','Settled: NSSF 10% and WCF 0.5% included (Nov 2026)'],
 ['Found in Part 7','#5fbf8f','Is model revenue before or after VAT?','Settled: revenue is net of 18% VAT; registration from Year 1'],
 ['Found in Part 7','#5fbf8f','Tranche 3 milestone: 100 members and a monthly loss below TSh 16M, both reached in month 3 of the corrected base model','Aligned'],
 ['Found in Part 7','#5fbf8f','Downside Year 1 loss is larger than the working-capital reserve','Agree cost triggers or a bridge in advance'],
 ['Found in Part 7','#5fbf8f','Legal opinion on the 2025 non-citizen order if a foreign investor joins','Before closing'],
 ['Found in Part 7','#5fbf8f','Registration status of Afya Basics Simple Solution Ltd','Founders to confirm'],
 ['Found in Part 7','#5fbf8f','Governance costs (independent adviser fee, accountant, audit) not yet in the model','For the model check']
];
function gatherSources(){const out=new Map();const add=(t,u,sec)=>{if(!u||!/^https?:\/\//.test(u))return;const k=u.replace(/\/+$/,'').toLowerCase();if(!out.has(k))out.set(k,{t:t||u,u,secs:new Set()});const o=out.get(k);if(t&&t.length>o.t.length&&t!=='Source')o.t=t;o.secs.add(sec)};
 try{if(typeof SRC!=='undefined')Object.values(SRC).forEach(x=>add(x[0],x[1],'1.1'))}catch(e){}
 const dp=new DOMParser();
 ALL.forEach((sx,i)=>{if(sx.id==='s7-5')return;const S=window.SECTIONS[sx.id];if(!S||typeof S.render!=='function')return;
  try{const html=S.render(sx,sx.part,ALL[i-1],ALL[i+1]);const doc=dp.parseFromString(html,'text/html');
   doc.querySelectorAll('.srcs a').forEach(a=>add(a.textContent.trim(),a.getAttribute('href'),sx.no));
   doc.querySelectorAll('a.cite').forEach(a=>add((a.getAttribute('title')||'').trim(),a.getAttribute('href'),sx.no))}catch(e){}});
 Object.values(S7).forEach(x=>{const k=x[1].replace(/\/+$/,'').toLowerCase();if(!out.has(k))add(x[0],x[1],'7')});
 return [...out.values()].sort((a,b)=>a.t.localeCompare(b.t))}

window.SECTIONS['s7-5']={
 render(s,p,pv,nx){const {c,src}=citer(K75);const md=M(),f=F(),A=md.inputs;const Q=QA(c);window.__p7Q=Q;
  const cats=[...new Set(Q.map(q=>q[0]))];const ex=DROOM.filter(d=>d[2]==='ex').length,pr=DROOM.filter(d=>d[2]==='pr').length,af=DROOM.filter(d=>d[2]==='af').length;
  const built=ALL.filter(x=>window.SECTIONS[x.id]||x.id==='s1-1'||x.id==='s0-1').length;
  const stL={ex:'Exists now',pr:'To prepare',af:'After funding'};
  return secShell({s,p,pv,nx,cls:'p7',img:'img/interior.webp',imgAlt:'Concept image of the Afya Basics store interior, with lounge chairs and the Afya Check kiosk by the glass',
   h1:'Investor questions,',em:'answered with evidence.',
   lede:`This section is for due diligence: ${Q.length} investor questions with sourced answers, the data-room index (what exists today and what is still to come), the open questions still to settle, and a master list of every source used across the showroom.`,
   mods:[
    ['The problem it solves · trust is earned with proof',`
     <div class="plain"><span class="modno" style="margin:0 0 12px">In plain words</span><ol>
      <li><b>The proposition is new.</b> A new brand, a new store format and a membership not yet tested in Dar es Salaam. Unverified claims are priced in as risk.</li>
      <li><b>Inconsistent numbers erode trust fastest.</b> Every figure here therefore comes from one model, and every fact from a cited page.</li>
      <li><b>Documents must exist before they are claimed.</b> The data room below separates what exists now from what is still to be prepared.</li>
      <li><b>Open questions are disclosed, not discovered.</b> Each is listed with the step at which it will be settled.</li></ol></div>`],
    ['Our answer · a proof pack in four parts',`
     <div class="pillars p7grid4">
      <div class="pill"><span class="k">01 · Q&amp;A</span><b>${Q.length} hard questions</b><p>Searchable answers with live model numbers and cited rules, including the difficult questions.</p></div>
      <div class="pill"><span class="k">02 · DATA ROOM</span><b>${DROOM.length} documents</b><p>${ex} exist now, ${pr} to prepare before closing, ${af} after funding. Each line shows its status.</p></div>
      <div class="pill"><span class="k">03 · OPEN QUESTIONS</span><b>${OPENQ.length} items</b><p>Six from the framework and eight found while building this part, each with when it is settled.</p></div>
      <div class="pill"><span class="k">04 · SOURCES</span><b id="p7srcN">All sources</b><p>Gathered live from every built section and deduplicated, with the sections that use each one.</p></div>
     </div>`],
    ['How it works · four ways to verify',`
     <div class="flow">
      <div class="step"><span class="t">01</span><b>Read</b><p>Each section ends with its sources. Each number links back to the master model.</p></div>
      <div class="step"><span class="t">02</span><b>Check the source</b><p>Open any citation. Official pages come first (TMDA, TRA, BRELA, WHO, NBS, UN).</p></div>
      <div class="step"><span class="t">03</span><b>Test the model</b><p>Switch scenarios and move the sliders in sections 6.1, 7.1, 7.2 and 7.4. The numbers stay consistent everywhere.</p></div>
      <div class="step"><span class="t">04</span><b>Ask and visit</b><p>Use the questions below, ask in person, or join the Phase 0 research in Dar es Salaam.</p></div>
     </div>
     ${p7ed({f:'team',alt:'Afya Basics health advisers in royal green uniforms at the corner counter',cap:'the people you can question',k:'Step 04 in practice',h:'Verify the team <em>in person</em>.',
       body:`<p>Everything on this site can be checked remotely: every number traces to the master model and every fact to a cited page. Due diligence should also include the people. During Phase 0 the founders will host investors in Dar es Salaam: walk the shortlisted sites, sit in on supplier calls, and see the price survey receipts in the data room.</p>
        <ul><li><b>Before the round closes:</b> the reconciled master model, the Phase 0 research report and the legal opinion are added to the data room (see the list below).</li>
        <li><b>After opening:</b> any investor can take a free Afya Check, read the 21:00 report for a week and talk to the store lead, with no notice needed.</li>
        <li><b>Always:</b> the open questions stay listed until they are settled, with the step at which each will be decided.</li></ul>`})}`],
    ['Tool · investor Q&A',`
     <input class="p7search" id="p7qq" type="search" placeholder="Search the questions (e.g. pharmacist, tranche, downside, VAT)" aria-label="Search investor questions">
     <div class="p7btns" id="p7qc" style="margin-top:12px"><button type="button" class="p7b on" data-c="">All <small>${Q.length}</small></button>${cats.map(k=>`<button type="button" class="p7b" data-c="${esc(k)}">${esc(k)} <small>${Q.filter(q=>q[0]===k).length}</small></button>`).join('')}<button type="button" class="p7b" id="p7qall">Open all</button></div>
     <div class="p7qa" id="p7qa">${Q.map((q,i)=>`<div class="p7q" data-c="${esc(q[0])}"><button type="button" aria-expanded="false" aria-controls="p7a${i}"><small>Q${String(i+1).padStart(2,'0')}</small><b>${esc(q[1])}</b><i aria-hidden="true">+</i></button><div class="p7a" id="p7a${i}">${q[2]}<span class="p7chip">${esc(q[0])}</span></div></div>`).join('')}</div>
     <p class="p7rcount" id="p7qn"></p>`,'p7-qa'],
    ['The experience · the data-room index',`
     <p class="p7lead">What an investor can open today, and what will be added and when. <b>Only the first group exists now.</b> Every other line is a commitment with a due point, not a claim.</p>
     <div class="p7btns" id="p7drf" style="margin-bottom:12px"><button type="button" class="p7b on" data-s="">All <small>${DROOM.length}</small></button><button type="button" class="p7b" data-s="ex">Exists now <small>${ex}</small></button><button type="button" class="p7b" data-s="pr">To prepare <small>${pr}</small></button><button type="button" class="p7b" data-s="af">After funding <small>${af}</small></button></div>
     <div class="p7tblw"><table class="p7tbl p7dr p7cards"><thead><tr><th>Document</th><th>Group</th><th>Status</th><th>Note</th></tr></thead><tbody id="p7drb">${DROOM.map(d=>`<tr data-s="${d[2]}"><td data-l="Document"><b>${esc(d[1])}</b></td><td data-l="Group">${esc(d[0])}</td><td class="st ${d[2]}" data-l="Status"><span>${stL[d[2]]}</span></td><td data-l="Note">${esc(d[3])}</td></tr>`).join('')}</tbody></table></div>`],
    ['The open questions',`
     <p class="p7lead">Six questions from the framework (section 13) and eight we found while building this part. Each is settled at the step where it matters.</p>
     <div class="p7oq">${OPENQ.map((o,i)=>`<div class="p7oqc" style="--c:${o[1]}"><small>${String(i+1).padStart(2,'0')} · ${esc(o[0])}</small><b>${esc(o[2])}</b><p>${esc(o[3])}</p></div>`).join('')}</div>`],
    ['The numbers · the proof pack today',`
     <div class="nums">
      <div class="num g"><b>${Q.length}</b><span>investor questions answered</span></div>
      <div class="num"><b>${ex} / ${DROOM.length}</b><span>data-room documents that exist today</span></div>
      <div class="num"><b>${OPENQ.length}</b><span>open questions, each with a settling step</span></div>
      <div class="num"><b id="p7srcN2">–</b><span>unique sources across the showroom</span></div>
      <div class="num"><b>${built} / ${ALL.length}</b><span>sections built at the time this list was gathered</span></div>
     </div>`],
    ['Master sources · every source used across the showroom',`
     <p class="p7lead">Gathered live from every section that is built (its sources list and inline citations), plus section 1.1, then deduplicated by web address. The tags show which sections use each source. Search by publisher, topic or year.</p>
     <input class="p7search" id="p7sq" type="search" placeholder="Search sources (e.g. TMDA, WHO, NBS, 2025)" aria-label="Search sources">
     <ol class="p7srcl" id="p7srcl"><li>Gathering sources…</li></ol>`,'p7-sources'],
    ['Risks and our answer',`
     <div class="risks">
      <div class="risk"><span class="q">An answer here goes out of date as the model changes.</span><span class="ar">→</span><span class="a">Answers draw their numbers live from the model, so they change with it. The wording is reviewed at each model version.</span></div>
      <div class="risk"><span class="q">A cited page moves or changes.</span><span class="ar">→</span><span class="a">Every source shows its publisher and date. Key regulatory pages are saved as PDFs in the data room at each review.</span></div>
      <div class="risk"><span class="q">Some sources are secondary (law firms, advisers), not the regulator.</span><span class="ar">→</span><span class="a">Correct, where the official page does not state the rule. Our lawyer and accountant confirm each one in writing in Phase 0, for example the WCF rate and the TBS retail scope.</span></div>
     </div>`]
   ],
   takeaway:`Every answer is <b>specific, sourced and drawn live from the model</b>. Documents not yet prepared are labelled as such, and every open item has a <b>settling step</b>.`,
   doors:['s6-3','s6-1','s7-3','s1-2'],sources:src})},
 init(){/* Q&A */let qc='',qq='';
  const qdraw=()=>{let n=0;document.querySelectorAll('#p7qa .p7q').forEach(el=>{const t=el.textContent.toLowerCase();const show=(!qc||el.dataset.c===qc)&&(!qq||t.indexOf(qq)>=0);el.hidden=!show;if(show)n++});
   $('p7qn').textContent=`Showing ${n} of ${document.querySelectorAll('#p7qa .p7q').length} questions`;document.querySelectorAll('#p7qc [data-c]').forEach(b=>b.classList.toggle('on',b.dataset.c===qc))};
  document.querySelectorAll('#p7qa .p7q > button').forEach(b=>b.onclick=()=>{const q=b.parentNode,o=!q.classList.contains('open');q.classList.toggle('open',o);b.setAttribute('aria-expanded',String(o))});
  document.querySelectorAll('#p7qc [data-c]').forEach(b=>b.onclick=()=>{qc=b.dataset.c;qdraw()});
  $('p7qq').oninput=e=>{qq=e.target.value.trim().toLowerCase();if(qq)document.querySelectorAll('#p7qa .p7q').forEach(q=>{q.classList.add('open');q.querySelector('button').setAttribute('aria-expanded','true')});qdraw()};
  let allOpen=false;$('p7qall').onclick=()=>{allOpen=!allOpen;$('p7qall').textContent=allOpen?'Close all':'Open all';document.querySelectorAll('#p7qa .p7q').forEach(q=>{q.classList.toggle('open',allOpen);q.querySelector('button').setAttribute('aria-expanded',String(allOpen))})};
  qdraw();
  /* data room */
  document.querySelectorAll('#p7drf button').forEach(b=>b.onclick=()=>{const s=b.dataset.s;document.querySelectorAll('#p7drf button').forEach(x=>x.classList.toggle('on',x===b));document.querySelectorAll('#p7drb tr').forEach(r=>r.style.display=(!s||r.dataset.s===s)?'':'none')});
  /* sources (deferred so the page paints first) */
  setTimeout(()=>{let L=[];try{L=gatherSources()}catch(e){L=Object.values(S7).map(x=>({t:x[0],u:x[1],secs:new Set(['7'])}))}
   const list=$('p7srcl');if(!list)return;
   const draw=q=>{const rows=L.filter(x=>!q||(x.t+' '+x.u).toLowerCase().indexOf(q)>=0);
    list.innerHTML=rows.map(x=>`<li><a href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.t)}</a>${[...x.secs].sort().map(s=>`<span>${esc(s)}</span>`).join('')}</li>`).join('')||'<li>No sources match.</li>'};
   draw('');$('p7srcN').textContent=L.length+' unique sources';$('p7srcN2').textContent=L.length;
   $('p7sq').oninput=e=>draw(e.target.value.trim().toLowerCase())},60)}
};

})();
