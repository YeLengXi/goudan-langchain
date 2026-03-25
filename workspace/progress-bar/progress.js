const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.style = options.style || 'standard';
    this.multi = options.multi || false;
    this bars = [];
  }

  create(label, total) {
    if (this.multi) {
      const bar = new ProgressBar[this.style](total, {
        format: '[:bar] :current/total :percentage',
        barCompleteChar: this.complete,
        barInCompleteChar: this.incomplete,
        hideCursor: true
      });
      this.bars.push({ bar, label });
      return bar;
    } else {
      const bar = new ProgressBar[this.style](total, {
        format: '[:bar] :current/total :percentage',
        barCompleteChar: this.complete,
        barInCompleteChar: this.incomplete,
        hideCursor: true
      });
      this.bars.push(bar);
      return bar;
    }
  }

  update(current) {
    if (this.multi) {
      this.bars.forEach(bar => {
        bar.update(current);
      });
    } else {
      this.bars[0].update(current);
    }
  }

  finish() {
    if (this.multi) {
      this.bars.forEach(bar => {
        bar.finish();
      });
    } else {
      this.bars[0].finish();
    }
  }
}

module.exports = ProgressBar;