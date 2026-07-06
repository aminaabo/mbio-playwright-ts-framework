# Task 1 - Web UI Automation Framework

Playwright + TypeScript automation framework for the public mb.io website. The suite covers the requested navigation, trading, content, link, and edge-case scenarios without logging in or submitting any personal or financial information.

## Tech Stack

- Playwright Test
- TypeScript
- Page Object Model for reusable page behavior
- Data-driven navigation and content expectations
- HTML report, trace, and screenshot on failure

## Project Structure

```text
tests/
  data/                 Test data and expected labels/routes
  pages/                Page objects
  specs/                Playwright specs grouped by scenario
playwright.config.ts    Browser, viewport, timeout, reporter config
```

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test
npm run report
```

## Scenario Coverage

- Navigation and layout
  - top navigation visible at desktop viewport
  - expected navigation destinations
  - route opening checks for each internal top-nav item
- Trading functionality
  - Spot market section rendering
  - trading pair/asset rows or cards include symbol and market data
  - market categories: Top Gainers, Trending Now, Top Losers
- Content and links
  - marketing banner/hero regions
  - app download deep-link resolution
  - About Us / Why MultiBank company page headings, stats, and trust sections
- Negative and edge cases
  - invalid route handling
  - broken top-navigation link detection
  - mobile breakpoint navigation accessibility
  - content loading timeout behavior
- Bonus coverage
  - simple API/network response validation for the homepage document
  - parameterized test data in `tests/data/navigation.ts`
  - basic GitHub Actions CI in `.github/workflows/playwright.yml`

## CI

The GitHub Actions pipeline runs on pushes. It installs dependencies, installs Playwright browsers, runs the Playwright tests, and uploads the report.


```md
# Task 2 – QA Strategy & Thinking

## 1. Where Do You Start?

I would start by understanding the product and the main user journeys before writing or running tests.

Since this is a trading app and users may be dealing with real money, I would first try to understand how the app is supposed to work, which flows are most important, and where the biggest risks are.

I would speak with the product owner and developers, review the requirements, and explore the app myself on both Android and iOS. I’d focus first on the critical areas like login, deposits, withdrawals, balances, and trading.

## 2. How Would You Approach Testing This App?

I would use a mix of manual testing, exploratory testing, and automation.

First, I would manually test the main flows to understand the app behavior and catch obvious functional or usability issues. After that, I would automate the most important regression scenarios, especially the ones that need to be checked often.

I would also test on different devices, screen sizes, and OS versions.

## 3. What Does QA Look Like Inside A Sprint?

For me, QA should start early in the sprint, not only after development is finished.

During refinement, I would review the requirements and ask questions if anything is unclear. While developers are working, I would prepare test cases based on the acceptance criteria.

As soon as a feature is ready, I would test it and report issues with clear steps, actual result, expected result, screenshots, or logs if needed. Near the end of the sprint, I would run regression tests to make sure the new changes did not break existing functionality.

## 4. What Does Your Ideal Regression Suite Look Like?

My ideal regression suite would cover the most important and most used features.

For a trading app, that would include login, authentication, deposits, withdrawals, placing trades, checking balances, portfolio view, transaction history, notifications, and account settings.

I would automate the most stable and important scenarios so they can run regularly, for example after a new build or before a release. The goal is to get quick feedback on whether the main app flows are still working.

## 5. What Would Keep You Up At Night About This App Specifically?

The biggest concern for me would be anything that affects users’ money, security, or trust.

For example, incorrect balances, wrong trade execution, failed withdrawals, duplicated transactions, login/security issues, or the app crashing during high market activity.

Before release, I would want to make sure the critical flows are tested, regression tests have passed, and there are no open high-severity bugs. For a trading app, accuracy and reliability are more important than releasing quickly.
```