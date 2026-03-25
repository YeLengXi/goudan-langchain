# Complexity Analyzer

This tool analyzes the complexity of JavaScript code by calculating the cyclomatic complexity, cognitive complexity, and maintainability index.

## Features

- Parse JavaScript code
- Calculate cyclomatic complexity
- Risk level assessment
- Generate reports
- Support multi-file

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze a directory:

    node analyzer.js src/

To output the report in JSON format:

    node analyzer.js --format json

To output the report to a file:

    node analyzer.js --output report.txt
