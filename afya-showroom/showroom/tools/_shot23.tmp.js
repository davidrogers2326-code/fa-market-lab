const {chromium}=require('playwright');
const [id,w,lang,...ps]=process.argv.slice(2);const out='/tmp/claude-0/-home-user-fa-market-lab/763e29dd-dd47-5b19-b730-923fee20ac28/scratchpad/';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+w,height:+w>800?800:740},deviceScaleFactor:1,reducedMotion:process.env.RM?'reduce':'no-preference'});
 await ctx.addInitScript(([l,o])=>{localStorage.setItem('afyaLang',l);if(o)localStorage.setItem('afyaOpt',o)},[lang,process.env.OPT||'']);
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message));p.on('response',r=>{if(r.status()>=400)console.log('404',r.url())});
 await p.goto('http://127.0.0.1:8765/index.html#'+id,{waitUntil:'networkidle'});await p.waitForTimeout(500);
 for(const v of ps){
  if(v.startsWith('#')){await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();scrollBy(0,-70)},v);}
  else await p.evaluate(f=>{const b=document.getElementById('s23Box');scrollTo(0,b.getBoundingClientRect().top+scrollY+(b.offsetHeight-innerHeight)*f)},+v);
  await p.waitForTimeout(700);const f=out+`${id}-${w}-${lang}-${v.replace(/[^a-z0-9.]/gi,'_')}.png`;await p.screenshot({path:f});console.log(f)}
 await b.close()})();
