# Complexity Analyzer

This tool analyzes the complexity of JavaScript code.

## Features

- Parses JavaScript code
- Calculates Cyclomatic Complexity
- Assess risk level
- Generates reports
- Supports multiple files

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze a directory:

    node analyzer.js src/

To output in JSON format:

    node analyzer.js --format json

To output to a file:

    node analyzer.js --output report.txt
