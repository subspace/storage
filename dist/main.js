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
const rocks_adapter = require('./rocks_storage');
const node_adapter = require('./node_storage');
const browser_adapter = require('./browser_storage');
// schema?
// profile storage (save the keypair)
// ledger storage (blocks, txs) => content addressed
// tracker => save between restarts 
// gateway nodes list
// pledge of space / block solutions 
// SSDB record storage (BEP-44 schema)
// cache or ephemeral storage
// self-hosted records (without a node)
// if I stored the public key of a record 
class Storage {
    constructor(adapter) {
        if (adapter === 'browser') {
            this.adapter = browser_adapter;
        }
        else if (adapter === 'node') {
            this.adapter = node_adapter;
        }
        else if (adapter === 'rocks') {
            this.adapter = rocks_adapter;
        }
    }
    put(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adapter.put(key, value);
            return;
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const value = yield this.adapter.get(key);
            return value;
        });
    }
    del(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adapter.del(key);
            return;
        });
    }
    getKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            let keys = yield this.adapter.get_keys();
            return keys;
        });
    }
    getLength() {
        return __awaiter(this, void 0, void 0, function* () {
            let length = yield this.adapter.get_length();
            return length;
        });
    }
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adapter.clear();
            return;
        });
    }
}
exports.default = Storage;
//# sourceMappingURL=main.js.map