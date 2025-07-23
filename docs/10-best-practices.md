# Best Practices

## Services

- Prefer global services for cross-cutting concerns.
- Co-locate feature-specific services inside `features/<feature>/`.

## Entries

- Keep popup/options minimal; delegate layout to your App.
- Use clear class names: `FooDevPanelEntry`.

## UI

- Avoid hidden slot magic; explicitly import and render.
- Use React/Vue connectors for hooks and context.

## Structure

- Follow the recommended filesystem layout.
- Use TypeScript `as const` and typed APIs for safety.

## Extensibility

- Extend base classes (Entry, Service) for custom behavior.
- Leverage `argonite-cli` for future scaffolding and conventions.