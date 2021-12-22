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
exports.validateParsedFilters = void 0;
var lodash_1 = require("lodash");
var constants_1 = require("../constants");
function validateParsedFilters(parsed) {
    var _a;
    var filters = {};
    if (!(0, lodash_1.isObject)(parsed) || !(0, lodash_1.isPlainObject)(parsed))
        throw new Error("Invalid query (not an object)");
    for (var _i = 0, _b = (0, lodash_1.entries)(parsed); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], rule = _c[1];
        if (!(0, lodash_1.isString)(key))
            throw new Error("Invalid key (".concat(key, ")"));
        if (!(0, lodash_1.isObject)(rule) || !(0, lodash_1.isPlainObject)(rule))
            throw new Error("Invalid rule (".concat(rule, ")"));
        for (var _d = 0, _e = (0, lodash_1.entries)(rule); _d < _e.length; _d++) {
            var _f = _e[_d], rawOperator = _f[0], rawValue = _f[1];
            var operator = validateOperator(rawOperator);
            var value = validateValue(rawValue);
            filters[key] = __assign(__assign({}, filters[key]), (_a = {}, _a[operator] = value, _a));
        }
    }
    return filters;
}
exports.validateParsedFilters = validateParsedFilters;
// Private functions
function validateOperator(operator) {
    if (!isOperator(operator))
        throw new Error("Invalid operator: ".concat(operator));
    return operator;
}
function validateValue(value) {
    if ((0, lodash_1.isArray)(value)) {
        return value.map(validateSingleValue);
    }
    else {
        return validateSingleValue(value);
    }
}
function validateSingleValue(value) {
    if (!(0, lodash_1.isString)(value) && !(0, lodash_1.isBoolean)(value) && !(0, lodash_1.isNull)(value) && !(0, lodash_1.isNumber)(value)) {
        throw new Error("Invalid value: ".concat(value));
    }
    return value;
}
function isOperator(value) {
    return (0, lodash_1.keys)(constants_1.filterOperators).includes(value);
}
