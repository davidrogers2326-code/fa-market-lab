# PRODUCTION GATE 9 — EVIDENCE INGESTION & CLAIM CONTROL

## Gate objective
Turn the Evidence Backbone into a controlled ingestion pipeline without inventing facts or silently promoting unverified material.

## Audit result
The existing Week Context, provenance, Simulator, Recap, Archive and Evidence layers were present.
The weak point was that evidence could be displayed before a formal distinction between:
- raw material
- normalized material
- claim review
- traceable evidence
- blocked evidence

## Fixed
Added:
- `domain/evidence/ingestion.js`
- `domain/evidence/claims.js`
- `domain/evidence/pipeline.js`
- explicit ingestion states
- claim classification
- claim audit
- publish-safe calculation
- selected-week Evidence routing

## Locked rules
1. No source verification is assumed.
2. No claim is treated as traceable without source metadata.
3. Missing observation/interpretation/transmission blocks control.
4. Historical publication remains separate from evidence ingestion.
5. The selected Week Context remains the single source of module context.

## Publication status
Publication remains LOCKED until raw archive/source verification is complete.

## Gate result
PASS — architecture and control layer.
BLOCKED — publication, correctly.
