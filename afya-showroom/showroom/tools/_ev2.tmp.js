const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();if(process.env.OPT){await p.addInitScript(o=>localStorage.setItem('afyaOpt',o),process.env.OPT)}await p.goto('http://127.0.0.1:8765/index.html#s0-1',{waitUntil:'load'});
const r=await p.evaluate(process.argv[2]);console.log(typeof r==='string'?r:JSON.stringify(r,null,0));await b.close()})();
