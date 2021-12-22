import { filterOperators, filterValueKeywords } from "./constants";

export type FilterOperator = keyof typeof filterOperators;

export type FilterValueKeyword = keyof typeof filterValueKeywords;

export type FilterValue = string | number | typeof filterValueKeywords[FilterValueKeyword];

export type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>
}

export type ParseQueryStringOptions = {
    rejectOnError: boolean,
}