# progress-bar

This is a CLI progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this tool, you need to install it locally.

```bash
npm install workspace/progress-bar
```

## Usage

To use the progress bar, you can require the `ProgressBar` class from the `progress.js` file.

```javascript
const ProgressBar = require('./progress.js');

// Create a new progress bar
const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

// Update the progress bar
for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work
}

// Finish the progress bar
bar.finish();
```