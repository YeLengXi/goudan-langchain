# progress-bar

This is a CLI progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this tool, you need to install it locally.

```bash
npm install workspace/progress-bar
```

## Usage

To use the progress bar, you can require the 'ProgressBar' module and create an instance with the desired options.

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work
}

// To finish the progress bar, call the finish method
bar.finish();
```