export default class Storage {
    readonly adapterName: string;
    path?: string;
    private adapter;
    constructor(adapterName: string, path?: string);
    put(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    getKeys(): Promise<string[]>;
    getLength(): Promise<number>;
    clear(): Promise<void>;
}
