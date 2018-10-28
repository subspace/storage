"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const browser_storage = __importStar(require("localforage"));
class BrowserAdapter {
    async put(key, value) {
        await browser_storage.setItem(key, value);
    }
    get(key) {
        return browser_storage.getItem(key);
    }
    del(key) {
        return browser_storage.removeItem(key);
    }
    getKeys() {
        return browser_storage.keys();
    }
    getLength() {
        return browser_storage.length();
    }
    clear() {
        return browser_storage.clear();
    }
}
exports.default = BrowserAdapter;
//# sourceMappingURL=BrowserAdapter.js.map