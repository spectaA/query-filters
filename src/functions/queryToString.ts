import { entries, isArray, isNumber, isString, keys } from "lodash";
import { FilterOperator, FilterValue, FilterValueKeyword, ParsedFilters } from "..";
import { ARRAY_DIVIDER, ARRAY_END_TAG, ARRAY_START_TAG, filterOperators, filterValueKeywords, RULES_DIVIDER, RULES_SEPARATOR, STRING_END_TAG, STRING_START_TAG } from "../constants";

export function queryToString(query: ParsedFilters): string {
    let output = [];
    
    for (const [ key, rule ] of entries(query)) {
        for (const [ operator, value ] of entries(rule)) {
            if (!isOperator(operator)) {
                throw new Error(`Invalid operator: ${operator}`);
            }

            const parsedValue = parseValue(value);
            const ruleString = [ key, operator, parsedValue ].join(RULES_DIVIDER);

            output.push(ruleString);
        }
    }

    return output.join(RULES_SEPARATOR);
}

// Private functions

function parseValue(value: FilterValue | FilterValue[]): string {
    if (isArray(value)) {
        return parseArray(value);
    }
    return parseSingleValue(value);
}

function parseArray(value: FilterValue[]): string {
    const values = value.map(value => parseSingleValue(value)).join(ARRAY_DIVIDER);
    return ARRAY_START_TAG + values + ARRAY_END_TAG;
}

function parseSingleValue(value: FilterValue): string {
    if (isValueKeywordInvert(value)) {
        return getValueKeywordInvert(value);
    }
    if (isString(value)) {
        return STRING_START_TAG + value + STRING_END_TAG;
    }
    if (isNumber(value)) {
        return value.toString();
    }
    throw new Error(`Invalid value: ${value}`);
}

function isOperator(value: unknown): value is FilterOperator {
    return keys(filterOperators).includes(value as any);
}

function isValueKeywordInvert(value: unknown): value is FilterValueKeyword {
    for (const [ kwKey, kwValue ] of entries(filterValueKeywords)) {
        if (kwValue === value) return true;
    }
    return false;
}

function getValueKeywordInvert(value: FilterValue): string {
    for (const [ kwKey, kwValue ] of entries(filterValueKeywords)) {
        if (kwValue === value) return kwKey;
    }
    throw new Error(`Invalid value (as keyword): ${value}`);
}
