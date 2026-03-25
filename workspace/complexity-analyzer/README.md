# Complexity Analyzer

This tool analyzes JavaScript code to calculate its cyclomatic complexity, cognitive complexity, and maintainability index. It provides a report with function list, complexity scores, risk levels, and optimization suggestions.

## Features

- Parse JavaScript code
- Calculate cyclomatic complexity
- Assess risk levels
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

## Output

The report includes the following information for each function:

- Function name
- Cyclomatic Complexity
- Cognitive Complexity
- Risk Level
- Lines of Code

The risk level is categorized as follows:

- Low: 1-10
- Medium: 11-20
- High: 21-50
- Extremely High: 50+

## Examples

To analyze a file named 'file.js':

    $ node analyzer.js file.js

To analyze a directory named 'src':

    $ node analyzer.js src/

To output the report in JSON format:

    $ node analyzer.js --format json

To output the report to a file named 'report.txt':

    $ node analyzer.js --output report.txt