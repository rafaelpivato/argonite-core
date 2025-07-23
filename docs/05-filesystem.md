
# Recommended Filesystem Layout (for Projects Using Argonite)

> **Note:** The following filesystem structure is intended for Chrome Extension projects that use the Argonite framework. It is not the structure of the framework itself.

```
my-extension/
├── src/
│   ├── main.ts                   # Extension setup
│   ├── MainPopupEntry.ts
│   ├── MainOptionsEntry.ts
│   ├── services/                 # global services
│   └── features/                 # feature folders
│       ├── booking/
│       ├── monitoring/
│       ├── bar/
│       └── footer/
├── public/                       # static HTML & assets
│   ├── popup.html
│   ├── options.html
│   ├── devtools-booking.html
│   └── devtools-monitoring.html
├── manifest.config.ts
├── vite.config.ts
└── package.json
```

- **`src/main.ts`**: entry for the `Extension` fluent API.  
- **`services/`**: shared background services.  
- **`features/*`**: each feature contains logic, services, UI and entry class.  
- **`public/`**: HTML shells for popup, options, devtools panels.