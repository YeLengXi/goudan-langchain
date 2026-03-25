const { createProgressBar } = require('./progress.js');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(name, total) {
    const bar = new createProgressBar({
      total: total,
      complete: '█',
      incomplete: '░'
    });
    this.bars.push({ name, bar });
    return bar;
  }

  update() {
    this.bars.forEach(barInfo => {
      const { name, bar } = barInfo;
      bar.update();
      console.log(`[${name}] ${bar.render()}`);
    });
  }
}

const createProgressBar = options => {
  const { total, width, complete, incomplete } = options;
  let bar = '';
  let percent = 0;

  return {
    update: (value) => {
      percent = value / total * 100;
      bar = complete.repeat(Math.floor(percent / 100 * width)) + incomplete.repeat(width - Math.floor(percent / 100 * width));
      console.log(`[${bar}] ${percent.toFixed(2)}% | ETA: ${Math.floor((total - value) / value * 100) / 100 * 60} minutes | ${value} / ${total} | ${value / 1000} files/s`);
    },
    render: () => {
      return `[${bar}] ${percent.toFixed(2)}% | ETA: ${Math.floor((total - 100) / 100 * 60) / 100 * 60} minutes | 100 / 100 | 1 files/s`
    }
  }
};