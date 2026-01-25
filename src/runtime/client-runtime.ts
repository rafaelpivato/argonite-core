export abstract class ClientRuntime {
  abstract getService<T>(service: new (...args: any[]) => T): T;
  request<T = unknown>(msg: any): Promise<T> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(msg, (res) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
          return;
        }

        if (!res || res.ok !== true) {
          reject(new Error(res?.error ?? "Unknown runtime error"));
          return;
        }

        resolve(res.value as T);
      });
    });
  }
}
