import { RuntimeSentinel } from "../sentinels/runtime-sentinel";
import { RuntimeContext } from "./runtime-detection";

export class ContentRuntime {
  private readonly sentinel: RuntimeSentinel;
  private entryMounted = false;

  constructor() {
    this.sentinel = new RuntimeSentinel(RuntimeContext.Content);
  }

  mountEntry(entry: any) {
    if (this.entryMounted) {
      throw new Error("Argonite Core: ContentRuntime entry already mounted");
    }
    this.entryMounted = true;
    if (typeof entry.mount === "function") {
      entry.mount();
    }
  }
}
