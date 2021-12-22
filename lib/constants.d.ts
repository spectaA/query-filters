import { Equal, ILike, In, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not } from "typeorm";
import { ParseQueryStringOptions } from ".";
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
    true: boolean;
    false: boolean;
    null: null;
};
export declare const defaultParseQueryStringOptions: ParseQueryStringOptions;
