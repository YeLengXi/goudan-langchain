const ProgressBar = require('./progress.js');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(label, total) {
    const bar = new ProgressBar({ total, complete: '=', incomplete: ' ' });
    this.bars.push({ bar, label });
    return bar;
  }

  render() {
    this.bars.forEach(barInfo => {
      const { bar, label } = barInfo;
      bar.update(bar.current);
    });
  }
}

module.exports = MultiProgressBar;