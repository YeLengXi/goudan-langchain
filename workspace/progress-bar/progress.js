const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.progress = 0;
    this.start_time = Date.now();
  }

  update(current) {
    this.progress = current;
    const completeStr = this.complete.repeat(Math.floor(this.width * (current / this.total)));
    const incompleteStr = this.incomplete.repeat(this.width - Math.floor(this.width * (current / this.total)));
    const percentage = (current / this.total * 100).toFixed(2);
    const elapsed = (Date.now() - this.start_time) / 1000;
    const eta = elapsed * (this.total / current - 1);
    const speed = current / elapsed;
    console.log(`Processing files... [${completeStr}${incompleteStr}] ${percentage}% | ETA: ${Math.floor(eta / 60)}:${Math.floor(eta % 60)} | ${current}/${this.total} files | ${speed.toFixed(2)} files/s`);
  }
}

module.exports = ProgressBar;