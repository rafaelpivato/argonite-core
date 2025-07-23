# Services Guide

Services encapsulate non-UI extension logic.

## Built-in Services

- **SchedulerService**  
  - Schedule alarms via cron-like syntax.

- **StorageService**  
  - Typed wrapper over `chrome.storage` with defaults.

- **MessagingService**  
  - Typed RPC over `chrome.runtime.sendMessage`.

## Creating Feature-Scoped Services

Place feature-specific services inside feature folders:

```ts
export class BookingSchedulerService extends SchedulerService {
  constructor() {
    super('bookingSync', '*/30 * * * *', () => { /* booking refresh */ });
  }
}
```

## Service Lifecycle

1. **`extendManifest(manifest)`**  
   Add permissions or manifest fields.

2. **`registerBackground()`**  
   Register alarms, message listeners, storage migrations, etc.