const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || ' ';
    this.bar = new ProgressBar.SingleBar({ total: this.total, width: this.width, complete: this.complete, incomplete: this.incomplete }, 'progress');
  }

  update(percentage) {
    this.bar.update(percentage);
  }

  finish() {
    this.bar.finish();
  }
}

module.exports = ProgressBar;