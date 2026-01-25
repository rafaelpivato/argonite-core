import { RuntimeSentinel } from "../sentinels/runtime-sentinel";
import { ClientRuntime } from "./client-runtime";
import { RuntimeContext } from "./runtime-detection";

export class PageRuntime extends ClientRuntime {
  private readonly sentinel: RuntimeSentinel;
  private entryMounted = false;

  constructor() {
    super();
    this.sentinel = new RuntimeSentinel(RuntimeContext.Page);
  }

  mountEntry(entry: any) {
    if (this.entryMounted) {
      throw new Error("Argonite Core: PageRuntime entry already mounted");
    }

    this.entryMounted = true;
    entry.runtime = this;

    const container = document.getElementById("app") ?? document.body;

    entry.mount(container);
  }

  getService<T>(service: new (...args: any[]) => T): T {
    throw new Error(
      "Argonite Core: PageRuntime cannot access services directly. " +
        "Services are owned by BackgroundRuntime.",
    );
  }
}
