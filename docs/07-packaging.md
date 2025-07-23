# Packaging & Installation


## Core Package

- **`argonite-core`**  
  Contains contexts, Extension class, built-in entries and services.

### Language & Module Format

- `argonite-core` is written in TypeScript and is intended for use in TypeScript projects. Type definitions are included for all APIs.
- The package is published as ESM-only (ECMAScript Modules) and does not provide CommonJS builds.
- Projects using argonite-core should use modern ESM-compatible build tools, such as Vite, for best compatibility and performance.
- This approach ensures optimal tree-shaking, modern syntax, and seamless integration with the recommended Vite-based workflow.


## Vite Integration

- **`vite-plugin-argonite`**  
  Official Vite plugin for projects using argonite-core. Handles manifest generation, multi-entry setup, and conventions for Chrome Extension projects.
  
  Install in your project:
  ```bash
  npm install -D vite-plugin-argonite
  ```

## UI Integrations

- **`argonite-react`**  
  React connector; depends on core; installs via:
  ```bash
  npm install argonite-react
  ```
- **`argonite-vue`**  
  Vue connector; depends on core; installs via:
  ```bash
  npm install argonite-vue
  ```

## CLI

- **`argonite-cli`**  
  Optional scaffolder and convention plugin; installs via:
  ```bash
  npm install -D argonite-cli
  ```

## Versioning Strategy

- Follow SemVer across packages.
- Core releases first; integrations update peer dependency. 