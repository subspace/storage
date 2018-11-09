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
//import NodeAdapter from './NodeAdapter'
const RocksAdapter_1 = __importDefault(require("./RocksAdapter"));
const os = __importStar(require("os"));
// ToDo
// handle storage of farming plot / proof of space
// handle cache or ephemeral storage
// handle self-hosted records (without a node)
class Storage {
    constructor(adapterName, nameSpace) {
        this.adapterName = adapterName;
        this.nameSpace = nameSpace;
        switch (adapterName) {
            case 'browser':
                this.adapter = new BrowserAdapter_1.default();
                break;
            // case 'node':
            //   this.adapter = new NodeAdapter()
            //   break;
            case 'rocks':
                let path;
                if (nameSpace) {
                    path = `${os.homedir()}/spacerocks/path`;
                }
                else {
                    path = `${os.homedir()}/spacerocks`;
                }
                this.adapter = new RocksAdapter_1.default(path);
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