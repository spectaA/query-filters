import { filterOperators, filterValueKeywords } from "./constants";
export declare type FilterOperator = keyof typeof filterOperators;
export declare type FilterValueKeyword = keyof typeof filterValueKeywords;
export declare type FilterValue = string | boolean | number | null;
export declare type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>;
};
