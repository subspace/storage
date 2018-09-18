"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_storage = require('local-forage');
const Adapter = {
    put: (key, value) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield browser_storage.setItem(key, value);
            return;
        }
        catch (error) {
            console.log('Error setting record with browser storage');
            console.log(error);
        }
    }),
    get: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            const value = yield browser_storage.getItem(key);
            return value;
        }
        catch (error) {
            console.log('Error getting record with browser storage');
            console.log(error);
        }
    }),
    del: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield browser_storage.removeItem(key);
            return;
        }
        catch (error) {
            console.log('Error remvoing record with browser storage');
            console.log(error);
        }
    }),
    get_keys: () => __awaiter(this, void 0, void 0, function* () {
        try {
            const keys = yield browser_storage.keys();
            return keys;
        }
        catch (error) {
            console.log('Error getting all keys from browser storage');
            console.log(error);
        }
    }),
    get_length: () => __awaiter(this, void 0, void 0, function* () {
        try {
            const length = yield browser_storage.length();
            return length;
        }
        catch (error) {
            console.log('Error getting length from browser storage');
            console.log(error);
        }
    }),
    clear: () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield browser_storage.clear();
            return;
        }
        catch (error) {
            console.log('Error clearing all records from browser storage');
            console.log(error);
        }
    }),
};
exports.default = Adapter;
//# sourceMappingURL=browser_storage.js.map