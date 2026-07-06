# SprintPulse Web Console

Disposable Codex web parity pilot target.

This repository is intentionally separate from any Claude-owned app output. It
is a Codex-owned React/Vite app used to validate the web app factory path:
install, lint, typecheck, test, build, Playwright screenshots, `nsctl web
smoke`, PR publication, check waiting, and public artifact reporting.

## Commands

```bash
npm install
npm run lint
npm run typecheck
npm test -- --run
npm run build
npx playwright test
```

Playwright writes:

- `artifacts/web-smoke/first-screen.png`
- `artifacts/web-smoke/mobile-first-screen.png`

