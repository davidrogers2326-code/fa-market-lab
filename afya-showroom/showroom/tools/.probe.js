const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
 p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text())});
 const opt=process.env.OPT||'flag';await p.addInitScript(o=>localStorage.setItem('afyaOpt',o),opt);
 await p.goto('http://127.0.0.1:8765/index.html#'+(process.env.SEC||'s0-1'),{waitUntil:'networkidle'});
 const code=require('fs').readFileSync(process.argv[2],'utf8');
 console.log(JSON.stringify(await p.evaluate(code),null,1));await b.close()})();
