// Base Entry class for all extension entry points

/**
 * Base class for extension entries (UI/content entry points).
 * Entries can extend the manifest and register UI/content logic.
 */
export class Entry {
  /**
   * Optionally extend the manifest (e.g., add entry to manifest fields).
   */
  extendManifest?(manifest: any): void;

  /**
   * Optionally register UI logic (for popup/options/devtools).
   */
  registerUI?(ctx: any): void;

  /**
   * Optionally register content script logic.
   */
  registerContent?(): void;
}
