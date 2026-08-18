# RAW INGESTION CONTRACT — Production Gate 10

## Purpose
Define the exact boundary between material received from the user and material allowed into the analytical publication system.

## Required packet
Each weekly production packet should contain:
1. Week identifier.
2. Raw weekly outlook/material.
3. Source or origin metadata where available.
4. Any supporting files or references.
5. A clear distinction between pre-outcome material and later outcome material.

## States
RECEIVED → HASHED → MAPPED → VERIFICATION_REQUIRED → VERIFIED

Rejected material must never silently enter the evidence graph.

## Verification
Verification requires both:
- content integrity verification
- source verification

Without both, publication remains blocked.

## Snapshot rule
Before outcome information is attached:
- the week context is frozen
- raw manifest IDs are recorded
- evidence IDs are recorded
- the pre-outcome state becomes immutable

The Recap may add an outcome beside the snapshot. It may not rewrite the snapshot.

## Important
The system does not manufacture missing source evidence.
If raw material is unavailable, the week remains in review.
