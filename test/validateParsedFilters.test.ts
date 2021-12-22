import { parseQueryString, stringifyParsedFilters, validateParsedFilters } from "../src";

describe("Test bad queries", () => {

    test("Bad query filter type (array)", () => {
        const filters = [ 1, 2, 3 ];

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid query");
    })

    test("Bad query filter type (number)", () => {
        const filters = 10;

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid query");
    })

    test("Bad query filter type (string)", () => {
        const filters = "Bad query!";

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid query");
    })

    test("Bad query filter type (number)", () => {
        const filters = 10;

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid query");
    })

    test("Bad query filter type (undefined)", () => {
        const filters = undefined;

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid query");
    })

    test("Bad rule (string)", () => {
        const filters = {
            "key1": "this is not a string"
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid rule");
    })

    test("Bad rule (number)", () => {
        const filters = {
            "key1": 42
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid rule");
    })

    test("Bad rule (array)", () => {
        const filters = {
            "key1": [ 1, 2, 3 ]
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid rule");
    })

    test("Bad rule (undefined)", () => {
        const filters = {
            "key1": undefined
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid rule");
    })

    test("Bad operator", () => {
        const filters = {
            "key1": {
                "bad operator": 10
            }
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid operator");
    })

    test("Bad value (Function)", () => {
        const filters = {
            "key1": {
                "$eq": function() { console.log("Say Hi") }
            }
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid value");
    })

    test("Bad value (Object)", () => {
        const filters = {
            "key1": {
                "$eq": { "This is not": "an object" }
            }
        };

        expect(() => {
            validateParsedFilters(filters)
        }).toThrow("Invalid value");
    })

})