
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const r=JSON.parse(fs.readFileSync('./content/shell/MODULE_INTEGRATION_REGISTRY.json','utf8'))

if(m.gate!==27) throw new Error('GATE_FAILURE')
if(r.status!=='INTEGRATED_SOURCE_SURFACES') throw new Error('INTEGRATION_STATUS_FAILURE')
if(Object.keys(r.modules).length!==7) throw new Error('MODULE_COUNT_FAILURE')
for(const k of Object.keys(r.modules)){
  if(r.modules[k].status!=='INTEGRATED') throw new Error('MODULE_NOT_INTEGRATED:'+k)
}
if(r.masterShell!=='components/SiteShell.jsx') throw new Error('SHELL_FAILURE')

console.log('GATE 27 QA PASSED — seven concrete module surfaces are connected to the shared SiteShell. Runtime certification remains pending.')
