const ProgressBar = require('./progress.js');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || ' ';
    this.start = 0;
    this.current = 0;
    this.render();
  }

  update(value) {
    if (value < 0 || value > this.total) {
      throw new Error('Value must be between 0 and total');
    }
    this.current = value;
    this.render();
  }

  render() {
    const percentage = (this.current / this.total * 100).toFixed(2);
    const completeLength = Math.round(this.width * (this.current / this.total));
    const incompleteLength = this.width - completeLength;
    const completeStr = this.complete.repeat(completeLength);
    const incompleteStr = this.incomplete.repeat(incompleteLength);
    const progressStr = `[${completeStr}${incompleteStr}] ${percentage}%
    process.stdout.write(progressStr);
    process.stdout.cursorTo(0);
  }

  complete() {
    this.update(this.total);
  }
}

module.exports = ProgressBar;
