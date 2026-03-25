# ProgressBar

A command-line progress bar tool for displaying the progress of long-running tasks.

## Installation

To use this tool, you need to have Node.js installed.

```bash
npm install progress-bar
```

## Usage

To use the progress bar, you can require the 'progress.js' module and create a new instance of `ProgressBar`. Here's an example:

```javascript
const ProgressBar = require('./progress.js');

const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  // Do some work here
}

bar.finish();
```

## Options

- `total`: The total number of steps. Default is 100.
- `width`: The width of the progress bar. Default is 20.
- `complete`: The character used to represent the completed part of the progress bar. Default is '█'.
- `incomplete`: The character used to represent the incomplete part of the progress bar. Default is '░'.
- `style`: The style of the progress bar. Available styles are 'standard', 'circle', 'dots', and 'arrows'. Default is 'standard'.

## CLI Interface

The tool also provides a CLI interface. You can use the following commands to display different styles of progress bars:

```bash
node demo.js --style standard
node demo.js --style dots
node demo.js --style circle
node demo.js --style arrows
node demo.js --multi
```