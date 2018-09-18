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
const node_storage = require('node-persist');
const os = require('os');
const Adapter = {
    initiated: false,
    init: () => __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                dir: `${os.homedir()}/subspace_data`,
                stringify: JSON.stringify,
                parse: JSON.parse,
                encoding: 'utf-8',
                logging: false,
                ttl: false,
                expiredInterval: 2 * 60 * 1000 // every two minutes 
            };
            yield node_storage.init(options);
            Adapter.initiated = true;
            return;
        }
        catch (error) {
            console.log('Error initiating node storage');
            console.log(error);
        }
    }),
    check: () => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!Adapter.initiated)
                yield Adapter.init();
            return;
        }
        catch (error) {
            console.log('Error checking if node storage is initialized');
            console.log(error);
        }
    }),
    put: (key, value) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            yield node_storage.setItem(key, value);
            return;
        }
        catch (error) {
            console.log('Error setting record with node storage');
            console.log(error);
        }
    }),
    get: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            const value = yield node_storage.getItem(key);
            return value;
        }
        catch (error) {
            console.log('Error getting record with node storage');
            console.log(error);
        }
    }),
    del: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            yield node_storage.removeItem(key);
            return;
        }
        catch (error) {
            console.log('Error remvoing record with node storage');
            console.log(error);
        }
    }),
    get_keys: () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            const keys = yield node_storage.keys();
            return keys;
        }
        catch (error) {
            console.log('Error getting all keys from node storage');
            console.log(error);
        }
    }),
    get_legnth: () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            const length = yield node_storage.length();
            return length;
        }
        catch (error) {
            console.log('Error getting length from node storage');
            console.log(error);
        }
    }),
    clear: () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield Adapter.check;
            yield node_storage.clear();
            return;
        }
        catch (error) {
            console.log('Error clearing all records from node storage');
            console.log(error);
        }
    }),
};
exports.default = Adapter;
//# sourceMappingURL=node_storage.js.map