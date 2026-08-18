# Production Gate 8 — Evidence Intelligence Backbone

## Audit
The core Week Context, provenance and Simulator layers are present. The next missing permanent capability was a shared evidence backbone.

## Build
Added:
- `domain/evidence/schema.js`
- `domain/evidence/graph.js`
- `content/weeks/evidence.js`
- `/evidence?week=week-N`
- evidence validation and traceability metadata
- links from the Archive into Evidence

## Integrity rule
The system does not invent missing source material. Existing publication evidence is migrated with an explicit unverified-source state where raw source metadata is unavailable.

## Protected
- Gold + Black identity
- Word depth
- Mobile Week Context
- Historical integrity
- Provenance lock
- Simulator explainability
- Scalable Week Context architecture

## Important limitation
Raw Week 31/32 archives remain unavailable. Evidence that lacks raw source metadata is therefore marked unverified rather than treated as fully verified.

## Gate result
Architecture layer PASS. Publication remains locked.
