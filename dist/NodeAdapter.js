"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// TODO: Fix typings here
// @ts-ignore
const node_storage = __importStar(require("node-persist")); // TODO: Should work with an instance instead of global state
const os = __importStar(require("os"));
class NodeAdapter {
    constructor() {
        try {
            this.readyPromise = this.init();
        }
        catch (error) {
            // TODO: Something better than printing an error is needed here
            console.error('Error initiating node storage');
            console.error(error);
        }
    }
    async init() {
        const options = {
            dir: `${os.homedir()}/subspace_data`,
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf-8',
            logging: false,
            ttl: false,
            expiredInterval: 2 * 60 * 1000 // every two minutes
        };
        await node_storage.init(options);
    }
    async put(key, value) {
        await this.readyPromise;
        await node_storage.setItem(key, value);
    }
    async get(key) {
        await this.readyPromise;
        return await node_storage.getItem(key);
    }
    async del(key) {
        await this.readyPromise;
        await node_storage.removeItem(key);
    }
    async getKeys() {
        await this.readyPromise;
        return await node_storage.keys();
    }
    async getLength() {
        await this.readyPromise;
        return await node_storage.length();
    }
    async clear() {
        await this.readyPromise;
        await node_storage.clear();
    }
}
exports.default = NodeAdapter;
//# sourceMappingURL=NodeAdapter.js.map