import { isBoolean, isNull, isNumber } from "lodash";
import { stringify } from "qs";
import { ParsedFilters, validateParsedFilters } from "..";

export function stringifyParsedFilters(query: ParsedFilters): string {

    // Type check
    query = validateParsedFilters(query);

    // Stringify
    return stringify(query, {
        encodeValuesOnly: true,
        skipNulls: false,
        strictNullHandling: true,
        encoder: (str, defaultEncoder) => {
            if (isBoolean(str) || isNumber(str)) {
                return defaultEncoder(str);
            }
            if (isNull(str)) {
                return "null";
            }
            return defaultEncoder("@" + str);
        },
    });

}