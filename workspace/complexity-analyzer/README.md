# Complexity Analyzer

This tool analyzes JavaScript code and calculates its cyclomatic complexity, cognitive complexity, and maintainability index.

## Features

- Parse JavaScript code
- Calculate cyclomatic complexity
- Assess risk level
- Generate reports
- Support multiple files

## Usage

To analyze a single file:

```bash
node analyzer.js file.js
```

To analyze multiple files in a directory:

```bash
node analyzer.js src/
```

To output the report in JSON format:

```bash
node analyzer.js --format json
```

To output the report to a file:

```bash
node analyzer.js --output report.txt
```