/* AB_BOXPRICE · one shared "from" price for every Afya Box, so that no section carries its own package prices.
   AB_BOXPRICE(slug,{plan:'m1'|'m6'|'m12', stage?}) → {from, per:{en,sw}, months, stage, label, shelf, missing, first, slug}
   from  = the lowest member price across the box's repeat stages (first boxes excluded) for that plan, with the
           default brands, computed exactly as section 3.5 does (stageLines + priceStage, regular tier):
           items with kind "medicine" or optional:true are left out; an item without a sourced price counts 0
           (the count is returned as `missing`); D4 core price, no partner service fee.
   per   = the delivery rhythm of that stage (a stage's own delivery_mode or delivery wins over the box's).
   stage = price one named stage instead of the lowest repeat stage.
   first = the lowest first-box price, for pages that need it ({from, per, stage}) or null.
   Data: window.AFYA_DATA (sections/data.js); formula: window.AFYA_D4 (shell/d4.js). Returns null when either is missing. */
(function(){
'use strict';
const D4=()=>window.AFYA_D4,DATA=()=>window.AFYA_DATA||{boxes:{}};

/* the same lines and price as s35.js stageLines/priceStage, with the default brand and the regular tier */
function brandOf(it){const bs=it.brands||[];return bs.find(b=>b.default)||bs[0]||null}
function stageLines(stage){return (stage.items||[]).filter(it=>it.kind!=='medicine'&&!it.optional).map(it=>{const b=brandOf(it);return {it,b,cost:D4().lineCost(b,it.units)}})}
function priceStage(stage,plan){const lines=stageLines(stage),shelf=D4().shelfValue(lines),missing=lines.filter(l=>l.cost==null).length;
 const r=D4().price(shelf,plan,[]);return Object.assign(r,{missing})}

/* delivery rhythm of one stage */
const R={
 month:{en:'a month',sw:'kwa mwezi',months:1},
 two:{en:'per two-month box',sw:'kwa boksi la miezi miwili',months:2},
 three:{en:'per three-month box',sw:'kwa boksi la miezi mitatu',months:3},
 tri:{en:'per trimester box',sw:'kwa boksi la miezi mitatu ya ujauzito',months:3},
 refill:{en:'per refill, every 3 months',sw:'kwa kujaza tena, kila miezi 3',months:3},
 once:{en:'per box, delivered once',sw:'kwa boksi, linaletwa mara moja',months:null}};
function rhythm(b,stage){const dm=stage.delivery_mode,lab=(stage.label&&stage.label.en)||'';
 if(dm&&typeof dm==='object'){const t=dm.en||'';
  if(/every 3 months/i.test(t))return /refill/i.test(lab)?R.refill:R.three;
  if(/every 2 months/i.test(t))return R.two;
  if(/^once/i.test(t))return R.once;
  return R.month}
 const d=typeof stage.delivery==='string'?stage.delivery:b.delivery;
 return d==='per-trimester'?R.tri:d==='every-3-months'?R.three:d==='every-2-months'?R.two:R.month}

/* a first box carries one-off starter goods; the repeat boxes are what a member pays month after month */
function isFirst(b,stage){if(b.delivery==='per-trimester')return false;const lab=(stage.label&&stage.label.en)||'';
 if(/1$/.test(stage.key)||/first box/i.test(lab)||/^Month 1\b/.test(lab))return true;
 /* a one-off stage (a complete kit) next to stages that repeat (its refills) */
 return rhythm(b,stage)===R.once&&b.stages.some(s=>rhythm(b,s)!==R.once)}

const pick=(b,stages,plan)=>{let best=null;for(const s of stages){const r=priceStage(s,plan);if(!best||r.core<best.r.core)best={s,r}}return best};
const out=(b,x)=>{const rh=rhythm(b,x.s);return {from:x.r.core,per:{en:rh.en,sw:rh.sw},months:rh.months,stage:x.s.key,label:x.s.label,shelf:x.r.shelf,missing:x.r.missing}};

function AB_BOXPRICE(slug,opts){opts=opts||{};const plan=opts.plan||'m12';if(!D4())return null;
 const b=DATA().boxes&&DATA().boxes[slug];if(!b||!b.final||!(b.stages||[]).length)return null;
 if(opts.stage){const s=b.stages.find(x=>x.key===opts.stage);if(!s)return null;return Object.assign(out(b,{s,r:priceStage(s,plan)}),{first:null,slug})}
 const rep=b.stages.filter(s=>!isFirst(b,s)),first=b.stages.filter(s=>isFirst(b,s));
 const best=pick(b,rep.length?rep:b.stages,plan),f=first.length?pick(b,first,plan):null;
 const fo=f?out(b,f):null;
 return Object.assign(out(b,best),{first:fo?{from:fo.from,per:fo.per,stage:fo.stage}:null,slug})}

/* old package keys used before the box files existed → box slugs */
AB_BOXPRICE.SLUG={preg:'mama-mjamzito',mama:'mama-na-mtoto',shule:'afya-shule',binti:'binti',kijana:'kijana',glow:'afya-glow',siku:'afya-siku',man:'afya-men',home:'nyumbani',aid:'huduma-ya-kwanza',senior:'bibi-na-babu',rec:'kupona',sugar:'sukari',presha:'presha',kidney:'figo',kz:'afya-kazini',office:'afya-kazini',biashara:'afya-biashara',hotel:'afya-hoteli'};
AB_BOXPRICE.rhythm=rhythm;
window.AB_BOXPRICE=AB_BOXPRICE;
})();
