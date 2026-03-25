# Complexity Analyzer

This tool is designed to analyze the complexity of JavaScript code. It calculates the cyclomatic complexity, cognitive complexity, and maintenance index of functions.

## Features

- Parse JavaScript code
- Calculate cyclomatic complexity
- Assess risk level
- Generate reports
- Support multi-file analysis

## Usage

To analyze a single file:

    node analyzer.js file.js

To analyze a directory:

    node analyzer.js src/

To output the results in JSON format:

    node analyzer.js --format json

To output the results to a file:

    node analyzer.js --output report.txt

## Output

The tool will output a report with the following information for each function:

- Function name
- Cyclomatic complexity
- Cognitive complexity
- Risk level
- Number of lines

## Complexity Calculation

The cyclomatic complexity is calculated based on the number of control flow statements in the function.

The cognitive complexity is calculated based on the number of keywords and operators in the function.

The risk level is determined based on the cyclomatic complexity.

## License

MIT

