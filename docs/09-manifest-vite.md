# Manifest & Vite Configuration

## For Projects Using Argonite

Projects that use the `argonite-core` framework should rely on Vite for their build tooling and manifest generation. The framework itself does not depend on or include Vite.

### Manifest Generation

- Use `extension.toManifestConfig()` in your project's `manifest.config.ts`:
  ```ts
  import extension from './src/main'
  import { buildManifest } from 'argonite-core'
  export default buildManifest(extension.toManifestConfig())
  ```

### Vite Multi-Entry

- Use `extension.getRollupInputs()` in your project's `vite.config.ts`:
  ```ts
  import extension from './src/main'
  import { defineConfig } from 'vite'
  export default defineConfig({
    build: {
      rollupOptions: {
        input: extension.getRollupInputs()
      }
    }
  })
  ```

### Vite Plugin

- Projects can use `vite-plugin-argonite` for seamless integration with Vite (see packaging doc).

## Note

`argonite-core` is a framework library and does not include Vite or any build tooling. All Vite-related configuration is for consuming projects only.