# Demo Program for CLI Progress Bar Tool

const ProgressBar = require('./progress.js');
const MultiProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

class Demo {
  constructor() {
    this.multi = new MultiProgressBar();
  }

  run() {
    const bar1 = this.multi.create('Download', 100);
    const bar2 = this.multi.create('Upload', 100);

    for (let i = 0; i <= 100; i++) {
      bar1.update(i);
      bar2.update(i);
      setTimeout(() => {}, 100);
    }

    this.multi.finish();
  }
}

const demo = new Demo();
 demo.run();