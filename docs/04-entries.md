# Entry Points Reference

Entries define where and how UIs or content scripts mount.

## PopupEntry

```ts
class PopupEntry {
  constructor(htmlFile: string, mount: MountFn) { /* ... */ }
  extendManifest(manifest) { manifest.action.default_popup = htmlFile }
  registerUI(ctx) { ctx.mount(htmlFile, mount) }
}
```

## OptionsEntry

```ts
class OptionsEntry {
  // similar to PopupEntry but sets `options_page`
}
```

## DevtoolsPanelEntry

```ts
class DevtoolsPanelEntry {
  constructor(title, htmlFile, mount) { /* ... */ }
  // on build: no manifest change.
  // on runtime: chrome.devtools.panels.create(...)
}
```

## ContentEntry

```ts
class ContentEntry {
  constructor(mount: MountFn, matches = ['<all_urls>'], runAt = 'document_idle') { /* ... */ }
  extendManifest(manifest) { /* add to content_scripts */ }
  registerContent() { /* create container + mount */ }
}
```