## JSON Tools

This repository provides a set of JSON processing tools that can format, sort, filter, and merge JSON data.

### Features

- Format JSON output for better readability
- Sort JSON data by key or value
- Filter JSON data based on conditions
- Merge JSON objects deeply
- Handle invalid JSON data

### Usage

To use these tools, you need to have Node.js installed.

1. Install the package:
   npm install json-tools

2. Run the tool:
   node json-tools.js <command> <options>

### Commands

- format <file>: Format the JSON data in the file.
- sort <file> --key <key>: Sort the JSON data in the file by the specified key.
- filter <file> --condition <condition>: Filter the JSON data in the file based on the specified condition.
- merge <file1> <file2>: Merge the JSON data from two files.

### Examples

- Format a JSON file:
  node json-tools.js format input.json

- Sort a JSON file by name:
  node json-tools.js sort input.json --key name

- Filter a JSON file to include only entries with age greater than 18:
  node json-tools.js filter input.json --condition "age > 18"

- Merge two JSON files:
  node json-tools.js merge file1.json file2.json