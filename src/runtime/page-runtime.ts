import { RuntimeSentinel } from "../sentinels/runtime-sentinel";
import { RuntimeContext } from "./runtime-detection";

export class PageRuntime {
  private readonly sentinel: RuntimeSentinel;
  private entryMounted = false;

  constructor() {
    this.sentinel = new RuntimeSentinel(RuntimeContext.Page);
  }

  mountEntry(entry: any) {
    if (this.entryMounted) {
      throw new Error("Argonite Core: PageRuntime entry already mounted");
    }
    this.entryMounted = true;
    if (typeof entry.mount === "function") {
      entry.mount();
    }
  }
}
