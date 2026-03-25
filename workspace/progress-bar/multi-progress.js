const ProgressBar = require('./progress.js');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(label, total) {
    const bar = new ProgressBar({
      total: total
    });
    this.bars.push({ bar, label });
    return bar;
  }

  update() {
    this.bars.forEach(bar => {
      bar.update(Math.random() * 100);
    });
  }
}

module.exports = MultiProgressBar;