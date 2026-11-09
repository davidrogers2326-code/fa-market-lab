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
window.AB_PKG={STEPS,packagePage};
})();
