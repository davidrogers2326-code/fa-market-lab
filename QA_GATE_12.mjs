
import {createWeeklyPacket,auditWeeklyPacket} from './domain/production/weeklyPacket.js'
import {productionChecklist,canFreeze} from './domain/production/checklist.js'

const empty=createWeeklyPacket({week:{slug:'week-test',number:99}})
const emptyAudit=auditWeeklyPacket(empty)

if(emptyAudit.complete || !emptyAudit.blockers.includes('NO_RAW_FILES')){
  console.error('EMPTY PACKET NEGATIVE TEST FAILED')
  process.exit(1)
}

const real=createWeeklyPacket({
  week:{slug:'week-test',number:99},
  rawFiles:[{fileName:'real-source-placeholder.txt',contentHash:'required-at-boundary'}],
  sourceRefs:[{reference:'SOURCE_REFERENCE_REQUIRED'}]
})

let checklist=productionChecklist(real)
if(checklist.some(x=>x.id==='RAW' && !x.pass) || checklist.some(x=>x.id==='SOURCES' && !x.pass)){
  console.error('REAL PACKET BASIC INTAKE TEST FAILED')
  process.exit(1)
}

if(canFreeze(real)){
  console.error('FREEZE SHOULD REMAIN BLOCKED BEFORE REVIEW')
  process.exit(1)
}

console.log('GATE 12 QA PASSED — empty packets blocked; freeze remains blocked until real reviews are complete.')
