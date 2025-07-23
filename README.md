# argonite-core

The core framework for building modular, type-safe Chrome Extensions with a fluent API and modern best practices. Designed for use with Vite and TypeScript.

## Features
- Fluent API for extension setup
- Modular services and entrypoints
- ESM-only, TypeScript-first
- Integrates seamlessly with Vite via vite-plugin-argonite

## Installation

```bash
npm install argonite-core
```


## Usage Example

Create a new file at `src/main.ts`:

```ts
import { Extension, PopupEntry, SchedulerService } from 'argonite-core';

// 1. Create your extension instance
const extension = new Extension({ name: 'My Extension', version: '1.0.0' });

// 2. Add a background service (e.g., a scheduler)
extension.addService(
  new SchedulerService('refresh', '*/5 * * * *', () => {
    // Your scheduled task logic here
  })
);

// 3. Set up a popup UI entry
extension.setPopup(
  new PopupEntry('popup.html', (container) => {
    container.textContent = 'Hello from Popup!';
  })
);

// 4. Export your extension for use in manifest and build config
export default extension;
```

In your project, use `vite-plugin-argonite` and follow the [packaging guide](./docs/07-packaging.md) for manifest and build setup.

---

For more details, see the [documentation](./docs/).
