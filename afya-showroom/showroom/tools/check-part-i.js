/* Part I · quality checklist (brief Part I), automated where a machine can check it.
   Renders every section in EN and SW, at 1280 and 360 px, in both funding options, and reports each check.
   Usage: node tools/check-part-i.js   (server on http://127.0.0.1:8765)   Writes tools/part-i-report.json */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const TOKENS=['rgb(0, 0, 0)','rgb(10, 10, 10)','rgb(38, 38, 38)','rgb(242, 240, 234)','rgb(142, 140, 133)','rgb(14, 107, 58)','rgb(8, 63, 35)','rgb(21, 147, 79)','rgb(201, 162, 39)'];
const PROCESS=/\b(claude|anthropic|chatgpt|openai|weavy|canva|figma|subagent|draft · ready|master framework|pilot code|research phase|the brief|AI[- ]generated|AI video|signed off)\b/i;
const MED=/\b((we|Afya) (sells?|stocks?) (medicines?|tablets|paracetamol|ibuprofen|antibiotics|syrups?)|Afya pharmacist|own-label medicines?|Afya own-label (paracetamol|ibuprofen))\b/i;
const REL=/\b(wife|husband|married|spouse|mke wa|mume wa|ndoa)\b/i;
const HOLD=fs.readFileSync(path.join(__dirname,'..','shell','compat.js'),'utf8').match(/new Set\(\[([\s\S]*?)\]\)/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
(async()=>{const b=await chromium.launch();const R={sections:{},global:{}};const issue=(id,k,v)=>{(R.sections[id]=R.sections[id]||{})[k]=v};
 for(const opt of ['flag','lean'])for(const lang of ['en','sw'])for(const w of [1280,360]){
  const ctx=await b.newContext({viewport:{width:w,height:800},reducedMotion:'reduce'});
  await ctx.addInitScript(([l,o])=>{try{localStorage.setItem('afyaLang',l);localStorage.setItem('afyaOpt',o)}catch(e){}},[lang,opt]);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));const ext=new Set();
  p.on('request',r=>{const u=r.url();if(!/^http:\/\/127\.0\.0\.1|^data:|fonts\.(googleapis|gstatic)\.com/.test(u))ext.add(u.split('?')[0])});
  await p.goto('http://127.0.0.1:8765/index.html#s0-1',{waitUntil:'load'});
  const ids=await p.evaluate(()=>ALL.map(x=>x.id));
  for(const id of ids){errs.length=0;await p.evaluate(i=>{location.hash=i},id);await p.waitForTimeout(500);
   const r=await p.evaluate(({TOKENS,HOLD})=>{const app=document.getElementById('app');const legacy=!!app.querySelector('.ab-legacy');
    const text=app.innerText;const out={legacy,len:text.length,hscroll:document.documentElement.scrollWidth>innerWidth};
    const bad=new Set();let glow=0,grad=0;
    if(!legacy)app.querySelectorAll('*').forEach(el=>{if(el.closest('svg image,img,video,.ab-swatch,[data-swatch]'))return;const cs=getComputedStyle(el);
     for(const pr of ['color','backgroundColor','borderTopColor']){const c=cs[pr];if(!c||c==='rgba(0, 0, 0, 0)'||c==='transparent')continue;const m=c.match(/rgba?\((\d+), (\d+), (\d+)/);if(!m)continue;const base=`rgb(${m[1]}, ${m[2]}, ${m[3]})`;if(!TOKENS.includes(base))bad.add(base)}
     if(cs.boxShadow&&cs.boxShadow!=='none')glow++;if(cs.textShadow&&cs.textShadow!=='none')glow++;if((cs.webkitBackgroundClip||cs.backgroundClip)==='text')grad++});
    out.offPalette=[...bad].slice(0,8);out.glow=glow;out.gradText=grad;
    out.imgsNoAlt=[...app.querySelectorAll('img')].filter(i=>!i.getAttribute('alt')).length;
    out.held=[...app.querySelectorAll('img')].map(i=>(i.getAttribute('src')||'').match(/([^\/]+)\.(webp|png|jpe?g)/)).filter(m=>m&&HOLD.includes(m[1])).map(m=>m[1]);
    out.autoplay=[...app.querySelectorAll('video')].filter(v=>v.autoplay&&!v.muted).length;
    out.bothOptions=/340\s?M[\s\S]{0,80}150\s?M|150\s?M[\s\S]{0,80}340\s?M/.test(text.replace(/Flagship 340M\s*Start small 150M/g,''));
    out.text=text;return out},{TOKENS,HOLD});
   const key=`${opt}/${lang}/${w}`;const t=r.text;delete r.text;
   const flags={};if(errs.length)flags.errors=errs.slice(0,3);if(r.hscroll)flags.hscroll=true;
   if(PROCESS.test(t))flags.process=t.match(PROCESS)[0];if(MED.test(t))flags.medicine=t.match(MED)[0];if(REL.test(t))flags.relationship=t.match(REL)[0];
   if(/boda ?boda (kit|box)|transport kit/i.test(t))flags.boda=true;
   if(!r.legacy){if(r.offPalette.length)flags.offPalette=r.offPalette;if(r.glow)flags.glow=r.glow;if(r.gradText)flags.gradText=r.gradText}
   if(r.imgsNoAlt)flags.imgsNoAlt=r.imgsNoAlt;if(r.held.length)flags.heldImages=r.held;if(r.autoplay)flags.autoplay=r.autoplay;if(r.bothOptions)flags.bothOptions=true;if(r.legacy)flags.legacy=true;
   if(Object.keys(flags).length)issue(id,key,flags)}
  R.global[`external/${opt}/${lang}/${w}`]=[...ext];
  await ctx.close()}
 await b.close();
 let size=0;const walk=d=>{for(const f of fs.readdirSync(d)){const q=path.join(d,f);const st=fs.lstatSync(q);if(st.isSymbolicLink())continue;if(st.isDirectory()){if(!/node_modules|tools/.test(f))walk(q)}else size+=st.size}};walk(path.join(__dirname,'..'));
 R.global.localBytes=size;
 fs.writeFileSync(path.join(__dirname,'part-i-report.json'),JSON.stringify(R,null,1));
 const n=Object.keys(R.sections).length;console.log('sections with findings:',n);for(const [id,v] of Object.entries(R.sections)){const kinds=new Set();Object.values(v).forEach(f=>Object.keys(f).forEach(k=>kinds.add(k)));console.log(id.padEnd(6),[...kinds].join(', '))}
 console.log('external requests:',[...new Set(Object.values(R.global).filter(Array.isArray).flat())].slice(0,10).join(' ')||'none');console.log('local files (excl. img/media):',(size/1048576).toFixed(1),'MB')})();
