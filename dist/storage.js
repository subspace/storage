"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BrowserAdapter_1 = __importDefault(require("./BrowserAdapter"));
const NodeAdapter_1 = __importDefault(require("./NodeAdapter"));
const RocksAdapter_1 = __importDefault(require("./RocksAdapter"));
const os = __importStar(require("os"));
// ToDo
// handle storage of farming plot / proof of space
// handle cache or ephemeral storage
// handle self-hosted records (without a node)
class Storage {
    constructor(adapterName) {
        this.adapterName = adapterName;
        switch (adapterName) {
            case 'browser':
                this.adapter = new BrowserAdapter_1.default();
                break;
            case 'node':
                this.adapter = new NodeAdapter_1.default();
                break;
            case 'rocks':
                this.adapter = new RocksAdapter_1.default(os.homedir());
                break;
            default:
                throw new Error('Wrong adapter name, supported adapters: browser, rocks');
        }
    }
    put(key, value) {
        return this.adapter.put(key, value);
    }
    get(key) {
        return this.adapter.get(key);
    }
    del(key) {
        return this.adapter.del(key);
    }
    getKeys() {
        return this.adapter.getKeys();
    }
    getLength() {
        return this.adapter.getLength();
    }
    clear() {
        return this.adapter.clear();
    }
}
exports.default = Storage;
//# sourceMappingURL=storage.js.map