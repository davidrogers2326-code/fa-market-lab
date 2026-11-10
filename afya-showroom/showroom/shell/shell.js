/* Afya Basics Investor Showroom · global shell v2 (brief D1, D2).
   Loads after shell/legacy-core.js and all section files. Overrides the old router, index and section frame.
   Every visible string has an English and a Kiswahili value (B8). */
(function(){
'use strict';
const VERSION={no:'2.0',en:'9 November 2026',sw:'9 Novemba 2026'};
const lang=()=>{try{return localStorage.getItem('afyaLang')==='sw'?'sw':'en'}catch(e){return 'en'}};
const T=(en,sw)=>lang()==='sw'?sw:en;
window.AFYA_LANG=lang();
window.ABT=T;
const E=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
window.ABE=E;

/* ---------- funding option (B5): one option at a time; the page reloads so every number follows ---------- */
const isLean=()=>!!(window.MODEL&&MODEL.isLean&&MODEL.isLean());
function setFund(o){if(!window.MODEL||!MODEL.setOpt)return;if((isLean()?'lean':'flag')===o)return;
  try{sessionStorage.setItem('afyaScroll',String(scrollY))}catch(e){}
  try{const m={};document.querySelectorAll('[data-num]').forEach(el=>{m[el.dataset.num]=+el.dataset.val});sessionStorage.setItem('afyaNums',JSON.stringify(m))}catch(e){}
  MODEL.setOpt(o);location.reload()}
const FROM_OPT='s1-3';                          /* D1: the switch is visible from section 1.3 onward */
const showsOpt=id=>{const i=ALL.findIndex(x=>x.id===id),j=ALL.findIndex(x=>x.id===FROM_OPT);return i>=j&&j>=0};

/* ---------- top bar ---------- */
const MARK='<svg viewBox="0 0 48 48" aria-hidden="true"><rect width="48" height="48" rx="12" fill="var(--green)"/><path d="M11 22.5 24 11.7l13 10.8" fill="none" stroke="var(--gold)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 36.5c-6.8-4.2-10.5-8-10.5-11.9 0-2.8 2.2-4.9 4.9-4.9 2.2 0 3.9 1.3 5.6 3.3 1.7-2 3.4-3.3 5.6-3.3 2.7 0 4.9 2.1 4.9 4.9 0 3.9-3.7 7.7-10.5 11.9z" fill="none" stroke="var(--gold)" stroke-width="2.6" stroke-linejoin="round"/></svg>';
function topbar(){const lean=isLean(),l=lang();
 return `<a class="ab-wordmark" href="#s0-1" aria-label="Afya Basics">${MARK}<span>Afya <i>Basics</i></span></a>
 <span class="ab-sp"></span>
 <div class="ab-seg ab-optsw" id="abOpt" role="group" aria-label="${E(T('Funding option','Chaguo la mtaji'))}" hidden>
  <button type="button" data-fund="flag" aria-pressed="${!lean}"><span class="ab-lbl">${E(T('Flagship','Duka kuu'))} </span><b>340M</b></button>
  <button type="button" data-fund="lean" aria-pressed="${lean}"><span class="ab-lbl">${E(T('Start small','Anza kidogo'))} </span><b>150M</b></button>
 </div>
 <div class="ab-seg" role="group" aria-label="${E(T('Language','Lugha'))}">
  <button type="button" data-lang="en" aria-pressed="${l==='en'}" lang="en">EN</button>
  <button type="button" data-lang="sw" aria-pressed="${l==='sw'}" lang="sw">SW</button>
 </div>
 <button class="ab-menu-btn" type="button" id="abMenu" aria-controls="abIndex" aria-expanded="false">${E(T('Sections','Sehemu'))}</button>`}

/* ---------- section index: numbers only on desktop, titles on hover; bottom sheet on phone ---------- */
function indexHTML(cur){let h='<ol>';
 PARTS.forEach(p=>{h+=`<li class="ab-pt">${E(p.n)}<span> · ${E(p.name)}</span></li>`;
  p.s.forEach(x=>{const id='s'+x[0].replace('.','-');h+=`<li><a href="#${id}"${id===cur?' aria-current="page"':''}><b>${E(x[0])}</b><span>${E(x[1])}</span></a></li>`})});
 return h+'</ol>'}
function closeSheet(){document.body.classList.remove('ab-sheet');const b=document.getElementById('abMenu');if(b)b.setAttribute('aria-expanded','false')}

/* ---------- D2 section frame for sections not yet rebuilt (keeps their content, drops the old hero and badges) ---------- */
window.secShell=function(o){const {s,pv,nx}=o;let v3m=[];
 try{const f=(window.V3MODS||{})[s.id];if(f)v3m=f(o)||[]}catch(e){}
 const drop=(window.V3DROP&&window.V3DROP[s.id])||[];
 const mods=(o.mods||[]).filter(m=>!drop.includes(m[0]));
 const head=m=>typeof m==='string'?m:(Array.isArray(m)?T(m[0],m[1]):m);
 return `<article class="ab-sec"><div class="ab-wrap">
  <div class="ab-sec-no">${E(s.no)}</div>
  <h1 id="h-${s.id}">${E(s.title)}</h1>
  ${o.lede?`<p class="ab-summary">${o.lede}</p>`:''}
  ${o.img?`<figure class="ab-visual"><img src="${E(o.img)}" alt="${E(o.imgAlt||'')}" style="width:100%;height:auto;display:block"></figure>`:''}
  <div class="ab-body">
  ${v3m.map(m=>`<section class="ab-block"><h2>${head(m[0])}</h2>${m[1]}</section>`).join('')}
  ${mods.map(m=>`<section class="ab-block"${m[2]?` id="${E(m[2])}"`:''}><h2>${E(m[0])}</h2>${m[1]}</section>`).join('')}
  ${o.takeaway?`<section class="ab-block"><h2>${E(T('What this means for the investment','Maana yake kwa uwekezaji'))}</h2><p>${o.takeaway}</p></section>`:''}
  </div>
  ${sourcesHTML((o.sources||[]).map(x=>({t:x[0],u:x[1]})))}
  ${pagerHTML(pv,nx)}
 </div></article>`};

/* ---------- shared template pieces (used by rebuilt sections too) ---------- */
function sourcesHTML(list){if(!list||!list.length)return '';
 return `<details class="ab-sources"><summary>${E(T('Sources for this section','Vyanzo vya sehemu hii'))} (${list.length})</summary><ol>${list.map(x=>`<li><span lang="${x.lang||'en'}">${x.u?`<a href="${E(x.u)}" target="_blank" rel="noopener">${E(x.t)}</a>`:E(x.t)}</span>${x.chk?` <span class="ab-chk">· ${E(T('checked','imekaguliwa'))} ${E(x.chk)}</span>`:''}</li>`).join('')}</ol></details>`}
function pagerHTML(pv,nx){return `<nav class="ab-pager" aria-label="${E(T('Previous and next section','Sehemu iliyotangulia na inayofuata'))}">${pv?`<a href="#${pv.id}"><small>← ${E(pv.no)}</small><span>${E(pv.title)}</span></a>`:'<span></span>'}${nx?`<a class="ab-nx" href="#${nx.id}"><small>${E(nx.no)} →</small><span>${E(nx.title)}</span></a>`:''}</nav>`}
function figsHTML(list){return `<div class="ab-figs">${list.map(f=>`<div class="ab-fig"><span class="ab-v">${f.v}</span><span class="ab-l">${E(f.l)}</span>${f.s?`<span class="ab-s">${f.s}</span>`:''}</div>`).join('')}</div>`}
function doorsHTML(ids){return `<div class="ab-doors">${ids.map(id=>{const t=ALL.find(x=>x.id===id);return t?`<a href="#${t.id}"><small>${E(t.no)} →</small><span>${E(t.title)}</span></a>`:''}).join('')}</div>`}
function openHTML(items){return items&&items.length?`<section class="ab-block ab-oq"><h2>${E(T('Not yet verified','Bado haijathibitishwa'))}</h2><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul></section>`:''}

/* C6.4 · funding switch: numbers marked <span data-num="key" data-val="123" data-fmt="tsh|tshM|int|pct">…</span>
   count from their value under the previous option to the new one after the switch (static under reduced motion). */
const FMT={tsh:n=>'TSh '+Math.round(n).toLocaleString('en-US'),tshM:n=>'TSh '+(Math.abs(n)>=1e9?(n/1e9).toFixed(2)+(lang()==='sw'?' bilioni':'B'):Math.round(n/1e6)+(lang()==='sw'?' milioni':'M')),int:n=>Math.round(n).toLocaleString('en-US'),pct:n=>(Math.round(n*10)/10)+'%'};
function numHTML(key,val,fmt){fmt=fmt||'tsh';return `<span data-num="${E(key)}" data-val="${val}" data-fmt="${fmt}">${(FMT[fmt]||FMT.tsh)(val)}</span>`}
function animateNums(){let prev=null;try{prev=JSON.parse(sessionStorage.getItem('afyaNums')||'null');sessionStorage.removeItem('afyaNums')}catch(e){}
 if(!prev||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const els=[...document.querySelectorAll('[data-num]')].filter(el=>prev[el.dataset.num]!=null&&prev[el.dataset.num]!==+el.dataset.val);if(!els.length)return;
 const t0=performance.now(),D=700;(function f(t){const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);
  els.forEach(el=>{const a=prev[el.dataset.num],b=+el.dataset.val;el.textContent=(FMT[el.dataset.fmt]||FMT.tsh)(a+(b-a)*e)});if(k<1)requestAnimationFrame(f)})(t0)}
window.AB={T,E,sourcesHTML,pagerHTML,figsHTML,doorsHTML,openHTML,isLean,VERSION,numHTML,FMT};

/* ---------- router ---------- */
window.section=function(id){const i=ALL.findIndex(x=>x.id===id),s=ALL[i],p=s.part,pv=ALL[i-1],nx=ALL[i+1];
 const S=window.SECTIONS[id];let html='';
 if(S){try{html=S.render(s,p,pv,nx)}catch(e){console.error(e);html=''}}
 if(!html)html=window.secShell({s,p,pv,nx,lede:E(s.plan)});
 return S&&S.v2?html:`<div class="ab-legacy">${html}</div>`};
window.rail=function(){};window.closeIndex=function(){};
window.route=function(){applyLang();window.AFYA_LANG=lang();
 let id=(location.hash||'').slice(1);if(!ALL.some(x=>x.id===id))id='s0-1';
 window.dispatchEvent(new Event('afya:leave'));
 const app=document.getElementById('app');app.innerHTML=window.section(id);
 document.getElementById('abIndex').innerHTML=indexHTML(id);
 const opt=document.getElementById('abOpt');if(opt)opt.hidden=!showsOpt(id);
 const cur=ALL.find(x=>x.id===id);document.title=(cur?cur.no+' '+cur.title+' · ':'')+'Afya Basics';
 closeSheet();
 let y=0;try{y=+sessionStorage.getItem('afyaScroll')||0;sessionStorage.removeItem('afyaScroll')}catch(e){}
 window.scrollTo(0,y);
 const S=window.SECTIONS[id];if(S&&S.init){try{S.init()}catch(e){console.error(e)}}
 window.dispatchEvent(new Event('afya:route'));animateNums()};

function paintChrome(){document.documentElement.lang=lang();
 document.getElementById('abTop').innerHTML=topbar();
 document.getElementById('abFoot').innerHTML=`${E(T('Version','Toleo'))} ${VERSION.no} · ${E(T(VERSION.en,VERSION.sw))} · ${E(T('Figures marked “estimate” are planning estimates from the Afya Basics financial model.','Takwimu zilizoandikwa “makadirio” ni makadirio ya mipango kutoka modeli ya fedha ya Afya Basics.'))}`}

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-lang],[data-fund],#abMenu');if(!t)return;
 if(t.dataset.lang){const l=t.dataset.lang;if(l===lang())return;try{localStorage.setItem('afyaLang',l)}catch(e){}try{sessionStorage.setItem('afyaScroll',String(scrollY))}catch(e){}location.reload();return}
 if(t.dataset.fund){setFund(t.dataset.fund);return}
 if(t.id==='abMenu'){const on=document.body.classList.toggle('ab-sheet');t.setAttribute('aria-expanded',String(on))}});
document.getElementById('abScrim').addEventListener('click',closeSheet);
addEventListener('keydown',e=>{if(e.key==='Escape')closeSheet()});
addEventListener('hashchange',window.route);
paintChrome();window.route();
})();
