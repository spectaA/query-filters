# Welcome to query-filters 👋
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![Twitter: Spectaa\_](https://img.shields.io/twitter/follow/Spectaa\_.svg?style=social)](https://twitter.com/Spectaa\_)

> Parse, extract and convert to ORM's options your query filters. Made for easy communication between client and server

### 🏠 [Homepage](https://github.com/webshopr/query-filters)

## Install

```sh
npm install
```

## Run tests

```sh
npm run test
```

## Usage

### 1) Encode (E.g: client-side)

Using `stringifyParsedFilters` with a valid filter object

```js
let queryString = stringifyParsedFilters({
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
        "$in": [ "user", null, "%|@?&&__?./::|@#¼½^{[}] " ],
    },
    "banned": {
        "$not": true
    }
})
```

This object will be stringified as this:

```
name[$eq]=%40Jon&lastname[$like]=%40doe&age[$gte]=18&age[$lt]=65.5&role[$in][0]=%40user&role[$in][1]&role[$in][2]=%40%25%7C%40%3F%26%26__%20Test%20%3F.%2F%3A%3A%7C%40%23%C2%BC%C2%BD%5E%7B%5B%7B%7D%20&banned[$not]=true
```

If it's needed, it's fairly human readable:
```
name [$eq] = %40Jon
& lastname [$like] = %40doe
& age [$gte] = 18
& age [$lt] = 65.5
& role [$in] [0] = %40user
& role [$in] [1]
& role [$in] [2] = %40%25%7C%40%3F%26%26__%20Test%20%3F.%2F%3A%3A%7C%40%23%C2%BC%C2%BD%5E%7B%5B%7B%7D%20
& banned[$not]=true
```

__> Only values are encoded ! Keys and operatos stay as is__

| Type | Raw | Encoded | Rule |
|- |- |- |- |
| Booleans | `true`, `false` | `true`, `false` | As is
| Nulls | `null` | `null` | As is
| Numbers | `10`, `42.42`, `Infinity`, ... | `10`, `42.42`, `Infinity`, ... | As is
| Strings | `Hello World!` | `%40Hello%20World%21` | Encoded with and prefixed with an encoded `@` (`%40`)

> Why do strings are prefixed with an `@`?

Prefix strings prevents keyword like or number like string to be badly parsed:

| Type check with prefix | | |
|- |- |- |
| Number <br> String | `10` <br> `"%4010"` | `10` <br> `"10"`
| Boolean <br> String | `true` <br> `"%40true"` | `true` <br> `"true"`

### 2) Decode (E.g: server-side)

Decode the transmitted query string using `parseQueryString(req.query.filters)`, query will be parsed back to the [original object](#1-encode-eg-client-side)

### Operators

| Allowed operators |||
|-|-|-
|`$eq` | equals | `==`
|`$lt` | lower than | `>`
|`$lte` | lower than or equals | `>=`
|`$gt` | greater than | `<`
|`$gte` | greater than or equals | `<=`
|`$in` | is contained in array of values | `IN` as in SQL
|`$not` | different from | `!=`
|`$like` | is like | `ILIKE` as in SQL


***

## Author

👤 **Mathias Billot**

* Twitter: [@Spectaa\_](https://twitter.com/Spectaa\_)
* LinkedIn: [@mathias-billot](https://linkedin.com/in/mathias-billot)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

Feel free to check [issues page](https://github.com/webshopr/query-filters/issues). You can also take a look at the [pull requests](https://github.com/webshopr/query-filters/pulls).

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_