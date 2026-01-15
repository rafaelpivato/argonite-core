# Argonite Core – Runtime‑Only Decisions (2026 Synthesis)

This document synthesizes the architectural decisions converged during the 2026 Argonite revisit discussions. It intentionally avoids aspirational features and focuses on **what Argonite Core is allowed to do, what it must not do, and why**.

The guiding principle is simple:

> **Argonite Core is a runtime system model for Chrome extensions, not a build framework.**

---

## 1. Scope Boundary (Non‑Negotiable)

### Argonite Core **is**:
- A **runtime abstraction layer** over Chrome extension contexts
- Executed **inside** background, content scripts, and UI pages
- Responsible for:
  - lifecycle
  - ownership boundaries
  - service composition
  - message directionality

### Argonite Core **is not**:
- A bundler
- A transpiler
- A manifest generator
- A file‑system or import graph analyzer
- A DSL over Chrome APIs

Argonite assumes that **valid JavaScript already exists at runtime**.

---

## 2. Transpilation vs Bundling

### Transpilation
- **Unavoidable** (TypeScript / TSX → JavaScript)
- Explicitly **out of scope** for Argonite Core
- Handled by user tooling (`tsc`, Vite, esbuild, etc.)

### Bundling
- Not strictly required by Argonite
- Practically common due to Chrome constraints
- Treated as a **runtime precondition**, not a framework concern

> Argonite never depends on *how* code was bundled, only that it runs as JavaScript.

---

## 3. Runtime Contexts as First‑Class Concepts

Argonite defines **explicit runtime types**, not implicit environments:

- `BackgroundRuntime`
- `ContentRuntime`
- `UiRuntime`

Each runtime:
- Knows **where it is allowed to execute**
- Performs **runtime self‑validation**
- Fails loudly if instantiated in the wrong context

Example responsibility:
- `BackgroundRuntime` throws if executed outside background service worker
- `ContentRuntime` throws if used in UI or background

This avoids build‑time validation entirely.

---

## 4. Services: Ownership Over Syntax

Services are **runtime units of ownership**, not syntactic helpers.

Key properties:
- Explicit lifecycle (`onStart`, `onDispose`)
- Explicit scope declaration

Example:
```ts
export class SchedulerService extends Service {
  static scope = 'background'
}
```

Runtime enforcement:
- A `ContentRuntime` cannot register a background‑scoped service
- Misuse fails at runtime with a clear error

This replaces fragile import‑level policing.

---

## 5. Imports Are Not a Problem (Auto‑Imports Are)

### Allowed
```ts
import { MessagingService } from './services/messaging'
```

Imports:
- Define **code ownership**
- Are handled by the JavaScript module system
- Are intentionally not intercepted or inferred by Argonite

### Disallowed (by design)
- Auto‑discovery of files
- Implicit registration via directory scanning
- Framework‑controlled imports

Argonite operates **after** imports, not around them.

---

## 6. Single Background Runtime (Intentional Constraint)

Argonite enforces:
- **Exactly one** `BackgroundRuntime` per extension

Reasoning:
- Chrome MV3 has one background service worker
- Multiple runtimes fragment lifecycle and state
- A single runtime preserves system‑level reasoning

This is a **deliberate limitation** that produces clarity and safety.

---

## 7. Directionality Model

Directionality defines **ownership and authority**, not message capability.

### Roles
| Context | Role |
|------|------|
| Background | System authority |
| Content | Client |
| UI (Popup/Options) | Client |

### Communication rules
- Clients request capabilities from background
- Background owns shared state
- Background may broadcast events

Allowed:
- content → background (requests)
- background → content (responses, events)

Disallowed:
- content mutating background state directly
- symmetric peer‑to‑peer chaos

This constraint reduces coupling and preserves debuggability.

---

## 8. Why This Is Not “Just Another Chrome API Wrapper”

Argonite does **not** exist to rename `chrome.*` APIs.

It exists to introduce:
- explicit lifecycles
- explicit ownership
- explicit boundaries
- explicit system structure

If removing Argonite only makes code more verbose, it failed.
If removing Argonite removes structure and clarity, it succeeded.

---

## 9. Tooling Philosophy

- Build tools: **optional, external, replaceable**
- Validation: prefer **runtime enforcement**
- Tooling may add guardrails, never authority

Future tooling (CLI / Vite plugin) may:
- validate conventions
- warn earlier
- assist ergonomics

But **never redefine runtime behavior**.

---

## 10. Core Principle (Final)

> **Argonite Core models an extension as a runtime system, not a folder of scripts.**

Everything else is intentionally excluded.

