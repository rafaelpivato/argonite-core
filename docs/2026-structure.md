# Argonite Extension — Canonical Structure & Conventions

This document explains **how an Argonite extension using `argonite-core` is expected to look**, based on the architectural reviews and decisions discussed so far.

It covers:
- the runtime-only nature of Argonite Core
- the role of transpilation and bundling
- explicit wiring over discovery
- naming conventions and tooling (non-semantic)
- **canonical structures for both small and large projects**

This document is **descriptive, not prescriptive**.

---

## 1. Core Premise (Frozen)

> **Argonite Core is a runtime framework.**

Therefore:
- It runs only inside Chrome extension contexts
- It does not inspect the filesystem
- It does not infer behavior from structure
- It does not participate in build, bundling, or manifest generation

Any filesystem structure or naming convention is:
- erased before runtime
- invisible to Argonite Core
- meant only for humans and tooling

---

## 2. What an Argonite Extension Fundamentally Is

At runtime, an Argonite extension is:

- a set of Chrome entry scripts
- that explicitly bootstrap runtimes
- and explicitly register services and entries

There is:
- no auto-discovery
- no implicit registration
- no filesystem-driven behavior

This invariant holds for both small and large extensions.

---

## 3. Minimal Runtime Shape (Conceptual)

Background context:

```ts
const runtime = new BackgroundRuntime()
runtime.registerService(SomeService, deps)
runtime.start()
```

Page or content context:

```ts
const runtime = new PageRuntime() // or ContentRuntime
runtime.mount(new SomeEntry())
```

Only explicit imports and wiring define behavior.

---

## 4. Why Conventions Are Safe

Argonite extensions are assumed to be:
- transpiled
- bundled

As a result:
- folders do not exist at runtime
- filenames do not exist at runtime
- conventions cannot affect behavior accidentally

This gives a strong guarantee:

> **Any convention that would still matter after bundling is invalid.**

---

## 5. Canonical Structure — Small Project

This is a **small but honest** Argonite extension.
Typical for experiments, MVPs, or single-feature extensions.

```
src/
  background.ts
  popup.ts
  content.ts

  popup.entry.ts
  content.entry.ts

  preferences.service.ts
```

### Characteristics

- minimal number of files
- flat structure
- explicit wiring everywhere
- no features or grouping yet

### Notes

- `background.ts`, `popup.ts`, `content.ts` are Chrome-loaded entry scripts
- entries and services are imported manually
- this structure can grow without refactoring pressure

This is the **baseline** structure.

---

## 6. Canonical Structure — Medium Project (Early Growth)

A small extension after some growth, with light organization.

```
src/
  background.ts
  popup.ts
  options.ts

  entries/
    popup.entry.ts
    options.entry.ts
    twitter.content.entry.ts

  services/
    preferences.service.ts
    sync.service.ts
```

### Characteristics

- naming conventions (`*.entry.ts`, `*.service.ts`)
- basic grouping
- still very explicit
- no semantic meaning in folders

---

## 7. Canonical Structure — Large Project (Recommended)

This represents a **large but sane** Argonite extension after months of development.

```
src/
  main/
    background.ts
    popup.ts
    options.ts
    devtools.ts

  entries/
    popup/
      popup.entry.ts
      popup.view.tsx
    options/
      options.entry.ts
      options.view.tsx
    devtools/
      inspector.entry.ts
      inspector.view.tsx
    content/
      twitter/
        twitter.content.entry.ts
      linkedin/
        linkedin.content.entry.ts

  services/
    preferences.service.ts
    auth.service.ts
    sync.service.ts
    telemetry.service.ts

  features/
    sync/
      sync.service.ts
      sync.entry.ts
      sync.view.tsx
      sync.model.ts
    monitoring/
      monitoring.service.ts
      monitoring.entry.ts
      monitoring.view.tsx

  shared/
    messaging/
      events.ts
      channels.ts
    utils/
      debounce.ts
      time.ts
    types/
      domain.ts

  ui/
    components/
      Button.tsx
      Modal.tsx
    hooks/
      usePreferences.ts

  assets/
    icons/
    styles/
```

This structure is **canonical**, not enforced.

---

## 8. Meaning of Each Area (Human Semantics Only)

### `main/`
Composition roots.

- Chrome-loaded entry scripts
- create runtimes
- register services
- mount entries

No business logic should live here.

---

### `entries/`
Runtime adapters.

- one entry = one execution context binding
- glue between context and services
- explicit and intentional

---

### `services/`
Developer-authored services.

- business logic
- lifecycle-aware
- dependency-injected
- runtime-agnostic

---

### `features/`
Pure organization and ownership.

- groups services, entries, and UI
- expresses intent and locality
- has **no runtime meaning**

---

### `shared/`
Pure, reusable code.

- no Chrome APIs
- no Argonite runtime types
- safe to import anywhere

---

### `ui/`
Optional presentation layer.

- components
- hooks
- styling
- no runtime or Chrome knowledge

---

## 9. What Is Intentionally Absent

The following do **not** belong in an Argonite extension repository:

- `sentinels/` — framework internals
- `runtime/` — runtime is a fact, not a concern
- `capabilities/` — injected, not authored
- auto-registration folders
- filesystem-driven semantics

If removing a folder would break runtime behavior, it does not belong.

---

## 10. Tooling & Naming Conventions

Accepted conventions:
- `*.service.ts`
- `*.entry.ts`
- context-descriptive filenames (e.g. `*.content.entry.ts`)

Tooling may:
- scan files
- scaffold code
- warn about missing wiring
- generate documentation

Tooling must never:
- alter runtime behavior
- replace explicit imports
- be required to run the extension

---

## 11. Canonical Rule (Frozen)

> **Filesystem structure may explain the system, but never define it.**

Runtime truth lives in explicit code and wiring only.

---

## 12. One-Sentence Definition

> *An Argonite extension is a Chrome extension whose entry scripts explicitly bootstrap runtimes and register services. Filesystem structure is conventional, erased at build time, and exists only to support human reasoning and tooling.*

---

End of document.

