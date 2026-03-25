const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || ' ';
    this.bar = new ProgressBarSingle(this.total, this.width, this.complete, this.incomplete);
  }

  update(value) {
    this.bar.update(value);
  }

  render() {
    this.bar.render();
  }

  reset() {
    this.bar.reset();
  }

  setTotal(total) {
    this.total = total;
    this.bar.setTotal(total);
  }

  setWidth(width) {
    this.width = width;
    this.bar.setWidth(width);
  }

  setComplete(complete) {
    this.complete = complete;
    this.bar.setComplete(complete);
  }

  setIncomplete(incomplete) {
    this.incomplete = incomplete;
    this.bar.setIncomplete(incomplete);
  }

}