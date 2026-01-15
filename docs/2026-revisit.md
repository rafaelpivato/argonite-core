# Argonite – Revisit Overview (Build vs Runtime Clarification)

**Date:** 2026-01  
**Context:** Revisiting Argonite after ~6 months pause

This document captures my updated understanding of Argonite’s architecture and the decisions made while revisiting the project, specifically around **build-time vs runtime responsibilities**.

The goal here is not to finalize the architecture, but to **freeze a coherent mental model** before continuing implementation.

---

## 1. Core realization

The main issue I identified while revisiting Argonite is that the distinction between **build-time** and **runtime** was never made explicit.

Although both concepts were implicitly present in earlier discussions and overviews, they were:
- mixed conceptually
- blurred across modules
- and not enforced by design

This led to ambiguity around the responsibilities of `argonite-core` and the role of Services.

---

## 2. Decision: `argonite-core` is runtime only

I now explicitly define **argonite-core as a runtime framework**.

argonite-core:
- runs inside Chrome extension contexts (background, content scripts, etc.)
- executes logic, lifecycle hooks, and event handling
- provides structured runtime abstractions over `chrome.*`
- does **not** participate in build, compilation, or manifest generation

In short:

> **argonite-core executes an already-existing extension; it does not define or prepare one.**

This removes the biggest architectural ambiguity.

---

## 3. Build-time is intentionally out of scope (for now)

At this stage, Argonite **does not require a build step**.

Key points:
- Standard `manifest.json` is used as-is
- Standard Chrome entry files (`background.ts`, `content.ts`, etc.) are used as-is
- Argonite is added by importing and instantiating runtime classes in those files

This allows:
- zero-configuration adoption
- fast iteration
- minimal cognitive overhead
- no premature abstraction

This is a deliberate decision, not a missing feature.

---

## 4. Manifest by convention (not replacement)

For the initial versions:
- The Chrome manifest is **not replaced**
- No DSL or custom manifest format is introduced
- Conventions (file locations, imports, patterns) are preferred

Argonite adapts to Chrome’s structure instead of redefining it.

Any future attempt to *replace* or *generate* manifests is postponed until:
- runtime architecture is stable
- conventions are well understood
- the cost/benefit is clearly justified

---

## 5. Future build-time layer (Vite plugin)

Although build-time is out of scope now, it is not rejected.

The most natural place for build-time logic is:
- a **custom Vite plugin**

That plugin could eventually:
- analyze project structure
- infer capabilities and permissions
- validate conventions
- assist with manifest generation or validation

Crucially:
- this layer is optional
- it lives **outside argonite-core**
- it can be introduced incrementally without breaking runtime

---

## 6. Phased architecture mindset

Argonite is intentionally evolving in phases:

| Phase | Scope |
|-----|-----|
| v1 | Runtime framework only (`argonite-core`) |
| v2 | Convention validation |
| v3 | Optional build-time inference |
| v4 | Optional manifest generation/replacement |

This avoids premature complexity while keeping the architecture extensible.

---

## 7. Summary of decisions at this revisit moment

- `argonite-core` = runtime only ✅  
- No required build step for v1 ✅  
- Manifest remains standard Chrome manifest ✅  
- Conventions over configuration ✅  
- Build-time tooling deferred, not denied ✅  
- Vite plugin is the future build-time hook ✅  

This document marks the moment Argonite transitioned from a *conceptually blurred framework* to a **clearly staged architecture with explicit scope boundaries**.

