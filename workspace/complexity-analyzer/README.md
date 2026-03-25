# Complexity Analyzer

This tool is used to analyze the complexity of JavaScript code.

## Installation

No installation required. Just copy the analyzer.js file to your project directory.

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze multiple files in a directory:

    node analyzer.js src/

To output the report in JSON format:

    node analyzer.js --format json

To output the report to a file:

    node analyzer.js --output report.txt

## Features

- Analyze JavaScript code complexity
- Calculate cyclomatic complexity
- Assess risk level
- Generate report
- Support multiple files