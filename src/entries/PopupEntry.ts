import { Entry } from './Entry';

/**
 * Represents a popup UI entry for a Chrome Extension.
 */
export class PopupEntry extends Entry {
  constructor(
    public htmlFile: string,
    public mount: (container: HTMLElement) => void
  ) {
    super();
  }

  extendManifest(manifest: any) {
    manifest.action = manifest.action || {};
    manifest.action.default_popup = this.htmlFile;
  }

  registerUI(ctx: any) {
    ctx.mount(this.htmlFile, this.mount);
  }
}
