import path from 'node:path'
import fs from 'fs'
const routes=['brief','5d','simulator','recap','psychology']
const failures=[]
for(const r of routes){
 const s=fs.readFileSync(`app/${r}/page.jsx`,'utf8')
 if(!s.includes('resolveWeek')) failures.push(`${r}: missing resolveWeek`)
 if(!s.includes('searchParams')) failures.push(`${r}: missing searchParams`)
}
if(!fs.existsSync('domain/weekContext.js')) failures.push('missing week context')
if(failures.length){console.error('GATE 6 QA FAILED',failures);process.exit(1)}
console.log('GATE 6 QA PASSED')

for(const n of [31,32]){ const s=fs.readFileSync(path.join(root,`content/weeks/week-${n}.js`),'utf8'); if(!s.includes('mode:')) failures.push(`week-${n}:simulator.mode`); if(!s.includes('integrityNote:')) failures.push(`week-${n}:simulator.integrityNote`) }
