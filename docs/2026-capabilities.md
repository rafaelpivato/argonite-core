# Argonite Runtime Model — Sentinels, Services, and Capabilities

This document consolidates and freezes the **runtime architecture model** for Argonite after the introduction of **Sentinels** and the clarification of **Capabilities**.

It is intended to be:
- a *conceptual reference*
- a *design guardrail*
- a *downloadable artifact* usable as long‑term project context

---

## 1. Core Principle

> **Sentinels hold power.  
> Capabilities expose permission.  
> Services implement behavior.**

This separation is deliberate and non‑negotiable.

---

## 2. Sentinels (Framework Internals)

### What Sentinels are

Sentinels are **internal runtime guardians** owned by `argonite-core`.

They:
- own Chrome APIs and other privileged runtime resources
- enforce runtime context and directionality
- maintain lifecycle and cleanup guarantees
- prevent illegal states

Sentinels are:
- singleton per runtime (where applicable)
- long‑lived
- few in number
- never instantiated by developers

### What Sentinels are not

Sentinels are **not**:
- developer APIs
- extension business logic
- reusable utilities
- feature‑level abstractions

Developers should **never import or subclass a Sentinel**.

---

## 3. Services (Developer‑Facing API)

### What Services are

Services are the **primary abstraction exposed to developers**.

They:
- contain business or application logic
- compose capabilities
- are explicitly registered
- are testable and mockable
- do not own authority

Services:
- do not access `chrome.*` directly
- do not manage global lifecycle
- do not enforce runtime rules

They *operate within* the boundaries enforced by Sentinels.

### Example

```ts
export class PreferencesService extends Service {
  constructor(private storage: StorageCapability) {
    super()
  }

  async setTheme(theme: string) {
    await this.storage.set('theme', theme)
  }
}
```

---

## 4. Capabilities (The Critical Bridge)

### Definition

> A **Capability** is a narrow, authority‑limited interface exposed by a Sentinel to Services.

Capabilities:
- expose *what is allowed*
- hide *how it is enforced*
- carry no lifecycle
- carry no authority

They are **permits**, not actors.

---

## 5. Why Capabilities Exist

Once Sentinels are internal and Services are public, something must:
- safely expose privileged behavior
- without leaking Chrome APIs
- without granting global power

That something is the Capability.

Without Capabilities:
- Services would need authority (bad)
- or Sentinels would leak (worse)

---

## 6. Example: Storage

### Sentinel (internal)

```ts
class StorageSentinel {
  createCapability(namespace: string): StorageCapability {
    return {
      get: (key) => this.get(namespace, key),
      set: (key, value) => this.set(namespace, key, value),
      watch: (handler) => this.watch(namespace, handler)
    }
  }
}
```

Responsibilities:
- owns `chrome.storage`
- enforces namespacing
- enforces quotas
- enforces runtime context

---

### Capability (public)

```ts
export interface StorageCapability {
  get<T>(key: string): Promise<T | undefined>
  set<T>(key: string, value: T): Promise<void>
  watch(handler: (changes) => void): Unsubscribe
}
```

Properties:
- tiny surface
- stable contract
- easy to mock
- runtime‑agnostic

---

### Service (developer)

```ts
export class PreferencesService extends Service {
  constructor(private storage: StorageCapability) {
    super()
  }
}
```

The Service:
- cannot escape its namespace
- cannot misuse Chrome APIs
- cannot violate runtime rules

---

## 7. Capability vs Service (Clear Contrast)

| Aspect | Capability | Service |
|------|-----------|---------|
| Lifecycle | No | Yes |
| Authority | No | No |
| Chrome API access | No | No |
| Business logic | No | Yes |
| Composition | No | Yes |
| Created by | Sentinel | Developer |
| Used by | Service | Feature / UI |

Capabilities are **tools**.
Services are **actors**.

---

## 8. Capability Injection

Capabilities are wired by the **runtime**, not by developers.

```ts
runtime.registerService(
  PreferencesService,
  {
    storage: storageSentinel.createCapability('prefs')
  }
)
```

This ensures:
- centralized authority
- explicit wiring
- strong runtime guarantees

---

## 9. Features (Composition Only)

Features group **Services and UI**, never Sentinels.

They:
- declare structure
- express intent
- do not own runtime power

Sentinels already exist underneath.

---

## 10. When to Introduce a Capability

Introduce a Capability **only if**:
- a Chrome API or global resource is involved
- authority must be restricted
- access must be controlled

Do **not** introduce Capabilities for:
- pure computation
- formatting
- validation
- local logic

---

## 11. Final Intuition (Frozen)

> **Sentinels are what actually holds the power.**
>
> **Capabilities are what developers are allowed to touch.**
>
> **Services are what developers write.**

This triangle defines Argonite’s runtime model.

Breaking it breaks the framework.

---

## 12. Architectural Outcome

With this model, Argonite achieves:
- strong runtime guarantees
- safe developer ergonomics
- testable services
- minimal public API surface
- clear separation of concerns

Argonite is no longer just a Chrome extension framework.

It is a **runtime system model**.

