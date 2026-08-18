
import fs from 'fs'
const claims=JSON.parse(fs.readFileSync('./content/evidence/CLAIM_REGISTER_W31_W32_REVIEWED.json','utf8'))
const freeze=JSON.parse(fs.readFileSync('./content/production/W32_PRE_OUTCOME_FREEZE.json','utf8'))
if(!claims.length || !claims.every(c=>c.review?.provenanceReady===true)) process.exit(1)
if(freeze.status!=='FROZEN_PRE_OUTCOME') process.exit(1)
if(freeze.outcomeAttached!==false || freeze.hindsightContamination!==false) process.exit(1)
console.log('GATE 15 QA PASSED')
