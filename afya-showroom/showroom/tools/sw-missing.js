/* K6.1 · reports text that is still English when the page is in Kiswahili.
   Renders every section in Kiswahili and lists visible text nodes that read as English
   (two or more common English words, or identical to the English rendering).
   Usage: node tools/sw-missing.js [sectionId …]   (server on http://127.0.0.1:8765)
   Writes tools/sw-missing-report.json and prints a per-section count. */
const {chromium}=require('playwright');const fs=require('fs');
const EN=/\b(the|and|of|with|for|is|are|to|in|on|a|an|by|per|from|this|that|each|every|your|our|month|price|box|store)\b/gi;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1280,height:900}});
 await p.goto('http://127.0.0.1:8765/index.html',{waitUntil:'load'});
 const ids=process.argv.slice(2).length?process.argv.slice(2):await p.evaluate(()=>ALL.map(x=>x.id));
 const texts=async lang=>{await p.evaluate(l=>localStorage.setItem('afyaLang',l),lang);const out={};
  for(const id of ids){await p.goto('http://127.0.0.1:8765/index.html#'+id,{waitUntil:'load'});await p.reload({waitUntil:'load'});await p.waitForTimeout(500);
   out[id]=await p.evaluate(()=>{const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const r=[];let n;
    while((n=w.nextNode())){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(t.length<4)continue;const el=n.parentElement;if(!el||el.closest('script,style,[aria-hidden="true"],[lang="en"]'))continue;
     const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;r.push(t)}return r})}
  return out};
 const en=await texts('en'),sw=await texts('sw');const rep={};let total=0;
 for(const id of ids){const enSet=new Set(en[id]);const miss=sw[id].filter(t=>((t.match(EN)||[]).length>=2)||(enSet.has(t)&&/[a-z]{4,}\s+[a-z]{3,}/i.test(t)));
  rep[id]=[...new Set(miss)];total+=rep[id].length;console.log(id.padEnd(6),String(rep[id].length).padStart(4))}
 fs.writeFileSync(__dirname+'/sw-missing-report.json',JSON.stringify(rep,null,1));console.log('total',total);
 await p.evaluate(()=>localStorage.removeItem('afyaLang'));await b.close()})();
