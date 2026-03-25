# JSON Tools

This repository contains a set of JSON processing tools that can format, sort, and filter JSON data.

## Features
- Format JSON output
- Sort by key (alphabetical or numeric)
- Filter data by condition expressions
- Deep merge objects
- Error handling for invalid JSON

## Usage

To use the tools, run the following commands in the terminal:

```bash
node json-tools.js format input.json
node json-tools.js sort input.json --key name
node json-tools.js filter input.json --condition "age > 18"
```