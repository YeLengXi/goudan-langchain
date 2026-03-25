const minimist = require('minimist');

const ProgressBar = require('./progress.js');

class MultiProgressBar {
  constructor() {
    this.bars = [];
  }

  create(label, total) {
    const bar = new ProgressBar({
      total: total,
      complete: '=',
      incomplete: ' '}
    );
    this.bars.push({ bar, label });
    return bar;
  }

  update() {
    this.bars.forEach(barInfo => {
      barInfo.bar.update(Math.random() * 100);
    });
  }
}

const args = minimist(process.argv.slice(2));

const multi = new MultiProgressBar();

if (args.style === 'standard') {
  const bar = new ProgressBar({
    total: 100,
    width: 40,
    complete: '█',
    incomplete: ' '}
  });
  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    process.stdout.write(
      `[${'█'.repeat(i)}${' '.repeat(100 - i)}] ${((i / 100) * 100).toFixed(2)}%
    `
    );
    process.stdout.cursorTo(0);
  }
} else if (args.style === 'dots') {
  const bar = new ProgressBar({
    total: 100,
    width: 40,
    complete: '=',
    incomplete: ' '}
  );
  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    process.stdout.write(
      `[${'='.repeat(i)}${' '.repeat(100 - i)}] ${((i / 100) * 100).toFixed(2)}%
    `
    );
    process.stdout.cursorTo(0);
  }
} else if (args.style === 'multi') {
  multi.update();
}
