
import fs from 'fs'
const assessment=JSON.parse(fs.readFileSync('./content/learning/W31_BACKFILL_ASSESSMENT.json','utf8'))
const dashboard=JSON.parse(fs.readFileSync('./content/dashboard/LONGITUDINAL_DASHBOARD.json','utf8'))

if(assessment.promotionAllowed!==false) throw new Error('W31_PROMOTION_FAILURE')
if(assessment.fabricationPrevented!==true) throw new Error('FABRICATION_PROTECTION_FAILURE')
if(dashboard.recordsValidated!==1) throw new Error('DASHBOARD_RECORD_FAILURE')
if(dashboard.status!=='EARLY_SAMPLE') throw new Error('EARLY_SAMPLE_FAILURE')
if(dashboard.week31!=='BLOCKED_PENDING_VALIDATED_PACKET') throw new Error('W31_STATUS_FAILURE')

console.log('GATE 21 QA PASSED — Week 31 remains blocked without a complete validated packet; dashboard foundation is constrained to validated data.')
