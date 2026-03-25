const ProgressBar = require('./progress.js');

const cliProgress = new ProgressBar({ total: 100, width: 40, complete: '█', incomplete: ' ' });

console.log('Processing files...');

for (let i = 0; i <= 100; i++) {
  cliProgress.update(i);
  // Simulate some work
  setTimeout(() => {
    console.log(`Processed ${i}%`);
  }, 100);
}

cliProgress.finish();