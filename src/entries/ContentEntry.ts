// ContentEntry: Entry for content scripts
import { Entry } from './Entry';

/**
 * Represents a content script entry for a Chrome Extension.
 */
export class ContentEntry extends Entry {
  constructor(
    public mount: (container: HTMLElement) => void,
    public matches: string[] = ['<all_urls>'],
    public runAt: string = 'document_idle'
  ) {
    super();
  }

  extendManifest(manifest: any) {
    manifest.content_scripts = manifest.content_scripts || [];
    manifest.content_scripts.push({
      matches: this.matches,
      js: [/* content script bundle */],
      run_at: this.runAt,
    });
  }

  registerContent() {
    // TODO: Create container and mount logic for content script
  }
}
