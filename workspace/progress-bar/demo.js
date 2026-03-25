const ProgressBar = require('./progress.js');

const cliProgress = require('cli-progress');

const bar = new cliProgress.SingleBar({}, {
  format: '[{bar}] {percentage}% | {value}/{total}',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  hideCursor: true
});

bar.start(100);

for (let i = 0; i <= 100; i++) {
  bar.update(i);
  console.log('Processing files...');
}

bar.finish();