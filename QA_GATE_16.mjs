
import fs from 'fs'

const freeze=JSON.parse(fs.readFileSync('./content/production/W32_PRE_OUTCOME_FREEZE.json','utf8'))
const outcome=JSON.parse(fs.readFileSync('./content/outcomes/W32_OUTCOME.json','utf8'))
const recap=JSON.parse(fs.readFileSync('./content/outcomes/W32_RECAP.json','utf8'))

if(freeze.status!=='FROZEN_PRE_OUTCOME') process.exit(1)
if(freeze.outcomeAttached!==false) process.exit(1)
if(outcome.observations.length!==0) process.exit(1)
if(outcome.attachedToFrozenState!==false) process.exit(1)
if(recap.status!=='WAITING_FOR_OUTCOME') process.exit(1)

console.log('GATE 16 QA PASSED — outcome boundary created, no outcome invented, frozen forecast remains untouched.')
