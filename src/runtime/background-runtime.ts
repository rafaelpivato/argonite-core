import { RuntimeSentinel } from "../sentinels/runtime-sentinel";
import { RuntimeContext } from "./runtime-detection";

type ServiceCtor<T = any> = new (...args: any[]) => T;
type MessageHandler = (
  msg: any,
  ctx: { getService: <T>(svc: new (...args: any[]) => T) => T },
) => any;

export class BackgroundRuntime {
  private readonly sentinel: RuntimeSentinel;
  private started = false;

  private serviceCtors: ServiceCtor[] = [];
  private serviceInstances = new Map<ServiceCtor, any>();

  private messageHandlers = new Map<string, MessageHandler>();

  constructor() {
    console.info("[Argonite][BackgroundRuntime] constructed");
    this.sentinel = new RuntimeSentinel(RuntimeContext.Background);
  }

  registerService<T>(Service: ServiceCtor<T>) {
    if (this.started) {
      console.error(
        "[Argonite][BackgroundRuntime] registerService called after start",
        Service.name,
      );
      throw new Error(
        "Argonite Core: Cannot register service after runtime started",
      );
    }

    console.info("[Argonite][BackgroundRuntime] registerService", Service.name);

    this.serviceCtors.push(Service);
  }

  registerMessageHandler(type: string, handler: MessageHandler) {
    if (this.started) {
      throw new Error(
        "Argonite Core: Cannot register message handler after runtime started",
      );
    }

    this.messageHandlers.set(type, handler);
  }

  start() {
    if (this.started) {
      console.warn(
        "[Argonite][BackgroundRuntime] start() called more than once",
      );
      throw new Error("Argonite Core: BackgroundRuntime already started");
    }

    console.info("[Argonite][BackgroundRuntime] starting");

    this.started = true;

    for (const Service of this.serviceCtors) {
      console.info(
        "[Argonite][BackgroundRuntime] instantiating service",
        Service.name,
      );

      const instance = new Service();
      this.serviceInstances.set(Service, instance);

      if (typeof instance.onStart === "function") {
        console.info(
          "[Argonite][BackgroundRuntime] calling onStart()",
          Service.name,
        );
        instance.onStart();
      }
    }

    chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      try {
        const handler = this.messageHandlers.get(msg?.type);

        if (!handler) {
          sendResponse({
            ok: false,
            error: `No handler for message type: ${msg?.type}`,
          });
          return;
        }

        const value = handler(msg, {
          getService: this.getService.bind(this),
        });

        sendResponse({ ok: true, value });
      } catch (err: any) {
        sendResponse({ ok: false, error: err.message });
      }
    });

    console.info("[Argonite][BackgroundRuntime] started");
  }

  getService<T>(Service: ServiceCtor<T>): T {
    if (!this.started) {
      console.error(
        "[Argonite][BackgroundRuntime] getService called before start",
        Service.name,
      );
    }

    const instance = this.serviceInstances.get(Service);
    if (!instance) {
      console.error(
        "[Argonite][BackgroundRuntime] getService: service not registered",
        Service.name,
      );
      throw new Error(
        `Argonite Core: Service ${Service.name} is not registered`,
      );
    }

    console.info("[Argonite][BackgroundRuntime] getService", Service.name);

    return instance;
  }
}
