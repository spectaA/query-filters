"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterValueKeywords = exports.filterOperators = void 0;
var typeorm_1 = require("typeorm");
exports.filterOperators = {
    "$eq": typeorm_1.Equal,
    "$like": typeorm_1.ILike,
    "$gt": typeorm_1.MoreThan,
    "$gte": typeorm_1.MoreThanOrEqual,
    "$lt": typeorm_1.LessThan,
    "$lte": typeorm_1.LessThanOrEqual,
    "$in": typeorm_1.In,
    "$not": typeorm_1.Not,
};
exports.filterValueKeywords = {
    "$null": null,
    "$true": true,
    "$false": false,
};
