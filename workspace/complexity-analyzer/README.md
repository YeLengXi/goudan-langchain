# Complexity Analyzer

This tool analyzes JavaScript code to calculate cyclomatic complexity, cognitive complexity, and maintainability index.
It generates a report with function list, complexity scores, risk levels, and optimization suggestions.

## Installation

To install the required dependencies, run:

```bash
npm install esprima escomplex fs path
```

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