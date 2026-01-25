import { RuntimeSentinel } from "../sentinels/runtime-sentinel";
import { RuntimeContext } from "./runtime-detection";

export class BackgroundRuntime {
  private readonly sentinel: RuntimeSentinel;
  private started = false;
  private services: any[] = [];

  constructor() {
    this.sentinel = new RuntimeSentinel(RuntimeContext.Background);
  }

  registerService(service: any) {
    if (this.started) {
      throw new Error(
        "Argonite Core: Cannot register service after runtime started",
      );
    }
    this.services.push(service);
  }

  start() {
    if (this.started) {
      throw new Error("Argonite Core: BackgroundRuntime already started");
    }
    this.started = true;
    for (const svc of this.services) {
      if (typeof svc.onStart === "function") {
        svc.onStart();
      }
    }
  }
}
