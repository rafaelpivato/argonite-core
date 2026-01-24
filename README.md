# Argonite Core

Argonite Core is a **runtime-first framework** for modeling Chrome extensions as
explicit systems rather than collections of scripts.

It defines:
- runtime execution contexts
- authority and directionality rules
- system-owned actors
- safe boundaries for developer logic

Argonite Core focuses exclusively on **runtime behavior**.
Build-time concerns, filesystem structure, and tooling are intentionally out of scope.

This repository is guided by the architectural invariants defined in
[`SPECIFICATION.md`](./SPECIFICATION.md).

Implementation details are deliberately minimal and free to evolve, as long as
they preserve the constraints and guarantees described in the specification.
