# RoomQuest

An interactive product prototype for planning a personalized escape-room gift from home photos. The static Next.js demo lets a buyer choose a fictional photo set, select a fixed game template and offer, generate a deterministic route brief, expose reshoot risks, and complete a human-QA checklist. The Python/FastAPI service implements and tests the same real domain operation.

> All rooms and results are fictional. Reconstruction, AI, uploads, purchasing, and persistence are simulated. The Python backend is runnable and tested source, but is **not publicly deployed**.

## Run

```bash
npm ci
npm run dev
```

```bash
uv sync --project api --locked --dev
uv run --project api uvicorn api.main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm run audit:prod
uv run --project api pytest api/tests
```

The frontend exports statically and respects a GitHub repository `basePath` when `PAGES_BUILD=true`. CI installs locked dependencies, runs TypeScript, Playwright desktop/mobile, Python tests, production build, dependency audit, and deploys `out/` through GitHub Actions Pages.

## What works

- Photo-set readiness score and actionable reshoot warnings
- Recipient, offer, and game-template configuration with validation
- Deterministic three-stop gift route and price/delivery brief
- Interactive gift-grade QA checklist
- Loading, error, empty, ready, and needs-reshoot states
- Responsive desktop/mobile layout with overflow coverage

See [research notes](research/notes.md), [product plan](docs/PRODUCT.md), [architecture](docs/ARCHITECTURE.md), [Office Hours](docs/OFFICE_HOURS.md), [CEO review](docs/CEO_REVIEW.md), [opportunity score](docs/OPPORTUNITY_SCORE.md), and [build prompts](docs/BUILD_PROMPTS.md).
