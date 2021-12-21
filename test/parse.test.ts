import { convertToFindOptions, parseFromString } from "../src";

describe("Parse from string", () => {

    test("Empty string", () => {
        const query = "";
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({});
    })

    test("Basic key + $eq + string", () => {
        const query = `name:$eq:$"Tim"`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "name": {
                "$eq": "Tim"
            }
        });
    })

    test("Basic key + $like + string", () => {
        const query = `mail:$like:$"@google.com"`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "mail": {
                "$like": "@google.com"
            }
        });
    })

    test("Basic key + $gt + number", () => {
        const query = `age:$gt:50`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "age": {
                "$gt": 50
            }
        });
    })

    test("Basic key + $in + array", () => {
        const query = `role:$in:$()`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "role": {
                "$in": []
            }
        });
    })

    test("Basic key + $in + array", () => {
        const query = `role:$in:$($null,$"admin",$"modo")`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "role": {
                "$in": [ null, "admin", "modo" ]
            }
        });
    })

    test("Basic key + $not + keyword", () => {
        const query = `age:$not:$null`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "age": {
                "$not": null
            }
        });
    })

    test("Basic key + $not + keyword", () => {
        const query = `banned:$eq:$false`;
        const parsed = parseFromString(query);

        expect(parsed).toMatchObject({
            "banned": {
                "$eq": false
            }
        });
    })

})