const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total;
    this.width = options.width;
    this.complete = options.complete;
    this.incomplete = options.incomplete;
    this.current = 0;
    this.start = Date.now();
  }

  update(value) {
    this.current = value;
    const percent = (this.current / this.total) * 100;
    const completeStr = this.complete.repeat(Math.floor(this.width * percent / 100));
    const incompleteStr = this.incomplete.repeat(this.width - completeStr.length);
    const eta = this.calculateETA();
    console.log(`[${completeStr}${incompleteStr}] ${percent.toFixed(2)}% | ETA: ${eta} | ${this.current}/${this.total} items | ${this.current / (Date.now() - this.start).toFixed(2)} items/s`);
  }

  calculateETA() {
    if (this.current === this.total) {
      return '0:00:00';
    }
    const timeTaken = (Date.now() - this.start) / 1000;
    const itemsPerSecond = this.current / timeTaken;
    const timeLeft = (this.total - this.current) / itemsPerSecond;
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft - hours * 3600) / 60);
    const seconds = Math.floor(timeLeft - hours * 3600 - minutes * 60);
    return `${hours}:${minutes}:${seconds}`;
  }
}

module.exports = ProgressBar;