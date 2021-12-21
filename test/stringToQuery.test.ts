import { parseFromString } from "../src";

describe("Convert query string to parsed query", () => {

    describe("Test rules one by one", () => {

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
    
        test("Basic key + $eq + keyword", () => {
            const query = `banned:$eq:$false`;
            const parsed = parseFromString(query);
    
            expect(parsed).toMatchObject({
                "banned": {
                    "$eq": false
                }
            });
        })
    })

    describe("Test rules together", () => {

        test("Multiple rules for one key", () => {
            const query = `banned:$eq:$false||banned:$lt:50||banned:$in:$($null,$"Yoyo")`;
            const parsed = parseFromString(query);
    
            expect(parsed).toMatchObject({
                "banned": {
                    "$eq": false,
                    "$lt": 50,
                    "$in": [ null, "Yoyo" ]
                }
            });
        })

        test("Override rules for one key", () => {
            const query = `banned:$eq:$false||banned:$eq:42`;
            const parsed = parseFromString(query);
    
            expect(parsed).toMatchObject({
                "banned": {
                    "$eq": 42,
                }
            });
        })

    })

    describe("Test random ideas", () => {

        test("Random spaces", () => {
            const query = `key1 : $eq : 1  ||    key2 :    $like : $null`;
            const parsed = parseFromString(query);
            
            expect(parsed).toMatchObject({
                "key1": {
                    "$eq": 1
                },
                "key2": {
                    "$like": null
                }
            })
        })

        test("Random spaces in array", () => {
            const query = `key1 : $like : $(  $null,   1  , $" Jon Doe " )  `;
            const parsed = parseFromString(query);
            
            expect(parsed).toMatchObject({
                "key1": {
                    "$like": [ null, 1, " Jon Doe " ]
                }
            })
        })

    })

    describe("Test bad queries", () => {

        test("Bad rules separator", () => {
            const query = `name:$eq:$"jon"||`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid rule");
        })

        test("Bad rules divider", () => {
            const query = `name:$"jon"`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid rule");
        })

        test("Missing part", () => {
            const query = `name:$"jon"`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid rule");
        })

        test("Bad operator", () => {
            const query = `name:badOperator:$"jon"`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid operator");
        })

        test("Bad value", () => {
            const query = `key1:$eq:badValue`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid value");
        })

        test("Bad value", () => {
            const query = `key1:$eq:1||key1:$eq:badValue`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid value");
        })

        test("Bad value", () => {
            const query = `key1:$eq:1||key1:$eq:badValue`;

            expect(() => {
                parseFromString(query)
            }).toThrow("Invalid value");
        })

    })

})