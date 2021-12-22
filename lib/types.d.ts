import { filterOperators, filterValueKeywords } from "./constants";
export declare type FilterOperator = keyof typeof filterOperators;
export declare type FilterValueKeyword = keyof typeof filterValueKeywords;
export declare type FilterValue = string | number | typeof filterValueKeywords[FilterValueKeyword];
export declare type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>;
};
export declare type ParseQueryStringOptions = {
    rejectOnError: boolean;
};
