# Argonite Runtime Model — Introducing **Sentinel**

**Status:** Conceptual clarification  
**Scope:** Naming + responsibilities  
**No API or implementation changes implied**

---

## Summary

This document formalizes the decision to replace the term **Service / RuntimeService** with **Sentinel** when referring to Argonite’s **runtime-level system actors**.

The goal is to remove ambiguity between:
- **developer-facing services** (capabilities, helpers, SDK-like APIs), and
- **system-level runtime actors** (lifecycle, authority, enforcement).

The term **Sentinel** is adopted to represent the latter.

---

## Why “Service” was insufficient

The word *service* overloaded two very different concepts:

1. **Developer Services**
   - Convenience APIs
   - Capability providers (e.g. storage, messaging)
   - Exist only when used
   - Meaningful only to the developer

2. **Runtime Actors**
   - Exist by system declaration
   - Own lifecycle and authority
   - Enforce scope and directionality
   - Meaningful even if never called

This semantic collision caused confusion when reasoning about layers.

---

## Definition: Sentinel

A **Sentinel** is a **runtime-owned system actor** that exists to **watch, enforce, and react** within a specific execution context.

> A Sentinel runs as part of the system.  
> It is not “used”; it is *present*.

---

## Core Responsibilities of a Sentinel

A Sentinel is responsible for:

### 1. Existence & lifecycle
- Exists because the system declares it
- Starts, runs, and stops under runtime control
- May be essential even if no API is exposed

### 2. Runtime scope enforcement
- Declares where it is allowed to run (background, content, UI)
- Is invalid if instantiated in the wrong runtime
- Fails loudly at runtime when mis-scoped

### 3. Authority & ownership
- Owns specific responsibilities by definition
- Controls access to state, resources, or coordination
- Answers “who is allowed to do this?”

### 4. Directionality
- Enforces asymmetric relationships
- Clients request; Sentinels decide
- Prevents peer-to-peer chaos

### 5. System identity
- Has meaning to the runtime itself
- Can be started, stopped, queried, or reasoned about
- Removing it alters the system model

---

## What a Sentinel is *not*

A Sentinel is **not**:

- A helper
- A utility
- A convenience wrapper
- A developer-facing SDK feature
- Something instantiated ad-hoc
- Something whose existence depends on being called

If it is optional *and* invisible to the system, it is not a Sentinel.

---

## The Litmus Test

Ask:

> “If this exists but nobody ever calls it, does it still matter?”

- **Yes** → Sentinel  
- **No** → Developer service / helper

---

## Why “Sentinel”

The term *Sentinel* conveys:
- Presence without invocation
- Continuous vigilance
- Reaction to events
- Enforcement rather than assistance

A Sentinel:
- watches
- guards
- reacts
- ensures things happen (or don’t)

---

## Naming Test

> “The extension runtime is composed of multiple **sentinels** that enforce authority and lifecycle.”

If the sentence sounds structural rather than helpful, the name is correct.

---

## Relationship to Developer Services

- Sentinels **may expose** developer-facing services
- Developer services **may depend on** Sentinels
- Sentinels do **not** depend on developer services to exist

Direction always flows:

helpers / services → sentinel → runtime

---

## Final Note

This change is **semantic, not mechanical**.

It clarifies:
- mental model
- documentation
- architectural reasoning

without forcing:
- refactors
- API changes
- new layers

The name **Sentinel** encodes the intent of the abstraction and teaches the architecture by itself.
