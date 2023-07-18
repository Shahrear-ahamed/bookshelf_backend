"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function pick(obj, keys) {
    const result = {};
    keys.forEach(key => {
        if (obj === null || obj === void 0 ? void 0 : obj.hasOwnProperty.call(obj, key)) {
            result[key] = obj[key];
        }
    });
    return result;
}
exports.default = pick;
