
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const r=JSON.parse(fs.readFileSync('./content/shell/GATE_28_RUNTIME_AUDIT.json','utf8'))
if(m.gate!==28) throw new Error('GATE_FAILURE')
if(r.sourceIntegration!==true) throw new Error('SOURCE_INTEGRATION_FAILURE')
if(r.runtimeBuild.status!=='NOT_EXECUTED') throw new Error('UNSUPPORTED_RUNTIME_STATUS')
if(r.publicationUnlocked!==false) throw new Error('PUBLICATION_UNLOCK_FAILURE')
console.log('GATE 28 QA PASSED — source integration is verified; runtime certification remains locked.')
