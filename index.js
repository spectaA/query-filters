// const qs = require("query-string");
const { isBoolean, isNull, isNumber, keys, isString } = require("lodash");
const qs = require("qs");

const output = qs.stringify({
    // "key1": {
    //     "$eq": 50
    // },
    "key2": {
        "$in": [ 1, "Salut", null, false ]
    },
    // "key3": {
    //     "$not": true,
    //     "$not": "YOYO @,.=?&https://? YOYO"
    // }
}, {
    encodeValuesOnly: true,
    skipNulls: false,
    strictNullHandling: true,
    encoder: (str, defaultEncoder, options) => {
        console.log("encode:", {str});
        if (isBoolean(str) || isNumber(str)) {
            return defaultEncoder(str);
        }
        if (isNull(str)) {
            return "null";
        }
        return defaultEncoder("@" + str);
    },
})

const keywords = {
    "true": true,
    "false": false,
    "null": null
}

const reverse = qs.parse(output, {
    strictNullHandling: true,
    skipNulls: false,
    decoder: (str, defaultDecoder, charset, type) => {
        if (type === "value") {
            const decoded = defaultDecoder(str);
            console.log("decode:", {str}, {decoded});
            if (decoded.startsWith("@")) {
                return defaultDecoder(decoded.slice(1));
            }
            if (isNumeric(decoded)) {
                return +decoded;
            }
            if (isString(decoded) && !decoded.length) {
                return null;
            }
            if (keys(keywords).includes(decoded)) {
                console.log("kw:", keywords[decoded])
                return keywords[decoded];
            }
            throw new Error(`Bad value: ${decoded}`);
        }
        return defaultDecoder(str);
    }
});

function isNumeric(num){
    return !isNaN(num)
}

console.log({output})
console.log({...reverse})