# Complexity Analyzer

This tool analyzes the complexity of JavaScript code and generates a report.

## Usage

To analyze a single file:

```bash
node analyzer.js file.js
```

To analyze all JavaScript files in a directory:

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