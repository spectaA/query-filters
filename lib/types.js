"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterValueKeyword = exports.FilterValueType = exports.FilterOperator = void 0;
var FilterOperator;
(function (FilterOperator) {
    FilterOperator["EQ"] = "$eq";
    FilterOperator["LIKE"] = "$like";
    FilterOperator["GT"] = "$gt";
    FilterOperator["GTE"] = "$gte";
    FilterOperator["IN"] = "$in";
    FilterOperator["LT"] = "$lt";
    FilterOperator["LTE"] = "$lte";
    FilterOperator["NOT"] = "$not";
})(FilterOperator = exports.FilterOperator || (exports.FilterOperator = {}));
var FilterValueType;
(function (FilterValueType) {
    FilterValueType["STRING"] = "string";
    FilterValueType["NUMBER"] = "number";
    FilterValueType["BOOLEAN"] = "boolean";
    FilterValueType["NULL"] = "null";
})(FilterValueType = exports.FilterValueType || (exports.FilterValueType = {}));
var FilterValueKeyword;
(function (FilterValueKeyword) {
    FilterValueKeyword["NULL"] = "$null";
    FilterValueKeyword["TRUE"] = "$true";
    FilterValueKeyword["FALSE"] = "$false";
})(FilterValueKeyword = exports.FilterValueKeyword || (exports.FilterValueKeyword = {}));
