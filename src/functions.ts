import { isString, isNaN } from "lodash";
import { FindManyOptions } from "typeorm";
import { FilterOperator, ParsedFilters, FilterValue, FilterValueKeyword, FilterValueType } from ".";

export function convertToFindOptions(filters: ParsedFilters): FindManyOptions {
    throw new Error();
}

export function parseFromString(query: string): ParsedFilters {
    let filters: ParsedFilters = {};

    const rawRules = query.split("|");
    const parsedRules = rawRules.map(rule => rule.split(":"));

    for (const rule of parsedRules) {
        try {
            const [key, operator, value] = parseRule(rule);
            filters[key] = { [operator]: value };
        } catch (err) { };
    }

    return filters;
}

// Private functions

function parseRule(rule: string[]): [string, FilterOperator, FilterValue | FilterValue[]] {
    if (!(Array.isArray(rule) && rule.length === 3)) throw new Error(`Invalid rule: ${rule}`);
    // Key
    const rawKey: string = rule[0];
    if (!isString(rawKey)) throw new Error(`Invalid key: ${rawKey}`);

    // Operator
    const rawOperator: string = rule[1];
    if (!rawOperator) throw new Error(`Invalid operator: ${rawOperator}`);
    const operator: FilterOperator = FilterOperator.EQ;

    // Value
    const rawValue: string = rule[2];
    const value: FilterValue | FilterValue[] = parseValue(rawValue);

    // Return
    return [rawKey, operator, value];
}

function parseValue(value: string): FilterValue | FilterValue[] {
    if (!value) throw new Error(`Invalid value: ${value}`);
    if (value.charAt(0) === "(" && value.charAt(-1) === ")") {
        const rawArrValue = value.slice(1, -1);
        const rawValues = rawArrValue.split(",");
        return rawValues.map(v => parseSingleValue(v));
    } else {
        return parseSingleValue(value);
    }
}

function parseSingleValue(value: string): FilterValue {
    if (value === "$null") {
        return null;
    } else if (value === "$true") {
        return true;
    } else if (value === "$false") {
        return false;
    } else if (!isNaN(value)) {
        return Number(value);
    } else {
        return value;
    }
}