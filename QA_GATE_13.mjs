
import fs from 'fs'

const p=JSON.parse(fs.readFileSync('./content/production/REAL_WEEKLY_PACKET_MANIFEST.json','utf8'))

if(p.realData !== true || p.synthetic !== false){
  console.error('REAL PACKET IDENTITY TEST FAILED')
  process.exit(1)
}
if(!p.rawFiles || p.rawFiles.length < 3){
  console.error('REAL PACKET FILE COUNT TEST FAILED')
  process.exit(1)
}
if(p.rawFiles.some(x=>!x.contentHash || x.contentIntegrityVerified !== true)){
  console.error('RAW INTEGRITY TEST FAILED')
  process.exit(1)
}
if(p.verification.sourceVerified === true){
  console.error('SOURCE VERIFICATION MUST REMAIN PENDING')
  process.exit(1)
}

console.log('GATE 13 QA PASSED — real packet received, hashed, and correctly blocked from publication pending source/evidence review.')
