
import fs from 'fs'
const freeze=JSON.parse(fs.readFileSync('./content/production/W32_PRE_OUTCOME_FREEZE.json','utf8'))
const outcome=JSON.parse(fs.readFileSync('./content/outcomes/W32_OUTCOME.json','utf8'))
const recap=JSON.parse(fs.readFileSync('./content/outcomes/W32_RECAP.json','utf8'))
const review=JSON.parse(fs.readFileSync('./content/outcomes/W32_SOURCE_REVIEW.json','utf8'))

if(freeze.status!=='FROZEN_PRE_OUTCOME') throw new Error('FREEZE_FAILURE')
if(freeze.outcomeAttached!==false) throw new Error('FROZEN_STATE_MUTATED')
if(!outcome.observations.length) throw new Error('OUTCOME_MISSING')
if(recap.integrity?.frozenForecastUnmodified!==true) throw new Error('INTEGRITY_FAILURE')
if(recap.integrity?.hindsightSafe!==true) throw new Error('HINDSIGHT_FAILURE')
if(recap.forecastRealityMatrix?.length<7) throw new Error('RECAP_MATRIX_INCOMPLETE')
if(!review.items.length) throw new Error('SOURCE_REVIEW_MISSING')
console.log('GATE 18 QA PASSED — final source review and production recap complete.')
