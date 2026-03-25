# Progress Bar Tool

This tool provides a command-line progress bar for displaying the progress of long-running tasks.

## Installation

To use this tool, ensure you have Node.js installed. Then, run the following command:

```bash
npm install workspace/progress-bar
```

## Usage

To use the progress bar, require the `ProgressBar` module and create an instance with the desired options.

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work
}

bar.finish();
```

### Options

- `total`: The total number of steps (default: 100).
- `width`: The width of the progress bar (default: 40).
- `complete`: The character used to represent the completed part of the progress bar (default: '█').
- `incomplete`: The character used to represent the incomplete part of the progress bar (default: '░').

## Examples

```bash
node demo.js --style standard
node demo.js --style dots
node demo.js --multi
```