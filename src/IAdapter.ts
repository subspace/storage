export default interface IAdapter {
  put(key: string, value: object): Promise<void>;

  get(key: string): Promise<object|null>;

  del(key: string): Promise<void>;

  getKeys(): Promise<string[]>;

  getLength(): Promise<number>;

  clear(): Promise<void>;
}
