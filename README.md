# How to Test a Chrome Extension End-to-End

Test a Chrome extension's real toolbar popup with plain-language steps instead of selectors.

[![TestDriver running this test (sped up)](media/speedrun.gif)](https://console.testdriver.ai/replay/6aeb18d7efc7b72047d855b6?share=fBPgtWGkdpjgVcnfi6jkCQ)

*Sped up: idle time removed. Click to watch the full replay with step-by-step logs.*

This repo is the complete, runnable example from the TestDriver tutorial **[How to Test a Chrome Extension End-to-End](https://testdriver.ai/blog/test-chrome-extension)**. The post walks through every line.

## What the test does

Loads [Dark Reader](https://github.com/darkreader/darkreader) from the Chrome Web Store and opens a light website. It switches the extension off from its toolbar popup and checks the page is light, then switches it on and checks the page is dark.

It runs on a fresh cloud machine, loads the extension into Chrome the way a user would, and drives it from screenshots with plain-language steps. No selectors, test IDs or changes to the app.

## Run it

You need Node.js 20+ and a TestDriver API key (free to start at [console.testdriver.ai](https://console.testdriver.ai)).

```bash
git clone https://github.com/testdriverai/example-chrome-extension.git
cd example-chrome-extension
npm install
cp .env.example .env   # then paste your key into .env
npx vitest run
```

The run prints a link to its replay, so you can watch what happened.

## Run it in CI

[`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml) runs the test on every push and pull request using [`testdriverai/action`](https://github.com/testdriverai/action). Set up OIDC for your team, or add your key as a repository secret named `TD_API_KEY`. See [CI/CD](https://docs.testdriver.ai/ci-cd).

## Files

- [`tests/chrome-extension.test.mjs`](tests/chrome-extension.test.mjs): the test
- [`vitest.config.js`](vitest.config.js): Vitest with the TestDriver reporter
- [`.github/workflows/testdriver.yml`](.github/workflows/testdriver.yml): CI

## Learn more

- Tutorial: https://testdriver.ai/blog/test-chrome-extension
- Docs: https://docs.testdriver.ai/quickstart
- More examples: https://docs.testdriver.ai
