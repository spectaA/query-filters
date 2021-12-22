"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryString = void 0;
var lodash_1 = require("lodash");
var qs_1 = require("qs");
var constants_1 = require("../constants");
var validateParsedFilters_1 = require("./validateParsedFilters");
function parseQueryString(query, options) {
    if (options === void 0) { options = {}; }
    // Merge options
    options = __assign(__assign({}, options), constants_1.defaultParseQueryStringOptions);
    // Parse string
    var parsed = (0, qs_1.parse)(query, {
        strictNullHandling: true,
        decoder: function (str, defaultDecoder, charset, type) {
            if (type === "value") {
                var decoded = defaultDecoder(str);
                if (decoded.startsWith("@")) {
                    return defaultDecoder(decoded.slice(1));
                }
                if (isNumericString(decoded)) {
                    return +decoded;
                }
                if ((0, lodash_1.isString)(decoded) && !decoded.length) {
                    return null;
                }
                if (isValueKeyword(decoded)) {
                    return getValueKeyword(decoded);
                }
                throw new Error("Bad value: ".concat(decoded));
            }
            return defaultDecoder(str);
        }
    });
    // Convert to valid parsed filter
    return (0, validateParsedFilters_1.validateParsedFilters)(parsed);
}
exports.parseQueryString = parseQueryString;
// Private functions
function isValueKeyword(value) {
    return (0, lodash_1.keys)(constants_1.filterValueKeywords).includes(value);
}
function getValueKeyword(value) {
    return constants_1.filterValueKeywords[value];
}
function isNumericString(value) {
    return !(0, lodash_1.isNaN)(parseFloat(value));
}
