const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 40;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.style = options.style || 'standard';
    this.progress = 0;
  }

  update(value) {
    this.progress = value;
    this.render();
  }

  render() {
    const completeLength = Math.round(this.width * (this.progress / this.total));
    const incompleteLength = this.width - completeLength;
    const completeStr = this.complete.repeat(completeLength);
    const incompleteStr = this.incomplete.repeat(incompleteLength);
    const percentage = Math.round((this.progress / this.total) * 100);
    const eta = this.calculateETA();
    const speed = this.calculateSpeed();

    console.log(`Processing files... [${completeStr}${incompleteStr}] ${percentage}% | ETA: ${eta} | ${this.progress}/${this.total} files | ${speed} files/s`);
  }

  calculateETA() {
    if (this.progress === this.total) {
      return '0:00:00';
    }
    const timeElapsed = Date.now() - this.startTime;
    const timePerStep = timeElapsed / this.progress;
    const timeRemaining = timePerStep * (this.total - this.progress);
    const hours = Math.floor(timeRemaining / 3600000);
    const minutes = Math.floor((timeRemaining % 3600000) / 60000);
    const seconds = Math.floor((timeRemaining % 60000) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  }

  calculateSpeed() {
    if (this.progress === 0) {
      return '0 files/s';
    }
    const timeElapsed = Date.now() - this.startTime;
    return (this.total / timeElapsed).toFixed(2) + ' files/s';
  }

}