# CLI Progress Bar Tool

This tool provides a command-line progress bar for displaying the progress of long-running tasks.

## Features

- Dynamic updates
- Percentage display
- ETA calculation
- Support multiple styles
- Multiple progress bars
- Colorful output

## Usage

To use the progress bar, require the 'progress.js' module and create a new instance of the ProgressBar class.

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
  // Do some work
}

// Multi-progress bar
const multi = new MultiProgressBar();
const bar1 = multi.create('Download', 100);
const bar2 = multi.create('Upload', 100);
```

## CLI Interface

The CLI interface allows you to specify the style of the progress bar.

```bash
node demo.js --style standard
node demo.js --style dots
node demo.js --multi
```

## Output Example

```
Processing files... [████████████░░░░░░░░░] 60% | ETA: 0:00:05 | 12/20 files | 2.4 files/s
```