/* D3 package page template (brief D3). One page per box, the ten steps always in the same order.
   A package without a finished item list (R6) shows steps 1–3 and the "item list in research" notice only;
   placeholder items are never shown as real. Data shape = data/boxes/<slug>.json (written in Phase 3):
   { slug, name:{en,sw}, renders:{closed,open}, who:{en,sw} (HTML), guidance:[{t,u}],
     items:[{name:{en,sw}, why:{en,sw}, qty:{en,sw}, brands:[{name,price,src,chk}], choice:{name,price,src}}],
     services:[...], tiers:[...], packing:{video,poster,captions}, final:true|false } */
(function(){
'use strict';
const A=()=>window.AB;
const L=o=>o==null?'':(typeof o==='string'?o:(window.AFYA_LANG==='sw'?(o.sw||''):(o.en||'')));
const STEPS=[['Closed box','Boksi limefungwa'],['The box opens','Boksi linafunguka'],['Who it is for and why','Ni la nani na kwa nini'],
 ['Every item, line by line','Kila kitu, mstari kwa mstari'],['Services inside this box','Huduma ndani ya boksi hili'],['Three tiers','Ngazi tatu'],
 ['Build your box','Jenga boksi lako'],['How it is packed','Jinsi linavyofungashwa'],['Reminders and swaps','Vikumbusho na kubadilisha'],['Next box','Boksi linalofuata']];
function step(n,body){const T=A().T,E=A().E;return `<section class="ab-pkg-step" data-step="${n}"><div class="ab-k">${n}</div><h2>${E(T(STEPS[n-1][0],STEPS[n-1][1]))}</h2>${body}</section>`}
function packagePage(d,parts){const T=A().T,E=A().E;parts=parts||{};const final=!!(d.final&&d.items&&d.items.length);
 let h=step(1,parts.closed||(d.renders&&d.renders.closed?`<img src="${E(d.renders.closed)}" alt="${E(L(d.altClosed))}" style="width:100%;height:auto;display:block">`:''));
 h+=step(2,parts.opens||'');
 h+=step(3,`<div class="ab-body">${L(d.who)}</div>`);
 if(!final){h+=`<p class="ab-notice">${E(T('Item list in research. The items, brand choices and sourced prices for this box are published here once the research is complete.','Orodha ya vitu inafanyiwa utafiti. Vitu, chaguo za chapa na bei zenye vyanzo za boksi hili zitachapishwa hapa utafiti ukikamilika.'))}</p>`;return h}
 for(let n=4;n<=10;n++)h+=step(n,parts['s'+n]||'');
 return h}

/* C6.1 The Box Opens, shared by 0.1 and every package page.
   cfg: {id, head:HTML, closed, open, altClosed:{en,sw}|string, altOpen, tags:[[[itemX,itemY],[labelX,labelY],en,sw]], note:HTML} */
function boxOpens(cfg){const T=A().T,E=A().E,id=cfg.id||'abBox',tags=cfg.tags||[];
 const tagsHTML=tags.map((t,i)=>`<i class="ab-ln" data-i="${i}" style="left:${t[1][0]}%;top:${Math.min(t[0][1],t[1][1])}%;height:${Math.abs(t[1][1]-t[0][1])}%"></i><div class="ab-tag" data-i="${i}" style="left:${t[1][0]}%;top:${t[1][1]}%">${E(T(t[2],t[3]))}</div><b class="ab-dot" data-i="${i}" style="left:${t[0][0]}%;top:${t[0][1]}%">${i+1}</b>`).join('');
 const legend=tags.length?`<ol class="ab-legend" aria-hidden="true">${tags.map(t=>`<li>${E(T(t[2],t[3]))}</li>`).join('')}</ol>`:'';
 const media=cfg.closed?`<div class="ab-frame" data-frame>
    <img class="ab-render" src="${E(cfg.closed)}" width="1376" height="768" alt="${E(L(cfg.altClosed))}">
    ${cfg.open?`<img class="ab-render ab-open" data-open src="${E(cfg.open)}" width="1376" height="768" alt="${E(L(cfg.altOpen))}">`:''}
    <div class="ab-tags" aria-hidden="true">${tagsHTML}</div></div>${legend}`
  :`<div class="ab-frame ab-img-out" data-frame>${E(T('Box render in production','Picha ya boksi inaandaliwa'))}</div>`;
 return `<section class="ab-boxopens" id="${id}" data-boxopens aria-label="${E(T('The Afya Box opens','Afya Box inafunguka'))}">
  <div class="ab-stage"><div class="ab-head">${cfg.head||''}</div>
   <div class="ab-world">${media}</div>
   <div class="ab-hint" aria-hidden="true"><span>${E(T('Closed','Limefungwa'))}</span><div class="ab-track"><i data-prog></i></div><span>${E(T('Open','Liko wazi'))}</span></div>
  </div></section>${cfg.note?`<p class="ab-notice">${cfg.note}</p>`:''}`}
function initBoxOpens(id){const box=document.getElementById(id||'abBox');if(!box)return;
 const frame=box.querySelector('[data-frame]'),open=box.querySelector('[data-open]'),prog=box.querySelector('[data-prog]'),
  tags=[...box.querySelectorAll('.ab-tag')],lns=[...box.querySelectorAll('.ab-ln')],dots=[...box.querySelectorAll('.ab-dot')],lis=[...box.querySelectorAll('.ab-legend li')];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const update=()=>{const r=box.getBoundingClientRect(),total=Math.max(1,box.offsetHeight-innerHeight);const p=reduce?1:Math.min(1,Math.max(0,-r.top/total));
  if(prog)prog.style.width=(p*100)+'%';
  if(frame)frame.style.transform=reduce?'none':`scale(${(0.92+0.08*Math.min(1,p/0.35)).toFixed(3)})`;
  if(open)open.style.opacity=Math.min(1,Math.max(0,(p-0.3)/0.25)).toFixed(3);
  tags.forEach((t,i)=>{const q=Math.min(1,Math.max(0,(p-(0.5+i*0.05))/0.1));t.style.opacity=q.toFixed(3);t.style.transform=`translate(-50%,${((1-q)*10).toFixed(1)}px)`;[lns[i],dots[i],lis[i]].forEach(x=>{if(x)x.style.opacity=q.toFixed(3)})})};
 addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
 addEventListener('afya:leave',()=>{removeEventListener('scroll',update);removeEventListener('resize',update)},{once:true});
 update()}
window.AB_PKG={STEPS,packagePage,boxOpens,initBoxOpens,L};
})();
