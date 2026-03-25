# Complexity Analyzer

This tool analyzes JavaScript code to calculate the Cyclomatic Complexity, Cognitive Complexity, and Maintainability Index.

## Features

- Parse JavaScript code
- Calculate Cyclomatic Complexity
- Assess risk level
- Generate reports
- Support multiple files

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze a directory:

    node analyzer.js src/

To output the report in JSON format:

    node analyzer.js --format json

To output the report to a file:

    node analyzer.js --output report.txt