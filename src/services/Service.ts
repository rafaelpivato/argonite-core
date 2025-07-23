// Base Service class for all extension services

/**
 * Base class for extension services.
 * Services can extend the manifest and register background logic.
 */
export class Service {
  /**
   * Optionally extend the manifest (permissions, fields, etc).
   */
  extendManifest?(manifest: any): void;

  /**
   * Optionally register background logic (alarms, listeners, etc).
   */
  registerBackground?(): void;
}
