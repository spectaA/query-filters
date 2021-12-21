import { ParsedFilters, queryToString } from "../src";

describe("Convert parsed query to query string", () => {

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
        const query = queryToString(parsed);
        const compare = "banned:$eq:$false||banned:$lt:50||role:$in:$($null,$\"admin\",$\"modo\")";

        expect(query).toEqual(compare);
    })

    test("Bad operator", () => {
        const parsed = {
            "age": {
                "$lt": 50,
                "BAD_OPERATOR": false,
            },
        }

        expect(() => {
            queryToString(parsed);
        }).toThrow("Invalid operator");
    })

})
