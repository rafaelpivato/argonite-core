# argonite-core Bootstrap & Release Plan

This document outlines the step-by-step plan to bootstrap the argonite-core framework and deliver a first usable 0.0.1 version for consumption by Chrome Extension projects.

---

## 1. Project Initialization
- Use this repository as the codebase for argonite-core.
- Create and/or update the following files as needed:
  - `package.json` (TypeScript, ESM-only, exports, types)
  - `tsconfig.json` (strict, ESM, declaration output)
  - `.gitignore`, `README.md`, `LICENSE`
- Set up basic npm scripts: `build`, `lint`, `test`, `typecheck`

## 2. Core Source Structure
- `src/Extension.ts` — main Extension class (fluent API)
- `src/context/` — context logic (background, content, popup, etc.)
- `src/entries/` — base entry classes (PopupEntry, OptionsEntry, DevtoolsPanelEntry, ContentEntry)
- `src/services/` — base service classes (SchedulerService, StorageService, MessagingService)
- `src/types/` — shared types/interfaces
- `index.ts` — main export

## 3. Minimal Implementation
- Implement Extension class with fluent API and manifest/build hooks
- Implement at least one entry (PopupEntry) and one service (SchedulerService)
- Provide type definitions for all public APIs
- Add JSDoc comments for public classes/methods

## 4. Build & Type Declarations
- Use `tsup` or `rollup` (or plain `tsc`) to build ESM output and generate `.d.ts` files
- Ensure `package.json` exports field is correct for ESM and types

## 5. Documentation
- Update `README.md` with installation, usage, and example
- Ensure `/docs` folder covers architecture, API, packaging, and integration

## 6. Versioning & Release
- Set version to `0.0.1` in `package.json`
- Publish to npm with `npm publish --access public`
- Tag release in git

## 7. Consumption Test
- Create a minimal test project (not in this repo) that installs `@argonite/core@0.0.1` and uses the Usage Example from the README
- Verify type safety, ESM compatibility, and Vite integration

---

## Checklist for 0.0.1
- [x] Project initialized with ESM & TypeScript
- [x] Core Extension, Entry, and Service classes implemented
- [x] Type definitions and docs included
- [x] Build and publish scripts working
- [x] README and docs up to date
- [ ] Successfully consumed by a Vite-based extension project

---

For more details, see the [docs/](./docs/) folder.

---

**Next step:** Build & Type Declarations — set up and verify the build process to emit ESM JavaScript and type declarations.
