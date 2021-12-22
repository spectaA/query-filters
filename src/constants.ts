import { Equal, ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { ParseQueryStringOptions } from ".";

export const filterOperators = {
    "$eq": Equal,
    "$like": ILike,
    "$gt": MoreThan,
    "$gte": MoreThanOrEqual,
    "$lt": LessThan,
    "$lte": LessThanOrEqual,
    "$in": In,
    "$not": Not,
}

export const filterValueKeywords = {
    "true": true,
    "false": false,
    "null": null,
}

export const defaultParseQueryStringOptions: ParseQueryStringOptions = {
    rejectOnError: true
}