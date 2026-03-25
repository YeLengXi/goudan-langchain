const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.style = options.style || 'standard';
    this.multi = options.multi || false;
    this bars = [];
  }

  create(taskName, total) {
    if (this.multi) {
      const bar = new ProgressBar.Standard(this, taskName, total);
      this.bars.push(bar);
      return bar;
    } else {
      throw new Error('MultiProgressBar is required for single bar');
    }
  }

  update(bar, value) {
    if (this.multi) {
      bar.update(value);
    } else {
      throw new Error('MultiProgressBar is required for single bar update');
    }
  }

  render() {
    if (this.multi) {
      this.bars.forEach(bar => {
        console.log(bar.render());
      });
    } else {
      throw new Error('MultiProgressBar is required for single bar render');
    }
  }

  start() {
    if (this.multi) {
      this.bars.forEach(bar => {
        bar.start();
      });
    } else {
      throw new Error('MultiProgressBar is required for single bar start');
    }
  }

  finish() {
    if (this.multi) {
      this.bars.forEach(bar => {
        bar.finish();
      });
    } else {
      throw new Error('MultiProgressBar is required for single bar finish');
    }
  }
}

module.exports = ProgressBar;