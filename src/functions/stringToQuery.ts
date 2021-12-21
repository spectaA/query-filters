import { isString, isNaN, keys } from "lodash";
import { FilterOperator, ParsedFilters, FilterValue, FilterValueKeyword } from "..";
import { RULES_DIVIDER, RULES_SEPARATOR, ARRAY_START_TAG, ARRAY_END_TAG, ARRAY_DIVIDER, STRING_START_TAG, STRING_END_TAG, filterValueKeywords, filterOperators } from "../constants";

export function parseFromString(query: string): ParsedFilters {
    let filters: ParsedFilters = {};

    if (!query || !isString(query) || !query.length) return {};

    const rawRules = query.split(RULES_SEPARATOR);
    const parsedRules = rawRules.map(rule => rule.trim().split(RULES_DIVIDER).map(r => r.trim()));

    for (const rule of parsedRules) {
        const [key, operator, value] = parseRule(rule);
        filters[key] = {
            ...filters[key],
            [operator]: value,
        }
    }

    return filters;
}

// Private functions

function parseRule(rule: string[]): [string, FilterOperator, FilterValue | FilterValue[]] {
    if (!(Array.isArray(rule) && rule.length === 3)) throw new Error(`Invalid rule: ${rule}`);

    // Key
    const key: unknown = rule[0];
    if (!key || !isString(key)) throw new Error(`Invalid key: ${key}`);

    // Operator
    const operator: unknown = rule[1];
    if (!operator || !isOperator(operator)) throw new Error(`Invalid operator: ${operator}`);

    // Value
    const rawValue: unknown = rule[2];
    const value = parseValue(rawValue);

    // Return
    return [key, operator, value];
}

function parseValue(value: unknown): FilterValue | FilterValue[] {
    if (!value || !isString(value)) throw new Error(`Invalid value: ${value}`);

    if (isValidArray(value)) {
        const rawValues = parseValidArray(value);
        return rawValues.map(v => parseSingleValue(v));

    } else {
        return parseSingleValue(value);
    }

    function isValidArray(value: unknown): boolean {
        return isString(value) && value.startsWith(ARRAY_START_TAG) && value.endsWith(ARRAY_END_TAG);
    }

    function parseValidArray(value: string): string[] {
        const rawArrValue = value.slice(ARRAY_START_TAG.length, -(ARRAY_END_TAG.length));
        if (!rawArrValue || !rawArrValue.length) {
            return [];
        }
        return rawArrValue.trim().split(ARRAY_DIVIDER).map(v => v.trim());
    }
}

function parseSingleValue(value: string): FilterValue {
    if (isValueKeyword(value)) {
        return getValueKeyword(value);
    }
    if (isValidNumber(value)) {
        return Number(value);
    }
    if (isValidString(value)) {
        return parseValidString(value);
    }
    throw new Error(`Invalid value: ${value}`);

    function isValidString(value: unknown): boolean {
        return isString(value) && value.startsWith(STRING_START_TAG) && value.endsWith(STRING_END_TAG);
    }

    function parseValidString(value: string): string {
        return value.slice(STRING_START_TAG.length, -(STRING_END_TAG.length));
    }
}

function isOperator(value: unknown): value is FilterOperator {
    return keys(filterOperators).includes(value as any);
}

function isValueKeyword(value: unknown): value is FilterValueKeyword {
    return keys(filterValueKeywords).includes(value as any);
}

function getValueKeyword(value: FilterValueKeyword): FilterValue {
    return filterValueKeywords[value];
}

function isValidNumber(value: unknown): boolean {
    return !isNaN(parseInt(value as any));
}