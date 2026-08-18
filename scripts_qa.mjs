import fs from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const files = [
  'app/page.jsx','app/brief/page.jsx','app/5d/page.jsx','app/simulator/page.jsx',
  'app/recap/page.jsx','app/psychology/page.jsx','app/archive/page.jsx','app/archive/[slug]/page.jsx',
  'domain/provenance.js','domain/recap.js','domain/schema/week.js','domain/simulator/engine.js',
  'content/weeks/index.js','content/weeks/week-31.js','content/weeks/week-32.js'
]
const failures=[]
for(const f of files){if(!fs.existsSync(path.join(root,f))) failures.push(`missing:${f}`)}
const css=fs.readFileSync(path.join(root,'app/globals.css'),'utf8')
for(const token of ['--gold:','--bg:','@media(max-width:850px)','mobilebar','.simgrid']) if(!css.includes(token)) failures.push(`css:${token}`)
for(const n of [31,32]){
 const s=fs.readFileSync(path.join(root,`content/weeks/week-${n}.js`),'utf8')
 for(const token of ['status:','provenance:','rawArchivePresent:false','verified:false','publication:','snapshotLocked:false','scenarios:','levels:','fiveD:','simulator:']) if(!s.includes(token)) failures.push(`week-${n}:${token}`)
}
console.log(failures.length ? `QA FAILED\n${failures.join('\n')}` : 'QA PASSED — structural, provenance and mobile tokens present')
process.exit(failures.length ? 1 : 0)
