import type { MessagingCapability } from "../facade/capabilities";
import { MessagingCapabilityAdapter } from "../capabilities/messaging-capability";

export class MessagingSentinel {
  readonly capability: MessagingCapability;

  constructor() {
    this.capability = new MessagingCapabilityAdapter(this.send.bind(this));
  }

  private send(msg: unknown): Promise<unknown> {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage(msg, (response) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(response);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
