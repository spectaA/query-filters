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

### General structure of stingified query filter

```
https://my-api.com/users?filters=name:$eq:$"Jon"|age:$lt:65|age:$gte:18|role:$in:$($"admin",$null)|banned:$not:$true
```

Using `parseFromString(req.query.filters)`, query will be parsed to:

```js
{
    "name": {
        "$eq": "Jon"
    },
    "age": {
        "$lt": 65,
        "$gte": 18
    },
    "role": {
        "$in": [ "admin", null ]
    },
    "banned": {
        "$not": true
    }
}
```

### Rules

- Rules are delimited by "`|`"
- Each rule contains three parts divided by "`:`"
- Three parts are `key`:`operator`:`value`

Note: avoid use spaces inside rules. They may cause parsing errors.

***

### Key part

- The first rule block contains the property wanted
- No check / test is done and property is used "as it is"

```
name:$eq:$"Jon"|age:$lt:65|age:$gte:18|role:$in:$($"admin",$null)|banned:$not:$true
```

In this example, proeprties are:
- name
- age (twice)
- role
- banned

### Operator part

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

### Value part

| Values types |||
|- |- |-
| String | `$"MY-STRING"` | Must be between the start tag `$"` and the end tag `"`
| Number | `50`, `-4`, `3.14` | Must be a parsable number
| Boolean | `$true` or `$false` | Special keywords: must start with `$` (case sensitive)
| Null | `$null` | Special keyword: must start with `$` (case sensitive)
| Arrays | `$(VALUE1,VALUE2,...)` | Arrays are specified by the start tag `$(` and the end tag `)`. Each value must me a valid [value](#value-part). Values are divied by a `,`

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