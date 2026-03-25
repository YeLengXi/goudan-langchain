# CSV Tool

This tool provides a set of functions to read, parse, convert, and export CSV files.

## Installation

To use this tool, make sure you have Node.js installed.

## Usage

### Convert CSV to JSON

```bash
node csv-tool.js convert input.csv --format json
```

### Filter CSV by Column

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

### Sort CSV by Column

```bash
node csv-tool.js sort input.csv --column "date"
```

### Convert CSV to Markdown Table

```bash
node csv-tool.js to-table input.csv --format markdown
```

## Functions

- `readFileSync`
- `writeFileSync`
- `execSync`
- `listDirectory`
- `parseCSV`
- `generateCSV`
- `convertCSVToJson`
- `convertJsonToCSV`
- `filterCSV`
- `sortCSV`
- `convertCSVToMarkdown`
- `convertCSVToHTML`