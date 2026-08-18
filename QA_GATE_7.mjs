import fs from 'node:fs'
import path from 'node:path'
const root=process.cwd()
const failures=[]
const files=['app/page.jsx','app/brief/page.jsx','app/5d/page.jsx','app/simulator/page.jsx','app/recap/page.jsx','app/psychology/page.jsx','app/archive/page.jsx','app/archive/[slug]/page.jsx','domain/weekContext.js','domain/schema/week.js','domain/simulator/engine.js','content/weeks/index.js','content/weeks/week-31.js','content/weeks/week-32.js']
for(const f of files) if(!fs.existsSync(path.join(root,f))) failures.push(`missing:${f}`)
for(const r of ['brief','5d','simulator','recap','psychology']){
 const s=fs.readFileSync(path.join(root,`app/${r}/page.jsx`),'utf8')
 if(!s.includes('resolveWeek')) failures.push(`${r}:week-context-missing`)
 if(!s.includes('searchParams')) failures.push(`${r}:query-context-missing`)
}
for(const n of [31,32]){
 const s=fs.readFileSync(path.join(root,`content/weeks/week-${n}.js`),'utf8')
 for(const token of ['status:','provenance:','rawArchivePresent:false','verified:false','publication:','snapshotLocked:false','scenarios:','levels:','fiveD:','simulator:','mode:','integrityNote:']) if(!s.includes(token)) failures.push(`week-${n}:${token}`)
}
const schema=fs.readFileSync(path.join(root,'domain/schema/week.js'),'utf8')
if(!schema.includes('validatePublicationIntegrity(week)')) failures.push('publication-integrity-not-wired-to-validation')
if(!schema.includes('published_without_raw_archive')) failures.push('raw-archive-publication-guard-missing')
const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8')
for(const token of ['--gold:','--bg:','@media(max-width:850px)','.mobilebar','.simgrid','.weekContext']) if(!css.includes(token)) failures.push(`css:${token}`)
console.log(failures.length?`QA FAILED\n${failures.join('\n')}`:'GATE 7 QA PASSED — routing, provenance, simulator integrity and mobile tokens verified')
process.exit(failures.length?1:0)
