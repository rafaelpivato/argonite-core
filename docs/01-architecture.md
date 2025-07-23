# Architecture Overview

This document outlines the core concepts and architecture of an Argonite extension.

## Core Concepts

- **Extension**  
  - Root object that ties together contexts, services, and entries.
  - Provides build-time (`getRollupInputs`) and manifest-time (`toManifestConfig`) methods.

- **Context**  
  - Represents where code runs: Background, Content Script, Popup, Options, DevTools.
  - Handles bundling entry scripts and manifest mutations.

- **Service**  
  - Encapsulates a specific background or content concern (e.g., Scheduler, Storage, Messaging).
  - Implements lifecycle hooks: `extendManifest`, `registerBackground`.

- **Entry**  
  - Represents a UI or content entry point: PopupEntry, OptionsEntry, DevtoolsPanelEntry, ContentEntry.
  - Handles manifest wiring and runtime mounting.

- **UI Integration Layer**  
  - Separate packages (`@argonite/ui-react`, `@argonite/ui-vue`) provide framework-specific mounting and hooks.