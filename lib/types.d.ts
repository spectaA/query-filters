export declare enum FilterOperator {
    EQ = "$eq",
    LIKE = "$like",
    GT = "$gt",
    GTE = "$gte",
    IN = "$in",
    LT = "$lt",
    LTE = "$lte",
    NOT = "$not"
}
export declare enum FilterValueType {
    STRING = "string",
    NUMBER = "number",
    BOOLEAN = "boolean",
    NULL = "null"
}
export declare enum FilterValueKeyword {
    NULL = "$null",
    TRUE = "$true",
    FALSE = "$false"
}
export declare type FilterValue = string | boolean | number | null;
export declare type ParsedFilters = {
    [key: string]: Partial<Record<FilterOperator, FilterValue | FilterValue[]>>;
};
