"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyParsedFilters = void 0;
var lodash_1 = require("lodash");
var qs_1 = require("qs");
var __1 = require("..");
function stringifyParsedFilters(query) {
    // Type check
    query = (0, __1.validateParsedFilters)(query);
    // Stringify
    return (0, qs_1.stringify)(query, {
        encodeValuesOnly: true,
        skipNulls: false,
        strictNullHandling: true,
        encoder: function (str, defaultEncoder) {
            if ((0, lodash_1.isBoolean)(str) || (0, lodash_1.isNumber)(str)) {
                return defaultEncoder(str);
            }
            if ((0, lodash_1.isNull)(str)) {
                return "null";
            }
            return defaultEncoder("@" + str);
        },
    });
}
exports.stringifyParsedFilters = stringifyParsedFilters;
