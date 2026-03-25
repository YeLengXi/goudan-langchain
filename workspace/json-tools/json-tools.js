# json-tools.js

This is a JSON processing tool that can format, sort, filter, and merge JSON data.

## Functions

### format(json, indent)

Formats the JSON data with the specified indentation.

### sort(json, key)

Sorts the JSON data by the specified key.

### filter(json, condition)

Filters the JSON data based on the specified condition.

### merge(json1, json2)

Merges two JSON objects deeply.

## Usage

```bash
node json-tools.js format input.json
node json-tools.js sort input.json --key name
node json-tools.js filter input.json --condition "age > 18"
```