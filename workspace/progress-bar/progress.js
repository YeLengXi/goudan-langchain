const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total;
    this.width = options.width || 20;
    this.complete = options.complete || '█';
    this.incomplete = options.incomplete || '░';
    this.progress = 0;
    this.start = Date.now();
  }

  update(current) {
    this.progress = current;
    const percentage = (this.progress / this.total) * 100;
    const completeStr = this.complete.repeat(Math.floor(this.width * (this.progress / this.total)));
    const incompleteStr = this.incomplete.repeat(this.width - Math.floor(this.width * (this.progress / this.total)));
    const bar = `[${completeStr}${incompleteStr}] ${percentage.toFixed(0)}%`; 
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(bar);
  }

  finish() {
    this.update(this.total);
    process.stdout.write('
');
  }
}
