import { ParsedFilters, stringifyParsedFilters } from "../src";

describe("Convert parsed query to query string", () => {

    test("Basic string", () => {
        const parsed: ParsedFilters = {
            "name": {
                "$like": "Jon Doe"
            }
        }
        const compare = "name[$like]=%40Jon%20Doe";

        expect(stringifyParsedFilters(parsed)).toEqual(compare);
    })

    test("Basic number", () => {
        const parsed: ParsedFilters = {
            "age": {
                "$gte": 18
            }
        }
        const compare = "age[$gte]=18";

        expect(stringifyParsedFilters(parsed)).toEqual(compare);
    })

    test("Basic keywords", () => {
        const parsed: ParsedFilters = {
            "banned": {
                "$not": null
            },
            "role": {
                "$in": [ true, false, null ]
            }
        }
        const compare = "banned[$not]&role[$in][0]=true&role[$in][1]=false&role[$in][2]";

        expect(stringifyParsedFilters(parsed)).toEqual(compare);
    })

    test("Complete test", () => {
        const parsed: ParsedFilters = {
            "banned": {
                "$eq": false,
                "$lt": 50,
            },
            "role": {
                "$in": [ null, "admin", "modo" ]
            },
        }
        const compare = "banned[$eq]=false&banned[$lt]=50&role[$in][0]&role[$in][1]=%40admin&role[$in][2]=%40modo";

        expect(stringifyParsedFilters(parsed)).toEqual(compare);
    })

    test("Check validator is well applied", () => {
        const parsed = {
            "age": {
                "$lt": 50,
                "BAD_OPERATOR": false,
            },
        }

        expect(() => {
            stringifyParsedFilters(parsed);
        }).toThrow("Invalid operator");
    })

})
