# Complexity Analyzer

This tool is designed to analyze the complexity of JavaScript code.

## Features

- Parse JavaScript code
- Calculate Cyclomatic Complexity
- Risk level assessment
- Generate reports
- Support multi-file

## Usage

To analyze a single file:
$ node analyzer.js file.js

To analyze a directory:
$ node analyzer.js src/

To output the report in JSON format:
$ node analyzer.js --format json

To output the report to a file:
$ node analyzer.js --output report.txt

## Complexity Calculation

The basic complexity is 1.

Each control flow statement adds 1:
- if/else
- for/while/do-while
- switch/case
- catch
- ternary operator
- logical operators (&&, ||)

## Risk Level

1-10: Low risk ✅
11-20: Medium risk ⚠️
21-50: High risk ❌
50+: Extreme high risk 🚨

## Output Example

$ node analyzer.js file.js

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