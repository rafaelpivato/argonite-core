import type { StorageCapability } from "../facade/capabilities";
import { StorageCapabilityAdapter } from "../capabilities/storage-capability";

export class StorageSentinel {
  readonly capability: StorageCapability;

  constructor() {
    this.capability = new StorageCapabilityAdapter(
      (key) => this.get(key),
      (key, value) => this.set(key, value),
      (key, cb) => this.watch(key, cb),
    );
  }

  private get<T = any>(key: string): Promise<T | undefined> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve(result[key]);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private set<T = any>(key: string, value: T): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
          } else {
            resolve();
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  private watch(key: string, callback: (value: any) => void): void {
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === "local" && changes[key]) {
        callback(changes[key].newValue);
      }
    });
  }
}
