const ProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(label, total) {
    const bar = new cliProgress.Single(total, { clearOnComplete: true, hideCursor: true });
    bar.start();
    this.bars.push({ bar, label });
    return bar;
  }

  update(bars) {
    bars.forEach(bar => {
      bar.bar.update(bar.bar.current);
    });
  }

  finish() {
    this.bars.forEach(bar => {
      bar.bar.finish();
    });
  }
}

module.exports = { ProgressBar, MultiProgressBar };