import { Equal, ILike, MoreThan, MoreThanOrEqual, LessThan, LessThanOrEqual, In, Not } from "typeorm";

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

export type FilterOperator = keyof typeof filterOperators;

export const filterValueKeywords = {
    "$null": null,
    "$true": true,
    "$false": false,
}

export type FilterValueKeyword = keyof typeof filterValueKeywords;

export type FilterValue = string | boolean | number | null;

export type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>
}