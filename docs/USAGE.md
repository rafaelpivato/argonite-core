# Usage Guide

This guide provides practical usage examples for Argonite.

## Basic Setup

See the README for a minimal example. For more advanced usage, see below.

## Adding Services

```ts
import { Extension, SchedulerService, StorageService } from '@argonite/core';

const extension = new Extension({ name: 'MyExt', version: '1.0.0' })
  .addService(new SchedulerService('refresh', '*/5 * * * *', () => {/* ... */}))
  .addService(new StorageService({ foo: 'bar' }));
```

## Adding Entries

```ts
import { PopupEntry, OptionsEntry, DevtoolsPanelEntry, ContentEntry } from '@argonite/core';

extension
  .setPopup(new PopupEntry('popup.html', (container) => {/* ... */}))
  .setOptions(new OptionsEntry('options.html', (container) => {/* ... */}))
  .addDevtoolPanel(new DevtoolsPanelEntry('DevTools', 'devtools.html', (container) => {/* ... */}))
  .addContentEntry(new ContentEntry((container) => {/* ... */}, ['<all_urls>']));
```

For more, see the API docs and architecture guides in this folder.
