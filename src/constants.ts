import { Equal, ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from "typeorm";

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
    "$null": null,
    "$true": true,
    "$false": false,
}

export const RULES_SEPARATOR = "||";
export const RULES_DIVIDER = ":";

export const ARRAY_START_TAG = "$(";
export const ARRAY_END_TAG = ")";
export const ARRAY_DIVIDER = ",";

export const STRING_START_TAG = "$\"";
export const STRING_END_TAG = "\"";