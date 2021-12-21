"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryToString = void 0;
var lodash_1 = require("lodash");
var constants_1 = require("../constants");
function queryToString(query) {
    var output = [];
    for (var _i = 0, _a = (0, lodash_1.entries)(query); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], rule = _b[1];
        for (var _c = 0, _d = (0, lodash_1.entries)(rule); _c < _d.length; _c++) {
            var _e = _d[_c], operator = _e[0], value = _e[1];
            if (!isOperator(operator)) {
                throw new Error("Invalid operator: ".concat(operator));
            }
            var parsedValue = parseValue(value);
            var ruleString = [key, operator, parsedValue].join(constants_1.RULES_DIVIDER);
            output.push(ruleString);
        }
    }
    return output.join(constants_1.RULES_SEPARATOR);
}
exports.queryToString = queryToString;
// Private functions
function parseValue(value) {
    if ((0, lodash_1.isArray)(value)) {
        return parseArray(value);
    }
    return parseSingleValue(value);
}
function parseArray(value) {
    var values = value.map(function (value) { return parseSingleValue(value); }).join(constants_1.ARRAY_DIVIDER);
    return constants_1.ARRAY_START_TAG + values + constants_1.ARRAY_END_TAG;
}
function parseSingleValue(value) {
    if (isValueKeywordInvert(value)) {
        return getValueKeywordInvert(value);
    }
    if ((0, lodash_1.isString)(value)) {
        return constants_1.STRING_START_TAG + value + constants_1.STRING_END_TAG;
    }
    if ((0, lodash_1.isNumber)(value)) {
        return value.toString();
    }
    throw new Error("Invalid value: ".concat(value));
}
function isOperator(value) {
    return (0, lodash_1.keys)(constants_1.filterOperators).includes(value);
}
function isValueKeywordInvert(value) {
    for (var _i = 0, _a = (0, lodash_1.entries)(constants_1.filterValueKeywords); _i < _a.length; _i++) {
        var _b = _a[_i], kwKey = _b[0], kwValue = _b[1];
        if (kwValue === value)
            return true;
    }
    return false;
}
function getValueKeywordInvert(value) {
    for (var _i = 0, _a = (0, lodash_1.entries)(constants_1.filterValueKeywords); _i < _a.length; _i++) {
        var _b = _a[_i], kwKey = _b[0], kwValue = _b[1];
        if (kwValue === value)
            return kwKey;
    }
    throw new Error("Invalid value (as keyword): ".concat(value));
}
