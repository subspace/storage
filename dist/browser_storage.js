"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const browser_storage = require('localforage');
exports.browserAdapter = {
    put(key, value) {
        return new Promise(async (resolve, reject) => {
            try {
                await browser_storage.setItem(key, value);
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    },
    get(key) {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await browser_storage.getItem(key);
                resolve(value);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    del(key) {
        return new Promise(async (resolve, reject) => {
            try {
                await browser_storage.removeItem(key);
                resolve(true);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    getKeys() {
        return new Promise(async (resolve, reject) => {
            try {
                const keys = await browser_storage.keys();
                resolve(keys);
            }
            catch (error) {
                reject(error);
            }
        });
    },
    getLength() {
        return new Promise(async (resolve, reject) => {
            try {
                const length = await browser_storage.length();
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
                await browser_storage.clear();
                resolve();
            }
            catch (error) {
                reject(error);
            }
        });
    }
};
//# sourceMappingURL=browser_storage.js.map