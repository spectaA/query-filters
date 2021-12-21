import { Equal, ILike, MoreThan, MoreThanOrEqual, LessThan, LessThanOrEqual, In, Not } from "typeorm";
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
export declare type FilterOperator = keyof typeof filterOperators;
export declare const filterValueKeywords: {
    $null: null;
    $true: boolean;
    $false: boolean;
};
export declare type FilterValueKeyword = keyof typeof filterValueKeywords;
export declare type FilterValue = string | boolean | number | null;
export declare type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>;
};
