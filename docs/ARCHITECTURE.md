# Architecture

## Prototype

The Next.js App Router frontend imports `data/demo_scenes.json` and runs a deterministic readiness/route function in the browser so GitHub Pages remains interactive without a server. FastAPI reads the same fixture and exposes `/brief`, proving the domain operation and validation independently. The backend is tested source and is not deployed.

```text
Browser form ──> deterministic demo planner ──> readiness + route + QA checklist
                       │
shared fixture ────────┴──────> FastAPI /brief ──> tested contract (local/CI only)
```

## Production trajectory

```text
Buyer UI -> signed upload -> private object store -> quality job -> reconstruction adapter
    |                                                    |
    +-> brief API -> job state -> reviewer console -> buyer approval -> game delivery
```

Every job state is explicit: `awaiting_upload`, `quality_failed`, `queued`, `reconstructing`, `qa_required`, `buyer_review`, `delivered`, or `expired`. Source images expire by policy. Provider failures retain the brief and surface retry/manual fallback. Metrics cover upload completion, quality failure reasons, queue age, provider latency/error, QA minutes, approval rate, refunds, and deletion completion.

Security boundaries: validate file signatures and size, strip metadata, malware-scan uploads, isolate customer prefixes, use short-lived signed URLs, encrypt storage, log access without content, separate reaction consent, and never train on home photos by default.
