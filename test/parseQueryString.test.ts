import { parseQueryString } from "../src";

describe("Convert query string to parsed query", () => {

    describe("Test rules one by one", () => {

        test("Empty string", () => {
            const query = "";
            const parsed = parseQueryString(query);

            expect(parsed).toMatchObject({});
        })
    
        test("Basic key + $eq + string", () => {
            const query = "name[$eq]=%40Tim";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "name": {
                    "$eq": "Tim"
                }
            });
        })
    
        test("Basic key + $like + string", () => {
            const query = "mail[$like]=%40%40google.com"
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "mail": {
                    "$like": "@google.com"
                }
            });
        })
    
        test("Basic key + $gt + number", () => {
            const query = "age[$gt]=50";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "age": {
                    "$gt": 50
                }
            });
        })
    
        test("Basic key + $in + array", () => {
            const query = "role[$in][]";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "role": {
                    "$in": [ null ]
                }
            });
        })
    
        test("Basic key + $in + array", () => {
            const query = "role[$in][0]=null&role[$in][1]=%40admin&role[$in][2]=%40modo";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "role": {
                    "$in": [ null, "admin", "modo" ]
                }
            });
        })
    
        test("Basic key + $not + keyword", () => {
            const query = "age[$not]=null";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "age": {
                    "$not": null
                }
            });
        })
    
        test("Basic key + $eq + keyword", () => {
            const query = "banned[$eq]=false";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "banned": {
                    "$eq": false
                }
            });
        })
    })

    describe("Test rules together", () => {

        test("Multiple rules for one key", () => {
            const query = "banned[$eq]=false&banned[$lt]=50&banned[$in][0]=null&banned[$in][1]=%40Yoyo";
            const parsed = parseQueryString(query);
    
            expect(parsed).toMatchObject({
                "banned": {
                    "$eq": false,
                    "$lt": 50,
                    "$in": [ null, "Yoyo" ]
                }
            });
        })

    })

})