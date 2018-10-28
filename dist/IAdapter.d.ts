export default interface IAdapter {
    put(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    getKeys(): Promise<string[]>;
    getLength(): Promise<number>;
    clear(): Promise<void>;
}
