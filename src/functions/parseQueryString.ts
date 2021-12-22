import { isNaN, isString, keys } from "lodash";
import { parse } from "qs";
import { FilterValue, FilterValueKeyword, ParsedFilters, ParseQueryStringOptions } from "..";
import { defaultParseQueryStringOptions, filterValueKeywords } from "../constants";
import { validateParsedFilters } from "./validateParsedFilters";

export function parseQueryString(query: string, options: Partial<ParseQueryStringOptions> = {}): ParsedFilters {
    // Merge options
    options = {
        ...options,
        ...defaultParseQueryStringOptions
    } as ParseQueryStringOptions;

    // Parse string
    const parsed: unknown = parse(query, {
        strictNullHandling: true,
        decoder: (str, defaultDecoder, charset, type) => {
            if (type === "value") {
                const decoded = defaultDecoder(str);
                if (decoded.startsWith("@")) {
                    return defaultDecoder(decoded.slice(1));
                }
                if (isNumericString(decoded)) {
                    return +decoded;
                }
                if (isString(decoded) && !decoded.length) {
                    return null;
                }
                if (isValueKeyword(decoded)) {
                    return getValueKeyword(decoded);
                }
                throw new Error(`Bad value: ${decoded}`);
            }
            return defaultDecoder(str);
        }
    })

    // Convert to valid parsed filter
    return validateParsedFilters(parsed);
}

// Private functions

function isValueKeyword(value: unknown): value is FilterValueKeyword {
    return keys(filterValueKeywords).includes(value as any);
}

function getValueKeyword(value: FilterValueKeyword): FilterValue {
    return filterValueKeywords[value];
}

function isNumericString(value: string): boolean {
    return !isNaN(parseFloat(value));
}