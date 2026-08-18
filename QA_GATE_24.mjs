
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const r=JSON.parse(fs.readFileSync('./content/shell/MODULE_INTEGRATION_REGISTRY.json','utf8'))
const q=JSON.parse(fs.readFileSync('./content/shell/RESPONSIVE_QA_CONTRACT.json','utf8'))

if(m.gate!==24) throw new Error('GATE_FAILURE')
if(r.status!=='INTEGRATION_PENDING') throw new Error('INTEGRATION_STATUS_FAILURE')
if(q.status!=='READY_FOR_EXECUTION') throw new Error('QA_CONTRACT_FAILURE')
if(Object.keys(r.modules).length!==7) throw new Error('MODULE_REGISTRY_FAILURE')
if(r.modules.brief.integrated!==false) throw new Error('FALSE_INTEGRATION_FAILURE')

console.log('GATE 24 QA PASSED — integration is explicitly gated; no unsupported production claim was made.')
