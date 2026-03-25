## json-tools.js

This script is a JSON data processing tool that can format, sort, and filter JSON data.

## Usage

To use this tool, you need to have Node.js installed.

1. Format JSON:
   node json-tools.js format input.json

2. Sort JSON by key:
   node json-tools.js sort input.json --key name

3. Filter JSON by condition:
   node json-tools.js filter input.json --condition "age > 18"

## Features

- Format: Beautify JSON output
- Sort: Sort by alphabetical or numerical order
- Filter: Support condition expressions
- Merge: Deep merge objects
- Error handling: Invalid JSON