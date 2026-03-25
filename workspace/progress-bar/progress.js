const ProgressBar = require('./progress.js');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '=';
    this.incomplete = options.incomplete || ' ';
    this.progress = 0;
    this.start = Date.now();
    this.format = () => {
      const completeStr = this.complete.repeat(Math.floor(this.width * this.progress / this.total));n      const incompleteStr = this.incomplete.repeat(this.width - completeStr.length);
      return `[${completeStr}${incompleteStr}] ${Math.floor(this.progress / this.total * 100)}%`;
    };
  }

  update(value) {
    this.progress = value;
    console.log(this.format());
  }

  finish() {
    this.update(this.total);
    console.log('
Finished!
');
  }
}

module.exports = ProgressBar;