// StorageService: Typed wrapper over chrome.storage
import { Service } from './Service';

/**
 * Provides a typed wrapper over chrome.storage with defaults.
 */
export class StorageService extends Service {
  constructor(public defaults: Record<string, any> = {}) {
    super();
  }

  extendManifest(manifest: any) {
    manifest.permissions = manifest.permissions || [];
    if (!manifest.permissions.includes('storage')) {
      manifest.permissions.push('storage');
    }
  }

  registerBackground() {
    // TODO: Implement storage migration logic
  }
}
