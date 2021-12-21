import { Equal, ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from "typeorm";
export declare const filterOperators: {
    $eq: typeof Equal;
    $like: typeof ILike;
    $gt: typeof MoreThan;
    $gte: typeof MoreThanOrEqual;
    $lt: typeof LessThan;
    $lte: typeof LessThanOrEqual;
    $in: typeof In;
    $not: typeof Not;
};
export declare const filterValueKeywords: {
    $null: null;
    $true: boolean;
    $false: boolean;
};
export declare const RULES_SEPARATOR = "||";
export declare const RULES_DIVIDER = ":";
export declare const ARRAY_START_TAG = "$(";
export declare const ARRAY_END_TAG = ")";
export declare const ARRAY_DIVIDER = ",";
export declare const STRING_START_TAG = "$\"";
export declare const STRING_END_TAG = "\"";
