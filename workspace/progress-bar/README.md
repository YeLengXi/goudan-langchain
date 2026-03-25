# progress-bar

This package provides a CLI progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this package, you need to install it first:

```bash
npm install progress-bar
```

## Usage

To create a progress bar, you can use the `ProgressBar` class:

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
bar.complete();
```