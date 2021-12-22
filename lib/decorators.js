"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFilters = void 0;
var common_1 = require("@nestjs/common");
var _1 = require(".");
exports.QueryFilters = (0, common_1.createParamDecorator)(function (data, ctx) {
    var request = ctx.switchToHttp().getRequest();
    var filters = request.query.filters;
    return filters ? (0, _1.stringifyParsedFilters)(filters) : null;
});
