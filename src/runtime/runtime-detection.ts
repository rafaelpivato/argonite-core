// Runtime detection utilities for Argonite Core
// Only what is required for runtime context validation

export enum RuntimeContext {
  Background = "background",
  Content = "content",
  Page = "page",
}

/**
 * Detects if running in a Chrome extension background service worker.
 */
export function isBackgroundContext(): boolean {
  // Service worker global scope: self.registration, chrome.runtime, not window/document
  return (
    typeof self !== "undefined" &&
    typeof chrome !== "undefined" &&
    !!chrome.runtime &&
    typeof window === "undefined" &&
    typeof document === "undefined" &&
    "registration" in self
  );
}

/**
 * Detects if running in a Chrome extension content script.
 */
export function isContentContext(): boolean {
  // Content scripts: window, document, chrome.runtime, not chrome.extension.getBackgroundPage
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof chrome !== "undefined" &&
    !!chrome.runtime &&
    // Not a page context
    typeof window.chrome !== "undefined" &&
    typeof window.chrome.extension !== "undefined" &&
    typeof window.chrome.extension.getBackgroundPage === "undefined"
  );
}

/**
 * Detects if running in a Chrome extension page (popup, options, etc).
 */
export function isPageContext(): boolean {
  // Extension pages: window, document, chrome.runtime, chrome.extension.getBackgroundPage exists
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof chrome !== "undefined" &&
    !!chrome.runtime &&
    typeof window.chrome !== "undefined" &&
    typeof window.chrome.extension !== "undefined" &&
    typeof window.chrome.extension.getBackgroundPage === "function"
  );
}

/**
 * Returns the detected runtime context, or throws if unknown.
 */
export function detectRuntimeContext(): RuntimeContext {
  if (isBackgroundContext()) return RuntimeContext.Background;
  if (isContentContext()) return RuntimeContext.Content;
  if (isPageContext()) return RuntimeContext.Page;
  throw new Error(
    "Argonite Core: Unable to detect valid Chrome extension runtime context.",
  );
}
