
import fs from 'fs'
const m=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const c=JSON.parse(fs.readFileSync('./content/shell/MASTER_PUBLISHING_SHELL_CONTRACT.json','utf8'))

if(m.gate!==23) throw new Error('GATE_FAILURE')
if(c.sharedIdentity.base!=='BLACK' || c.sharedIdentity.signature!=='GOLD')
  throw new Error('IDENTITY_FAILURE')
if(c.responsive!=='MOBILE_FIRST') throw new Error('RESPONSIVE_FAILURE')
if(c.historicalLearning!=='APPEND_ONLY') throw new Error('HISTORY_FAILURE')
if(c.forecastFreeze!=='IMMUTABLE') throw new Error('FREEZE_FAILURE')
if(c.moduleDataContracts!=='PRESERVED') throw new Error('CONTRACT_FAILURE')
if(c.modules.length!==7) throw new Error('MODULE_COUNT_FAILURE')

console.log('GATE 23 QA PASSED — master publishing shell is contract-safe.')
