# CLI Progress Bar Tool

This tool provides a command-line progress bar for long-running tasks.

## Features

- Dynamic updates
- Percentage display
- ETA calculation
- Support multiple styles
- Multiple progress bars
- Colorful output

## Usage

To use the progress bar, require the 'progress.js' module and create a new instance of the `ProgressBar` class.

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work
}

// For multiple progress bars, use MultiProgressBar
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
```