# CSV Tool

This tool provides functionalities to read, parse, convert, and export CSV files.

## Features

- Read and parse complex CSV files (including quotes, escaping)
- Convert between CSV, JSON, Markdown, and HTML
- Filter and sort CSV data
- Export CSV files

## Usage

Convert CSV to JSON:

```bash
node csv-tool.js convert input.csv --format json
```

Filter CSV by column and value:

```bash
node csv-tool.js filter input.csv --column "status" --value "active"
```

Sort CSV by column:

```bash
node csv-tool.js sort input.csv --column "date"
```

Convert CSV to Markdown table:

```bash
node csv-tool.js to-table input.csv --format markdown
```
