# progress-bar

This module provides a CLI progress bar utility.

## Installation

To use this module, you need to install it via npm:

```bash
npm install progress-bar
```

## Usage

To create a progress bar, you can do the following:

```javascript
const ProgressBar = require('progress-bar');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work here
}

bar.finish();
```

## API

- `new ProgressBar(options)` creates a new progress bar.
  - `options.total` (number) - The total number of steps (default is 100).
  - `options.width` (number) - The width of the progress bar (default is 20).
  - `options.complete` (string) - The character to use for the completed part of the progress bar (default is '█').
  - `options.incomplete` (string) - The character to use for the incomplete part of the progress bar (default is ' ').

- `update(percentage)` updates the progress bar to the specified percentage.

- `finish()` finishes the progress bar.

## Examples

### Standard Progress Bar

```bash
node demo.js --style standard
```

### Dots Progress Bar

```bash
node demo.js --style dots
```

### Multi Progress Bar

```bash
node demo.js --multi
```
