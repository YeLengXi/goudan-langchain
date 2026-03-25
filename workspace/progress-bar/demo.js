const ProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(label, total) {
    const bar = new cliProgress.Bar({
      format: '[{bar}] {percentage}% | {label} | {value}/{total}',
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591',
      width: 30,
      total
    });
    this.bars.push({ bar, label, total });
    return bar;
  }

  update() {
    this.bars.forEach(bar => {
      bar.update(bar.total);
    });
  }
}