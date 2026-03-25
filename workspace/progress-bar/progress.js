const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.bar = new ProgressBar SingleBar({
      clearOnComplete: false,
      hideCursor: true
    });
  }

  update(value) {
    this.bar.update(value);
  }

  complete() {
    this.bar.finish();
  }
}

module.exports = ProgressBar;