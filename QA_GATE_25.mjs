
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const r=JSON.parse(fs.readFileSync('./content/shell/MODULE_RECOVERY_MANIFEST.json','utf8'))
const c=JSON.parse(fs.readFileSync('./content/shell/INTEGRATION_CERTIFICATION_CHECKLIST.json','utf8'))

if(m.gate!==25) throw new Error('GATE_FAILURE')
if(r.status!=='RECOVERY_AUDIT_COMPLETE') throw new Error('RECOVERY_AUDIT_FAILURE')
if(c.certificationBlockedUntilAllModulesPass!==true) throw new Error('CERTIFICATION_GUARD_FAILURE')

const required=['brief','5d','simulator','recap','psychology','intelligence','archive']
for(const k of required){
  if(!r.modules[k]) throw new Error('MISSING_MODULE_RECORD:'+k)
}

if(r.modules.intelligence.recovered!==true)
  throw new Error('INTELLIGENCE_FOUNDATION_NOT_FOUND')

for(const k of ['brief','5d','simulator','recap','psychology','archive']){
  if(r.modules[k].recovered===true)
    throw new Error('UNSUPPORTED_RECOVERY_CLAIM:'+k)
}

console.log('GATE 25 QA PASSED — missing modules remain explicitly blocked; no implementation was fabricated.')
