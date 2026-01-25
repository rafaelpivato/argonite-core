import type { PageRuntime } from "../runtime/page-runtime";

export abstract class PageEntry {
  protected runtime!: PageRuntime;

  abstract mount(container: HTMLElement): void | Promise<void>;
}
