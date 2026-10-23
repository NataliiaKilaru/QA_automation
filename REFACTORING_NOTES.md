# Feature-based refactoring

## Structure
- `pages/<feature>/*.locators.ts`: locators and locator getters
- `pages/<feature>/*.actions.ts`: user interactions
- `pages/<feature>/*.assertions.ts`: reusable Playwright expectations
- `pages/*.page.ts`: backwards-compatible public Page Object entry points
- `pages/base.page.ts`: shared navigation

## Changes
- Moved actions and locators next to their features (Book Store, Web Tables, Login, Profile).
- Moved Book Store and Web Tables verification helpers into feature assertion modules.
- Extracted Login and Profile action expectations into feature assertion modules.
- Updated imports in existing tests and public page classes.
- Removed unused `pages/exceptions` placeholder.
- Preserved existing test scenarios, API clients, CI workflow, and Chromium configuration.

## Verification
Run `npm.cmd ci`, `npx.cmd tsc --noEmit`, and `npx.cmd playwright test` in PowerShell.
Browser tests must be run on your machine or in GitHub Actions; this archive does not include `.env`.

## Important
Copy the files into your existing Git repository (do not replace `.git` or `.env`). Remove obsolete folders `pages/actions`, `pages/locators`, `pages/exceptions` and obsolete helpers `helpers/bookStore.helper.ts`, `helpers/webTables.helper.ts` when applying the refactor. Check `git status` before committing.
