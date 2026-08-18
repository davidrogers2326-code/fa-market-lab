
import fs from 'fs'
const index=JSON.parse(fs.readFileSync('./content/learning/LONGITUDINAL_INDEX.json','utf8'))
const ledger=JSON.parse(fs.readFileSync('./content/learning/HISTORICAL_BACKFILL_LEDGER.json','utf8'))
const metrics=JSON.parse(fs.readFileSync('./content/learning/CROSS_WEEK_METRICS.json','utf8'))

if(index.recordCount!==1) throw new Error('UNEXPECTED_RECORD_COUNT')
if(ledger.status!=='WAITING_FOR_VALIDATED_WEEK31_PACKET') throw new Error('BACKFILL_STATUS_FAILURE')
if(metrics.recordCount!==1) throw new Error('METRICS_RECORD_FAILURE')
if(metrics.confidenceStatus!=='EARLY_SAMPLE') throw new Error('SAMPLE_STATUS_FAILURE')
for(const k of Object.keys(metrics.dimensions)){
  if(metrics.dimensions[k].status!=='INSUFFICIENT_SAMPLE') throw new Error('GENERALIZATION_FAILURE_'+k)
}
console.log('GATE 20 QA PASSED — no Week 31 fabrication; cross-week analytics correctly constrained by sample size.')
