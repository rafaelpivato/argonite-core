import {
  RuntimeContext,
  detectRuntimeContext,
} from "../runtime/runtime-detection";

let backgroundRuntimeActive = false;

export class RuntimeSentinel {
  private readonly context: RuntimeContext;

  constructor(expected: RuntimeContext) {
    this.context = detectRuntimeContext();
    if (this.context !== expected) {
      throw new Error(
        `Argonite Core: ${expected} instantiated in invalid context (${this.context})`,
      );
    }
    if (expected === RuntimeContext.Background) {
      if (backgroundRuntimeActive) {
        throw new Error("Argonite Core: Second BackgroundRuntime detected");
      }
      backgroundRuntimeActive = true;
    }
  }

  getContext(): RuntimeContext {
    return this.context;
  }
}
