// DevtoolsPanelEntry: Entry for a DevTools panel
import { Entry } from './Entry';

/**
 * Represents a DevTools panel entry for a Chrome Extension.
 */
export class DevtoolsPanelEntry extends Entry {
  constructor(
    public title: string,
    public htmlFile: string,
    public mount: (container: HTMLElement) => void
  ) {
    super();
  }

  // No manifest change needed for devtools panels

  registerUI(ctx: any) {
    // At runtime: create the devtools panel
    // chrome.devtools.panels.create(this.title, '', this.htmlFile, (panel) => {
    //   // Optionally mount logic here
    // });
  }
}
