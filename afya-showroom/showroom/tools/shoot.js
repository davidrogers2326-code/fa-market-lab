/* Screenshots for approval (brief M3): each section at 360 px and 1280 px, English and Kiswahili.
   Usage: node tools/shoot.js <outDir> <sectionId> [more ids…]   (server on http://127.0.0.1:8765)
   Env: FULL=1 for full-page shots, SCROLL=<0..1> to shoot the Box Opens part-way, OPT=lean for the 150M option. */
const {chromium}=require('playwright');
const out=process.argv[2]||'screens',ids=process.argv.slice(3);
(async()=>{const b=await chromium.launch();const errs=[];
 for(const id of ids)for(const w of [1280,360])for(const lang of ['en','sw']){
  const ctx=await b.newContext({viewport:{width:w,height:w>800?800:740},deviceScaleFactor:w>800?1:2,reducedMotion:process.env.RM?'reduce':'no-preference'});
  await ctx.addInitScript(([l,o])=>{try{localStorage.setItem('afyaLang',l);if(o)localStorage.setItem('afyaOpt',o)}catch(e){}},[lang,process.env.OPT||'']);
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(id+' '+lang+' '+w+': '+e.message));
  await p.goto('http://127.0.0.1:8765/index.html#'+id,{waitUntil:'networkidle'});await p.waitForTimeout(600);
  if(process.env.SCROLL){await p.evaluate(f=>{const b=document.getElementById('abBox');if(b)scrollTo(0,b.offsetTop+(b.offsetHeight-innerHeight)*f)},+process.env.SCROLL);await p.waitForTimeout(400)}
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(sw)errs.push(id+' '+lang+' '+w+': horizontal scroll');
  const f=`${out}/${id}-${w}-${lang}${process.env.SCROLL?'-p'+process.env.SCROLL:''}${process.env.OPT?'-'+process.env.OPT:''}${process.env.RM?'-full':''}.png`;
  await p.screenshot({path:f,fullPage:!!process.env.FULL});console.log(f);await ctx.close()}
 await b.close();if(errs.length){console.log('ISSUES:\n'+errs.join('\n'))}else console.log('no page errors, no horizontal scroll')})();
