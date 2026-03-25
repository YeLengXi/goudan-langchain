const ProgressBar = require('./progress.js');
const MultiProgressBar = require('./multi-progress.js');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter style (standard, dots, arrow, multi): ', (style) => {
  if (style === 'standard') {
    const bar = new ProgressBar({
      total: 100,
      width: 40,
      complete: '█',
      incomplete: '░'
    });
    for (let i = 0; i <= 100; i++) {
      bar.update(i);
      // 做一些工作
    }
  } else if (style === 'dots') {
    const bar = new ProgressBar({
      total: 100,
      width: 40,
      complete: '█',
      incomplete: '·'
    });
    for (let i = 0; i <= 100; i++) {
      bar.update(i);
      // 做一些工作
    }
  } else if (style === 'arrow') {
    const bar = new ProgressBar({
      total: 100,
      width: 40,
      complete: '█',
      incomplete: '·'
    });
    for (let i = 0; i <= 100; i++) {
      bar.update(i);
      // 做一些工作
    }
  } else if (style === 'multi') {
    const multi = new MultiProgressBar();
    for (let i = 0; i < 10; i++) {
      multi.create(`Task ${i + 1}`, 100);
    }
    multi.update();
  } else {
    console.log('Invalid style');
  }
  rl.close();
});