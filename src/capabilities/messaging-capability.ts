type SendFn = (msg: unknown) => Promise<unknown>;

export interface MessagingCapability {
  request<T = any, R = any>(msg: T): Promise<R>;
}

export class MessagingCapabilityAdapter implements MessagingCapability {
  constructor(private readonly send: SendFn) {}

  request<T = any, R = any>(msg: T): Promise<R> {
    return this.send(msg) as Promise<R>;
  }
}
