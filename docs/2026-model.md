# Argonite v0 — Runtime Architecture (Final)

This document freezes the **Argonite v0 runtime model** after alignment on UI, Sentinels, Capabilities, and Services.

It is intentionally:
- runtime-only
- Chrome-API–centric
- minimal but extensible
- explicit about authority and boundaries

No build-time tooling, UI frameworks, or speculative abstractions are included.

---

## 1. Core Principle

> **Sentinels own authority.**  
> **Capabilities expose permission.**  
> **Services implement behavior.**  
> **Entries start execution.**

Everything in Argonite v0 exists to safely structure access to Chrome Extension APIs.

---

## 2. Runtimes

Argonite models Chrome execution environments explicitly:

| Runtime | Description |
|------|------------|
| `BackgroundRuntime` | System authority, long‑lived |
| `ContentRuntime` | Page‑bound, environment‑reactive |
| `UiRuntime` | User‑initiated, ephemeral |

Runtimes:
- know where they are executing
- validate scope at runtime
- refuse illegal registrations loudly

---

## 3. Entries

Entries are **execution roots**. They do not own authority.

| Entry | Runtime |
|-----|--------|
| `BackgroundEntry` | BackgroundRuntime |
| `ContentEntry` | ContentRuntime |
| `UiEntry` | UiRuntime (popup, options, devtools, side panel) |

`UiEntry` exists because UI surfaces:
- are ephemeral
- are user‑initiated
- cannot assume persistence
- must act as constrained clients

---

## 4. Sentinels (Framework Internals)

Sentinels are **runtime‑owned system actors**.

They:
- own Chrome APIs
- enforce lifecycle and scope
- control directionality
- are never imported or instantiated by developers

### v0 Sentinel Set

| Sentinel | Owns |
|--------|------|
| `RuntimeSentinel` | Runtime detection and scope enforcement |
| `MessagingSentinel` | Cross‑runtime communication |
| `StorageSentinel` | `chrome.storage` |
| `ActionSentinel` | `chrome.action` |
| `CommandsSentinel` | `chrome.commands` |
| `ContextMenuSentinel` | `chrome.contextMenus` |
| `NotificationsSentinel` | `chrome.notifications` |

Sentinels are few, stable, and foundational.

---

## 5. Capabilities

A **Capability** is a narrow, authority‑free interface created by a Sentinel.

Capabilities:
- carry no lifecycle
- expose no Chrome APIs directly
- are injected by the runtime
- are consumed only by Services

### Core Capabilities

| Capability | Provided by |
|----------|-------------|
| `RuntimeInfoCapability` | RuntimeSentinel |
| `MessagingCapability` | MessagingSentinel |
| `StorageCapability` | StorageSentinel |

### UI‑Adjacent Capabilities

(UI‑adjacent, not UI‑specific)

| Capability | Provided by |
|----------|-------------|
| `ActionCapability` | ActionSentinel |
| `CommandsCapability` | CommandsSentinel |
| `ContextMenuCapability` | ContextMenuSentinel |
| `NotificationCapability` | NotificationsSentinel |

There is **no special Capability category**. All Capabilities follow the same rules.

---

## 6. Services (Developer‑Facing)

Services:
- contain behavior
- compose Capabilities
- are reusable across runtimes
- never own authority

There is **no such thing as a UI Service** — only Services whose Capabilities are valid in a given runtime.

### Framework‑Provided Services (v0)

| Service | Uses |
|-------|------|
| `MessagingService` | MessagingCapability |
| `PreferencesService` | StorageCapability |
| `UiActionService` | ActionCapability |
| `CommandRouterService` | CommandsCapability |
| `ContextMenuService` | ContextMenuCapability |
| `NotificationService` | NotificationCapability |

Developers may add their own Services freely.

---

## 7. Capability Injection & Enforcement

- Capabilities are created by Sentinels
- Runtimes decide which Capabilities may exist
- Services are wired at runtime

If a Service requires a Capability invalid for that runtime:
- registration fails immediately
- a loud runtime error is thrown

> **A Service may be called from any runtime, but it can only exist in runtimes where all of its Capabilities are valid.**

This replaces compile‑time guessing with runtime truth.

---

## 8. UI Clarification

Argonite does **not** provide:
- UI components
- styling
- layout
- routing

Argonite **does** provide:
- UiRuntime semantics
- safe access to UI‑adjacent Chrome APIs
- clear authority boundaries

UI code mounts whatever framework the developer chooses.

---

## 9. Explicitly Out of v0

To keep v0 coherent:

- `chrome.scripting`
- `chrome.tabs`
- permission inference
- build‑time tooling
- UI intent/session abstractions

These are deferred until runtime guarantees are proven stable.

---

## 10. Final Summary

Argonite v0 models a Chrome extension as a **runtime system**, not a folder of scripts.

- Sentinels guard power
- Capabilities expose permission
- Services implement behavior
- Entries start execution
- UI is a constrained client runtime

This architecture is minimal, enforceable, and extensible.

Everything else builds on top of it.

