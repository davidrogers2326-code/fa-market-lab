# Production Gate 7 — Historical Integrity & Archive Routing

## Audit findings
1. The dynamic archive route referenced by the QA contract did not exist.
2. The publication validator did not feed publication-integrity failures into `assertPublishableWeek`.
3. Week 31's migrated simulator seed could be visually mistaken for an immutable pre-outcome snapshot even though the source is a final publication.

## Fixes
- Added canonical `/archive/[slug]` route with Week Context links.
- Strengthened publication validation so a `PUBLISHED` week must pass provenance + snapshot integrity.
- Added explicit Simulator integrity modes and notes to Week 31 and Week 32.
- Home and Simulator UI now surface the integrity mode rather than implying a locked snapshot.

## Protected
Gold + Black, mobile usability, word depth, Week Context architecture, provenance separation, and no-fabrication rule remain intact.

## Blocker
Raw Week 31/32 archives remain absent. Publication stays locked.

## Result
Gate 7 PASS for historical routing/integrity hardening; publication promotion remains BLOCKED by missing raw archives.
