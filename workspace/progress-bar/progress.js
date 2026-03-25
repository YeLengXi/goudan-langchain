const ProgressBar = require('./progress.js');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.progress = 0;
    this.label = options.label || '';
  }

  update(value) {
    this.progress = value;
    const completeStr = this.complete.repeat(Math.floor(this.width * this.progress / this.total));
    const incompleteStr = this.incomplete.repeat(this.width - completeStr.length);
    const percentage = (this.progress / this.total * 100).toFixed(2);
    console.log(`${this.label}: [${completeStr}${incompleteStr}] ${percentage}%`);
  }

  finish() {
    this.update(this.total);
    console.log(`
Finished! Total time: ${this.formatTime(this.total)}
`);
  }

  formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [hours, minutes, secs].map(v => v.toString().padStart(2, '0')).join(':');
  }
}

module.exports = ProgressBar;