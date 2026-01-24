# Argonite Core — Specification

## 1. Purpose

Argonite Core is a **runtime system model** for Chrome extensions.

It defines:
- how extension code is structured at runtime
- how authority, lifecycle, and ownership are modeled
- how developer-authored logic interacts with privileged execution contexts

Argonite Core executes **inside existing Chrome extension contexts** and assumes that
valid JavaScript is already available at runtime.

---

## 2. Scope Definition

Argonite Core is concerned exclusively with **runtime behavior**.

It models:
- execution contexts
- system actors
- lifecycle boundaries
- authority and directionality
- safe access to privileged resources

Argonite Core does not define build-time behavior.

---

## 3. Runtime Context Model

Argonite defines explicit runtime contexts.  
A runtime context represents **where code is executing**.

### Defined Runtime Contexts

- **BackgroundRuntime**  
  Executes inside the Chrome background service worker.  
  Acts as the system authority.

- **ContentRuntime**  
  Executes inside injected content scripts.  
  Acts as a client of the system authority.

- **PageRuntime**  
  Executes inside extension HTML pages (popup, options, devtools, extension pages).  
  Acts as a client of the system authority.

Each runtime:
- knows which context it is allowed to execute in
- validates itself at runtime
- fails loudly if instantiated in an invalid context

There is exactly **one** BackgroundRuntime per extension.

---

## 4. Sentinels

### Definition

A **Sentinel** is a runtime-owned system actor.

Sentinels:
- exist because the system declares them
- are long-lived
- own authority and enforcement
- participate directly in runtime lifecycle

Sentinels are internal to Argonite Core.

Developers do not instantiate, import, or subclass Sentinels.

---

### Responsibilities of Sentinels

A Sentinel may:
- own privileged Chrome APIs
- enforce runtime scope and directionality
- manage global or shared lifecycle concerns
- expose restricted access to privileged behavior

A Sentinel exists even if no developer code explicitly calls it.

---

### Sentinel Identity

If a component exists but no one ever calls it, and it still matters to the system,
it is a Sentinel.

---

## 5. Capabilities

### Definition

A **Capability** is a narrow, authority-limited interface exposed by a Sentinel.

Capabilities:
- expose **what is allowed**
- hide **how it is enforced**
- carry no lifecycle
- carry no authority

A Capability is a **permit**, not an actor.

---

### Properties of Capabilities

- Created by Sentinels
- Injected by the runtime
- Stable and minimal in surface
- Safe to mock and test
- Runtime-agnostic

Capabilities do not:
- own state
- manage lifecycle
- access Chrome APIs directly

---

## 6. Services

### Definition

A **Service** is a developer-authored runtime unit.

Services:
- implement business or application logic
- consume Capabilities
- are lifecycle-aware
- are explicitly registered with a runtime

Services are the primary abstraction used by developers.

---

### Properties of Services

A Service:
- does not own authority
- does not access `chrome.*` APIs directly
- does not enforce runtime rules
- operates within boundaries enforced by Sentinels

Services may depend on:
- Capabilities
- other Services

Services may not depend on:
- Sentinels
- runtime internals

---

## 7. Directionality and Authority Model

Argonite enforces an asymmetric authority model.

### Roles

| Context            | Role              |
|--------------------|-------------------|
| BackgroundRuntime  | System authority  |
| ContentRuntime     | Client            |
| PageRuntime        | Client            |

---

### Directionality Rules

- Clients may request behavior from the authority
- Authority owns shared state and decisions
- Authority may broadcast events to clients

Peer-to-peer authority is not permitted.

This constraint is intentional and structural.

---

## 8. Entries

### Definition

An **Entry** is a runtime entry point.

Entries:
- bind execution contexts to Services
- adapt runtime environments
- act as glue between runtime and application logic

Entries are not UI abstractions.

---

### PageEntry

A **PageEntry** executes inside a PageRuntime.

Specialized PageEntries may exist for:
- popup pages
- options pages
- devtools panels
- extension pages

Entries do not:
- own authority
- manage global lifecycle
- create runtimes

---

## 9. Capability Injection

Capabilities are wired by the runtime.

Developers do not:
- construct Capabilities
- request Capabilities dynamically
- escalate permissions

Capability wiring is explicit and centralized.

---

## 10. Runtime Invariants

The following invariants must always hold:

- Exactly one BackgroundRuntime exists per extension
- Sentinels are internal and system-owned
- Services never own authority
- Capabilities never own lifecycle
- Clients do not mutate global state directly
- Runtime behavior is defined by explicit wiring
- Filesystem structure has no runtime meaning

---

## 11. Tooling Relationship

Tooling may:
- validate conventions
- scaffold code
- assist ergonomics

Tooling does not:
- define runtime behavior
- replace explicit wiring
- introduce authority

Runtime truth is defined only by executing code.

---

## 12. Final Definition

Argonite Core models a Chrome extension as a runtime system composed of explicit
execution contexts, internal sentinels, capability-based permissions, and
developer-authored services.

All behavior is defined at runtime through explicit wiring.
Build-time concerns and filesystem structure are intentionally out of scope.
