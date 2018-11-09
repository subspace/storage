export default class Storage {
    readonly adapterName: string;
    nameSpace?: string;
    private adapter;
    constructor(adapterName: string, nameSpace?: string);
    put(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    getKeys(): Promise<string[]>;
    getLength(): Promise<number>;
    clear(): Promise<void>;
}
