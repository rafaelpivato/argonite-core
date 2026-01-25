// Abstract Service base class for Argonite Core
export abstract class Service {
  /**
   * Optional: Called when the service is started by the runtime.
   */
  onStart?(): void;

  /**
   * Optional: Called when the service is disposed by the runtime.
   */
  onDispose?(): void;
}
