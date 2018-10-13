"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const level = require('level-rocksdb');
const os_1 = __importDefault(require("os"));
const db = level(`${os_1.default.homedir()}/spacerocks`, { valueEncoding: 'binary' });
exports.rocksAdapter = {
    put(key, value) {
        return new Promise(async (resolve, reject) => {
            try {
                await db.put(key, value);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    },
    get(key) {
        // returns null if not found
        return new Promise(async (resolve, reject) => {
            try {
                const value = await db.get(key);
                resolve(value);
            }
            catch (error) {
                if (error.notFound)
                    resolve(null);
                reject(error);
            }
        });
    },
    del(key) {
        // returns true if deleted, and false if not found
        return new Promise(async (resolve, reject) => {
            try {
                await db.del(key);
                resolve(true);
            }
            catch (error) {
                if (error.notFound)
                    resolve(false);
                reject(error);
            }
        });
    },
    getKeys() {
        return new Promise(async (resolve, reject) => {
            try {
                const keys = [];
                db.createKeyStrem()
                    .on('data', (key) => {
                    keys.push(key.toString('hex'));
                })
                    .on('end', () => {
                    resolve(keys);
                });
            }
            catch (error) {
                reject(error);
            }
        });
    },
    getLength() {
        return new Promise(async (resolve, reject) => {
            try {
                const keys = await this.getKeys();
                const length = keys.length;
                resolve(length);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    clear() {
        return new Promise(async (resolve, reject) => {
            try {
                db.createKeyStrem()
                    .on('data', async (key) => {
                    await db.del(key);
                })
                    .on('end', () => {
                    resolve();
                });
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
//# sourceMappingURL=rocks_storage.js.map