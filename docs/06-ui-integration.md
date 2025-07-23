# UI Integration Layer

This document describes how UI packages connect to Argonite core.

## React Integration (`@argonite/ui-react`)

- **Provider**: `<ArgoniteProvider>` sets up messaging and storage context.
- **Hooks**:
  - `useMessage<Req, Res>(kind: string)`: send and receive RPC.
  - `useStore<T>(key: string)`: subscribe to a storage store.
- **Mount Helpers**: automatically invoke entry `.mount(container)` in React roots.

## Vue Integration (`@argonite/ui-vue`)

- **Plugin**: `app.use(ArgonitePlugin)` sets up global services.
- **Composables**:
  - `useMessage(kind: string)`: returns reactive RPC method.
  - `useStore(key: string)`: returns reactive store state.
- **Mount Helpers**: call `mount(container)` in `mounted()` hooks.

## UI Entrypoints

- Defined by Entry classes (`PopupEntry`, etc.).
- Framework runtime loads correct HTML and calls `.mount(container)`.