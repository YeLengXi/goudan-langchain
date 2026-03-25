# Complexity Analyzer

This tool is designed to analyze the complexity of JavaScript code.

## Features

- Parses JavaScript code
- Calculates Cyclomatic Complexity
- Evaluates risk level
- Generates reports
- Supports multiple files

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze a directory:

    node analyzer.js src/

To generate a JSON report:

    node analyzer.js --format json

To output the report to a file:

    node analyzer.js --output report.txt

## Complexity Calculation

- Cyclomatic Complexity: Based on the number of control flow statements in the function.
- Cognitive Complexity: Based on the number of functions and variables used in the function.

## Risk Level

- LOW: 1-10
- MEDIUM: 11-20
- HIGH: 21-50
- CRITICAL: 50+

## Output Example

Code Complexity Report
======================

Function: processData
- Cyclomatic Complexity: 15
- Cognitive Complexity: 12
- Risk Level: ⚠️ MEDIUM
- Lines: 45

Function: validateInput
- Cyclomatic Complexity: 4
- Cognitive Complexity: 2
- Risk Level: ✅ LOW
- Lines: 12

Overall: 2 functions analyzed
1 HIGH risk, 1 LOW risk

