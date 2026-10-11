# Product plan

## ICP and JTBD

The first customer is a social-first adult buying a milestone gift for a gamer partner who already owns the obvious hardware. Their job: “Help me deliver a personal, surprising gift within a week without learning game development or risking a broken reveal.”

## MVP

One-room birthday builds only: guided photo checklist, immediate readiness score, three fixed templates, a free 60-second preview, human QA, buyer approval, and a one-year browser link. The public prototype covers brief configuration, deterministic photo QA, a three-stop route, validation/error/loading states, and a gift-grade checklist. It labels all fictional and simulated behavior.

## Data model

- `Buyer(id, contact, consent_version)`
- `GiftBrief(id, buyer_id, recipient_alias, occasion, tier, template, status, due_at)`
- `SceneCapture(id, brief_id, object_key, checksum, quality_metrics, expires_at)`
- `RouteStop(id, brief_id, order, anchor, clue, validation_state)`
- `QACheck(id, brief_id, check_type, reviewer_id, result, note)`
- `Delivery(id, brief_id, preview_url, game_url, approved_at, expires_at)`
- `ReactionConsent(id, brief_id, scope, revoked_at)`

## Architecture and AI/model strategy

Use signed direct uploads, isolated object storage, an expiring job queue, an external reconstruction adapter, deterministic quality rules, fixed Three.js/PlayCanvas templates, and a human review console. AI may suggest clue copy and anchor candidates, but cannot approve image quality, expose source photos, or publish a game. Store model/provider/version and prompts for reproducibility; provide a non-AI template fallback.

## Economics

Start at $149 and $249, with $19–$49 add-ons. The report's 45-order/month scenario assumes 3% click-through, 50% upload completion, 15% preview-to-paid conversion, 12% variable platform cost, and one $40 QA hour per order. Every key conversion assumption is unverified. Gate automation investment on paid deposits, median QA time below 60 minutes, refund rate below 5%, and contribution margin above 55%.

## Validation and GTM

Seed 20 manual builds. Primary metric: paid reservations per completed preview. Secondary metrics: photo-set completion, reshoot rate, build hours, buyer approval, recipient completion, refunds, reaction-video opt-in, and qualified social clicks. Kill the initial wedge if fewer than two of 20 accept the $149 price, unless fewer than ten receive a valid preview (pipeline failure rather than demand failure).

Use creator/reaction content and careful community participation; do not start with high-competition search ads. Expand by occasion only after birthdays convert. The moat candidate is the QA/conversion dataset and reliable creator distribution, not proprietary 3D generation.

## Risks

Muddy previews, home privacy, harmful or unsolvable clues, missed gift dates, seasonal demand, fulfillment overload, dependency changes, and low market ceiling. Controls: photo readiness gate, retention/deletion policy, human QA, fixed templates, due-date capacity limits, explicit failure states, and no promise of automated perfection.

## 30/60/90 days

- **30:** Deliver 20 concierge previews; collect deposits; instrument every funnel step; document reshoot causes.
- **60:** Productize the winning template; add signed uploads, expiry, reviewer console, and ten paid builds; publish three consented reaction clips.
- **90:** Decide scale/kill/pivot from conversion and fulfillment data; if positive, add the party tier and one reconstruction adapter behind a provider interface.
