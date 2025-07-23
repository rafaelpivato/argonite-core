import { Service } from './Service';

/**
 * Schedules background tasks using a cron-like syntax.
 */
export class SchedulerService extends Service {
  constructor(
    public name: string,
    public cron: string,
    public task: () => void
  ) {
    super();
  }

  extendManifest(manifest: any) {
    manifest.permissions = manifest.permissions || [];
    if (!manifest.permissions.includes('alarms')) {
      manifest.permissions.push('alarms');
    }
  }

  registerBackground() {
    // TODO: Implement alarm registration logic
  }
}
