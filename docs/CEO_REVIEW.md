# CEO review

**Mode: scope reduction.** The direct market is small and quality-sensitive; prove a paid concierge wedge before building reconstruction infrastructure.

## Premise and alternatives

The actual outcome is a reliable emotional gift, not a 3D pipeline. Minimal concierge validation (S/low risk) reuses existing capture/runtime tools and is recommended. An automated preview funnel (M/high risk) improves scale but introduces privacy and quality failures before demand proof. A full creator platform (XL/very high risk) may have a larger future but is disconnected from the validated purchase.

CURRENT: generic custom games + cheap 3D tools → THIS PLAN: transparent brief/quality gate → 12-MONTH IDEAL: conversion-proven gift operation with a proprietary QA dataset.

## Review findings

1. **Architecture:** Keep frontend, brief service, uploads, reconstruction adapter, and reviewer console separate. Idempotent job states prevent double purchases and orphaned scenes.
2. **Error/rescue map:** Name `invalid_capture`, `upload_interrupted`, `quality_failed`, `provider_timeout`, `provider_rejected`, `qa_rejected`, `buyer_revision`, `deadline_at_risk`, and `deletion_failed`. Each needs visible buyer/reviewer state and an owner.
3. **Security:** Home imagery is sensitive. Signed uploads, content validation, EXIF stripping, isolation, encryption, strict retention, access logs, and independent media-consent revocation are launch gates.
4. **Data flow:** Nil/empty photos block submission; too few or low-quality photos request targeted reshoots; duplicate submit is idempotent; provider errors preserve the brief; stale buyer review links expire safely.
5. **Code quality:** Keep quality scoring deterministic and shared through contract tests. Do not put provider-specific fields into the core brief.
6. **Tests:** Cover validation, score boundaries, missing fixtures, provider timeouts, job retries, double-click, navigation during generation, mobile overflow, keyboard focus, and deletion completion.
7. **Observability:** Funnel, reshoot reason, queue age, provider spend/latency, QA minutes, due-date risk, buyer approval, refund, and deletion SLA require dashboards and alerts.
8. **Database/state:** Enforce tenant keys, unique idempotency tokens, immutable consent versions, route-stop ordering, and expiry indexes. Avoid storing raw images in application tables.
9. **API:** Version the brief schema; use 422 for invalid input, 404 for unknown fixtures, 409 for illegal transitions, 429 for abuse, 503 for providers/fixtures; return stable error codes.
10. **Performance:** At 10×, reconstruction queue and reviewer capacity fail first; at 100×, provider cost and storage deletion become existential. Capacity-aware ordering matters more than render speed.
11. **UX:** Readiness and privacy appear before purchase. Loading, invalid input, empty output, reshoot, ready, and QA progress states are explicit. Mobile must not overflow and controls must remain keyboard reachable.

## Decision

Accepted: static interactive brief planner, shared fixture, deterministic FastAPI operation, fixed templates, quality gate, and docs/tests. Deferred: uploads, real reconstruction, payment, auth, multiplayer, and live backend hosting. Strongest challenges are demand, preview quality, and privacy. Success means deposits and gift-grade delivery—not generated-scene count.
