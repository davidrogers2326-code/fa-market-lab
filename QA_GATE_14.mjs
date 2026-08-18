
import fs from 'fs'

const evidence=JSON.parse(fs.readFileSync('./content/evidence/WEEK31_WEEK32_CONTROLLED_RECONSTRUCTION.json','utf8'))
const claims=JSON.parse(fs.readFileSync('./content/evidence/CLAIM_REGISTER_W31_W32.json','utf8'))
const freeze=JSON.parse(fs.readFileSync('./content/production/W32_PRE_OUTCOME_FREEZE.json','utf8'))

if(!evidence.week31 || !evidence.week32){
  console.error('RECONSTRUCTION COVERAGE FAILED'); process.exit(1)
}
if(claims.length < 6){
  console.error('CLAIM REGISTER FAILED'); process.exit(1)
}
if(freeze.frozenContent !== false || freeze.outcomeAttached !== false){
  console.error('FREEZE CONTAMINATION TEST FAILED'); process.exit(1)
}
if(!claims.every(c => c.status.includes('PROVENANCE_REVIEW_REQUIRED'))){
  console.error('PROVENANCE STATUS TEST FAILED'); process.exit(1)
}

console.log('GATE 14 QA PASSED — source-derived intelligence reconstructed; provenance review remains explicit; pre-outcome freeze remains blocked.')
