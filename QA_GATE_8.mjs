
import fs from 'fs'
const required=[
 'domain/evidence/schema.js',
 'domain/evidence/graph.js',
 'domain/evidence.js'.replace('domain/evidence.js','domain/evidence/graph.js'),
 'content/weeks/evidence.js',
 'app/evidence/page.jsx'
]
const failures=required.filter(x=>!fs.existsSync(x))
const routes=['brief','5d','simulator','recap','psychology']
for(const r of routes){
 const s=fs.readFileSync(`app/${r}/page.jsx`,'utf8')
 if(!s.includes('resolveWeek')) failures.push(`${r}:missing-week-context`)
}
if(failures.length){console.error('GATE 8 QA FAILED',failures);process.exit(1)}
console.log('GATE 8 QA PASSED — evidence backbone and week context are present.')
