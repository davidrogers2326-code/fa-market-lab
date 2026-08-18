
import fs from 'fs'

const failures=[]
const required=[
 'domain/provenance/rawManifest.js',
 'domain/provenance/snapshot.js',
 'domain/provenance/ingest.js',
 'RAW_INGESTION_CONTRACT.md',
 'app/ingest/page.jsx'
]
for(const f of required) if(!fs.existsSync(f)) failures.push(`MISSING:${f}`)

for(const r of ['brief','5d','simulator','recap','psychology','evidence','ingest']){
 const p=`app/${r}/page.jsx`
 if(fs.existsSync(p)){
  const s=fs.readFileSync(p,'utf8')
  if(!s.includes('resolveWeek')) failures.push(`NO_WEEK_CONTEXT:${r}`)
 }
}

const manifest=JSON.parse(fs.readFileSync('BUILD_MANIFEST.json','utf8'))
if(manifest.publication_locked!==true) failures.push('PUBLICATION_LOCK_BROKEN')

if(failures.length){
 console.error('GATE 10 QA FAILED')
 console.error(failures)
 process.exit(1)
}
console.log('GATE 10 QA PASSED — raw intake, provenance and snapshot controls present.')
