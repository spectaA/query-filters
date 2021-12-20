"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFromString = exports.convertToFindOptions = void 0;
var lodash_1 = require("lodash");
var _1 = require(".");
function convertToFindOptions(filters) {
    throw new Error();
}
exports.convertToFindOptions = convertToFindOptions;
function parseFromString(query) {
    var _a;
    var filters = {};
    var rawRules = query.split("|");
    var parsedRules = rawRules.map(function (rule) { return rule.split(":"); });
    for (var _i = 0, parsedRules_1 = parsedRules; _i < parsedRules_1.length; _i++) {
        var rule = parsedRules_1[_i];
        try {
            var _b = parseRule(rule), key = _b[0], operator = _b[1], value = _b[2];
            filters[key] = (_a = {}, _a[operator] = value, _a);
        }
        catch (err) { }
        ;
    }
    return filters;
}
exports.parseFromString = parseFromString;
// Private functions
function parseRule(rule) {
    if (!(Array.isArray(rule) && rule.length === 3))
        throw new Error("Invalid rule: ".concat(rule));
    // Key
    var rawKey = rule[0];
    if (!(0, lodash_1.isString)(rawKey))
        throw new Error("Invalid key: ".concat(rawKey));
    // Operator
    var rawOperator = rule[1];
    if (!rawOperator)
        throw new Error("Invalid operator: ".concat(rawOperator));
    var operator = _1.FilterOperator.EQ;
    // Value
    var rawValue = rule[2];
    var value = parseValue(rawValue);
    // Return
    return [rawKey, operator, value];
}
function parseValue(value) {
    if (!value)
        throw new Error("Invalid value: ".concat(value));
    if (value.charAt(0) === "(" && value.charAt(-1) === ")") {
        var rawArrValue = value.slice(1, -1);
        var rawValues = rawArrValue.split(",");
        return rawValues.map(function (v) { return parseSingleValue(v); });
    }
    else {
        return parseSingleValue(value);
    }
}
function parseSingleValue(value) {
    if (value === "$null") {
        return null;
    }
    else if (value === "$true") {
        return true;
    }
    else if (value === "$false") {
        return false;
    }
    else if (!(0, lodash_1.isNaN)(value)) {
        return Number(value);
    }
    else {
        return value;
    }
}
