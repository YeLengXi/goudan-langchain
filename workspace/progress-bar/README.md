# progress-bar

This is a CLI progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this tool, you need to install Node.js and npm.

```bash
npm install progress-bar
```

## Usage

To use the progress bar, you can require the ProgressBar module and create a new instance with the desired options.

```javascript
const ProgressBar = require('progress-bar');

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
```