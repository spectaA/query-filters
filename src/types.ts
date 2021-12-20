export enum FilterOperator {
    EQ = "$eq",
    LIKE = "$like",
    GT = "$gt",
    GTE = "$gte",
    IN = "$in",
    LT = "$lt",
    LTE = "$lte",
    NOT = "$not",
}

export enum FilterValueType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    NULL = "null",
}

export enum FilterValueKeyword {
    NULL = "$null",
    TRUE = "$true",
    FALSE = "$false",
}

export type FilterValue = string | boolean | number | null;

export type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>
}