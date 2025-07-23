# Packaging & Installation



## Core Package

- **`@argonite/core`**  
  Contains contexts, Extension class, built-in entries and services.

### Language & Module Format

- `@argonite/core` is written in TypeScript and is intended for use in TypeScript projects. Type definitions are included for all APIs.
- The package is published as ESM-only (ECMAScript Modules) and does not provide CommonJS builds.
- Projects using Argonite should use modern ESM-compatible build tools, such as Vite, for best compatibility and performance.
- This approach ensures optimal tree-shaking, modern syntax, and seamless integration with the recommended Vite-based workflow.



## Vite Integration

- **`@argonite/vite-plugin-argonite`**  
  Official Vite plugin for projects using Argonite. Handles manifest generation, multi-entry setup, and conventions for Chrome Extension projects.
  
  Install in your project:
  ```bash
  npm install -D @argonite/vite-plugin-argonite
  ```


## UI Integrations

- **`@argonite/ui-react`**  
  React connector; depends on core; installs via:
  ```bash
  npm install @argonite/ui-react
  ```
- **`@argonite/ui-vue`**  
  Vue connector; depends on core; installs via:
  ```bash
  npm install @argonite/ui-vue
  ```


## CLI

- **`@argonite/cli`**  
  Optional scaffolder and convention plugin; installs via:
  ```bash
  npm install -D @argonite/cli
  ```

## Versioning Strategy

- Follow SemVer across packages.
- Core releases first; integrations update peer dependency. 