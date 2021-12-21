import { filterOperators, filterValueKeywords } from "./constants";

export type FilterOperator = keyof typeof filterOperators;

export type FilterValueKeyword = keyof typeof filterValueKeywords;

export type FilterValue = string | boolean | number | null;

export type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>
}
