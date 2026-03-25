# Code Complexity Analyzer

This tool is designed to analyze JavaScript code and calculate its cyclomatic complexity, cognitive complexity, and maintainability index.

## Features

- Parse JavaScript code
- Calculate cyclomatic complexity
- Assess risk level
- Generate reports
- Support multi-file analysis

## Usage

To analyze a single file:

```bash
node analyzer.js file.js
```

To analyze a directory:

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

## Output

The report will include the following information for each function:

- Function name
- Cyclomatic complexity
- Cognitive complexity
- Risk level
- Number of lines

The risk level is categorized as follows:

- Low: 1-10
- Medium: 11-20
- High: 21-50
- Extremely high: 50+

## Development

This tool is developed using Node.js and utilizes regular expressions to parse the code.

The complexity calculations are based on the following rules:

- Base complexity: 1
- Each control flow statement adds 1: if/else, for/while/do-while, switch/case, catch, ternary operator, logical operators (&&, ||)

The cognitive complexity is calculated based on the length of the function and the number of variables used.

The maintainability index is calculated based on the cyclomatic complexity and the number of lines of code.

## Contributing

Contributions are welcome! Please follow the contributing guidelines in the repository.

## License

This project is licensed under the MIT License.