# Fluent API Reference

This document describes the `Extension` class and its fluent methods.

## Extension Initialization

```ts
const extension = new Extension({ name: 'MyExt', version: '1.0.0' });
```

## Fluent Methods

- **`.addService(service: Service)`**  
  Registers a background or content service.

- **`.setPopup(entry: PopupEntry)`**  
  Defines the popup UI entry point.

- **`.setOptions(entry: OptionsEntry)`**  
  Defines the options page UI entry point.

- **`.addDevtoolPanel(entry: DevtoolsPanelEntry)`**  
  Adds a DevTools panel.

- **`.addContentEntry(entry: ContentEntry)`**  
  Adds a content-script widget entry.

### Example

```ts
extension
  .addService(new SchedulerService(...))
  .setPopup(new MainPopupEntry())
  .addDevtoolPanel(new FooDevPanelEntry())
  .addContentEntry(new BarContentEntry());
```