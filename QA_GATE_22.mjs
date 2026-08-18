
import fs from 'fs'

const manifest=JSON.parse(fs.readFileSync('./BUILD_MANIFEST.json','utf8'))
const contract=JSON.parse(fs.readFileSync('./content/dashboard/LONGITUDINAL_UI_CONTRACT.json','utf8'))

if(manifest.gate!==22) throw new Error('GATE_FAILURE')
if(contract.identity.base!=='BLACK' || contract.identity.signature!=='GOLD')
  throw new Error('IDENTITY_FAILURE')
if(contract.responsive!=='MOBILE_FIRST') throw new Error('MOBILE_FAILURE')
if(!contract.integrity.includes('append_only_history')) throw new Error('HISTORY_GUARD_FAILURE')
if(!contract.integrity.includes('immutable_forecast_freezes')) throw new Error('FREEZE_GUARD_FAILURE')
if(contract.currentState.generalizedMetricsEnabled!==false)
  throw new Error('STATISTICAL_GUARD_FAILURE')

console.log('GATE 22 QA PASSED — Longitudinal Intelligence product surface is contract-safe.')
