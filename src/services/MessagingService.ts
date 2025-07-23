// MessagingService: Typed RPC over chrome.runtime.sendMessage
import { Service } from './Service';

/**
 * Provides typed RPC over chrome.runtime messaging.
 */
export class MessagingService extends Service {
  constructor() {
    super();
  }

  extendManifest(manifest: any) {
    // Messaging typically doesn't require extra permissions
  }

  registerBackground() {
    // TODO: Implement message listener registration
  }
}
