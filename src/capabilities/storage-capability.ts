type GetFn = <T>(key: string) => Promise<T | undefined>;
type SetFn = <T>(key: string, value: T) => Promise<void>;
type WatchFn = (key: string, cb: (value: any) => void) => void;

export interface StorageCapability {
  get<T = any>(key: string): Promise<T | undefined>;
  set<T = any>(key: string, value: T): Promise<void>;
  watch?(key: string, callback: (value: any) => void): void;
}

export class StorageCapabilityAdapter implements StorageCapability {
  constructor(
    private readonly getFn: GetFn,
    private readonly setFn: SetFn,
    private readonly watchFn: WatchFn,
  ) {}

  get<T = any>(key: string): Promise<T | undefined> {
    return this.getFn<T>(key);
  }

  set<T = any>(key: string, value: T): Promise<void> {
    return this.setFn<T>(key, value);
  }

  watch(key: string, callback: (value: any) => void): void {
    this.watchFn(key, callback);
  }
}
