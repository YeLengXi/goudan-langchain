const minimist = require('minimist');

const ProgressBar = require('./progress.js');
const MultiProgressBar = require('./multi-progress.js');

const args = minimist(process.argv.slice(2));

if (args.style === 'standard') {
  const bar = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: '░' });
  for (let i = 0; i <= 100; i++) {
    bar.update(i);
    // Do some work
  }
} else if (args.style === 'multi') {
  const multi = new MultiProgressBar();
  const bar1 = multi.create('Download', 100);
  const bar2 = multi.create('Upload', 100);
  for (let i = 0; i <= 100; i++) {
    bar1.update(i);
    bar2.update(i);
    // Do some work
  }
  multi.render();
} else {
  console.log('Unsupported style');
}
