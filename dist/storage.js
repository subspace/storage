"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_storage_1 = require("./browser_storage");
// import { nodeAdapter } from './node_storage'
const events_1 = __importDefault(require("events"));
// ToDo
// handle storage of farming plot / proof of space
// handle cache or ephemeral storage
// handle self-hosted records (without a node)
class Storage extends events_1.default {
    constructor(adapter) {
        super();
        if (adapter === 'browser') {
            this.adapter = browser_storage_1.browserAdapter;
        }
        else {
            this.adapter = 'rocks';
        }
    }
    put(key, value) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.adapter.put(Buffer.from(key), Buffer.from(value));
                resolve();
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    get(key) {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await this.adapter.get(Buffer.from(key));
                resolve(value.toString());
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    del(key) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.adapter.del(Buffer.from(key));
                resolve();
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    getKeys() {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = await this.adapter.getKeys();
                resolve(keys);
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    getLength() {
        return new Promise(async (resolve, reject) => {
            try {
                let length = await this.adapter.getLength();
                resolve(length);
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
    clear() {
        return new Promise(async (resolve, reject) => {
            try {
                await this.adapter.clear();
                resolve();
            }
            catch (error) {
                this.emit('error', error);
                reject(error);
            }
        });
    }
}
exports.default = Storage;
//# sourceMappingURL=storage.js.map