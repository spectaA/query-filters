import { parseQueryString, stringifyParsedFilters, validateParsedFilters } from "../src";

describe("Test complete flow", () => {

    test("From object to object", () => {

        const base = {
            "name": {
                "$eq": "Jon",
            },
            "lastname": {
                "$like": "doe"
            },
            "age": {
                "$gte": 18,
                "$lt": 65.5
            },
            "role": {
                "$in": [ "user", null, "%|@?&&__ Test ?./::|@#¼½^{[{} " ],
            },
            "banned": {
                "$not": true
            }
        }

        const validated = validateParsedFilters(base);

        const query = stringifyParsedFilters(validated);

        const decoded = parseQueryString(query);

        expect(decoded).toMatchObject(base);

        console.log(query)

    })

})