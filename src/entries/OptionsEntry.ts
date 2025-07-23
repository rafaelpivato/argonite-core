// OptionsEntry: Entry for the options page UI
import { Entry } from './Entry';

/**
 * Represents an options page UI entry for a Chrome Extension.
 */
export class OptionsEntry extends Entry {
  constructor(
    public htmlFile: string,
    public mount: (container: HTMLElement) => void
  ) {
    super();
  }

  extendManifest(manifest: any) {
    manifest.options_page = this.htmlFile;
  }

  registerUI(ctx: any) {
    ctx.mount(this.htmlFile, this.mount);
  }
}
