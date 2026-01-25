import type { ContentRuntime } from "../runtime/content-runtime";

export abstract class ContentEntry {
  protected runtime!: ContentRuntime;

  abstract register(): void | Promise<void>;
}
