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
const level = require('level-rocksdb');
const os = require('os');
const db = level(`${os.homedir()}/spacerocks`, { valueEncoding: 'binary' });
const Adapter = {
    put: (key, value) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.put(key, value);
            return;
        }
        catch (error) {
            console.log('Error putting record with rocks storage');
            console.log(error);
        }
    }),
    get: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            let value = yield db.get(key);
            return value;
        }
        catch (error) {
            console.log('Error getting record with rocks storage');
            console.log(error);
        }
    }),
    del: (key) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield db.del(key);
            return;
        }
        catch (error) {
            console.log('Error deleting record with rocks storage');
            console.log(error);
        }
    })
};
exports.default = Adapter;
//# sourceMappingURL=rocks_storage.js.map