
import fs from 'fs'

const index=JSON.parse(fs.readFileSync('./content/learning/LONGITUDINAL_INDEX.json','utf8'))
const w32=JSON.parse(fs.readFileSync('./content/learning/W32_LEARNING.json','utf8'))

if(index.recordCount!==1) throw new Error('INDEX_COUNT_FAILURE')
if(index.futureWeeks!=='APPEND_ONLY') throw new Error('APPEND_ONLY_FAILURE')
if(index.historicalRecordsMutable!==false) throw new Error('IMMUTABILITY_FAILURE')
if(w32.status!=='VALIDATED_WEEKLY_LEARNING_RECORD') throw new Error('W32_LEARNING_FAILURE')
if(w32.dimensions.length!==7) throw new Error('DIMENSION_COUNT_FAILURE')
if(!w32.nextBriefInput?.preserve || !w32.nextBriefInput?.improve || !w32.nextBriefInput?.monitor)
  throw new Error('NEXT_BRIEF_MEMORY_FAILURE')

console.log('GATE 19 QA PASSED — Week 32 learning is indexed and historical learning is append-only.')
