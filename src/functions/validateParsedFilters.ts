import { entries, isArray, isBoolean, isNull, isNumber, isObject, isPlainObject, isString, keys } from "lodash";
import { FilterOperator, FilterValue, ParsedFilters } from "..";
import { filterOperators } from "../constants";

export function validateParsedFilters(parsed: unknown): ParsedFilters {
    const filters: ParsedFilters = {};

    if (!isObject(parsed) || !isPlainObject(parsed)) throw new Error(`Invalid query (not an object)`);

    for (const [ key, rule ] of entries(parsed)) {
        if (!isString(key)) throw new Error(`Invalid key (${key})`);
        if (!isObject(rule) || !isPlainObject(rule)) throw new Error(`Invalid rule (${rule})`);
        
        for (const [ rawOperator, rawValue ] of entries(rule)) {
            const operator = validateOperator(rawOperator);
            const value = validateValue(rawValue)

            filters[key] = {
                ...filters[key],
                [operator]: value,
            }
        }
    }

    return filters;
}

// Private functions

function validateOperator(operator: unknown): FilterOperator {
    if (!isOperator(operator)) throw new Error(`Invalid operator: ${operator}`);
    return operator;
}

function validateValue(value: unknown): FilterValue | FilterValue[] {
    if (isArray(value)) {
        return value.map(validateSingleValue);
    } else {
        return validateSingleValue(value);
    }
}

function validateSingleValue(value: unknown): FilterValue {
    if (!isString(value) && !isBoolean(value) && !isNull(value) && !isNumber(value)) {
        throw new Error(`Invalid value: ${value}`);
    }
    return value;
}

function isOperator(value: unknown): value is FilterOperator {
    return keys(filterOperators).includes(value as any);
}