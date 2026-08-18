
import fs from 'fs'

const failures=[]
const files=[
 'domain/evidence/ingestion.js',
 'domain/evidence/claims.js',
 'domain/evidence/pipeline.js',
 'app/evidence/page.jsx',
 'PRODUCTION_GATE_9.md'
]
for(const f of files) if(!fs.existsSync(f)) failures.push(`MISSING:${f}`)

for(const r of ['brief','5d','simulator','recap','psychology','evidence']){
 const p=`app/${r}/page.jsx`
 if(fs.existsSync(p)){
  const s=fs.readFileSync(p,'utf8')
  if(!s.includes('resolveWeek')) failures.push(`NO_WEEK_CONTEXT:${r}`)
 }
}

if(failures.length){
 console.error('GATE 9 QA FAILED')
 console.error(failures)
 process.exit(1)
}
console.log('GATE 9 QA PASSED')
