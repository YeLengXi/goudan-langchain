## json-tools

This is a JSON data processing tool that can format, sort, and filter JSON data.

## Features

- Format JSON data for better readability
- Sort JSON data by key or value
- Filter JSON data based on conditions
- Merge JSON objects deeply
- Error handling for invalid JSON

## Usage

To use this tool, you need to have Node.js installed.

### Format JSON

```bash
node json-tools.js format input.json
```

This command will format the JSON data in `input.json` with indentation.

### Sort JSON

```bash
node json-tools.js sort input.json --key name
```

This command will sort the JSON data in `input.json` by the `name` key.

### Filter JSON

```bash
node json-tools.js filter input.json --condition "age > 18"
```

This command will filter the JSON data in `input.json` based on the condition `age > 18`.
