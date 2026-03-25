# CLI Progress Bar Tool

This tool provides a command line progress bar for displaying the progress of long-running tasks.

## Features

- Dynamic updates
- Percentage display
- ETA calculation
- Multiple styles (standard, circular, dots, arrows)
- Multi-progress bars
- Colorful output

## Installation

To use this tool, clone the repository and install the dependencies:

```bash
npm install
```

## Usage

To use the progress bar, require the `progress.js` module and create a new instance of `ProgressBar`. You can specify the total number of items, width of the progress bar, and other options.

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({
  total: 100,
  width: 40,
  complete: '█',
  incomplete: '░'
});

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work here
}

// For multi-progress bars, use the `multi` option
const multi = new ProgressBar({
  multi: true
});

const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);

for (let i = 0; i <= 100; i++) {
  bar1.update(i);
  bar2.update(i);
}
```