
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const v=JSON.parse(fs.readFileSync('./content/shell/MODULE_RECOVERY_VERIFICATION.json','utf8'))

if(m.gate!==26) throw new Error('GATE_FAILURE')
if(v.overall!=='BLOCKED_PENDING_REAL_MODULE_SOURCE') throw new Error('BLOCKER_FAILURE')
if(v.modules.intelligence.status!=='FOUNDATION VERIFIED')
  throw new Error('INTELLIGENCE_FOUNDATION_FAILURE')

for(const k of ['brief','5d','simulator','recap','psychology','archive']){
  if(!v.modules[k].status.startsWith('BLOCKED'))
    throw new Error('UNSUPPORTED_RECOVERY:'+k)
}

console.log('GATE 26 QA PASSED — source-level recovery is blocked where original module source is absent.')
