const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.style = options.style || 'standard';
    this.progress = 0;
    this.start();
  }

  start() {
    this.bar = new ProgressBar(this.total, {
      clear: true,
      format: this.style === 'standard' ? `[{bar}] {percentage}% | ETA: {eta} | {value}/{total} {unit}` : 
      this.style === 'circle' ? `[{bar}] {percentage}%` : 
      this.style === 'dots' ? `[{bar}] {percentage}%` : 
      this.style === 'arrows' ? `[{bar}] {percentage}%` : 
      `[{bar}] {percentage}%`
    });
  }

  update(value) {
    this.progress = value;
    this.bar.update(this.progress);
  }

  finish() {
    this.bar.stop();
  }
}

module.exports = ProgressBar;