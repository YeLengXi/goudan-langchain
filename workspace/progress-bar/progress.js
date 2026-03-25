const ProgressBar = require('./progress.js');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '=';
    this.incomplete = options.incomplete || ' ';
    this.style = options.style || 'standard';
    this.progress = 0;
    this.start();
  }

  start() {
    this.bar = new ProgressBar(this.total, {
      clear: true,
      format: `[:bar] :current/:total (:percent%) | ETA: :eta | :rate`
    });
  }

  update(current) {
    this.progress = current;
    this.bar.update(this.progress);
  }

  finish() {
    this.bar.stop();
  }
}

module.exports = ProgressBar;