# progress-bar

This package provides a CLI progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this package, you need to install it first.

```bash
npm install progress-bar
```

## Usage

To use the progress bar, you can require the 'ProgressBar' class from the 'progress.js' file.

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work
}
```