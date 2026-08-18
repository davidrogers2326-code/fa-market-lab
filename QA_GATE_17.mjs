
import fs from 'fs'
const freeze=JSON.parse(fs.readFileSync('./content/production/W32_PRE_OUTCOME_FREEZE.json','utf8'))
const outcome=JSON.parse(fs.readFileSync('./content/outcomes/W32_OUTCOME.json','utf8'))
const recap=JSON.parse(fs.readFileSync('./content/outcomes/W32_RECAP.json','utf8'))

if(freeze.status!=='FROZEN_PRE_OUTCOME') throw new Error('FREEZE_LOST')
if(freeze.outcomeAttached!==false) throw new Error('FROZEN_STATE_MUTATED')
if(outcome.status!=='CAPTURED_SEPARATELY_FROM_FROZEN_FORECAST') throw new Error('OUTCOME_NOT_CAPTURED')
if(outcome.observations.length<5) throw new Error('OUTCOME_OBSERVATIONS_INCOMPLETE')
if(recap.frozenForecastUnmodified!==true) throw new Error('HINDSIGHT_FIREWALL_FAILED')
if(recap.comparisons.length<7) throw new Error('RECAP_COMPARISON_INCOMPLETE')
console.log('GATE 17 QA PASSED — actual outcome ingested separately; frozen forecast preserved; forecast-vs-reality comparison created.')
