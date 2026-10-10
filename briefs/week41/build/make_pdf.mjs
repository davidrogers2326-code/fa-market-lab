import { chromium } from 'playwright';
const [,,src,out]=process.argv;const b=await chromium.launch();const p=await b.newPage({viewport:{width:704,height:1000}});
await p.goto('file://'+src);await p.waitForTimeout(1500);await p.emulateMedia({media:'print'});
await p.evaluate(()=>{document.querySelectorAll('details').forEach(d=>d.open=true);document.documentElement.classList.add('pdfdark');document.body.classList.add('pdfdark');document.querySelectorAll('.tabp').forEach(t=>t.classList.add('on'));if(window.W40print)W40print();document.querySelectorAll('details.pbk,details.jdeep').forEach(d=>{const x=document.createElement('div');x.className=d.className+' pbkd';[...d.childNodes].forEach(c=>{if(c.tagName==='SUMMARY'){const s=document.createElement('div');s.className='pbks';s.innerHTML=c.innerHTML;x.appendChild(s)}else x.appendChild(c)});d.replaceWith(x)});if(window.CORE)CORE.redrawAll()});
await p.waitForTimeout(2500);
await p.pdf({path:out,format:'A4',printBackground:true,preferCSSPageSize:true});await b.close();
