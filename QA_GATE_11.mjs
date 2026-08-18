
import {runProvenanceStressTest} from './domain/provenance/stressTest.js'
import {evaluatePublicationGate} from './domain/provenance/publicationGate.js'

const week = {
  slug:'synthetic-week',
  number:99,
  status:'RAW_VERIFIED',
  provenance:{
    rawArchivePresent:true,
    verified:true
  },
  publication:{
    snapshotLocked:true
  },
  evidence:[]
}

const result = runProvenanceStressTest(week)

if(!result.passed){
  console.error('GATE 11 STRESS TEST FAILED')
  console.error(result)
  process.exit(1)
}

const blocked = evaluatePublicationGate({
  week:{...week,status:'FINAL_PUBLICATION_MIGRATION'},
  packet:{
    publishSafe:false,
    snapshot:{frozen:true}
  }
})

if(blocked.publishable || blocked.blockers.length===0){
  console.error('GATE 11 NEGATIVE PUBLICATION TEST FAILED')
  process.exit(1)
}

console.log('GATE 11 STRESS TEST PASSED')
console.log(JSON.stringify(result,null,2))
console.log('PUBLICATION NEGATIVE TEST PASSED')
