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
const level = __importStar(require("level-rocksdb"));
class RocksAdapter {
    constructor(root) {
        this.db = level(`${root}/spacerocks`, { valueEncoding: 'binary' });
    }
    async put(key, value) {
        await this.db.put(key, value);
    }
    async get(key) {
        try {
            return this.db.get(key);
        }
        catch (error) {
            if (error.notFound) {
                return null;
            }
            throw error;
        }
    }
    async del(key) {
        try {
            await this.db.del(key);
        }
        catch (error) {
            // Ignore if value already deleted
            if (error.notFound) {
                return;
            }
            throw error;
        }
    }
    async getKeys() {
        return new Promise(async (resolve) => {
            const keys = [];
            this.db.createKeyStrem()
                .on('data', (key) => {
                keys.push(key);
            })
                .on('end', () => {
                resolve(keys);
            });
        });
    }
    async getLength() {
        const keys = await this.getKeys();
        return keys.length;
    }
    async clear() {
        const keys = await this.getKeys();
        for (const key of keys) {
            await this.del(key);
        }
    }
}
exports.default = RocksAdapter;
//# sourceMappingURL=RocksAdapter.js.map