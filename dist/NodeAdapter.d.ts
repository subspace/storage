import IAdapter from "./IAdapter";
export default class NodeAdapter implements IAdapter {
    private readonly readyPromise;
    constructor();
    private init;
    put(key: string, value: string): Promise<void>;
    get(key: string): Promise<string | null>;
    del(key: string): Promise<void>;
    getKeys(): Promise<string[]>;
    getLength(): Promise<number>;
    clear(): Promise<void>;
}
